import {
  Avatar,
  Box,
  FormControl,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import FirstIcon from "./../../../../assets/icons/first.svg?react";
import SecondIcon from "./../../../../assets/icons/second.svg?react";
import ThirdIcon from "./../../../../assets/icons/third.svg?react";
import { useGetCourseByTeacherQuery } from "../../../../redux/features/course/courseApi";
import { RootState } from "../../../../redux/store";
import Loader from "../../../../shared/components/Loader";
import { TUser } from "../../../../types/types";
import { useAppSelector } from "../Materials/Create Test";
import { useGetLeaderboardByCourseIdQuery } from "../../../../redux/features/leaderboard/leaderboarApi";

const TopPerformanceSection = () => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const user = useAppSelector((state: RootState) => state.auth.user as TUser);

  const { data: teacherPublishedCourses, isLoading: teacherLoader } =
    useGetCourseByTeacherQuery(
      { isPublished: true },
      { skip: user.role === "admin" } // Skip this query if user is admin
    );

  //Call the top performers API with the selected course ID
  const { data: topPerformersData, isLoading: topPerformersLoading } =
    useGetLeaderboardByCourseIdQuery(
      { courseId: selectedCourse },
      { skip: !selectedCourse } // Skip if no course is selected
    );

  // Auto-select the first course when data is fetched
  useEffect(() => {
    if (teacherPublishedCourses?.data?.length > 0 && !selectedCourse) {
      const firstCourseId = teacherPublishedCourses.data[0]._id;
      setSelectedCourse(firstCourseId);
    }
  }, [teacherPublishedCourses, selectedCourse]);

  // Check loading state for the active query
  if (teacherLoader) {
    return <Loader />;
  }

  const courses = teacherPublishedCourses?.data || [];

  // Use API data or fallback to placeholder data if still loading
  const topPerformers = topPerformersData?.data?.data || [];

  // Function to get the appropriate rank icon based on index
  const getRankIcon = (index) => {
    switch (index) {
      case 0:
        return <FirstIcon />;
      case 1:
        return <SecondIcon />;
      case 2:
        return <ThirdIcon />;
      default:
        return null; // Return null for ranks beyond 3rd
    }
  };

  const handleChange = (event) => {
    const courseId = event.target.value;
    setSelectedCourse(courseId);
    // The API will be called automatically via the query hook when selectedCourse changes
  };

  return (
    <Box sx={{ mb: 4, p: 3, border: "1px solid #e0e0e0", borderRadius: "8px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h5" component="h2" sx={{ fontWeight: "bold" }}>
          Top Performers
        </Typography>

        <Link to="/teacher/dashboard" style={{ textDecoration: "none" }}>
          <Typography
            variant="body2"
            color="primary"
            sx={{ cursor: "pointer" }}
          >
            View all
          </Typography>
        </Link>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Course
        </Typography>
        <FormControl fullWidth variant="outlined" size="small">
          <Select
            value={selectedCourse}
            onChange={handleChange}
            displayEmpty
            sx={{ borderRadius: "8px" }}
          >
            {courses.map((course) => (
              <MenuItem key={course._id} value={course._id}>
                <Typography variant="body2">
                  {course.name.length > 60
                    ? course.name.slice(0, 60) + "..."
                    : course.name}
                </Typography>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {topPerformersLoading ? (
        <Box sx={{ py: 2, display: "flex", justifyContent: "center" }}>
          <Loader />
        </Box>
      ) : (
        topPerformers.map((performer, index) => (
          <Paper
            key={performer.id}
            elevation={0}
            sx={{
              p: 2,
              mb: 1.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              border: "1px solid #f0f0f0",
              borderRadius: "8px",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box position="relative" sx={{ display: "flex" }}>
                {index < 3 && (
                  <Box sx={{ marginRight: 1 }}>{getRankIcon(index)}</Box>
                )}
                <Avatar sx={{ width: 40, height: 40 }}>
                  <img
                    alt="Student"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    src={performer.student_id?.image?.path}
                  />
                </Avatar>
              </Box>
              <Typography variant="body2">
                {performer.student_id.name}
              </Typography>
            </Box>
            <Typography variant="body2" fontWeight="bold">
              {performer.totalScore} Points
            </Typography>
          </Paper>
        ))
      )}
    </Box>
  );
};

export default TopPerformanceSection;
