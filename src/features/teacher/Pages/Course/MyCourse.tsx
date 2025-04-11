import { Box, Paper, Typography, } from "@mui/material";
import { useGetCourseByTeacherQuery, useGetCourseForAdminEndQuery } from "../../../../redux/features/course/courseApi";
import Loader from "../../../../shared/components/Loader";
import CourseCreationScreen from "./CourseCreationScreen";
import Courses from "./Courses";
import { useAppSelector } from "../Materials/Create Test";
import { TUser } from "../../../../types/types";
import { RootState } from "../../../../redux/store"; // Added missing import

const MyCourse = () => {
    const user = useAppSelector((state: RootState) => state.auth.user as TUser);

    // Only execute the relevant query based on user role
    const { data: adminCourses, isLoading: adminLoader } = useGetCourseForAdminEndQuery(
        {},
        { skip: user.role !== "admin" } // Skip this query if user is not admin
    );

    const { data: teacherCourses, isLoading: teacherLoader } = useGetCourseByTeacherQuery(
        {},
        { skip: user.role === "admin" } // Skip this query if user is admin
    );

    // Check loading state for the active query
    if ((user.role === "admin" && adminLoader) || (user.role !== "admin" && teacherLoader)) {
        return <Loader />;
    }

    // Select the appropriate courses based on user role
    // Make sure we have an array even if the data is undefined
    const adminCoursesData = adminCourses?.data.courses || [];
    const teacherCoursesData = teacherCourses?.data || [];

    // Select the appropriate courses based on user role
    const courses = user.role === "admin" ? adminCoursesData : teacherCoursesData;

    // Debug course data
    console.log('Courses:', courses.courses);
    console.log('Course count:', courses.length);
    console.log('Show courses?', courses.length > 0);

    return (
        <>
            <Box sx={{ width: '100%', height: courses.length > 6 ? 'auto' : '100vh' }}>
                <Paper variant="outlined" sx={{ width: '100%', height: courses.length > 6 ? '100%' : '100vh', borderRadius: '10px', p: 3 }}>
                    {/* top title and button section */}
                    {/* default section when no course is created */}
                    {courses.length > 0 ? (
                        <Courses courses={courses} />
                    ) : (
                        <CourseCreationScreen />
                    )}
                </Paper>
            </Box>
        </>
    );
};

export default MyCourse;