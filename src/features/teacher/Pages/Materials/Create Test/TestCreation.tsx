import { Box, Button, Paper, Typography, styled } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CustomAutoComplete from "../../../../../shared/components/CustomAutoComplete";
import CustomLabel from "../../../../../shared/components/CustomLabel";
import CustomTextField from "../../../../../shared/components/CustomTextField";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from "dayjs";
import { QuestionType, testTime } from "../../../../../utils/Constants";
import { useState } from "react";
import Divider from '@mui/material/Divider';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TestQuestionForm from "./TestQuestionForm";
import Loader from "../../../../../shared/components/Loader";
import { useAppSelector } from "../../../../../redux/hooks";
import { useGetLessonsByCourseIdQuery } from "../../../../../redux/features/course/courseApi";

const StyledDatePicker = styled(DatePicker)({
    width: '100%',
    '& .MuiInputBase-root': {
        height: '40px',
        borderRadius: '8px',
        fontSize: '0.875rem',
    }
});
const TestCreation = () => {
    const [testDetails, setTestDetails] = useState<Record<string, string>>({});
    const [numOfForms, setNumOfForms] = useState(1);
    const [question, setQuestion] = useState<Record<string, string>>({});

    // fetching courseId from the local redux store
    const courseId = useAppSelector((state) => state.courseAndLessonId.id.course_id);
    // getting all the lessons of the corresponding course
    const { data: lessonData, isLoading: courseLoading } = useGetLessonsByCourseIdQuery({ courseId });

    if (courseLoading) {
        return <Loader />;
    }

    // data filtering
    const lessonNames = lessonData?.data.map((item: typeof lessonData) => item.name);
    const lesson_id = lessonData?.data.filter((item: typeof lessonData) => item.name === testDetails?.lessonName);

    //^ handling dayjs for date field
    const handleDateChange = (date: Dayjs | null) => {
        if (date) {
            setTestDetails({ ...testDetails, publishDate: date.toISOString() }); // converting date to iso string
        }
    };
    //~ handling all the inputs
    const handleTestDetailsInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTestDetails((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleTestQuestionInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setQuestion((prevState) => ({ ...prevState, [name]: value }));
    };

    console.log(testDetails);
    console.log('lesson id:', lesson_id);
    return (
        <>
            <Box sx={{ width: '100%', height: numOfForms === 1 ? '100vh' : 'auto' }}>
                <Paper variant="outlined" sx={{ width: '100%', height: 'auto', borderRadius: '10px', p: 3 }}>
                    {/* top title and button section */}
                    <Box component="section" sx={{ display: 'flex', gap: '20px', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        {/* back button and title */}
                        <Box component="section" sx={{ display: 'flex', gap: '20px' }}>
                            <Link to='/teacher/create-course/add-course-material'>
                                <Button variant='outlined' sx={{ width: '36px', height: '36px', minWidth: '36px', borderRadius: '8px', borderColor: "grey.700", color: "#3F3F46" }}>
                                    <ArrowBackIcon fontSize='small' />
                                </Button>
                            </Link>
                            <Typography variant='h3'>Test Creation</Typography>
                        </Box>
                        {/* continue button */}
                        {/* <Link to='/teacher/create-course/add-course-lessons'> */}
                        <Button
                            // onClick={handleContinue}
                            variant='contained'
                            sx={{ borderRadius: '8px', width: '140px', height: '48px' }}>
                            Continue <ChevronRightIcon />
                        </Button>
                        {/* </Link> */}
                    </Box>
                    {/* form section starts here */}
                    <Box sx={{ display: "flex", flexDirection: 'column', gap: '20px' }}>
                        <form>
                            <Paper variant='outlined' sx={{ width: '100%', height: '100%', p: 2, borderRadius: '8px', mb: 3 }}>
                                <Grid container spacing={3}>
                                    {/* first row-> lesson name */}
                                    <Grid size={12}>
                                        <CustomLabel fieldName="Lesson Name" />
                                        <CustomAutoComplete
                                            name='lessonName'
                                            options={lessonNames}
                                            value={testDetails?.lessonName}
                                            handleInput={handleTestDetailsInput}
                                        />
                                    </Grid>
                                    {/* 2nd row --> , , total question, test date */}
                                    {/* test name */}
                                    <Grid size={3}>
                                        <CustomLabel fieldName="Test Name" />
                                        <CustomTextField
                                            name="name"
                                            value={testDetails?.name}
                                            handleInput={handleTestDetailsInput}
                                            placeholder="Enter the test name"
                                        />
                                    </Grid>
                                    {/* test type */}
                                    <Grid size={3}>
                                        <CustomLabel fieldName="Test Type" />
                                        <CustomAutoComplete name="type" options={QuestionType} value={testDetails?.type} handleInput={handleTestDetailsInput} />
                                    </Grid>
                                    {/* test time */}
                                    <Grid size={3}>
                                        <CustomLabel fieldName="Test Time" />
                                        <CustomAutoComplete
                                            name="time"
                                            options={testTime}
                                            value={testDetails?.time}
                                            handleInput={handleTestDetailsInput} />
                                    </Grid>
                                    {/* Test date */}
                                    <Grid size={3} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                        <CustomLabel fieldName="Test Date" />
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <StyledDatePicker onChange={handleDateChange} />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid size={12}>
                                        <Divider />
                                    </Grid>

                                    {/* questions forms */}
                                    {/* dynamic form of to add question for the test */}
                                    {
                                        Array.from(Array(numOfForms)).map((_, index) => (
                                            <TestQuestionForm
                                                key={index}
                                                setQuestion={setQuestion}
                                                question={question}
                                                handleTestQuestionInput={handleTestQuestionInput}
                                                index={index}
                                                testDetails={testDetails}
                                                setNumOfForms={setNumOfForms}
                                                numOfForms={numOfForms}
                                            />
                                        ))
                                    }

                                </Grid>
                                {/* form buttons */}
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: "20px", mt: 3 }}>
                                    <Button
                                        onClick={() => {
                                            setNumOfForms((prevState) => prevState + 1);
                                        }}
                                        variant='outlined'
                                        size='small'
                                        sx={{ width: '167px', height: '40px', borderRadius: '8px', fontSize: '14px' }}>
                                        + Add New Question
                                    </Button>
                                    <Button
                                        variant='contained'
                                        size='small'
                                        type="submit"
                                        sx={{ width: '167px', height: '40px', borderRadius: '8px', fontSize: '14px' }}
                                        startIcon={<CloudUploadIcon />}
                                    >
                                        Upload Test
                                    </Button>
                                </Box>
                            </Paper>
                        </form>
                    </Box>
                </Paper>
            </Box>
        </>
    );
};

export default TestCreation;