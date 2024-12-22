import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import { CourseCard } from './Components/CourseCard';

const courses = [
  {
    id: 1,
    title: 'BCS কোর্স ৪র্থ বর্ষ সমাপনী পরীক্ষা প্রস্তুতি',
    image: 'https://fps.cdnpk.net/images/home/subhome-ai.webp?w=649&h=649',
  },
  {
    id: 2,
    title: 'BCS কোর্স ৪র্থ বর্ষ সমাপনী পরীক্ষা প্রস্তুতি',
    image: 'https://fps.cdnpk.net/images/home/subhome-ai.webp?w=649&h=649',
  },
  {
    id: 3,
    title: 'BCS কোর্স ৪র্থ বর্ষ সমাপনী পরীক্ষা প্রস্তুতি',
    image: 'https://fps.cdnpk.net/images/home/subhome-ai.webp?w=649&h=649',
  },
];

const CourseDashboard: React.FC = () => {
  return (
    <Box p={4}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4">Course Management</Typography>
        <Box display="flex" gap={2}>
          <Link href="#" variant="body1">
            Published (6)
          </Link>
          <Link href="#" variant="body1">
            Pending (3)
          </Link>
        </Box>
      </Box>
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))"
        gap={3}
      >
        {courses.map((course) => (
          <Box key={course.id}>
            <CourseCard course={course} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CourseDashboard;
