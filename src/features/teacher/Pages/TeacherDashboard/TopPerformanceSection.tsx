import {
  Avatar,
  Box,
  FormControl,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { useState } from "react";
import FirstIcon from "./../../../../assets/icons/first.svg?react";
// import SecondIcon from "./../../../../assets/icons/second.svg?react";
// import ThirdIcon from "./../../../../assets/icons/third.svg?react";

const topPerformers = [
  { id: 1, name: "Minhazur Rahman", points: 2500, rank: 1 },
  { id: 2, name: "Minhazur Rahman", points: 2500, rank: 2 },
  { id: 3, name: "Minhazur Rahman", points: 2500, rank: 3 },
];

const TopPerformanceSection = () => {
  const [selectedCourse, setSelectedCourse] = useState("");

  const handleChange = (event) => {
    setSelectedCourse(event.target.value);
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

        <Typography variant="body2" color="primary" sx={{ cursor: "pointer" }}>
          View all
        </Typography>
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
            <MenuItem value="">
              <Typography variant="body2">
                BCS ফাইনাল তাত্ত্বিক বিভাগসমূহ স্কুল গাইডলাইনস
              </Typography>
            </MenuItem>
            <MenuItem value="">
              <Typography variant="body2">
                BCS ফাইনাল তাত্ত্বিক বিভাগসমূহ স্কুল গাইডলাইনস
              </Typography>
            </MenuItem>
            <MenuItem value="">
              <Typography variant="body2">
                BCS ফাইনাল তাত্ত্বিক বিভাগসমূহ স্কুল গাইডলাইনস
              </Typography>
            </MenuItem>
            {/* Add more courses as needed */}
          </Select>
        </FormControl>
      </Box>

      {topPerformers.map((performer) => (
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
              <Box sx={{ marginRight: 1 }}>
                <FirstIcon />
              </Box>
              <Avatar sx={{ width: 40, height: 40 }}>MR</Avatar>
            </Box>
            <Typography variant="body2">{performer.name}</Typography>
          </Box>
          <Typography variant="body2" fontWeight="bold">
            {performer.points} Points
          </Typography>
        </Paper>
      ))}
    </Box>
  );
};

export default TopPerformanceSection;
