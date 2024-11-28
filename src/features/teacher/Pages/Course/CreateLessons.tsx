import { Box, Button, Typography, Paper } from "@mui/material";
import emptybox from '../../../../assets/images/empty_box.png';
import Grid from '@mui/material/Grid2';
import { useImperativeHandle, useState } from "react";
import CustomLabel from "../../../../shared/components/CustomLabel";
import CustomTextField from "../../../../shared/components/CustomTextField";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useNavigate, useOutletContext } from "react-router-dom";
import { OutletContextType } from "./CreateCourse";
import { constructLesson } from "../../../../utils/lessonDataFormation";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { saveCourseIdToStore } from "../../../../redux/features/course/courseSlice";
import { useSaveLessonMutation } from "../../../../redux/features/course/courseApi";
import Loader from "../../../../shared/components/Loader";

const CreateLessons = () => {

    // destructuring the props
    const { setActiveSteps, formRef } = useOutletContext<OutletContextType>();
    // to conditionally render lesson form
    const [isCreateLessons, setIsCreateLessons] = useState<boolean>(false);
    // to create dynamic form this state helps to determine number of input fields
    const [noOfLessonForms, setNoOfLessonForms] = useState(1);
    // store all lesson data inside this state
    const [lessonData, setLessonData] = useState<Record<string, string>>({});

    const [error, setError] = useState<any>();

    const navigate = useNavigate();
    // setting the data to local redux store
    const course_id = useAppSelector(state => state.courseAndLessonId.id.course_id);

    // calling redux mutation hook to save lesson

    const [saveLesson, { isLoading, isSuccess }] = useSaveLessonMutation();

    // function to set all the lesson data
    const handleLessonInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLessonData((prevState) => ({ ...prevState, [name]: value }));
    };


    // submitting the form
    const handleSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault();
        const lessonDataToSubmit = constructLesson(lessonData, course_id);
        try {
            await saveLesson(lessonDataToSubmit);
            navigate('/teacher/create-course/add-course-material');
        } catch (err) {
            setError(err);
            console.log(err);
        }
    };

    // triggering the submit button through parent's continue button
    useImperativeHandle(formRef, () => ({
        submitForm: () => {
            handleSubmit();
        },
    }));

    return (
        <>
            <Box sx={{ width: '100%', height: '100%' }}>
                <Paper variant="outlined" sx={{ width: '100%', height: 'auto', borderRadius: '10px', p: 3 }}>
                    {/* show empty box when create lession is not pressed yet */}
                    {
                        isSuccess && (
                            <>
                                <h1>Lesson Successfully Saved to Database</h1>
                            </>
                        )
                    }
                    {/* loading state while saving the lessons */}
                    {
                        isLoading && (<Loader />)
                    }
                    {!isCreateLessons && (
                        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 3, alignItems: 'center', py: 1, borderRadius: 4 }}>
                            <img src={emptybox} style={{ width: '293px', height: '293px' }} />
                            <Typography variant="h6">You haven't created any lessons yet!</Typography>
                            <Button
                                onClick={() => setIsCreateLessons(true)}
                                variant='contained'
                                sx={{ width: '522px', height: '44px', borderRadius: '8px', fontSize: '16px' }}>
                                + Create Lessons
                            </Button>
                        </Box>
                    )}
                    {/* once isCreateLessons is true */}
                    {
                        isCreateLessons && (
                            <form onSubmit={handleSubmit}>
                                {Array.from(Array(noOfLessonForms)).map((item, index) => (
                                    <Grid container spacing={4}>
                                        <Grid size={3}>
                                            <CustomLabel fieldName={`Lesson Number`} />
                                            <CustomTextField name={`number_${index + 1}`} handleInput={handleLessonInput} value={lessonData[`number_${index + 1}`]} />
                                        </Grid>
                                        <Grid size={8}>
                                            <CustomLabel fieldName={`Lesson Name`} />
                                            <CustomTextField name={`name_${index + 1}`} handleInput={handleLessonInput}
                                                value={lessonData[`name_${index + 1}`]} />
                                        </Grid>
                                        <Grid size={1} sx={{ alignSelf: 'flex-end' }}>
                                            <Button
                                                onClick={() => {
                                                    setNoOfLessonForms(prev => prev - 1);
                                                    // deleting the corresponding fields
                                                    delete lessonData[`number_${index + 1}`];
                                                    delete lessonData[`name_${index + 1}`];
                                                }}
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
                                        </Grid>
                                    </Grid>
                                ))}
                                {/* form buttons */}
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: "20px", mt: 3 }}>
                                    <Button
                                        onClick={() => {
                                            setNoOfLessonForms((prevState) => prevState + 1);
                                        }}
                                        variant='contained'
                                        size='small'
                                        sx={{ width: '167px', height: '40px', borderRadius: '8px', fontSize: '14px' }}>
                                        + Add New Lesson
                                    </Button>
                                </Box>
                            </form>
                        )
                    }
                </Paper>
            </Box>
        </>

    );
};

export default CreateLessons;