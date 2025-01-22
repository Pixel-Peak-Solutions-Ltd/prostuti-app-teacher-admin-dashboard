import { Box, Button, Paper, SnackbarCloseReason, styled, Typography, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Grid from '@mui/material/Grid2';
import CustomAutoComplete from "../../../../shared/components/CustomAutoComplete";
import CustomLabel from "../../../../shared/components/CustomLabel";
import CustomTextField from "../../../../shared/components/CustomTextField";
import { useState } from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from "dayjs";
import { useGetLessonsByCourseIdQuery } from "../../../../redux/features/course/courseApi";
import { useAppSelector } from "../../../../redux/hooks";
import Loader from "../../../../shared/components/Loader";
import Alert from "../../../../shared/components/Alert";
import { useCreateRecordClassMutation } from "../../../../redux/features/materials/materialsApi";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import LinearWithValueLabel from "../../../../shared/components/ProgessBar";
import MP4 from '../../../../assets/images/MP4-icon.png';

const StyledDatePicker = styled(DatePicker)({
    width: '100%',
    '& .MuiInputBase-root': {
        height: '40px',
        borderRadius: '8px',
        fontSize: '0.875rem',
    }
});
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});
const RecordClass = () => {
    // local states
    const [recordDetails, setRecordDetails] = useState<Record<string, string>>({});
    const [openSnackbar, setOpenSnackbar] = useState(false);
    // below state handles the selected image file and ready it to upload
    const [file, setFile] = useState<File | null>(null);
    const [fileError, setFileError] = useState<string | null>(null);
    // temporary file array to render it on the UI
    const [tempFileArr, setTempFileArr] = useState<File[]>([]);

    // fetching courseId from the local redux store
    const courseId = useAppSelector((state) => state.courseAndLessonId.id.course_id);
    // getting all the lessons of the corresponding course
    const { data: lessonData, isLoading: courseLoading } = useGetLessonsByCourseIdQuery({ courseId });
    // making api call to save the record class
    const [createRecordClass, { isSuccess, isLoading: recordClassCreationLoader }] = useCreateRecordClassMutation();

    if (courseLoading) {
        return (<Loader />);
    }

    const lessonNames = lessonData?.data.map((item: typeof lessonData) => item.name);
    const lesson_id = lessonData?.data.filter((item: typeof lessonData) => item.name === recordDetails?.lessonName);

    //~deleting a file from the local state
    const handleDeleteFile = (passedIndex: number) => {
        const copiedArray = [...tempFileArr];
        const remainingFiles = copiedArray.filter((file, index) => index !== passedIndex);
        setTempFileArr([...remainingFiles]);
        setFile(null);
    };

    //^handling file change
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            // first checking whether the file is a PDF
            if (e.target.files[0].type !== 'video/mp4') {
                setFileError('Only MP4 Video Files Are Allowed');
                return;
            }
            // Store the file separately for the form submission
            setFile(e.target.files[0]);
            // handling the file array
            // step 1: convert fileList to an array
            const newFiles = Array.from(e.target.files);
            // Filter out duplicate files based on name and size
            const uniqueNewFiles = newFiles.filter(newFile =>
                // keep the file if NO existing files match these conditions
                !tempFileArr.some(existingFile =>
                    existingFile.name === newFile.name && existingFile.size === newFile.size
                )
            );
            setTempFileArr(prevFiles => [...prevFiles, ...uniqueNewFiles]);
        }
    };

    //* handling all the inputs
    const handleRecordDetailsInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRecordDetails((prevState) => ({ ...prevState, [name]: value }));
    };

    //^ handling dayjs for date field
    const handleDateChange = (date: Dayjs | null) => {
        if (date) {
            setRecordDetails({ ...recordDetails, classDate: date.toISOString() }); // converting date to iso string
        }
    };

    //^ handling the submit event
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // taking out the unwanted fields from the details object : ESNext syntax
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const refinedDetails = (({ lessonName, ...rest }) => rest)(recordDetails);
        // constructing the final object
        const submissionJSONData = {
            ...refinedDetails,
            // classVideoURL: [...urlArray],
            lesson_id: lesson_id[0]._id,
            course_id: courseId
        };

        // creating recordClass form data
        const recordClassData = new FormData();
        // appending json data
        recordClassData.append('data', JSON.stringify(submissionJSONData));

        if (!file) {
            return setFileError('Must provide a video file');
        } else {
            recordClassData.append('file', file);
        }

        try {
            await createRecordClass(recordClassData);
            setOpenSnackbar(true);
            setRecordDetails({});
            setFile(null);
            setTempFileArr([]);
        } catch (error) {
            console.log(error);
            setOpenSnackbar(true);
        }

    };

    //~ handling the custom snackbar to help user know whether request is successful
    //~ close snackbar automatically
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
                    <Box component="section" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        {/* back button and title */}
                        <Box component="section" sx={{ display: 'flex', gap: '20px' }}>
                            <Link to='/teacher/create-course/add-course-material'>
                                <Button variant='outlined' sx={{ width: '36px', height: '36px', minWidth: '36px', borderRadius: '8px', borderColor: "grey.700", color: "#3F3F46" }}>
                                    <ArrowBackIcon fontSize='small' />
                                </Button>
                            </Link>
                            <Typography variant='h3'>Record Class Creation</Typography>
                        </Box>
                        {/* continue button */}
                        {/* <Link to='/teacher/create-course/create-lessons'> */}
                        <Button
                            // onClick={handleContinue}
                            variant='contained'
                            sx={{ borderRadius: '8px', width: '140px', height: '48px' }}>
                            Continue <ChevronRightIcon />
                        </Button>
                        {/* </Link> */}
                    </Box>
                    {/* form section starts here */}
                    {
                        recordClassCreationLoader && (
                            <Loader />
                        )
                    }
                    {
                        !recordClassCreationLoader && (
                            <Box sx={{ display: "flex", flexDirection: 'column', gap: '20px' }}>
                                <form onSubmit={handleSubmit}>
                                    <Paper variant='outlined' sx={{ width: '100%', height: '100%', p: 2, borderRadius: '8px', mb: 3 }}>
                                        <Grid container spacing={3} >
                                            {/* 1st row */}
                                            <Grid size={12}>
                                                <CustomLabel fieldName="Lesson Name" />
                                                <CustomAutoComplete
                                                    name='lessonName' options={lessonNames || []}
                                                    handleInput={handleRecordDetailsInput}
                                                    value={recordDetails?.lessonName}
                                                    required
                                                />
                                            </Grid>
                                            {/* 2nd row */}
                                            <Grid size={8}>
                                                <CustomLabel fieldName="Record Class Name" />
                                                <CustomTextField
                                                    name='recodeClassName'
                                                    handleInput={handleRecordDetailsInput}
                                                    value={recordDetails?.recodeClassName}
                                                    placeholder="Enter Record Class Name"
                                                    required
                                                />
                                            </Grid>
                                            {/* date picker */}
                                            <Grid size={4} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                                <CustomLabel fieldName="Record Class Date" />
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    {/* <DatePicker sx={{ width: '100%', height: '40px', borderRadius: "10px" }} /> */}
                                                    <StyledDatePicker onChange={handleDateChange} />
                                                </LocalizationProvider>
                                            </Grid>
                                            {/* 3rd row */}
                                            <Grid size={12}>
                                                <CustomLabel fieldName="Class Details" />
                                                <CustomTextField
                                                    name='classDetails' multiline={true} rows={6}
                                                    placeholder="Enter Class Details"
                                                    handleInput={handleRecordDetailsInput}
                                                    value={recordDetails?.classDetails}
                                                />
                                            </Grid>
                                            {/* 3rd row */}
                                            {/* Resource file upload field */}
                                            <Grid size={12}>
                                                {
                                                    tempFileArr.length !== 0 && (
                                                        <Box>
                                                            {
                                                                tempFileArr.map((file, index) => (
                                                                    <>
                                                                        <Paper variant='outlined'
                                                                            sx={{
                                                                                display: 'flex',
                                                                                flexDirection: 'column',
                                                                                justifyContent: 'center',
                                                                                mb: 1,
                                                                                alignItems: 'center',
                                                                                p: 1,
                                                                                borderRadius: '8px',
                                                                                gap: 1
                                                                            }}>
                                                                            <Box
                                                                                sx={{
                                                                                    width: '100%',
                                                                                    display: 'flex',
                                                                                    justifyContent: 'space-between', alignItems: 'center'
                                                                                }}
                                                                            >
                                                                                <Box
                                                                                    sx={{
                                                                                        display: 'flex',
                                                                                        alignItems: 'center',
                                                                                        gap: 1
                                                                                    }}
                                                                                >
                                                                                    <img src={MP4}
                                                                                        style={{
                                                                                            width: '40px',
                                                                                            height: '40px'
                                                                                        }}
                                                                                    />
                                                                                    <Typography
                                                                                        key={index}
                                                                                        color='grey.700'
                                                                                    >
                                                                                        {file.name}
                                                                                    </Typography>
                                                                                </Box>

                                                                                <IconButton
                                                                                    onClick={() => handleDeleteFile(index)}
                                                                                >
                                                                                    <DeleteForeverIcon />
                                                                                </IconButton>
                                                                            </Box>

                                                                            {/* progression bar */}
                                                                            <Box sx={{ width: '90%' }}>
                                                                                <LinearWithValueLabel />
                                                                            </Box>
                                                                        </Paper>

                                                                    </>
                                                                ))
                                                            }
                                                        </Box>
                                                    )
                                                }
                                                {/* </Card> */}
                                                <Grid
                                                    size={12}
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        mt: 1,
                                                        visibility: tempFileArr.length > 0 ? 'hidden' : 'visible'
                                                    }}
                                                >
                                                    <Box>
                                                        {/* new image upload button */}
                                                        <Button component="label"
                                                            size="small"
                                                            variant="text"
                                                            tabIndex={-1}
                                                            startIcon={<CloudUploadIcon />}
                                                            sx={{
                                                                color: "gray.700", borderRadius: "8px", cursor: "pointer",
                                                                // backgroundColor: tempCover ? "white" : 'transparent'
                                                            }}
                                                        >
                                                            {/* {tempCover ? 'Change Cover Image' : 'Click to Upload'} */}
                                                            Upload File
                                                            <VisuallyHiddenInput
                                                                type="file"
                                                                multiple
                                                                onChange={handleFileChange}
                                                                onClick={() => setFileError(null)}
                                                            />
                                                        </Button>
                                                    </Box>
                                                </Grid>
                                            </Grid>

                                            {/* error message for incorrect file format */}
                                            {

                                                fileError && (
                                                    <Grid size={12}>
                                                        <Typography color="error" align='center' variant="body2">
                                                            {fileError}
                                                        </Typography>
                                                    </Grid>
                                                )

                                            }
                                        </Grid>
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: "20px", mt: 3 }}>
                                            <Button
                                                type='submit'
                                                variant='contained'
                                                size='small'
                                                startIcon={<CloudUploadIcon />}
                                                sx={{ width: '170px', height: '40px', borderRadius: '8px', fontSize: '14px' }}>
                                                Upload Class
                                            </Button>
                                        </Box>
                                    </Paper>
                                </form>
                            </Box>
                        )
                    }

                    {/* form section ends here */}
                </Paper >
            </Box >
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

export default RecordClass;