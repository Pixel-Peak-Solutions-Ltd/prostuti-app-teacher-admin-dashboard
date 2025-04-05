import { Box, Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Loader, useAppSelector } from "../Create Test";
import { useGetSubmittedAssignmentListQuery } from "../../../../../redux/features/materials/materialsApi";
import AssignmentHistoryTable from "./AssignmentHistoryTable";


const AssignmentSubmissionList = () => {
    const courseId = useAppSelector((state) => state.courseAndLessonId.id.course_id);
    const assignmentId = useAppSelector((state) => state.test_id.id.assignment_id);

    const { data, isLoading } = useGetSubmittedAssignmentListQuery({ courseId, assignmentId });

    if (isLoading) {
        return <Loader />;
    }

    const assignmentHistoryData = data?.data;
    console.log(data?.data);
    return (
        <div>
            <Box sx={{ width: '100%', height: 'auto' }}>
                <Paper variant="outlined" sx={{ width: '100%', height: 'auto', borderRadius: '10px', p: 3 }}>
                    {/* top title and button section */}
                    <Box component="section" sx={{ display: 'flex', gap: '20px', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        {/* back button and title */}
                        <Box component="section" sx={{ display: 'flex', gap: '20px' }}>
                            <Link to='/teacher/test-list'>
                                <Button variant='outlined' sx={{ width: '36px', height: '36px', minWidth: '36px', borderRadius: '8px', borderColor: "grey.700", color: "#3F3F46" }}>
                                    <ArrowBackIcon fontSize='small' />
                                </Button>
                            </Link>
                            <Typography variant='h3'>Assignment Submission List</Typography>

                        </Box>
                    </Box>
                    {isLoading && <Loader />}
                    <AssignmentHistoryTable assignmentHistory={assignmentHistoryData} isLoading={isLoading} />
                </Paper>
            </Box>
        </div>
    );
};

export default AssignmentSubmissionList;