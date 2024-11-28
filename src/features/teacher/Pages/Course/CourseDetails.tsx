import { Box, Button, Card, Paper, styled, SnackbarCloseReason } from "@mui/material";
import Grid from '@mui/material/Grid2';
import CustomLabel from "../../../../shared/components/CustomLabel";
import CustomTextField from "../../../../shared/components/CustomTextField";
import CustomAutoComplete from "../../../../shared/components/CustomAutoComplete";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { forwardRef, useImperativeHandle, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { useGetAllCategoryTypesQuery } from "../../../../redux/features/category/categoryApi";
import Loader from "../../../../shared/components/Loader";
import { saveCourseIdToStore } from "../../../../redux/features/course/courseSlice";
import { useSaveCourseMutation } from "../../../../redux/features/course/courseApi";
import Alert from "../../../../shared/components/Alert";
import { useNavigate } from "react-router-dom";
// import { CourseState } from "../../../../types/types";

type CourseDetailsProps = {
    setActiveSteps?: React.Dispatch<React.SetStateAction<number>>;
};
const CourseDetails = forwardRef<{ submitForm: () => void }, CourseDetailsProps>(({ setActiveSteps }, ref) => {
    // to hide the default input field for file upload
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
    const [openSnackbar, setOpenSnackbar] = useState(false);
    // below state stores the selected image url
    const [tempCover, setTempCover] = useState('');
    // below state handles the selected image file and ready it to upload
    const [coverImg, setCoverUmg] = useState<File | null>(null);

    const navigate = useNavigate();
    //for error handling
    const [error, setError] = useState<any>();
    // course details
    const [courseDetails, setCourseDetails] = useState({
        name: "",
        category: "",
        details: "",
        isPending: true,
        isPublished: false,
        teacher_id: "",
    });

    // fetching the teacherId from redux store
    const { userId } = useAppSelector((state) => state.auth.user);
    // fetching all the categories from an api call
    const { data: categoryTypes, isLoading } = useGetAllCategoryTypesQuery({});

    // calling the create course method from redux

    const [saveCourse, { data: courseCreated, isSuccess, isError, isLoading: creationLoader }] = useSaveCourseMutation();

    // setting the data to local redux store

    const dispatch = useAppDispatch();

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

    //^handling the cover image change
    const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setTempCover(URL.createObjectURL(file));
            // Store the file separately for the form submission
            setCoverUmg(file);
        }
    };

    //^ handling non file form data
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCourseDetails((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault();
        // creating a formData variable
        const courseData = new FormData();
        // appending cover image to the courseData object
        if (coverImg) courseData.append('coverImage', coverImg);
        // ensure the teacher ID is added to courseDetails
        const updatedCourseDetails = {
            ...courseDetails,
            teacher_id: userId,
        };
        // appending course details data to the courseDetails object
        courseData.append('courseData', JSON.stringify(updatedCourseDetails));

        // sending the course details to backend through redux toolkit
        try {
            const courseResponse = await saveCourse(courseData);
            const course_id = courseResponse?.data.data?._id;
            dispatch(saveCourseIdToStore({ course_id: course_id }));
            //navigate user to the add lesson page once all the data has been saved
            navigate('/teacher/create-course/create-lessons');
            // checking whether setActiveSteps is available
            setActiveSteps?.(prevStep => prevStep + 1);
        } catch (err) {
            console.log(err);
            setError(err);
        }
    };

    // calling the imerative handle to execute submit handler from the parent component
    useImperativeHandle(ref, () => ({
        submitForm: () => {
            handleSubmit();
        },
    }));

    if (isLoading) {
        return <Loader />;
    }

    // when calling the mutation api
    if (creationLoader) {
        return <Loader />;
    }


    console.log(isSuccess);
    // console.log('selected cover image', coverImg);
    // console.log('Teacher id:', userId);
    // console.log('All categories', categoryTypes?.data);
    // console.log('course details', courseDetails);

    // printing form data

    // for (const [key, value] of courseData.entries()) {
    //     console.log('FormData:', key, value);
    // }

    // console.log(courseData.get('courseData'));

    return (
        <>
            <Box sx={{ width: '100%', height: 'auto' }}>
                <Paper variant="outlined" sx={{ width: '100%', height: 'auto', borderRadius: '10px', p: 3 }}>
                    <form encType="multipart/form-data" onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid size={6}>
                                <CustomLabel fieldName="Course Name" />
                                <CustomTextField
                                    name="name" handleInput={handleInput}
                                    value={courseDetails.name}
                                />
                            </Grid>
                            <Grid size={6}>
                                <CustomLabel fieldName="Course Category" />
                                <CustomAutoComplete
                                    name='category'
                                    options={categoryTypes?.data || []}
                                    value={courseDetails.category}
                                    handleInput={handleInput} />
                            </Grid>
                            {/* cover image upload button */}
                            <Grid size={12}>
                                <CustomLabel fieldName="Upload Cover Image" />
                                <Card variant="outlined"
                                    sx={{ position: 'relative', height: '240px', mt: 0.8, px: 1.5, py: 0.8, borderRadius: 2 }}
                                >
                                    <Box>
                                        <img alt="cover-photo"
                                            src={tempCover || ''}
                                            style={{ width: "100%", height: "100%", objectFit: 'cover', display: tempCover === '' ? 'none' : 'block' }}
                                        />
                                        {/* new image upload button */}
                                        <Button component="label"
                                            size="small"
                                            variant="text"
                                            tabIndex={-1}
                                            startIcon={<CloudUploadIcon />}
                                            sx={{ position: 'absolute', top: "45%", left: '43%', color: "gray.700", borderRadius: "8px", cursor: "pointer", backgroundColor: tempCover ? "white" : 'transparent' }}
                                        >

                                            {tempCover ? 'Change Cover Image' : 'Click to Upload'}
                                            <VisuallyHiddenInput
                                                type="file"
                                                onChange={handleCoverChange}
                                            />
                                        </Button>
                                    </Box>
                                </Card>
                            </Grid>
                            {/* course details */}
                            <Grid size={12}>
                                <CustomLabel fieldName="Course Details" />
                                <CustomTextField
                                    name="details"
                                    multiline={true}
                                    rows={6}
                                    handleInput={handleInput}
                                    value={courseDetails.details}
                                />
                            </Grid>
                        </Grid>
                        {/* <Button type="submit">
                        Send to Redux
                    </Button> */}
                    </form>
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
});

export default CourseDetails;