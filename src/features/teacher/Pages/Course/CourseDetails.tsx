import { Box, Button, Card, Paper, styled, SnackbarCloseReason } from "@mui/material";
import Grid from '@mui/material/Grid2';
import CustomLabel from "../../../../shared/components/CustomLabel";
import CustomTextField from "../../../../shared/components/CustomTextField";
import CustomAutoComplete from "../../../../shared/components/CustomAutoComplete";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { forwardRef, useImperativeHandle, useState } from "react";
import { useAppDispatch } from "../../../../redux/hooks";
import { useGetAllCategoryTypesQuery } from "../../../../redux/features/category/categoryApi";
import Loader from "../../../../shared/components/Loader";
import { saveCourseIdToStore } from "../../../../redux/features/course/courseSlice";
import { useGetCategoryForCourseQuery, useSaveCourseMutation } from "../../../../redux/features/course/courseApi";
import Alert from "../../../../shared/components/Alert";
import { useNavigate } from "react-router-dom";
import { getUniqueStrings } from "../../../../utils/typeSafeUniqueArrays";
// import { CourseState } from "../../../../types/types";

type CourseDetailsProps = {
    setActiveSteps?: React.Dispatch<React.SetStateAction<number>>;
};
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
const CourseDetails = forwardRef<{ submitForm: () => void; }, CourseDetailsProps>(({ setActiveSteps }, ref) => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    // below state stores the selected image url
    const [tempCover, setTempCover] = useState('');
    // below state handles the selected image file and ready it to upload
    const [coverImg, setCoverUmg] = useState<File | null>(null);
    // react router hook
    const navigate = useNavigate();
    //for error handling
    // const [error, setError] = useState<any>();
    // course details
    const [courseDetails, setCourseDetails] = useState({
        name: "",
        details: "",
        isPending: true,
        isPublished: false,
        teacher_id: "",
    });

    // category params state
    const [categoryParams, setCategoryParams] = useState({
        category: '',
        division: '',
        subject: '',
        chapter: '',
        universityName: '',
        universityType: '',
    });

    // creating a query parameter object
    const categoryQueryParams = {
        ...(categoryParams.category && { category: categoryParams.category }),
        ...(categoryParams.division && { division: categoryParams.division }),
        ...(categoryParams.subject && { subject: categoryParams.subject }),
        ...(categoryParams.chapter && { chapter: categoryParams.chapter }),
        ...(categoryParams.universityName && { universityName: categoryParams.universityName }),
        ...(categoryParams.universityType && { universityType: categoryParams.universityType }),
    };

    // modifying the categoryQueryParams
    // categoryQueryParams.category = 
    // // fetching the teacherId from redux store
    // const { userId } = useAppSelector((state) => state.auth.user);
    // fetching all the categories from an api call
    const { data: categoryTypes, isLoading } = useGetAllCategoryTypesQuery({});
    // redux api call for fetching all the categories
    const { data: categoryData, isLoading: categoryLoading } = useGetCategoryForCourseQuery(categoryQueryParams);
    // calling the create course method from redux
    const [saveCourse, { isSuccess, isLoading: creationLoader }] = useSaveCourseMutation();

    // setting the data to local redux store
    const dispatch = useAppDispatch();

    // calling the imerative handle to execute submit handler from the parent component
    useImperativeHandle(ref, () => ({
        submitForm: () => {
            handleSubmit();
        },
    }));

    // when calling the mutation api

    if (isLoading || categoryLoading || creationLoader) {
        return <Loader />;
    }

    // extracting divisions subjects, chapter, universityType, universityName, from the category data and creating unique array. The getUniqueStrings is a custom function helping to provide type safety.

    const divisions = getUniqueStrings(categoryData?.data || [], 'division');
    const subjects = getUniqueStrings(categoryData?.data || [], 'subject');
    const chapters = getUniqueStrings(categoryData?.data || [], 'chapter');
    const universityNames = getUniqueStrings(categoryData?.data || [], 'universityName');
    const universityTypes = getUniqueStrings(categoryData?.data || [], 'universityType');

    const categoryId = categoryData?.data[0]?._id;
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

    const handleCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCategoryParams((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        console.log('handleSubmit clicked');
        e?.preventDefault();
        // creating a formData variable
        const courseData = new FormData();
        // appending cover image to the courseData object
        if (coverImg) courseData.append('coverImage', coverImg);
        // ensure the teacher ID is added to courseDetails
        const updatedCourseDetails = {
            ...courseDetails,
            // teacher_id: userId,
            category_id: categoryId
        };
        // appending course details data to the courseDetails object
        courseData.append('courseData', JSON.stringify(updatedCourseDetails));

        // sending the course details to backend through redux toolkit
        try {
            const courseResponse = await saveCourse(courseData);
            const course_id = courseResponse?.data.data?._id;
            dispatch(saveCourseIdToStore({ course_id: course_id }));
            // restoring previous category params
            setCategoryParams({
                category: '',
                division: '',
                subject: '',
                chapter: '',
                universityName: '',
                universityType: '',
            });
            setCourseDetails({
                name: "",
                details: "",
                isPending: true,
                isPublished: false,
                teacher_id: "",
            });
            //navigate user to the add lesson page once all the data has been saved
            navigate('/teacher/create-course/create-lessons');
            // checking whether setActiveSteps is available
            setActiveSteps?.(prevStep => prevStep + 1);
        } catch (err) {
            console.log(err);
            // setError(err);
        }
    };

    console.log('All Category Params:', categoryQueryParams);
    console.log('Filtered category id:', categoryId);

    return (
        <>
            <Box sx={{ width: '100%', height: 'auto' }}>
                <Paper variant="outlined" sx={{ width: '100%', height: 'auto', borderRadius: '10px', p: 3 }}>
                    <form encType="multipart/form-data" onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            {/* course name field */}
                            <Grid size={6}>
                                <CustomLabel fieldName="Course Name" />
                                <CustomTextField
                                    name="name" handleInput={handleInput}
                                    value={courseDetails.name}
                                />
                            </Grid>
                            {/* course category field */}
                            <Grid size={6}>
                                <CustomLabel fieldName="Course Category" />
                                <CustomAutoComplete
                                    name='category'
                                    options={categoryTypes?.data || []}
                                    value={categoryParams.category}
                                    handleInput={handleCategory} />
                            </Grid>
                            {/* 2nd row filter columns */}
                            {
                                (categoryParams.category === 'Academic') && (
                                    <>
                                        <Grid size={4}>
                                            <CustomLabel fieldName="Division" />
                                            <CustomAutoComplete
                                                options={divisions || []}
                                                name={`division`}
                                                handleInput={handleCategory}
                                                required={true}
                                                value={categoryParams.division}
                                            />
                                        </Grid>
                                        <Grid size={4}>
                                            <CustomLabel fieldName="Subject" />
                                            <CustomAutoComplete
                                                options={subjects || []}
                                                name={`subject`}
                                                handleInput={handleCategory}
                                                value={categoryParams.subject}
                                                required={true} />
                                        </Grid>
                                        <Grid size={4}>
                                            <CustomLabel fieldName="Chapter" />
                                            <CustomAutoComplete
                                                options={chapters || []}
                                                name={`chapter`}
                                                handleInput={handleCategory}
                                                required={true}
                                                value={categoryParams.chapter}
                                            />
                                        </Grid>
                                    </>)
                            }
                            {/* in case of admission */}
                            {
                                (categoryParams.category === 'Admission') && (
                                    <>
                                        <Grid size={4}>
                                            <CustomLabel fieldName="University Type" />
                                            <CustomAutoComplete
                                                options={universityTypes || []}
                                                name={`universityType`}
                                                handleInput={handleCategory}
                                                required={true}
                                                value={categoryParams.universityType}
                                            />
                                        </Grid>
                                        <Grid size={4}>
                                            <CustomLabel fieldName="University Name" />
                                            <CustomAutoComplete
                                                options={universityNames || []}
                                                name={`universityName`}
                                                handleInput={handleCategory}
                                                required={true}
                                                value={categoryParams.universityName}
                                            />
                                        </Grid>
                                        <Grid size={4}>
                                            <CustomLabel fieldName="Subject" />
                                            <CustomAutoComplete
                                                options={subjects || []}
                                                name={`subject`}
                                                handleInput={handleCategory}
                                                required={true}
                                                value={categoryParams.subject}
                                            />
                                        </Grid>
                                    </>)
                            }
                            {/* in case of job */}
                            {
                                (categoryParams.category === 'Job') && (
                                    <>
                                        <Grid size={12}>
                                            <CustomLabel fieldName="Subject" />
                                            <CustomAutoComplete
                                                options={subjects || []}
                                                name={`subject`}
                                                handleInput={handleCategory}
                                                required={true}
                                                value={categoryParams.subject}
                                            />
                                        </Grid>
                                    </>)
                            }
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