import { Box, Button, Card, IconButton, Paper, SnackbarCloseReason, Typography, styled } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Grid from '@mui/material/Grid2';
import CustomAutoComplete from "../../../../shared/components/CustomAutoComplete";
import CustomLabel from "../../../../shared/components/CustomLabel";
import { useAppSelector } from "../../../../redux/hooks";
import { useGetLessonsByCourseIdQuery } from "../../../../redux/features/course/courseApi";
import CustomTextField from "../../../../shared/components/CustomTextField";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import Loader from "../../../../shared/components/Loader";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PDF from '../../../../assets/images/PDF.png';
import LinearWithValueLabel from "../../../../shared/components/ProgessBar";
import Alert from "../../../../shared/components/Alert";
import { useCreateAssignmentMutation, useGetAssignmentByIdQuery, useUpdateAssignmentMutation } from "../../../../redux/features/materials/materialsApi";

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
const AssignmentCreation = () => {
    // const canceledAssignment: any = [];
    const { assignmentId } = useParams();
    // checking if user coming form course preview page
    const isEditing = assignmentId ? true : false;
    // local states
    const [assignmentDetails, setAssignmentDetails] = useState<Record<string, string | number>>({});
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [fileError, setFileError] = useState<string | null>(null);
    // below state handles the selected image file and ready it to upload
    const [files, setFiles] = useState<File[]>([]);
    const [cancelledAssignment, setCancelledAssignment] = useState<any>([]);

    const finalCancellation: any = [...cancelledAssignment];
    // fetching courseId from the local redux store
    const courseId = useAppSelector((state) => state.courseAndLessonId.id.course_id);
    // getting all the lessons of the corresponding course
    const { data: lessonData, isLoading: courseLoading } = useGetLessonsByCourseIdQuery({ courseId });
    const [createAssignment, { isLoading: assignmentCreationLoading, isSuccess }] = useCreateAssignmentMutation();

    // making api call to update the record class
    const [updateAssignment, { isSuccess: assignmentUpdateSuccess, isLoading: assignmentUpdateLoader }] = useUpdateAssignmentMutation();

    // api call to get existing record class data for update operation
    const { data: assignmentData, isLoading: assignmentFetching } = useGetAssignmentByIdQuery({ assignmentId }, { skip: !assignmentId });


    // for updating the record class setting the state to the existing value
    useEffect(() => {
        if (assignmentData && isEditing) {
            setAssignmentDetails({
                assignmentNo: assignmentData.data.assignmentNo,
                details: assignmentData.data.details,
                unlockDate: assignmentData.data.unlockDate,
                marks: assignmentData.data.marks,
                canceledAssignments: finalCancellation
            });
        }
    }, [assignmentData, isEditing]);

    if (courseLoading || assignmentFetching || assignmentUpdateLoader) {
        return (<Loader />);
    }

    const { assignmentNo, uploadFileResources = [] } = assignmentData?.data || {};

    const filteredUploadFileResources = uploadFileResources.filter(
        (assignment) => !cancelledAssignment.includes(assignment)
    );

    // console.log('existing files', uploadFileResources);

    // console.log('outside cancelled assignment', cancelledAssignment);

    console.log('outside cancelled assignment', finalCancellation);
    // data filtering
    const lessonNames = lessonData?.data.map((item: typeof lessonData) => item.name);
    const lesson_id = lessonData?.data.filter((item: typeof lessonData) => item.name === assignmentDetails?.lessonName);

    /* All handler functions*/
    //^ handling dayjs for date field
    const handleDateChange = (date: Dayjs | null) => {
        if (date) {
            setAssignmentDetails({ ...assignmentDetails, unlockDate: date.toISOString() }); // converting date to iso string
        }
    };

    //~ handling all the inputs
    const handleAssignmentDetailsInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAssignmentDetails((prevState) => ({ ...prevState, [name]: value }));
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
    };

    //~deleting a file from the local state
    const handleDeleteFile = (passedIndex: number) => {
        const copiedArray = [...files];
        const remainingFiles = copiedArray.filter((file, index) => index !== passedIndex);
        setFiles([...remainingFiles]);
    };

    //* handling the submit function
    const handleAssignmentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // removing lessonName field as it's not necessary
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const selectedAssignmentDetails = (({ lessonName, ...rest }) => rest)(assignmentDetails);
        selectedAssignmentDetails.lesson_id = lesson_id[0]?._id;
        selectedAssignmentDetails.course_id = courseId;

        const updateData = {
            ...assignmentDetails,
            canceledAssignments: finalCancellation
        };

        console.log('update data to the server', updateData);
        // creating a new form data
        const assignmentData = new FormData();

        if (isEditing) {
            assignmentData.append('data', JSON.stringify(updateData));
        } else {
            assignmentData.append('data', JSON.stringify(selectedAssignmentDetails));
        }

        // inserting pdf files to the files key inside the formData

        if (Array.isArray(files)) {
            for (const pdf of files) {
                assignmentData.append('files', pdf);
            }
        }
        else {
            console.error('Expected files to be an array of File objects');
        }

        // sending the request to the server via redux tooklit
        try {
            if (isEditing) {
                console.log('Updating assignment');
                await updateAssignment({ assignmentData, assignmentId });
            } else {
                await createAssignment(assignmentData);
                setAssignmentDetails({});
                setFiles([]);
            }
            setOpenSnackbar(true);

        } catch (err) {
            console.log(err);
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

    return (
        <>
            <Box sx={{ width: '100%', height: files.length > 3 ? 'auto' : '100vh' }}>
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
                            <Typography variant='h3'>Assignment Creation</Typography>
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
                    {
                        assignmentCreationLoading && (
                            <Loader />
                        )
                    }
                    {
                        !assignmentCreationLoading && (
                            <Box sx={{ display: "flex", flexDirection: 'column', gap: '20px' }}>
                                <form onSubmit={handleAssignmentSubmit}>
                                    <Paper variant='outlined' sx={{ width: '100%', height: '100%', p: 2, borderRadius: '8px', mb: 3 }}>
                                        <Grid container spacing={3} >
                                            {/* 1st row - lesson name */}
                                            {
                                                !isEditing && (
                                                    <Grid size={12}>
                                                        <CustomLabel fieldName="Lesson Name" />
                                                        <CustomAutoComplete
                                                            name='lessonName' options={lessonNames || []}
                                                            handleInput={handleAssignmentDetailsInput}
                                                            value={assignmentDetails?.lessonName as string}
                                                            required
                                                        />
                                                    </Grid>
                                                )
                                            }

                                            {/* 2nd row - resource name, marks & date picker */}
                                            <Grid size={4}>
                                                <CustomLabel fieldName="Assignment No" />
                                                <CustomTextField
                                                    name='assignmentNo'
                                                    handleInput={handleAssignmentDetailsInput}
                                                    value={assignmentDetails?.assignmentNo || ''}
                                                    placeholder={isEditing ? assignmentNo : "Naming hint: [Subject] AS01"}
                                                    required={isEditing ? false : true}
                                                />
                                            </Grid>
                                            <Grid size={4}>
                                                <CustomLabel fieldName="Assignment Marks" />
                                                <CustomTextField
                                                    name='marks'
                                                    handleInput={(e) => setAssignmentDetails((state) => ({ ...state, marks: Number(e.target.value) }))}
                                                    value={assignmentDetails?.marks || ''}
                                                    placeholder="Enter Allocated Marks"
                                                    required={isEditing ? false : true}
                                                    type="number"
                                                />
                                            </Grid>
                                            {/* date picker */}
                                            <Grid size={4} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                                <CustomLabel fieldName="Assignment Unlock" />
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <StyledDatePicker
                                                        value={assignmentDetails?.unlockDate ? dayjs(assignmentDetails.unlockDate) : null}
                                                        onChange={handleDateChange}
                                                    />
                                                </LocalizationProvider>
                                            </Grid>
                                            {/* 3rd row */}
                                            <Grid size={12}>
                                                <CustomLabel fieldName="Assignment Details" />
                                                <CustomTextField
                                                    name="details"
                                                    required={isEditing ? false : true}
                                                    handleInput={handleAssignmentDetailsInput}
                                                    value={assignmentDetails?.details || ''}
                                                    placeholder="Enter Assignment Details"
                                                    multiline
                                                    rows={6}
                                                />
                                            </Grid>
                                            {/* file update row */}
                                            <Grid size={12}>
                                                <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: "500" }} color="grey.700">
                                                    Uploaded Assignments
                                                </Typography>
                                            </Grid>
                                            {
                                                (isEditing && files.length === 0) &&
                                                filteredUploadFileResources.map((assignment, index) => (
                                                    <>
                                                        <Grid size={12}>
                                                            <Card variant="outlined"
                                                                sx={{ display: "flex", alignItems: "center", justifyContent: 'space-between', gap: 2, mt: 0.8, px: 1.5, py: 0.8, borderRadius: 2, zIndex: 100 }}>
                                                                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                                                    <img src={PDF}
                                                                        style={{
                                                                            width: '40px',
                                                                            height: '40px'
                                                                        }}
                                                                    />
                                                                    <Typography variant="subtitle1" color="grey.500">
                                                                        {assignment.originalName}
                                                                    </Typography>
                                                                </Box>
                                                                <IconButton
                                                                    onClick={
                                                                        () => {
                                                                            setCancelledAssignment((as) => [...as, assignment]);
                                                                            console.log(index);
                                                                            // // console.log(Files[index]);
                                                                            // canceledAssignment.push(assignment);
                                                                            setAssignmentDetails((prevState) => ({
                                                                                ...prevState,
                                                                                canceledAssignments: cancelledAssignment
                                                                            }));
                                                                            console.log('cancelled assignment onclick', cancelledAssignment);
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
                                            {/* Resource file upload field */}
                                            <Grid size={12}>
                                                {
                                                    files.length !== 0 && (
                                                        <Box>
                                                            {
                                                                files.map((file, index) => (
                                                                    <>
                                                                        <Paper variant='outlined' sx={{
                                                                            display: 'flex', flexDirection: 'column', justifyContent: 'center', mb: 1, alignItems: 'center', p: 1, borderRadius: '8px', gap: 1
                                                                        }}>
                                                                            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                                    <img src={PDF} style={{ width: '40px', height: '40px' }} />
                                                                                    <Typography key={index} color='grey.700'>
                                                                                        {file.name}
                                                                                    </Typography>
                                                                                </Box>

                                                                                <IconButton onClick={() => handleDeleteFile(index)}>
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

                </Paper>
            </Box>
            {/* showing alert for what happened after submitting the request */}
            <Alert
                openSnackbar={openSnackbar}
                autoHideDuration={5000}
                handleCloseSnackbar={handleCloseSnackbar}
                isSuccess={isSuccess || assignmentUpdateSuccess}
            />
        </>
    );
};

export default AssignmentCreation;