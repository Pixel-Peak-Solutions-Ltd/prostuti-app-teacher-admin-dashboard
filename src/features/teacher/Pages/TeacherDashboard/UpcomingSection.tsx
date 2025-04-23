import { Box, Divider, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useGetCourseByTeacherQuery } from "../../../../redux/features/course/courseApi";
import { RootState } from "../../../../redux/store"; // Added missing import
import Loader from "../../../../shared/components/Loader";
import { TUser } from "../../../../types/types";
import { useAppSelector } from "../Materials/Create Test";

function formatMongoDate(mongoDateString: string): string {
  const date = new Date(mongoDateString);

  // Using the correct literal types for DateTimeFormatOptions
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formattedDate = date.toLocaleDateString("en-US", options);

  return formattedDate;
}

const UpcomingSection = () => {
  const user = useAppSelector((state: RootState) => state.auth.user as TUser);
  const { data: teacherCourses, isLoading: teacherLoader } =
    useGetCourseByTeacherQuery(
      { isPublished: false, limit: 3 },
      { skip: user.role === "admin" } // Skip this query if user is admin
    );

  // Check loading state for the active query
  if (teacherLoader) {
    return <Loader />;
  }

  const courses = teacherCourses?.data || [];

  return (
    <Box sx={{ mb: 4, p: 3, border: "1px solid #e0e0e0", borderRadius: "8px" }}>
      <Typography
        variant="h5"
        component="h2"
        sx={{ mb: 2, fontWeight: "bold" }}
      >
        Upcoming
      </Typography>

      {courses.map((item) => (
        <Box
          key={item._id}
          sx={{
            mb: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: "medium" }}>
            {item.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {formatMongoDate(item.createdAt)}
          </Typography>

          <Link
            to={`/teacher/course-preview/${item._id}`}
            style={{ textDecoration: "none", alignSelf: "flex-start" }}
          >
            <Box
              sx={{
                bgcolor: "#3182F6",
                color: "white",
                px: 2,
                py: 0.5,
                borderRadius: "4px",
              }}
            >
              <Typography variant="body2">See Details</Typography>
            </Box>
          </Link>

          <Divider sx={{ mt: 1 }} />
        </Box>
      ))}
    </Box>
  );
};

export default UpcomingSection;
