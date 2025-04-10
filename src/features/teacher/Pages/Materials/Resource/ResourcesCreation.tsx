import { Box, Button, Card, IconButton, Paper, SnackbarCloseReason, Typography, styled } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Grid from '@mui/material/Grid2';
import CustomAutoComplete from "../../../../../shared/components/CustomAutoComplete";
import CustomLabel from "../../../../../shared/components/CustomLabel";
import { useAppSelector } from "../../../../../redux/hooks";
import { useGetLessonsByCourseIdQuery } from "../../../../../redux/features/course/courseApi";
import CustomTextField from "../../../../../shared/components/CustomTextField";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import Loader from "../../../../../shared/components/Loader";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PDF from '../../../../../assets/images/PDF.png';
import LinearWithValueLabel from "../../../../../shared/components/ProgessBar";
import {
    useCreateResourceMutation,
    useDeleteResourceMutation,
    useGetResourceByIdQuery,
    useUpdateResourceMutation
} from "../../../../../redux/features/materials/materialsApi";
import Alert from "../../../../../shared/components/Alert";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

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
const ResourcesCreation = () => {
    const navigate = useNavigate();
    const { resourceId } = useParams();
    // checking if user coming form course preview page
    const isEditing = resourceId ? true : false;
    // local states
    const [resourceDetails, setResourceDetails] = useState<Record<string, string>>({});
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [fileError, setFileError] = useState<string | null>(null);
    // below state handles the selected image file and ready it to upload
    const [files, setFiles] = useState<File[]>([]);
    const [cancelledResource, setCancelledResource] = useState<any>([]);
    const finalCancellation: any = [...cancelledResource];
    // fetching courseId from the local redux store
    const courseId = useAppSelector((state) => state.courseAndLessonId.id.course_id);
    // getting all the lessons of the corresponding course
    const { data: lessonData, isLoading: courseLoading } = useGetLessonsByCourseIdQuery({ courseId });
    const [createResource, { isLoading: resourceCreationLoading, isSuccess }] = useCreateResourceMutation();

    // making api call to update the record class
    const [updateResource, {
        isSuccess: resourceUpdateSuccess,
        isLoading: resourceUpdateLoader
    }] = useUpdateResourceMutation();

    // api call to get existing record class data for update operation
    const {
        data: resourceData,
        isLoading: resourceFetching
    } = useGetResourceByIdQuery({ resourceId }, { skip: !resourceId });
    // delete resource

    const [deleteResource, { isSuccess: deleteSuccess, isLoading: deleteLoader }] = useDeleteResourceMutation();

    // for updating the record class setting the state to the existing value
    useEffect(() => {
        if (resourceData && isEditing) {
            setResourceDetails({
                name: resourceData.data.name,
                resourceDate: resourceData.data.resourceDate,
                canceledResources: finalCancellation
            });
        }
    }, [resourceData, isEditing]);

    if (courseLoading || resourceFetching || resourceUpdateLoader || deleteLoader) {
        return (<Loader />);
    }

    const { name, uploadFileResources = [] } = resourceData?.data || {};

    const filteredUploadFileResources = uploadFileResources.filter(
        (resource) => !cancelledResource.includes(resource)
    );
    // data filtering
    const lessonNames = lessonData?.data.map((item: typeof lessonData) => item.name);
    const lesson_id = lessonData?.data.filter((item: typeof lessonData) => item.name === resourceDetails?.lessonName);

    //^ handling dayjs for date field
    const handleDateChange = (date: Dayjs | null) => {
        if (date) {
            setResourceDetails({ ...resourceDetails, resourceDate: date.toISOString() }); // converting date to iso string
        }
    };

    //~ handling all the inputs
    const handleResourceDetailsInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setResourceDetails((prevState) => ({ ...prevState, [name]: value }));
    };

    //~deleting a file from the local state
    const handleDeleteFile = (passedIndex: number) => {
        const copiedArray = [...files];
        const remainingFiles = copiedArray.filter((file, index) => index !== passedIndex);
        setFiles([...remainingFiles]);
    };

    //^handling file change
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            // first checking whether the file is a PDF
            if (e.target.files[0].type !== 'application/pdf') {
                setFileError('Only PDF Files Are Allowed');
                return;
            }
            // step 1: convert fileList to an array
            const newFiles = Array.from(e.target.files);
            // Filter out duplicate files based on name and size
            const uniqueNewFiles = newFiles.filter(newFile =>
                // keep the file if NO existing files match these conditions
                !files.some(existingFile =>
                    existingFile.name === newFile.name && existingFile.size === newFile.size
                )
            );
            setFiles(prevFiles => [...prevFiles, ...uniqueNewFiles]);
        }
        // Reset the input to allow selecting the same file again
        e.target.value = "";
    };

    //* handling the submit function
    const handleResourceSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // removing lessonName field as it's not necessary
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const selectedResourceDetails = (({ lessonName, ...rest }) => rest)(resourceDetails);
        selectedResourceDetails.lesson_id = lesson_id[0]?._id;
        selectedResourceDetails.course_id = courseId;

        const updateData = {
            ...resourceDetails,
            canceledResources: finalCancellation
        };
        // creating a new form data
        const resourceData = new FormData();

        if (isEditing) {
            resourceData.append('data', JSON.stringify(updateData));
        } else {
            resourceData.append('data', JSON.stringify(selectedResourceDetails));
        }

        // inserting pdf files to the files key inside the formData

        if (Array.isArray(files)) {
            for (const pdf of files) {
                resourceData.append('files', pdf);
            }
        } else {
            console.error('Expected files to be an array of File objects');
        }

        // sending the request to the server via redux tooklit
        try {
            if (isEditing) {
                console.log('Updating resource');
                await updateResource({ resourceData, resourceId });
                setFiles([]);
            } else {
                await createResource(resourceData);

                setResourceDetails({});
                setFiles([]);
            }
            setOpenSnackbar(true);
        } catch (err) {
            console.log(err);
        }

    };

    //*handling recordClass delete
    const handleResourceDelete = async () => {
        try {
            await deleteResource({ resourceId });
        } catch (error) {
            console.log(error);
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

    if (deleteSuccess) {
        navigate(`/teacher/resources-list`);
    }

    return (
        <>
            <Box sx={{ width: '100%', height: files.length > 3 ? 'auto' : '100vh' }}>
                <Paper variant="outlined" sx={{ width: '100%', height: 'auto', borderRadius: '10px', p: 3 }}>
                    {/* top title and button section */}
                    <Box component="section" sx={{
                        display: 'flex',
                        gap: '20px',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 3
                    }}>
                        {/* back button and title */}
                        <Box component="section" sx={{ display: 'flex', gap: '20px' }}>
                            <Link to={isEditing ? "/teacher/resources-list" : "/teacher/create-course/add-course-material"}>
                                <Button variant="outlined" sx={{
                                    width: '36px',
                                    height: '36px',
                                    minWidth: '36px',
                                    borderRadius: '8px',
                                    borderColor: "grey.700",
                                    color: "#3F3F46"
                                }}>
                                    <ArrowBackIcon fontSize="small" />
                                </Button>
                            </Link>
                            <Typography variant="h3">Resource Creation</Typography>
                        </Box>

                        {
                            isEditing && (
                                <Button
                                    onClick={handleResourceDelete}
                                    variant="outlined"
                                    sx={{ borderRadius: '8px', width: '140px', height: '48px', gap: 1 }}>
                                    <DeleteOutlinedIcon fontSize="small" />
                                    Delete
                                </Button>
                            )
                        }
                        {/* continue button */}
                        {/* <Link to='/teacher/create-course/add-course-lessons'> */}
                        {
                            !isEditing && (
                                <Button
                                    // onClick={handleContinue}
                                    variant="contained"
                                    sx={{ borderRadius: '8px', width: '140px', height: '48px' }}>
                                    Continue <ChevronRightIcon />
                                </Button>
                            )
                        }

                        {/* </Link> */}
                    </Box>
                    {/* form section starts here */}
                    {
                        resourceCreationLoading && (
                            <Loader />
                        )
                    }
                    {
                        !resourceCreationLoading && (
                            <Box sx={{ display: "flex", flexDirection: 'column', gap: '20px' }}>
                                <form onSubmit={handleResourceSubmit}>
                                    <Paper variant="outlined"
                                        sx={{ width: '100%', height: '100%', p: 2, borderRadius: '8px', mb: 3 }}>
                                        <Grid container spacing={3}>
                                            {/* 1st row - lesson name */}
                                            {
                                                !isEditing && (
                                                    <Grid size={12}>
                                                        <CustomLabel fieldName="Lesson Name*" />
                                                        <CustomAutoComplete
                                                            name="lessonName" options={lessonNames || []}
                                                            handleInput={handleResourceDetailsInput}
                                                            value={resourceDetails?.lessonName}
                                                            required
                                                        />
                                                    </Grid>
                                                )
                                            }

                                            {/* 2nd row - resource name & date picker */}
                                            <Grid size={8}>
                                                <CustomLabel fieldName={isEditing ? "Resource Name" : "Resource Name*"} />
                                                <CustomTextField
                                                    name="name"
                                                    handleInput={handleResourceDetailsInput}
                                                    value={resourceDetails?.name || ''}
                                                    placeholder="Enter Resource Name"
                                                    required
                                                />
                                            </Grid>
                                            {/* date picker */}
                                            <Grid size={4} sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-between'
                                            }}>
                                                <CustomLabel fieldName={isEditing ? "Class Date" : "Class Date*"} />
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <StyledDatePicker
                                                        value={resourceDetails?.resourceDate ? dayjs(resourceDetails?.resourceDate) : null}
                                                        onChange={handleDateChange}
                                                    />
                                                </LocalizationProvider>
                                            </Grid>
                                            {/* 3rd row */}
                                            {/* Resource file upload field */}
                                            <Grid size={12}>
                                                <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: "500" }}
                                                    color="grey.700">
                                                    Uploaded Resources
                                                </Typography>
                                            </Grid>
                                            {/*for editing files*/}
                                            {
                                                isEditing && filteredUploadFileResources.map((resource, index) => (
                                                    <>
                                                        <Grid size={12} sx={{ zIndex: 3 }} key={index}>
                                                            <Card variant="outlined"
                                                                sx={{
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    justifyContent: 'space-between',
                                                                    gap: 2,
                                                                    mt: 0.8,
                                                                    px: 1.5,
                                                                    py: 0.8,
                                                                    borderRadius: 2
                                                                }}>
                                                                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                                                    <img src={PDF}
                                                                        style={{
                                                                            width: '40px',
                                                                            height: '40px'
                                                                        }}
                                                                    />
                                                                    <Typography variant="subtitle1" color="grey.500">
                                                                        {resource.originalName}
                                                                    </Typography>
                                                                </Box>
                                                                <IconButton
                                                                    onClick={
                                                                        () => {
                                                                            setCancelledResource((prevState) => [...prevState, resource]);
                                                                            console.log(index);
                                                                            // // console.log(Files[index]);
                                                                            // canceledAssignment.push(assignment);
                                                                            setResourceDetails((prevState) => ({
                                                                                ...prevState,
                                                                                canceledResources: cancelledResource
                                                                            }));
                                                                            console.log('cancelled resource onclick', cancelledResource);
                                                                        }

                                                                    }
                                                                >
                                                                    <DeleteForeverIcon />
                                                                </IconButton>
                                                            </Card>
                                                        </Grid>
                                                    </>
                                                ))
                                            }
                                            <Grid size={12}>
                                                {
                                                    files.length !== 0 && (
                                                        <Box>
                                                            {
                                                                files.map((file, index) => (
                                                                    <>
                                                                        <Paper variant="outlined" sx={{
                                                                            display: 'flex',
                                                                            flexDirection: 'column',
                                                                            justifyContent: 'center',
                                                                            mb: 1,
                                                                            alignItems: 'center',
                                                                            p: 1,
                                                                            borderRadius: '8px',
                                                                            gap: 1
                                                                        }}>
                                                                            <Box sx={{
                                                                                width: '100%',
                                                                                display: 'flex',
                                                                                justifyContent: 'space-between',
                                                                                alignItems: 'center'
                                                                            }}>
                                                                                <Box sx={{
                                                                                    display: 'flex',
                                                                                    alignItems: 'center',
                                                                                    gap: 1
                                                                                }}>
                                                                                    <img src={PDF} style={{
                                                                                        width: '40px',
                                                                                        height: '40px'
                                                                                    }} />
                                                                                    <Typography key={index} color="grey.700">
                                                                                        {file.name}
                                                                                    </Typography>
                                                                                </Box>

                                                                                <IconButton
                                                                                    onClick={() => handleDeleteFile(index)}>
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
                                                <Grid size={12} sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                                                    <Box>
                                                        {/* new image upload button */}
                                                        <Button component="label"
                                                            size="small"
                                                            variant="text"
                                                            tabIndex={-1}
                                                            startIcon={<CloudUploadIcon />}
                                                            sx={{
                                                                color: "gray.700",
                                                                borderRadius: "8px",
                                                                cursor: "pointer",
                                                                // backgroundColor: tempCover ? "white" : 'transparent'
                                                            }}
                                                        >
                                                            {/* {tempCover ? 'Change Cover Image' : 'Click to Upload'} */}
                                                            {isEditing ? 'Upload File' : 'Upload File*'}
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
                                                        <Typography color="error" align="center" variant="body2">
                                                            {fileError}
                                                        </Typography>
                                                    </Grid>
                                                )

                                            }

                                        </Grid>
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: "20px", mt: 3 }}>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                size="small"
                                                startIcon={<CloudUploadIcon />}
                                                sx={{
                                                    width: '170px',
                                                    height: '40px',
                                                    borderRadius: '8px',
                                                    fontSize: '14px'
                                                }}>
                                                Upload Class
                                            </Button>
                                        </Box>
                                    </Paper>
                                </form>
                            </Box>
                        )
                    }

                </Paper>
            </Box>
            {/* showing alert for what happened after submitting the request */}
            <Alert
                openSnackbar={openSnackbar}
                autoHideDuration={5000}
                handleCloseSnackbar={handleCloseSnackbar}
                isSuccess={isSuccess || resourceUpdateSuccess}
            />
        </>
    );
};

export default ResourcesCreation;