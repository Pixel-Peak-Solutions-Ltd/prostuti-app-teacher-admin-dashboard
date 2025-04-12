import { Box, Button, Card, Paper, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from "react-router-dom";
import video_icon from '../../../../../assets/images/video-icon.png';
import { useAppSelector } from "../../../../../redux/hooks";
import { useGetCoursePreviewQuery } from "../../../../../redux/features/course/courseApi";
import Loader from "../../../../../shared/components/Loader";
import Grid from '@mui/material/Grid2';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { RootState } from "../../../../../redux/store";
import { TUser } from "../../../../../types/types";

const RecordClassList = () => {
    const user = useAppSelector((state: RootState) => state.auth.user as TUser);
    const courseId = useAppSelector((state) => state.courseAndLessonId.id.course_id);
    const { data: courseData, isLoading } = useGetCoursePreviewQuery({ courseId });

    if (isLoading) {
        <Loader />;
    }

    const lessons = courseData?.data.lessons;
    const adminPath = `/admin/course-preview/${courseId}`;
    const teacherPath = `/teacher/course-preview/${courseId}`;

    console.log(courseId);
    console.log(lessons);
    console.log(courseData?.data);
    return (
        <>
            <Paper variant="outlined" sx={{ width: '100%', height: 'auto', borderRadius: '10px', p: 3 }}>
                {/* top title and button section */}
                <Box component="section" sx={{ display: 'flex', gap: '20px', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    {/* back button and title */}
                    <Box component="section" sx={{ display: 'flex', gap: '20px' }}>
                        <Link to={user.role === 'admin' ? adminPath : teacherPath}>
                            <Button variant='outlined' sx={{ width: '36px', height: '36px', minWidth: '36px', borderRadius: '8px', borderColor: "grey.700", color: "#3F3F46" }}>
                                <ArrowBackIcon fontSize='small' />
                            </Button>
                        </Link>
                        <Typography variant='h3'>Record Class</Typography>
                    </Box>
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
                                            {/* record classes */}
                                            {
                                                lesson?.recodedClasses.length > 0 && (
                                                    <Box>
                                                        {lesson?.recodedClasses.map((recordClass, index) => (
                                                            <Link to={user.role === 'admin' ? `/admin/record-update/${recordClass?._id}` : `/teacher/record-update/${recordClass?._id}`} style={{ textDecoration: "none" }}>
                                                                <Card variant="outlined"
                                                                    sx={{ display: "flex", alignItems: "center", gap: 2, my: 1, px: 1.5, py: 0.8, borderRadius: 2 }}>
                                                                    <Box sx={{ width: "3%" }}>
                                                                        <img src={video_icon} style={{ width: "24px", height: "24px" }} />
                                                                    </Box>
                                                                    <Box sx={{ width: "97%", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                        <Box>
                                                                            <Typography variant="h6" sx={{ fontSize: "14px", fontWeight: "600" }} color="#475467">Record Class {index + 1}</Typography>
                                                                            <Typography variant="subtitle1" sx={{ fontSize: "14px", fontWeight: "500" }} color="#475467">{recordClass?.recodeClassName}</Typography>
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

export default RecordClassList;