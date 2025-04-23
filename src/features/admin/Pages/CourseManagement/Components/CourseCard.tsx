import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface CourseCardProps {
  course: {
    id: number;
    title: string;
    image: string;
  };
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <Link
      to={`/admin/course-approved/${course.id}`}
      style={{ textDecoration: "none" }}
    >
      <Card>
        <CardMedia
          component="img"
          height="140"
          image={course.image}
          alt={course.title}
        />
        <CardContent>
          <Typography
            sx={{ fontSize: "16px" }}
            gutterBottom
            variant="h6"
            component="div"
          >
            {course.title}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};
