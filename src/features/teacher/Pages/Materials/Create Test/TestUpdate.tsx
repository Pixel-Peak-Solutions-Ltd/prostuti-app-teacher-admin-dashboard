import { Box, Button, Card, Paper, SnackbarCloseReason, Typography, styled } from "@mui/material";
import { CustomLabel, CustomTextField, Loader, resetStoredQuestions, Alert, useAppDispatch, useAppSelector, CustomAutoComplete, Link, Grid, ArrowBackIcon, QuestionType, testTime, CloudUploadIcon, Divider, LocalizationProvider, DatePicker, Dayjs, useState, useGetSingleTestQuery, useParams, useEffect, ArchiveIcon, useUpdateTestMutation } from '../Create Test';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import EditRequestButton from "../../../../../shared/components/EditRequestButton";
import { TUser } from "../../../../../types/types";
import { RootState } from "../../../../../redux/store";
import { usePreviousPath } from "../../../../../lib/Providers/NavigationProvider";
import { useNavigate } from "react-router-dom";

const StyledDatePicker = styled(DatePicker)({
    width: '100%',
    '& .MuiInputBase-root': {
        height: '40px',
        borderRadius: '8px',
        fontSize: '0.875rem',
    }
});
const TestUpdate = () => {
    const { previousPath } = usePreviousPath();
    const navigate = useNavigate();
    const user = useAppSelector((state: RootState) => state.auth.user as TUser);
    const isAdmin = user.role === 'admin' ? true : false;
    const { testId } = useParams<{ testId: string; }>();
    const [testDetails, setTestDetails] = useState<Record<string, string>>({});
    const [openSnackbar, setOpenSnackbar] = useState(false);

    // fetching courseId from the local redux store
    const courseId = useAppSelector((state) => state.courseAndLessonId.id.course_id);

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


    const totalQuestion = existingTestData?.data.questionList.length;
    // extracting date to check whether test deadline is over or not
    const currentTime = new Date(Date.now());
    const publishedDate = new Date(existingTestData?.data.publishDate);
    const isExpired = ((currentTime.getTime() > publishedDate.getTime()));

    return (
        <>
            <Box sx={{ width: '100%', height: 'auto' }}>
                <Paper variant="outlined" sx={{ width: '100%', height: 'auto', borderRadius: '10px', p: 3 }}>
                    {/* top title and button section */}
                    <Box component="section" sx={{ display: 'flex', gap: '20px', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        {/* back button and title */}
                        <Box component="section" sx={{ display: 'flex', gap: '20px' }}>
                            {/* <Link to='/teacher/test-list'> */}
                            <Button variant='outlined' sx={{ width: '36px', height: '36px', minWidth: '36px', borderRadius: '8px', borderColor: "grey.700", color: "#3F3F46" }}
                                onClick={() => navigate(previousPath || "/")}
                            >
                                <ArrowBackIcon fontSize='small' />
                            </Button>
                            {/* </Link> */}
                            <Typography variant='h3'>Test Update</Typography>
                        </Box>
                        {/* action button */}
                        <Box sx={{ display: 'flex', gap: '20px' }}>
                            {user.role === 'admin' && <EditRequestButton resourceType="Test" />}
                            {user.role !== 'admin' && (
                                isExpired ? (
                                    <>
                                        <Link to="/teacher/test-history">
                                            <Button
                                                variant='contained'
                                                sx={{ borderRadius: '8px', width: 'auto', height: '48px' }}>
                                                View Result
                                            </Button>
                                        </Link>
                                    </>
                                ) : (
                                    <>
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
                                    </>
                                )
                            )}

                        </Box>
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
                                                <Grid size={2.4}>
                                                    <CustomLabel fieldName="Test Name" />
                                                    <CustomTextField
                                                        disabled={isAdmin}
                                                        name="name"
                                                        value={testDetails?.name}
                                                        handleInput={handleTestDetailsInput}
                                                        placeholder="Enter the test name"
                                                    />
                                                </Grid>
                                                {/* test type */}
                                                <Grid size={2.4}>
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
                                                <Grid size={2.4}>
                                                    <CustomLabel fieldName="Test Time (Minutes)" />
                                                    <CustomTextField
                                                        disabled={isAdmin}
                                                        name="time"
                                                        type="number"
                                                        value={testDetails.time}
                                                        handleInput={handleTestDetailsInput}
                                                    />
                                                </Grid>
                                                {/* Test date */}
                                                <Grid size={2.4} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                                    <CustomLabel fieldName="Test Date" />
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <StyledDatePicker
                                                            onChange={handleDateChange}
                                                            value={testDetails?.publishDate ? dayjs(testDetails?.publishDate) : null}
                                                            disabled={isAdmin}
                                                        />
                                                    </LocalizationProvider>
                                                </Grid>
                                                {/* question count */}
                                                <Grid size={2.4} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                                    <CustomLabel fieldName="Total Questions" />
                                                    <CustomTextField
                                                        disabled={true}
                                                        name="questionCount"
                                                        type="text"
                                                        value={totalQuestion}
                                                        handleInput={handleTestDetailsInput}
                                                    />
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