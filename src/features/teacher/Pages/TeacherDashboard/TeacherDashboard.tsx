import { Box, Container, Grid, Paper } from "@mui/material";
import { useGetCourseByTeacherQuery } from "../../../../redux/features/course/courseApi";
import { RootState } from "../../../../redux/store"; // Added missing import
import Loader from "../../../../shared/components/Loader";
import { TUser } from "../../../../types/types";
import CourseCreationScreen from "../Course/CourseCreationScreen";
import { useAppSelector } from "../Materials/Create Test";
import RecentFlashcards from "./RecentFlashcards";
import MyCoursesSection from "./MyCoursesSection";
import TopPerformanceSection from "./TopPerformanceSection";
import UpcomingSection from "./UpcomingSection";

const TeacherDashboard = () => {
  const user = useAppSelector((state: RootState) => state.auth.user as TUser);
  const { data: teacherCourses, isLoading: teacherLoader } =
    useGetCourseByTeacherQuery(
      {},
      { skip: user.role === "admin" } // Skip this query if user is admin
    );

  // Check loading state for the active query
  if (teacherLoader) {
    return <Loader />;
  }

  return (
    <Box
      sx={{
        width: "100%",
        // height: teacherCourses.length > 6 ? "auto" : "100vh",
        height: "auto",
      }}
    >
      <Paper
        variant="outlined"
        sx={{
          width: "100%",
          // height: teacherCourses.length > 6 ? "100%" : "100vh",
          height: "100%",
          borderRadius: "10px",
          p: 3,
        }}
      >
        {teacherCourses.data.length > 0 ? (
          <>
            <Container maxWidth="xl">
              <MyCoursesSection />

              <Grid container spacing={4}>
                <Grid item xs={12} lg={8}>
                  <TopPerformanceSection />
                </Grid>

                <Grid item xs={12} lg={4}>
                  <UpcomingSection />
                </Grid>
              </Grid>
            </Container>
          </>
        ) : (
          // <Courses courses={courses} />
          <CourseCreationScreen />
        )}

        <Container maxWidth="xl">
          <RecentFlashcards />
        </Container>
      </Paper>
    </Box>
  );
};

export default TeacherDashboard;
