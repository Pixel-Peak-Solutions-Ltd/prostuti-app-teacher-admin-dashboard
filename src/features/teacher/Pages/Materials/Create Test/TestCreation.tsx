import { Box, Button, Paper, SnackbarCloseReason, Typography, styled } from "@mui/material";
import { DatabaseQuestionViewer, CustomLabel, CustomTextField, TestQuestionForm, Loader, testQuestionFormation, questionIdArrayFormation, useCreateTestMutation, resetStoredQuestions, Alert, useAppDispatch, useAppSelector, useGetLessonsByCourseIdQuery, CustomAutoComplete, Link, Grid, ArrowBackIcon, ChevronRightIcon, QuestionType, testTime, CloudUploadIcon, Divider, AdapterDayjs, LocalizationProvider, DatePicker, Dayjs, useState } from '../Create Test';

const StyledDatePicker = styled(DatePicker)({
    width: '100%',
    '& .MuiInputBase-root': {
        height: '40px',
        borderRadius: '8px',
        fontSize: '0.875rem',
    }
});
const TestCreation = () => {
    // local states
    const [testDetails, setTestDetails] = useState<Record<string, string>>({});
    const [numOfForms, setNumOfForms] = useState(1);
    const [question, setQuestion] = useState<Record<string, string>>({});
    const [imageFile, setImageFile] = useState<Record<string, File | null>>({});
    const [openSnackbar, setOpenSnackbar] = useState(false);
    // fetching courseId from the local redux store
    const courseId = useAppSelector((state) => state.courseAndLessonId.id.course_id);
    const questionsSelectedFromDatabase = useAppSelector((state) => state.pickedQuestions.questions);
    const dispatch = useAppDispatch();
    const selectedDatabaseQuestionId = questionsSelectedFromDatabase.map((question) => question._id);
    // api calls via redux toolkit
    const { data: lessonData, isLoading: lessonLoading } = useGetLessonsByCourseIdQuery({ courseId });
    const [createTest, { isLoading: testCreationLoader, isSuccess }] = useCreateTestMutation();

    // loaders 
    if (testCreationLoader || lessonLoading) {
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

    // removing the selected file

    const handleRemoveFile = (e: React.MouseEvent, index) => {
        setImageFile((prev) => {
            const updatedFiles = { ...prev };
            delete updatedFiles[`${index}`];
            return updatedFiles;
        });
    };

    //*handle submit function
    const handleTestSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const testData = new FormData();
        const questionList = testQuestionFormation(question, testDetails?.type);
        const questionsFromDatabase = questionIdArrayFormation(selectedDatabaseQuestionId);

        const finalQuestionList = [...questionsFromDatabase, ...questionList];
        const convertedTime = Number(testDetails?.time.slice(0, 2));

        const submittableData = {
            name: testDetails?.name,
            course_id: courseId,
            lesson_id: lesson_id[0]._id,
            type: testDetails?.type,
            time: convertedTime,
            publishDate: testDetails?.publishDate,
            questionList: finalQuestionList
        };

        testData.append('data', JSON.stringify(submittableData));
        // checking whether file object not empty

        if (Object.keys(imageFile).length !== 0) {
            for (const key in imageFile) {
                // checking whether a key has null value in the object
                if (imageFile[key] !== null) {
                    testData.append(`image${key}`, imageFile[key]);
                }
            }
        }

        try {
            await createTest(testData);
            setOpenSnackbar(true);
            setTestDetails({});
            setQuestion({});
            setImageFile({});
            setNumOfForms(1);
            dispatch(resetStoredQuestions());
        } catch (err) {
            console.log(err);
            return err;
        }
    };

    //! close snackbar automatically
    const handleCloseSnackbar = (
        event: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason
    ) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    console.log('selected image object for test questions:', imageFile);

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
                        <form onSubmit={handleTestSubmit}>
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
                                            required
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
                                        <CustomAutoComplete name="type"
                                            options={QuestionType}
                                            value={testDetails?.type}
                                            handleInput={handleTestDetailsInput}
                                        />
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
                                    <>
                                        {
                                            Array.from(Array(numOfForms)).map((_, index) => (
                                                <TestQuestionForm
                                                    key={index}
                                                    question={question}
                                                    handleTestQuestionInput={handleTestQuestionInput}
                                                    index={index}
                                                    testDetails={testDetails}
                                                    setNumOfForms={setNumOfForms}
                                                    numOfForms={numOfForms}
                                                    setImageFile={setImageFile}
                                                    imageFile={imageFile}
                                                    // handleFileInput={handleFileInput}
                                                    handleRemoveFile={handleRemoveFile}
                                                />
                                            ))
                                        }
                                    </>
                                    {/* divider after question ends */}
                                    <Grid size={12}>
                                        <Divider />
                                    </Grid>
                                </Grid>
                                {/* form buttons */}
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: "20px", mt: 3, }}>
                                    <Button
                                        onClick={() => {
                                            setNumOfForms((prevState) => prevState + 1);
                                        }}
                                        variant='outlined'
                                        size='small'
                                        sx={{ width: '167px', height: '40px', borderRadius: '8px', fontSize: '14px', zIndex: 3 }}
                                    >
                                        + Add New Question
                                    </Button>
                                </Box>
                                <Grid size={12} sx={{ my: 3 }}>
                                    <Divider />
                                </Grid>
                                {/* question selected from database */}
                                <Box sx={{ mt: 2 }}>
                                    <Typography variant='h5' align="center">Questions Selected From Database</Typography>
                                    <DatabaseQuestionViewer questionArr={questionsSelectedFromDatabase} />
                                </Box>
                                {/* upload test */}
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: "20px", mt: 3 }}>
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
            {/* showing alert for what happened after submitting the request */}
            <Alert
                openSnackbar={openSnackbar}
                autoHideDuration={5000}
                handleCloseSnackbar={handleCloseSnackbar}
                isSuccess={isSuccess}
            />
        </>
    );
};

export default TestCreation;