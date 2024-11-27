import { Box, Button, Paper, styled, Typography } from "@mui/material";
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
import { createValidUrlArray } from "../../../../utils/recordLinkArray";
import { useGetLessonsByCourseIdQuery } from "../../../../redux/features/course/courseApi";
import { useAppSelector } from "../../../../redux/hooks";
import Loader from "../../../../shared/components/Loader";


const StyledDatePicker = styled(DatePicker)({
    width: '100%',
    '& .MuiInputBase-root': {
        height: '40px',
        borderRadius: '8px',
        fontSize: '0.875rem',
    }
});
const RecordClass = () => {
    const [recordDetails, setRecordDetails] = useState<Record<string, string>>({});
    const [submittableDetails, setSubmittableDetails] = useState<Record<string, string | string[]>>({});


    // fetching courseId from the local redux store
    const courseId = useAppSelector((state) => state.courseAndLessonId.id.course_id);
    // getting all the lessons of the corresponding course
    const { data: lessonData, isLoading: courseLoading } = useGetLessonsByCourseIdQuery({ courseId });


    if (courseLoading) {
        return (<Loader />);
    }

    console.log(lessonData);
    const lessonNames = lessonData?.data.map((item: typeof lessonData) => item.name);
    const lessonNumbers = lessonData?.data.map((item: typeof lessonData) => item.number);
    const lesson_id = lessonData?.data.filter((item: typeof lessonData) => item.name === recordDetails?.lessonName);

    const handleRecordDetailsInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRecordDetails((prevState) => ({ ...prevState, [name]: value }));
    };


    // //^ handling dayjs for date field
    const handleDateChange = (date: Dayjs | null) => {
        if (date) {
            setRecordDetails({ ...recordDetails, classDate: date.format("YYYY-MM-DD") }); // Adjust the format as needed
        }
    };

    // handling a onPaste event

    const handleOnPaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        setRecordDetails((prevState) => ({ ...prevState, classVideoURL: prevState?.classVideoURL ? prevState?.classVideoURL + ` ${e.clipboardData.getData('text')}` : `${e.clipboardData.getData('text')}` }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const urlArray = createValidUrlArray(recordDetails?.classVideoURL as string);
        setSubmittableDetails({ ...recordDetails, classVideoURL: [...urlArray] });
    };

    console.log(recordDetails);
    console.log('Submittable details', submittableDetails);
    console.log('Selected Lesson object', lesson_id);
    return (
        <Box sx={{ width: '100%', height: 'auto' }}>
            <Paper variant="outlined" sx={{ width: '100%', height: 'auto', borderRadius: '10px', p: 3 }}>
                {/* top title and button section */}
                <Box component="section" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    {/* back button and title */}
                    <Box component="section" sx={{ display: 'flex', gap: '20px' }}>
                        <Link to={location.pathname === "/teacher/create-course" ? '/teacher/my-course' : "/teacher/create-course"}>
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
                <Box sx={{ display: "flex", flexDirection: 'column', gap: '20px', position: 'relative' }}>
                    <form onSubmit={handleSubmit}>
                        <Paper variant='outlined' sx={{ width: '100%', height: '100%', p: 2, borderRadius: '8px', mb: 3 }}>
                            <Grid container spacing={3} >
                                {/* 1st row */}
                                <Grid size={8}>
                                    <CustomLabel fieldName="Lesson Name" />
                                    <CustomAutoComplete
                                        name='lessonName' options={lessonNames || []}
                                        handleInput={handleRecordDetailsInput}
                                        value={recordDetails?.lessonName}
                                        required
                                    />
                                </Grid>
                                <Grid size={4}>
                                    <CustomLabel fieldName="Lesson Number" />
                                    <CustomAutoComplete
                                        name='number' options={lessonNumbers || []}
                                        handleInput={handleRecordDetailsInput}
                                        value={recordDetails?.number}
                                    // required
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
                                {/* 4th row */}
                                {/* dynamic field */}
                                <Grid size={12}>
                                    <CustomLabel fieldName="Upload Video Class" />
                                    <CustomTextField
                                        name='classVideoURL' placeholder="Enter Video Link Here"
                                        handleInput={handleRecordDetailsInput}
                                        value={recordDetails?.classVideoURL}
                                        handlePaste={handleOnPaste}
                                        multiline={true} rows={4}
                                    />
                                </Grid>
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
                {/* form section starts here */}
            </Paper >
        </Box >
    );
};

export default RecordClass;