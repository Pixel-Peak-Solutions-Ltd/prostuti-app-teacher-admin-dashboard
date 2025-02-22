import { Box, Button, Card, Paper, SnackbarCloseReason, Typography, styled } from "@mui/material";
import { CustomLabel, CustomTextField, Loader, resetStoredQuestions, Alert, useAppDispatch, useAppSelector, CustomAutoComplete, Link, Grid, ArrowBackIcon, QuestionType, testTime, CloudUploadIcon, Divider, LocalizationProvider, DatePicker, Dayjs, useState, useGetSingleTestQuery, useParams, useEffect, ArchiveIcon, useUpdateTestMutation } from '../Create Test';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";


const StyledDatePicker = styled(DatePicker)({
    width: '100%',
    '& .MuiInputBase-root': {
        height: '40px',
        borderRadius: '8px',
        fontSize: '0.875rem',
    }
});
const TestUpdate = () => {
    const { testId } = useParams<{ testId: string; }>();
    const [testDetails, setTestDetails] = useState<Record<string, string>>({});
    const [openSnackbar, setOpenSnackbar] = useState(false);

    // api call through redux
    const { data: existingTestData, isLoading: testDataLoader } = useGetSingleTestQuery({ testId }, { skip: !testId });
    const [updateTest, { isSuccess: testUpdateSuccess, isLoading: testUpdateLoader }] = useUpdateTestMutation();
    // for updating the record class setting the state to the existing value
    useEffect(() => {
        if (existingTestData && testId) {
            setTestDetails({
                name: existingTestData.data.name,
                type: existingTestData.data.type,
                time: existingTestData.data.time,
                publishDate: existingTestData.data.publishDate ? dayjs(existingTestData.data.publishDate).toISOString() : "",
            });
        }
    }, [existingTestData, testId]);


    if (testDataLoader) {
        return <Loader />;
    }

    console.log(existingTestData?.data);

    const handleTestSubmit = async () => {
        const updatedTestData = {
            name: testDetails.name,
            time: Number(testDetails.time),
            publishDate: testDetails.publishDate,
        };
        const testData = new FormData();
        testData.append('data', JSON.stringify(updatedTestData));

        try {
            await updateTest({ testData, testId });
        } catch (err) {
            console.log(err);
        }
        console.log(updatedTestData);
    };

    //~ handling all the inputs
    const handleTestDetailsInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTestDetails((prevState) => ({ ...prevState, [name]: value }));
    };

    //^ handling dayjs for date field
    const handleDateChange = (date: Dayjs | null) => {
        if (date) {
            setTestDetails({ ...testDetails, publishDate: date.toISOString() }); // converting date to iso string
        }
    };

    // close snackbar automatically
    const handleCloseSnackbar = (
        event: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason
    ) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <>
            <Box sx={{ width: '100%', height: 'auto' }}>
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
                            <Typography variant='h3'>Test Update</Typography>
                        </Box>
                        {/* continue button */}
                        {/* <Link to='/teacher/create-course/add-course-lessons'> */}
                        <Box sx={{ display: 'flex', gap: '20px' }}>
                            <Button
                                onClick={handleTestSubmit}
                                variant='contained'
                                sx={{ borderRadius: '8px', width: '140px', height: '48px' }}>
                                Update <CloudUploadIcon sx={{ ml: 1 }} />
                            </Button>
                            <Button
                                // onClick={handleContinue}
                                variant='outlined'
                                sx={{ borderRadius: '8px', width: '140px', height: '48px' }}>
                                Archive <ArchiveIcon sx={{ ml: 1 }} />
                            </Button>
                        </Box>

                        {/* </Link> */}
                    </Box>
                    {testUpdateLoader && <Loader />}
                    {
                        !testUpdateLoader && (
                            // form section starts here 
                            <>
                                <Paper variant='outlined' sx={{ width: '100%', height: '100%', p: 2, borderRadius: '8px', mb: 3 }}>
                                    <Box sx={{ display: "flex", flexDirection: 'column', gap: '20px' }}>
                                        <form onSubmit={handleTestSubmit}>
                                            <Grid container spacing={3}>
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
                                                    <CustomAutoComplete
                                                        disabled={true}
                                                        name="type"
                                                        options={QuestionType}
                                                        value={testDetails?.type}
                                                        handleInput={handleTestDetailsInput}
                                                    />
                                                </Grid>
                                                {/* test time */}
                                                <Grid size={3}>
                                                    <CustomLabel fieldName="Test Time (Minutes)" />
                                                    <CustomTextField
                                                        name="time"
                                                        type="number"
                                                        value={testDetails.time}
                                                        handleInput={handleTestDetailsInput}
                                                    />
                                                </Grid>
                                                {/* Test date */}
                                                <Grid size={3} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                                    <CustomLabel fieldName="Test Date" />
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <StyledDatePicker
                                                            onChange={handleDateChange}
                                                            value={testDetails?.publishDate ? dayjs(testDetails?.publishDate) : null}
                                                        />
                                                    </LocalizationProvider>
                                                </Grid>
                                            </Grid>

                                        </form>
                                    </Box>
                                    {/* </Paper> */}
                                    {/* divider after test info */}
                                    <Grid size={12} sx={{ mt: 3 }}>
                                        <Divider />
                                    </Grid>
                                    {/* view test questions */}
                                    {existingTestData?.data.questionList.map((question, index) => (
                                        <Box component="section" sx={{ mt: 3, flexGrow: 1, }} key={question._id}>
                                            <Grid container spacing={2} sx={{ mt: 3, }}>
                                                <Grid size={12}>
                                                    <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: "500" }}>Question No: {index + 1}</Typography>
                                                    <Card variant="outlined" sx={{ mt: 0.8, px: 1.5, py: 0.8, borderRadius: 2 }}>
                                                        <Typography variant="subtitle1" color="grey.500">{question.title}</Typography>
                                                    </Card>
                                                </Grid>
                                                {/* for mcq questions */}
                                                {
                                                    question?.type === 'MCQ' && (
                                                        question?.options.map((option, index) => (
                                                            <>
                                                                <Grid size={3} key={index}>
                                                                    <Card variant="outlined" sx={{ mt: 0.8, px: 1.5, py: 0.8, borderRadius: 2 }}>
                                                                        <Typography variant="subtitle1" color="grey.500">{String.fromCharCode(index + 1 + 64)}. {option}</Typography>
                                                                    </Card>
                                                                </Grid>
                                                            </>

                                                        ))
                                                    )
                                                }
                                                {/* for written questions */}
                                                {
                                                    question?.type === 'Written' && (
                                                        <Grid size={12}>
                                                            <Card variant="outlined" sx={{ mt: 0.8, px: 1.5, py: 0.8, borderRadius: 2 }}>
                                                                <Typography variant="subtitle1" color="grey.500">{question.description}</Typography>
                                                            </Card>
                                                        </Grid>
                                                    )
                                                }

                                            </Grid>
                                            {/* divider after each question */}
                                            <Grid size={12} sx={{ mt: 3 }}>
                                                <Divider />
                                            </Grid>
                                        </Box>

                                    ))}
                                </Paper>
                            </>
                        )
                    }

                </Paper>
            </Box>
            {/* showing alert for what happened after submitting the request */}
            <Alert
                openSnackbar={openSnackbar}
                autoHideDuration={5000}
                handleCloseSnackbar={handleCloseSnackbar}
                isSuccess={testUpdateSuccess}
            />
        </>
    );
};

export default TestUpdate;