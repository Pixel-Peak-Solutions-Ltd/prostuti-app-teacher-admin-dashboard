import { Box, Divider, Typography } from "@mui/material";

const upcoming = [
  {
    id: 1,
    type: "Assignment",
    title: "BCS ফাইনাল তাত্ত্বিক বিভাগসমূহ স্কুল...",
    date: "January 24, 2024",
  },
  {
    id: 2,
    type: "Assignment",
    title: "BCS ফাইনাল তাত্ত্বিক বিভাগসমূহ স্কুল...",
    date: "January 24, 2024",
  },
  {
    id: 3,
    type: "Assignment",
    title: "BCS ফাইনাল তাত্ত্বিক বিভাগসমূহ স্কুল...",
    date: "January 24, 2024",
  },
];

const UpcomingSection = () => {
  return (
    <Box sx={{ mb: 4, p: 3, border: "1px solid #e0e0e0", borderRadius: "8px" }}>
      <Typography
        variant="h5"
        component="h2"
        sx={{ mb: 2, fontWeight: "bold" }}
      >
        Upcoming
      </Typography>

      {upcoming.map((item) => (
        <Box
          key={item.id}
          sx={{
            mb: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Box
            sx={{
              bgcolor: "#3182F6",
              color: "white",
              px: 2,
              py: 0.5,
              borderRadius: "4px",
              alignSelf: "flex-start",
            }}
          >
            <Typography variant="body2">{item.type}</Typography>
          </Box>
          <Typography variant="body2" sx={{ fontWeight: "medium" }}>
            {item.title}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {item.date}
          </Typography>
          <Divider sx={{ mt: 1 }} />
        </Box>
      ))}
    </Box>
  );
};

export default UpcomingSection;
