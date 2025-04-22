import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

// Mock data
const courses = [
  {
    _id: 1,
    title: "BCS ফাইনাল তাত্ত্বিক বিভাগসমূহ স্কুল গাইডলাইনস",
    image: {
      path: "https://foundr.com/wp-content/uploads/2023/04/How-to-create-an-online-course.jpg.webp",
    },
  },
  {
    id: 2,
    title: "BCS ফাইনাল তাত্ত্বিক বিভাগসমূহ স্কুল গাইডলাইনস",
    image: {
      path: "https://foundr.com/wp-content/uploads/2023/04/How-to-create-an-online-course.jpg.webp",
    },
  },
  {
    id: 3,
    title: "BCS ফাইনাল তাত্ত্বিক বিভাগসমূহ স্কুল গাইডলাইনস",
    image: {
      path: "https://foundr.com/wp-content/uploads/2023/04/How-to-create-an-online-course.jpg.webp",
    },
  },
];

const CourseCard = ({ course }) => {
  return (
    <Card
      sx={{
        height: "100%",
        position: "relative",
        borderRadius: "8px",
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      <Box
        sx={{
          position: "relative",
          borderRadius: "8px",
        }}
      >
        <CardMedia
          component="img"
          height="140"
          image={course.image.path}
          alt={course.title}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            p: 1.5,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              bgcolor: "white",
              borderRadius: "50px",
              px: 1.5,
              py: 0.5,
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <Box
              sx={{
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                bgcolor: "#f1f1f1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            ></Box>
          </Box>
        </Box>
      </Box>
      <CardContent sx={{ p: 1 }}>
        <Typography
          variant="body2"
          component="div"
          sx={{ fontWeight: "medium" }}
        >
          {course.title}
        </Typography>
      </CardContent>
    </Card>
  );
};

const MyCoursesSection = () => {
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
          My Courses
        </Typography>
        <Typography variant="body2" color="primary" sx={{ cursor: "pointer" }}>
          View all
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <CourseCard course={course} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MyCoursesSection;
