import { Box, Button, Card, Paper, Typography } from "@mui/material";
import { useGetCoursePreviewQuery } from "../../../../../redux/features/course/courseApi";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import Loader from "../../../../../shared/components/Loader";
import Grid from '@mui/material/Grid2';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import assignment_icon from '../../../../../assets/images/assignment-icon.png';
import { Link } from "react-router-dom";
import { saveAssignmentIdToStore } from "../../../../../redux/features/course/courseSlice";

const AssignmentList = () => {
    const courseId = useAppSelector((state) => state.courseAndLessonId.id.course_id);
    const dispatch = useAppDispatch();
    const { data: courseData, isLoading } = useGetCoursePreviewQuery({ courseId });

    if (isLoading) {
        <Loader />;
    }

    const lessons = courseData?.data.lessons;
    return (
        <>
            <Paper variant="outlined" sx={{ width: '100%', height: 'auto', borderRadius: '10px', p: 3 }}>
                {/* top title and button section */}
                <Box component="section" sx={{ display: 'flex', gap: '20px', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    {/* back button and title */}
                    <Box component="section" sx={{ display: 'flex', gap: '20px' }}>
                        <Link to={`/teacher/course-preview/${courseId}`}>
                            <Button variant='outlined' sx={{ width: '36px', height: '36px', minWidth: '36px', borderRadius: '8px', borderColor: "grey.700", color: "#3F3F46" }}>
                                <ArrowBackIcon fontSize='small' />
                            </Button>
                        </Link>
                        <Typography variant='h3'>Assignments</Typography>
                    </Box>
                    {/* continue button */}
                    {/* <Link to='/teacher/create-course/add-course-lessons'> */}
                    <Button
                        // onClick={handleContinue}
                        variant='contained'
                        sx={{ borderRadius: '8px', width: '140px', height: '48px', gap: 1 }}>
                        <DriveFileRenameOutlineOutlinedIcon fontSize='small' />
                        Edit
                    </Button>
                    {/* </Link> */}
                </Box>
                {/* main list starts */}
                {isLoading && (<Loader />)}
                {
                    !isLoading && (
                        <Box>
                            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                                <Grid container spacing={2} sx={{ mt: 3, }}>
                                    {lessons.map((lesson, index) => (
                                        <Grid size={12} key={index}>
                                            <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: "600", mb: 2 }}>{lesson.number}: {lesson?.name}</Typography>
                                            {/* assignments*/}
                                            {
                                                lesson?.assignments.length > 0 && (
                                                    <Box>
                                                        {lesson?.assignments.map((assignment, index) => (
                                                            <Link to={`/teacher/assignment-update/${assignment?._id}`} style={{ textDecoration: "none" }}>
                                                                <Card variant="outlined"
                                                                    sx={{ display: "flex", alignItems: "center", gap: 2, my: 1, px: 1.5, py: 0.8, borderRadius: 2 }}
                                                                    // saving assignment id to store
                                                                    onClick={() => dispatch(saveAssignmentIdToStore({ assignment_id: assignment?._id }))}
                                                                >
                                                                    <Box sx={{ width: "3%" }}>
                                                                        <img src={assignment_icon} style={{ width: "24px", height: "24px" }} />
                                                                    </Box>
                                                                    <Box sx={{ width: "97%", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                        <Box>
                                                                            <Typography variant="h6" sx={{ fontSize: "14px", fontWeight: "600" }} color="#475467">Assignment {index + 1}</Typography>
                                                                            <Typography variant="subtitle1" sx={{ fontSize: "14px", fontWeight: "500" }} color="#475467">{assignment?.assignmentNo}</Typography>
                                                                        </Box>
                                                                        <Box sx={{ justifySelf: 'flex-end' }}>
                                                                            <ArrowOutwardIcon color="primary" />
                                                                        </Box>
                                                                    </Box>
                                                                </Card>
                                                            </Link>
                                                        ))}
                                                    </Box>)
                                            }
                                        </Grid>
                                    ))}
                                </Grid>
                            </Paper>
                        </Box>
                    )
                }

            </Paper>
        </>
    );
};

export default AssignmentList;