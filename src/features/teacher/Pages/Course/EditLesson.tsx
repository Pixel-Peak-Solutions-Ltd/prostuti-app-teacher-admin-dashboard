import { Box, Button, Typography, Paper, Snackbar, Alert } from "@mui/material";

import Grid from '@mui/material/Grid2';
import { useState, useEffect } from "react";
import CustomLabel from "../../../../shared/components/CustomLabel";
import CustomTextField from "../../../../shared/components/CustomTextField";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useNavigate, } from "react-router-dom";
import { constructLesson } from "../../../../utils/lessonDataFormation";
import { useAppSelector } from "../../../../redux/hooks";
import { useGetLessonsByCourseIdQuery, useSaveLessonMutation } from "../../../../redux/features/course/courseApi";
import Loader from "../../../../shared/components/Loader";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LessonEditForm from "./LessonEditForm";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const EditLesson = () => {
    const course_id = useAppSelector(state => state.courseAndLessonId.id.course_id);
    const courseId = course_id;
    // getting all the lessons of the corresponding course
    const { data: lessonDataFromDB, isLoading: lessonLoader, refetch } = useGetLessonsByCourseIdQuery({ courseId });
    // to create dynamic form this state helps to determine number of input fields
    const [noOfLessonForms, setNoOfLessonForms] = useState(1);
    // store all lesson data inside this state
    const [lessonData, setLessonData] = useState<Record<string, string>>({});
    // Track if lessons have been saved
    const [lessonsSaved, setLessonsSaved] = useState(false);
    // error state
    const [errors, setErrors] = useState<{ [key: string]: string[]; }>({});
    // Snackbar state
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error'
    });

    const [error, setError] = useState<any>();

    const navigate = useNavigate();
    // setting the data to local redux store
    // calling redux mutation hook to save lesson
    const [saveLesson, { isLoading, isSuccess }] = useSaveLessonMutation();
    // Navigate after successful save
    useEffect(() => {
        if (lessonsSaved && (isSuccess)) {
            // Short delay to allow the success message to be seen
            const timer = setTimeout(() => {
                navigate('/teacher/create-course/add-course-material');
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [lessonsSaved, isSuccess, navigate]);


    if (lessonLoader) {
        return <Loader />;
    }

    console.log('retrieved lesson data from DB:', lessonDataFromDB?.data);

    // function to set all the lesson data
    const handleLessonInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLessonData((prevState) => ({ ...prevState, [name]: value }));
        // Clearing field-specific error when user types
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: [] }));
        }
        // Resetting lessonsSaved flag when user makes changes
        if (lessonsSaved) {
            setLessonsSaved(false);
        }
    };

    // Validation function
    const validateLessonData = () => {
        // Check if at least one lesson is filled out properly
        for (let i = 1; i <= noOfLessonForms; i++) {
            const hasNumber = !!lessonData[`number_${i}`]?.trim();
            const hasName = !!lessonData[`name_${i}`]?.trim();

            if (!hasNumber || !hasName) {
                return false;
            }
        }
        return true;
    };

    // Handle snackbar close
    const handleSnackbarClose = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    // submitting the form
    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        // Validate lesson data
        if (!validateLessonData()) {
            setSnackbar({
                open: true,
                message: 'Please fill out all lesson fields',
                severity: 'error'
            });
            return;
        }

        try {
            const lessonDataToSubmit = constructLesson(lessonData, course_id);

            await saveLesson(lessonDataToSubmit).unwrap();
            setLessonsSaved(true);
            setSnackbar({
                open: true,
                message: 'Lessons saved successfully',
                severity: 'success'
            });
        } catch (err) {
            console.log('error captured in lesson submit', err);
            // Resetting previous errors
            setError({});
            const errorMap: { [key: string]: string[]; } = {};
            const errorMsgs: string[] = [];
            const errorSources = err?.data?.errorSources;
            if (errorSources && Array.isArray(errorSources)) {
                errorSources.forEach((source: { path: string, message: string; }) => {
                    // Assign same error to all dynamic fields that start with the same base key
                    Object.keys(lessonData).forEach((key) => {
                        if (key.startsWith(source.path)) {
                            if (!errorMap[key]) errorMap[key] = [];
                            errorMap[key].push(source.message);
                        }
                    });
                    errorMsgs.push(source.message);
                });

                setErrors(errorMap);

                setSnackbar({
                    open: true,
                    message: errorMsgs.join(', '),
                    severity: 'error'
                });
            } else {
                // fallback
                setSnackbar({
                    open: true,
                    message: 'Failed to save lessons',
                    severity: 'error'
                });
            }
        }
    };

    // Handle Save & Continue
    const handleSaveAndContinue = async () => {
        // If lessons aren't created or already saved, skip saving and navigate
        if (lessonsSaved) {
            navigate(`/teacher/course-preview/${course_id}`);
            return;
        }

        // Otherwise, save lessons first
        try {
            await handleSubmit();
            // We'll navigate after the save success is confirmed
        } catch (error) {
            console.error("Error saving lessons:", error);
        }
    };

    return (
        <>
            <Box sx={{ width: '100%', height: '100%' }}>
                <Paper variant="outlined" sx={{ width: '100%', height: 'auto', borderRadius: '10px', p: 3 }}>
                    {/* back button and title */}
                    <Box component="section" sx={{ display: 'flex', gap: '20px', mb: 3 }}>
                        <Button variant='outlined' sx={{ width: '36px', height: '36px', minWidth: '36px', borderRadius: '8px', borderColor: "grey.700", color: "#3F3F46" }}
                            onClick={() => navigate(`/teacher/course-preview/${course_id}`)}>
                            <ArrowBackIcon fontSize='small' />
                        </Button>
                        <Typography variant='h3'>Edit Lesson</Typography>
                    </Box>
                    {/* loading state while saving the lessons */}
                    {isLoading && (<Loader />)}
                    {/* once isCreateLessons is true */}

                    {!isLoading && (
                        <>
                            <LessonEditForm lessonDataFromDB={lessonDataFromDB?.data} refetchLessons={refetch} />
                            <form onSubmit={handleSubmit}>
                                {Array.from(Array(noOfLessonForms)).map((item, index) => (
                                    <Grid container spacing={4} key={index}>
                                        <Grid size={3}>
                                            <CustomLabel fieldName={`Lesson Number*`} />
                                            <CustomTextField
                                                name={`number_${index + 1}`}
                                                handleInput={handleLessonInput}
                                                value={lessonData[`number_${index + 1}`] || ''}
                                                error={Array.isArray(errors[`name_${index + 1}`]) && errors[`name_${index + 1}`].length > 0}
                                                helperText={errors[`number_${index + 1}`]?.join(' ')}
                                                required
                                            />
                                        </Grid>
                                        <Grid size={8}>
                                            <CustomLabel fieldName={`Lesson Name*`} />
                                            <CustomTextField
                                                name={`name_${index + 1}`}
                                                handleInput={handleLessonInput}
                                                value={lessonData[`name_${index + 1}`] || ''}
                                                error={Array.isArray(errors[`name_${index + 1}`]) && errors[`name_${index + 1}`].length > 0}
                                                helperText={errors[`name_${index + 1}`]?.join(' ')}
                                                required
                                            />
                                        </Grid>
                                        <Grid size={1} sx={{ alignSelf: 'flex-end' }}>
                                            {/* {noOfLessonForms > 1 && ( */}
                                            <Button
                                                onClick={() => {
                                                    setNoOfLessonForms(prev => prev - 1);
                                                    // deleting the corresponding fields
                                                    const updatedData = { ...lessonData };
                                                    delete updatedData[`number_${index + 1}`];
                                                    delete updatedData[`name_${index + 1}`];
                                                    setLessonData(updatedData);
                                                    setLessonsSaved(false);
                                                }}
                                                disabled={noOfLessonForms === 1 ? true : index !== noOfLessonForms - 1 ? true : false}
                                                variant="outlined"
                                                size="small"
                                                sx={{
                                                    height: '40px', minHeight: '40px', width: '100%', borderRadius: '8px', borderColor: "grey.700", color: "#3F3F46",
                                                    '&:hover': {
                                                        backgroundColor: '#e91e63',
                                                        color: '#FFF',
                                                        border: 'none'
                                                    }
                                                }}>
                                                <DeleteOutlinedIcon />
                                            </Button>
                                            {/* )} */}
                                        </Grid>
                                    </Grid>
                                ))}

                                {/* form buttons */}
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                                    <Button
                                        onClick={handleSaveAndContinue}
                                        variant='contained'
                                        color="primary"
                                        size="small"
                                        disabled={isLoading}
                                        sx={{ borderRadius: '8px', width: 'auto', height: '40px' }}>
                                        {lessonsSaved ? 'Continue' : 'Save & Continue'} <ChevronRightIcon />
                                    </Button>

                                    <Button
                                        onClick={() => {
                                            setNoOfLessonForms((prevState) => prevState + 1);
                                            setLessonsSaved(false);
                                        }}
                                        variant='contained'
                                        size='small'
                                        sx={{ width: '167px', height: '40px', borderRadius: '8px', fontSize: '14px' }}>
                                        + Add New Lesson
                                    </Button>
                                </Box>
                            </form>
                        </>

                    )}
                </Paper>
            </Box>

            {/* Success/Error Snackbar */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default EditLesson;