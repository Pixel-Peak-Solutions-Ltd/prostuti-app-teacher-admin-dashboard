import { Box, Button, Card, Paper, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { useGetCoursePreviewQuery } from '../../../../../redux/features/course/courseApi';
import Loader from '../../../../../shared/components/Loader';
import Grid from '@mui/material/Grid2';
import test_icon from '../../../../../assets/images/test-icon.png';
import { saveTestStore } from '../../../../../redux/features/course/courseSlice';
import { RootState } from '../../../../../redux/store';
import { TUser } from '../../../../../types/types';

const TestList = () => {
    const user = useAppSelector((state: RootState) => state.auth.user as TUser);
    const courseId = useAppSelector((state) => state.courseAndLessonId.id.course_id);
    const { data: courseData, isLoading } = useGetCoursePreviewQuery({ courseId });
    // setting the data to local redux store
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    if (isLoading) {
        <Loader />;
    }

    const lessons = courseData?.data.lessons;
    const adminPath = `/admin/course-preview/${courseId}`;
    const teacherPath = `/teacher/course-preview/${courseId}`;

    return (
        <>
            <Paper variant="outlined" sx={{ width: '100%', height: 'auto', borderRadius: '10px', p: 3 }}>
                {/* top title and button section */}
                <Box component="section"
                    sx={{ display: 'flex', gap: '20px', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    {/* back button and title */}
                    <Box component="section" sx={{ display: 'flex', gap: '20px' }}>
                        <Link to={user.role === 'admin' ? adminPath : teacherPath}>
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
                        <Typography variant="h3">Tests</Typography>
                    </Box>
                    {/* new material add option for teacher */}
                    {
                        user.role === 'teacher' && (
                            <Box>
                                <Button variant="contained"
                                    onClick={() => navigate('/teacher/test-creation')}
                                    sx={{ borderRadius: '8px' }}
                                >
                                    + Add New Test
                                </Button>
                            </Box>
                        )
                    }
                </Box>
                {/* loading state */}
                {isLoading && (<Loader />)}
                {/* main list starts */}

                {
                    !isLoading && (
                        <Box>
                            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                                <Grid container spacing={2} sx={{ mt: 3, }}>
                                    {lessons.map((lesson, index) => (
                                        <Grid size={12} key={index}>
                                            <Typography variant="h6" sx={{
                                                fontSize: "1rem",
                                                fontWeight: "600",
                                                mb: 2
                                            }}>{lesson.number}: {lesson?.name}</Typography>
                                            {/* resources list*/}
                                            {
                                                lesson?.tests.length > 0 && (
                                                    <Box>
                                                        {lesson?.tests.map((test, index) => (
                                                            <Link to={user.role === 'admin' ? `/admin/test-update/${test?._id}` : `/teacher/test-update/${test?._id}`}
                                                                style={{ textDecoration: "none" }}>
                                                                <Card variant="outlined"
                                                                    sx={{
                                                                        display: "flex",
                                                                        alignItems: "center",
                                                                        gap: 2,
                                                                        my: 1,
                                                                        px: 1.5,
                                                                        py: 0.8,
                                                                        borderRadius: 2
                                                                    }}
                                                                    onClick={() => dispatch(saveTestStore({ test_id: test?._id }))}>
                                                                    <Box sx={{
                                                                        width: "3%"
                                                                    }}>
                                                                        <img src={test_icon}
                                                                            style={{ width: "24px", height: "24px" }} />
                                                                    </Box>
                                                                    <Box sx={{
                                                                        width: "97%",
                                                                        display: 'flex',
                                                                        justifyContent: 'space-between',
                                                                        alignItems: 'center'
                                                                    }}>
                                                                        <Box>
                                                                            <Typography variant="h6" sx={{
                                                                                fontSize: "14px",
                                                                                fontWeight: "600"
                                                                            }} color="#475467">Test {index + 1}</Typography>
                                                                            <Typography variant="subtitle1" sx={{
                                                                                fontSize: "14px",
                                                                                fontWeight: "500"
                                                                            }} color="#475467">{test?.name}</Typography>
                                                                        </Box>
                                                                        <Box sx={{ justifySelf: 'flex-end' }}>
                                                                            <ArrowOutwardIcon color="primary" />
                                                                        </Box>
                                                                    </Box>
                                                                </Card>
                                                            </Link>
                                                        ))}
                                                    </Box>
                                                )
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

export default TestList;