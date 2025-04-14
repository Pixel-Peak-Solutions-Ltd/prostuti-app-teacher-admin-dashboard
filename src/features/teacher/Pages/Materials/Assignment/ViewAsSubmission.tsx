import { Box, Button, Card, Divider, IconButton, Paper, styled, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Grid from '@mui/material/Grid2';
import { CustomLabel, CustomTextField, useAppSelector } from "../Create Test";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import PDF from '../../../../../assets/images/PDF.png';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { downloadFile } from "../../../../../utils/FileDownload";

const StyledDatePicker = styled(DatePicker)({
    width: '100%',
    '& .MuiInputBase-root': {
        height: '40px',
        borderRadius: '8px',
        fontSize: '0.875rem',
    }
});
const ViewAsSubmission = () => {
    const assignmentData = useAppSelector(state => state.test_id?.assignmentHistory?.history);
    console.log('selected assignment data', assignmentData);
    // console.log('selected assignment data: ' + assignmentData.history);
    const { assignmentHistoryId } = useParams();
    const fileName = assignmentData?.uploadFileResource?.originalName;
    return (
        <>
            <Box sx={{ width: '100%', height: 'auto' }}>
                <Paper variant="outlined" sx={{ width: '100%', height: 'auto', borderRadius: '10px', p: 3 }}>
                    {/* top title and button section */}
                    <Box component="section" sx={{ display: 'flex', gap: '20px', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        {/* back button and title */}
                        <Box component="section" sx={{ display: 'flex', gap: '20px' }}>
                            <Link to='/teacher/assignment-submission-list'>
                                <Button variant='outlined' sx={{ width: '36px', height: '36px', minWidth: '36px', borderRadius: '8px', borderColor: "grey.700", color: "#3F3F46" }}>
                                    <ArrowBackIcon fontSize='small' />
                                </Button>
                            </Link>
                            <Typography variant='h3'>Answer Sheet</Typography>
                        </Box>
                        {/* top buttons */}
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
                                        value={assignmentData?.studentProfile_id.name || ''}
                                        placeholder="Enter the test name"
                                    />
                                </Grid>
                                {/* student ID */}
                                <Grid size={6}>
                                    <CustomLabel fieldName="Student ID" />
                                    <CustomTextField
                                        disabled={true}
                                        name="type"
                                        value={assignmentData?.studentProfile_id.studentId || ''}
                                    />
                                </Grid>
                                {/* 2nd row --> , , total question, test date */}
                                {/* assignment name */}
                                <Grid size={3}>
                                    <CustomLabel fieldName="Assignment Name" />
                                    <CustomTextField
                                        name="name"
                                        value={assignmentData?.assignment_id || ''}

                                        placeholder="Enter the test name"
                                    />
                                </Grid>
                                {/* Test date */}
                                <Grid size={3} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <CustomLabel fieldName="Submission Date" />
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <StyledDatePicker
                                            value={assignmentData?.createdAt ? dayjs(assignmentData?.createdAt) : null}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                {/* assignment marks */}
                                <Grid size={3} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <CustomLabel fieldName="Assignment Marks" />
                                    <CustomTextField
                                        disabled={true}
                                        name="assignment_marks"
                                        type="text"
                                    // value={testHistoryData.test_id.questionList.length}
                                    />
                                </Grid>
                                {/* give assignment mark */}
                                <Grid size={3} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <CustomLabel fieldName="Give Marks" />
                                    <CustomTextField
                                        disabled={true}
                                        name="give_marks"
                                        type="text"
                                    // value={testHistoryData.test_id.type}
                                    />
                                </Grid>
                                {/* divider after each question */}
                                <Grid size={12} sx={{ mt: 1 }}>
                                    <Divider />
                                </Grid>
                                {/* submitted assignment */}
                                <Grid size={12} sx={{ zIndex: 3 }}>
                                    <Card variant="outlined"
                                        sx={{ display: "flex", alignItems: "center", justifyContent: 'space-between', gap: 2, mt: 0.8, px: 1.5, py: 0.8, borderRadius: 2 }}>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                            <img src={PDF}
                                                style={{
                                                    width: '40px',
                                                    height: '40px'
                                                }}
                                            />
                                            <Typography variant="subtitle1" color="grey.500">
                                                {assignmentData?.uploadFileResource.originalName}
                                            </Typography>
                                        </Box>
                                        <IconButton
                                            onClick={() => downloadFile(assignmentData?.uploadFileResource?.path, fileName)}
                                        >
                                            <FileDownloadOutlinedIcon />
                                        </IconButton>
                                    </Card>
                                </Grid>
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

export default ViewAsSubmission;