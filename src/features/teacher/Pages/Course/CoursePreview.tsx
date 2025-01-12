import { useParams } from "react-router-dom";
import { useGetCoursePreviewQuery } from "../../../../redux/features/course/courseApi";
import Loader from "../../../../shared/components/Loader";
import { Box, Button, Card, Paper, Typography } from "@mui/material";
import { useState } from "react";
import Grid from '@mui/material/Grid2';
import test_icon from '../../../../assets/images/test-icon.png';
import assignment_icon from '../../../../assets/images/assignment-icon.png';
import resource_icon from '../../../../assets/images/resource-icon.png';
import video_icon from '../../../../assets/images/video-icon.png';

const CoursePreview = () => {
    const { courseId } = useParams();
    const [fullText, setFullText] = useState<boolean>(false);
    const { data: courseData, isLoading } = useGetCoursePreviewQuery({ courseId });

    if (isLoading) {
        return <Loader />;
    }

    const { name, details, lessons } = courseData.data;

    console.log('course data:', courseData.data);
    return (
        <Box sx={{ borderRadius: '10px', p: 3 }}>
            <Paper variant="outlined" sx={{ borderRadius: '10px', p: 2 }}>
                <Box component="section" sx={{ mt: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: "600" }}>{name}</Typography>
                    <Typography variant="subtitle1" color="grey.500">{fullText ? details : details.slice(0, 150)} ...</Typography>
                    {
                        fullText ?
                            (<Button variant="text" size="small" onClick={() => setFullText(false)}>See Less</Button>)
                            : (<Button variant="text" size="small" onClick={() => setFullText(true)}>See More</Button>)
                    }
                </Box>
                {/* lessons section*/}
                <Box>
                    <Grid container spacing={2} sx={{ mt: 3, }}>
                        {lessons.map((lesson) => (
                            <Grid size={12}>
                                <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: "600" }}>{lesson.number}: {lesson?.name}</Typography>
                                {/* assignments */}
                                {
                                    lesson?.assignments.length > 0 && (
                                        <Box>
                                            {lesson?.assignments.map((assignment, index) => (
                                                <>
                                                    <Card variant="outlined"
                                                        sx={{ display: "flex", alignItems: "center", gap: 2, mt: 0.8, px: 1.5, py: 0.8, borderRadius: 2 }}>
                                                        <Box>
                                                            <img src={assignment_icon} style={{ width: "24px", height: "24px" }} />
                                                        </Box>
                                                        <Box>
                                                            <Typography variant="h6" sx={{ fontSize: "14px", fontWeight: "600" }} color="#475467">Assignment {index + 1}</Typography>
                                                            <Typography variant="subtitle1" sx={{ fontSize: "14px", fontWeight: "500" }} color="#475467">{assignment?.assignmentNo}</Typography>
                                                        </Box>
                                                    </Card>
                                                </>
                                            ))}
                                        </Box>)
                                }
                                {/* record classes */}
                                {
                                    lesson?.recodedClasses.length > 0 && (
                                        <Box>
                                            {lesson?.recodedClasses.map((recordClass, index) => (
                                                <>
                                                    <Card variant="outlined"
                                                        sx={{ display: "flex", alignItems: "center", gap: 2, mt: 0.8, px: 1.5, py: 0.8, borderRadius: 2 }}>
                                                        <Box>
                                                            <img src={video_icon} style={{ width: "24px", height: "24px" }} />
                                                        </Box>
                                                        <Box>
                                                            <Typography variant="h6" sx={{ fontSize: "14px", fontWeight: "600" }} color="#475467">Record Class {index + 1}</Typography>
                                                            <Typography variant="subtitle1" sx={{ fontSize: "14px", fontWeight: "500" }} color="#475467">{recordClass?.recodeClassName}</Typography>
                                                        </Box>
                                                    </Card>
                                                </>
                                            ))}
                                        </Box>)
                                }
                                {/* resources */}
                                {
                                    lesson?.resources.length > 0 && (
                                        <Box>
                                            {lesson?.resources.map((resource, index) => (
                                                <>
                                                    <Card variant="outlined"
                                                        sx={{ display: "flex", alignItems: "center", gap: 2, mt: 0.8, px: 1.5, py: 0.8, borderRadius: 2 }}>
                                                        <Box>
                                                            <img src={resource_icon} style={{ width: "24px", height: "24px" }} />
                                                        </Box>
                                                        <Box>
                                                            <Typography variant="h6" sx={{ fontSize: "14px", fontWeight: "600" }} color="#475467">Resource {index + 1}</Typography>
                                                            <Typography variant="subtitle1" sx={{ fontSize: "14px", fontWeight: "500" }} color="#475467">{resource?.name}</Typography>
                                                        </Box>
                                                    </Card>
                                                </>
                                            ))}
                                        </Box>)
                                }
                                {/* tests */}
                                {
                                    lesson?.resources.length > 0 && (
                                        <Box>
                                            {lesson?.tests.map((test, index) => (
                                                <>
                                                    <Card variant="outlined"
                                                        sx={{ display: "flex", alignItems: "center", gap: 2, mt: 0.8, px: 1.5, py: 0.8, borderRadius: 2 }}>
                                                        <Box>
                                                            <img src={test_icon} style={{ width: "24px", height: "24px" }} />
                                                        </Box>
                                                        <Box>
                                                            <Typography variant="h6" sx={{ fontSize: "14px", fontWeight: "600" }} color="#475467">Test {index + 1}</Typography>
                                                            <Typography variant="subtitle1" sx={{ fontSize: "14px", fontWeight: "500" }} color="#475467">{test?.name}</Typography>
                                                        </Box>
                                                    </Card>
                                                </>
                                            ))}
                                        </Box>)
                                }

                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Paper>
        </Box>
    );
};

export default CoursePreview;