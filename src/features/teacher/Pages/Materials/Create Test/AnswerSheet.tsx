import { Box, Button, Paper, Typography, styled } from "@mui/material";
import { CustomLabel, CustomTextField, useAppSelector, Link, Grid, ArrowBackIcon, Divider, LocalizationProvider, DatePicker, useParams } from '../Create Test';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import dayjs from "dayjs";


const StyledDatePicker = styled(DatePicker)({
    width: '100%',
    '& .MuiInputBase-root': {
        height: '40px',
        borderRadius: '8px',
        fontSize: '0.875rem',
    }
});
const AnswerSheet = () => {
    const { testHistoryId } = useParams();
    const testHistoryData = useAppSelector(state => state.test_id.testHistoryData.history);
    console.log(testHistoryData.answers);
    console.log(testHistoryData);

    // Function to determine styling based on whether an option is correct or incorrectly selected
    const getOptionStyle = (option, correctOption, selectedOption) => {
        if (option === correctOption) {
            // Correct answer gets green background
            return {
                borderRadius: '8px',
                backgroundColor: '#A2F3AB',
                borderColor: '#4caf50',
                color: '#1e4620'
            };
        } else if (option === selectedOption && selectedOption !== correctOption) {
            // Incorrect selected answer gets red background
            return {
                borderRadius: '8px',
                backgroundColor: '#FEC9CA',
                borderColor: '#f44336',
                color: '#7f0000'
            };
        }
        // Default style for other options
        return {};
    };
    return (
        <>
            <Box sx={{ width: '100%', height: 'auto' }}>
                <Paper variant="outlined" sx={{ width: '100%', height: 'auto', borderRadius: '10px', p: 3 }}>
                    {/* top title and button section */}
                    <Box component="section" sx={{ display: 'flex', gap: '20px', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        {/* back button and title */}
                        <Box component="section" sx={{ display: 'flex', gap: '20px' }}>
                            <Link to='/teacher/test-list'>
                                <Button variant='outlined' sx={{ width: '36px', height: '36px', minWidth: '36px', borderRadius: '8px', borderColor: "grey.700", color: "#3F3F46" }}>
                                    <ArrowBackIcon fontSize='small' />
                                </Button>
                            </Link>
                            <Typography variant='h3'>Answer Sheet</Typography>
                        </Box>
                        {/* continue button */}
                        <Box sx={{ display: 'flex', gap: '20px' }}>
                            <>
                                <Button
                                    variant='outlined'
                                    sx={{ borderRadius: '8px', width: '140px', height: '48px' }}>
                                    <ChevronLeftIcon />Previous
                                </Button>
                                <Button
                                    variant='contained'
                                    sx={{ borderRadius: '8px', width: '140px', height: '48px' }}>
                                    Next<ChevronRightIcon />
                                </Button>
                            </>
                        </Box>
                    </Box>
                    {/* answer sheet with student information */}
                    <Paper variant='outlined' sx={{ width: '100%', height: '100%', p: 2, borderRadius: '8px', mb: 3 }}>
                        <Box sx={{ display: "flex", flexDirection: 'column', gap: '20px' }}>
                            <Grid container spacing={3}>
                                {/* 2nd row --> , , total question, test date */}
                                {/* student name */}
                                <Grid size={6}>
                                    <CustomLabel fieldName="Student Name" />
                                    <CustomTextField
                                        name="name"
                                        value={testHistoryData?.student_id.name}
                                        placeholder="Enter the test name"
                                    />
                                </Grid>
                                {/* student ID */}
                                <Grid size={6}>
                                    <CustomLabel fieldName="Student ID" />
                                    <CustomTextField
                                        disabled={true}
                                        name="type"
                                        value={testHistoryData?.student_id.user_id}
                                    // handleInput={handleTestDetailsInput}
                                    />
                                </Grid>
                                {/* 2nd row --> , , total question, test date */}
                                {/* test name */}
                                <Grid size={2.4}>
                                    <CustomLabel fieldName="Test Name" />
                                    <CustomTextField
                                        name="name"
                                        // value={testDetails?.name}
                                        // handleInput={handleTestDetailsInput}
                                        placeholder="Enter the test name"
                                    />
                                </Grid>
                                {/* Test date */}
                                <Grid size={2.4} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <CustomLabel fieldName="Test Date" />
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <StyledDatePicker
                                            // onChange={handleDateChange}
                                            value={testHistoryData.test_id.publishDate ? dayjs(testHistoryData.test_id.publishDate) : null}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                {/* Submission time */}
                                <Grid size={2.4}>
                                    <CustomLabel fieldName="Submission Date" />
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <StyledDatePicker
                                            // onChange={handleDateChange}
                                            value={testHistoryData.updatedAt ? dayjs(testHistoryData.updatedAt) : null}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                {/* Test Type */}
                                <Grid size={2.4} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <CustomLabel fieldName="Test Type" />
                                    <CustomTextField
                                        disabled={true}
                                        name="testType"
                                        type="text"
                                        value={testHistoryData.test_id.type}
                                    />
                                </Grid>

                                {/* question count */}
                                <Grid size={2.4} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <CustomLabel fieldName="Total Questions" />
                                    <CustomTextField
                                        disabled={true}
                                        name="questionCount"
                                        type="text"
                                        value={testHistoryData.test_id.questionList.length}
                                    />
                                </Grid>
                                {/* 3rd row */}
                                {/* correct count */}
                                <Grid size={3} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <CustomLabel fieldName="Correct" />
                                    <CustomTextField
                                        disabled={true}
                                        name="correctAnswer"
                                        type="text"
                                        value={testHistoryData.rightScore}
                                    />
                                </Grid>
                                {/* incorrect count */}
                                <Grid size={3} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <CustomLabel fieldName="Wrong" />
                                    <CustomTextField
                                        disabled={true}
                                        name="correctAnswer"
                                        type="text"
                                        value={testHistoryData.wrongScore}
                                    />
                                </Grid>
                                {/* skip */}
                                <Grid size={3} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <CustomLabel fieldName="Total Score" />
                                    <CustomTextField
                                        disabled={true}
                                        name="totalScore"
                                        type="text"
                                        value={testHistoryData.totalScore}
                                    />
                                </Grid>
                                {/* total score */}
                                <Grid size={3} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <CustomLabel fieldName="Final Score" />
                                    <CustomTextField
                                        disabled={true}
                                        name="finalScore"
                                        type="text"
                                        value={testHistoryData.score}
                                    />
                                </Grid>
                                {/* divider after each question */}
                                <Grid size={12} sx={{ mt: 1 }}>
                                    <Divider />
                                </Grid>
                                {/* question list */}
                                {
                                    testHistoryData.answers.map((answer, questionIndex) => {
                                        return (
                                            <>
                                                <Grid size={12}>
                                                    <CustomLabel fieldName={`Question No ${questionIndex + 1}`} />
                                                    <CustomTextField
                                                        disabled={true}
                                                        name={`question${questionIndex}`}
                                                        type="text"
                                                        value={answer.question_id.title}
                                                    />
                                                </Grid>
                                                {
                                                    answer.question_id.options.map((option, optionIndex) => (
                                                        <Grid size={3} key={optionIndex}>
                                                            <CustomTextField
                                                                disabled={true}
                                                                name={`options${optionIndex}`}
                                                                type="text"
                                                                value={option}
                                                                style={getOptionStyle(
                                                                    option,
                                                                    answer.question_id.correctOption,
                                                                    answer.selectedOption
                                                                )}
                                                            />
                                                        </Grid>
                                                    ))
                                                }
                                                {/* Add divider between questions */}
                                                <Grid size={12} sx={{ mt: 2, mb: 2 }}>
                                                    <Divider />
                                                </Grid>

                                            </>);
                                    })
                                }
                            </Grid>
                        </Box>
                        {/* </Paper> */}
                        {/* view test questions */}
                    </Paper>

                </Paper>
            </Box>
        </>
    );
};

export default AnswerSheet;