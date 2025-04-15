import { Box, Button, Typography, Paper, Snackbar, Alert } from "@mui/material";
import emptybox from '../../../../assets/images/empty_box.png';
import Grid from '@mui/material/Grid2';
import { useState, useEffect } from "react";
import CustomLabel from "../../../../shared/components/CustomLabel";
import CustomTextField from "../../../../shared/components/CustomTextField";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useNavigate, useOutletContext } from "react-router-dom";
import { OutletContextType } from "./CreateCourse";
import { constructLesson } from "../../../../utils/lessonDataFormation";
import { useAppSelector } from "../../../../redux/hooks";
import { useSaveLessonMutation } from "../../../../redux/features/course/courseApi";
import Loader from "../../../../shared/components/Loader";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const CreateLessons = () => {
    // destructuring the props
    const { setActiveSteps, setShowContinueButton } = useOutletContext<OutletContextType>();
    // to conditionally render lesson form
    const [isCreateLessons, setIsCreateLessons] = useState<boolean>(false);
    // to create dynamic form this state helps to determine number of input fields
    const [noOfLessonForms, setNoOfLessonForms] = useState(1);
    // store all lesson data inside this state
    const [lessonData, setLessonData] = useState<Record<string, string>>({});
    // Track if lessons have been saved
    const [lessonsSaved, setLessonsSaved] = useState(false);
    // Snackbar state
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error'
    });

    const [error, setError] = useState<any>();

    const navigate = useNavigate();
    // setting the data to local redux store
    const course_id = useAppSelector(state => state.courseAndLessonId.id.course_id);

    // Hide parent continue button when this component is mounted
    useEffect(() => {
        setActiveSteps(1);
        setShowContinueButton(false);

        // Show the button again when unmounting
        return () => {
            setShowContinueButton(true);
        };
    }, [setActiveSteps, setShowContinueButton]);

    // calling redux mutation hook to save lesson
    const [saveLesson, { isLoading, isSuccess }] = useSaveLessonMutation();

    // function to set all the lesson data
    const handleLessonInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLessonData((prevState) => ({ ...prevState, [name]: value }));
        // Reset lessonsSaved flag when user makes changes
        if (lessonsSaved) {
            setLessonsSaved(false);
        }
    };

    // Validation function
    const validateLessonData = () => {
        // If no lessons created, we can proceed
        if (!isCreateLessons) {
            return true;
        }

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

        // If no lessons created yet, just move to next step
        if (!isCreateLessons) {
            setLessonsSaved(true);
            return;
        }

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
            setError(err);
            setSnackbar({
                open: true,
                message: 'Failed to save lessons',
                severity: 'error'
            });
            console.log('error captured in lesson submit', err);
        }
    };

    // Handle Save & Continue
    const handleSaveAndContinue = async () => {
        // If lessons aren't created or already saved, skip saving and navigate
        if (!isCreateLessons || lessonsSaved) {
            setActiveSteps(2);
            navigate('/teacher/create-course/add-course-material');
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

    // Navigate after successful save
    useEffect(() => {
        if (lessonsSaved && (isSuccess || !isCreateLessons)) {
            // Short delay to allow the success message to be seen
            const timer = setTimeout(() => {
                setActiveSteps(2);
                navigate('/teacher/create-course/add-course-material');
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [lessonsSaved, isSuccess, navigate, setActiveSteps, isCreateLessons]);

    return (
        <>
            <Box sx={{ width: '100%', height: '100%' }}>
                <Paper variant="outlined" sx={{ width: '100%', height: 'auto', borderRadius: '10px', p: 3 }}>
                    {/* loading state while saving the lessons */}
                    {isLoading && (<Loader />)}

                    {!isCreateLessons && (
                        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 3, alignItems: 'center', py: 1, borderRadius: 4 }}>
                            <img src={emptybox} style={{ width: '293px', height: '293px' }} />
                            <Typography variant="h6">You don't have any Lesson</Typography>
                            <Button
                                onClick={() => { setIsCreateLessons(true); }}
                                variant='contained'
                                sx={{ width: '522px', height: '44px', borderRadius: '8px', fontSize: '16px' }}>
                                + Add New Lesson
                            </Button>
                        </Box>
                    )}

                    {/* once isCreateLessons is true */}
                    {isCreateLessons && (
                        <>
                            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 3, alignItems: 'center', py: 1, borderRadius: 4, mb: 2 }}>
                                <Typography variant="h6">{`Lesson number must be in the format "Lesson 1", "Lesson 2", etc.`}</Typography>
                            </Box>
                            <form onSubmit={handleSubmit}>
                                {Array.from(Array(noOfLessonForms)).map((item, index) => (
                                    <Grid container spacing={4} key={index}>
                                        <Grid size={3}>
                                            <CustomLabel fieldName={`Lesson Number`} />
                                            <CustomTextField
                                                name={`number_${index + 1}`}
                                                handleInput={handleLessonInput}
                                                value={lessonData[`number_${index + 1}`] || ''}
                                                required
                                            />
                                        </Grid>
                                        <Grid size={8}>
                                            <CustomLabel fieldName={`Lesson Name`} />
                                            <CustomTextField
                                                name={`name_${index + 1}`}
                                                handleInput={handleLessonInput}
                                                value={lessonData[`name_${index + 1}`] || ''}
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
                                        sx={{ borderRadius: '8px', width: 'auto', height: '44px' }}>
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

export default CreateLessons;