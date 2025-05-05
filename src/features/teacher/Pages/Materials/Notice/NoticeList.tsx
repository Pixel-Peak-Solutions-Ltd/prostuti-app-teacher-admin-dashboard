import { Box, Button, Card, Paper, Typography } from "@mui/material";
import { useAppSelector } from "../../../../../redux/hooks";
import Loader from "../../../../../shared/components/Loader";
import Grid from '@mui/material/Grid2';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useNavigate } from "react-router-dom";
import { useGetNoticesOfACourseQuery } from "../../../../../redux/features/materials/materialsApi";
import EventNoteIcon from '@mui/icons-material/EventNote';
import { grey } from "@mui/material/colors";
import { TUser } from "../../../../../types/types";

const NoticeList = () => {
    const user = useAppSelector((state) => state.auth.user as TUser);
    const courseId = useAppSelector((state) => state.courseAndLessonId.id.course_id);
    const { data: noticeData, isLoading } = useGetNoticesOfACourseQuery({ courseId });
    const navigate = useNavigate();

    if (isLoading) {
        <Loader />;
    }

    const notices = noticeData?.data;
    console.log(noticeData?.data);
    return (
        <>
            <Paper variant="outlined" sx={{ width: '100%', height: 'auto', borderRadius: '10px', p: 3 }}>
                {/* top title and button section */}
                <Box component="section"
                    sx={{ display: 'flex', gap: '20px', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    {/* back button and title */}
                    <Box component="section" sx={{ display: 'flex', gap: '20px' }}>
                        <Link to={user.role === 'admin' ? `/admin/course-preview/${courseId}` : `/teacher/course-preview/${courseId}`}>
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
                        <Typography variant="h3">Notices</Typography>
                    </Box>
                    {/* new material add option for teacher */}
                    {
                        user.role === 'teacher' && (
                            <Box>
                                <Button variant="contained"
                                    onClick={() => navigate('/teacher/notice')}
                                    sx={{ borderRadius: '8px' }}
                                >
                                    + Add New Notice
                                </Button>
                            </Box>
                        )
                    }
                    {/* </Link> */}
                </Box>
                {/* main list starts */}
                {isLoading && (<Loader />)}
                {
                    !isLoading && (
                        <Box>
                            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                                <Grid container spacing={2} sx={{ mt: 3, }}>
                                    {/* resources list*/}
                                    {
                                        notices?.length > 0 && (
                                            <Grid size={12}>
                                                <Box>
                                                    {notices?.map((notice, index) => (
                                                        <Link to={user.role !== 'admin' && (`/teacher/notice-update/${notice?._id}`)}
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
                                                                }}>
                                                                <Box sx={{
                                                                    width: "3%"
                                                                }}>
                                                                    <EventNoteIcon sx={{ color: grey[600] }} />
                                                                </Box>
                                                                <Box sx={{
                                                                    width: "97%",
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                    alignItems: 'center'
                                                                }}>
                                                                    <Box>
                                                                        <Typography variant="h6"
                                                                            sx={{ fontSize: "14px", fontWeight: "600" }}
                                                                            color="#475467">Notice {index + 1}</Typography>
                                                                        <Typography variant="subtitle1"
                                                                            sx={{ fontSize: "14px", fontWeight: "500" }}
                                                                            color="#475467">{notice?.notice}</Typography>
                                                                    </Box>
                                                                    <Box sx={{ justifySelf: 'flex-end' }}>
                                                                        <ArrowOutwardIcon color="primary" />
                                                                    </Box>
                                                                </Box>
                                                            </Card>
                                                        </Link>
                                                    ))}
                                                </Box>
                                            </Grid>
                                        )
                                    }
                                </Grid>
                            </Paper>
                        </Box>
                    )
                }
            </Paper>
        </>
    );
};

export default NoticeList;