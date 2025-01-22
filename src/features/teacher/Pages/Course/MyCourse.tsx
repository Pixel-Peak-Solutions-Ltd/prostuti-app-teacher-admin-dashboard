import { Box, Paper, } from "@mui/material";
import { useGetCourseByTeacherQuery } from "../../../../redux/features/course/courseApi";
import Loader from "../../../../shared/components/Loader";
import CourseCreationScreen from "./CourseCreationScreen";
import Courses from "./Courses";
const MyCourse = () => {
    const { data, isLoading } = useGetCourseByTeacherQuery({});

    if (isLoading) {
        return <Loader />;
    }

    const myCourses = data?.data;
    console.log('All Courses:', data?.data);
    return (
        <>
            <Box sx={{ width: '100%', height: myCourses.length > 6 ? 'auto' : '100vh' }}>
                <Paper variant="outlined" sx={{ width: '100%', height: myCourses.length > 6 ? '100%' : '100vh', borderRadius: '10px', p: 3 }}>
                    {/* top title and button section */}
                    {/* default section when no course is created */}
                    {myCourses.length > 0 ? (<Courses courses={myCourses} />) : <CourseCreationScreen />}
                </Paper>
            </Box>
        </>
    );
};

export default MyCourse;