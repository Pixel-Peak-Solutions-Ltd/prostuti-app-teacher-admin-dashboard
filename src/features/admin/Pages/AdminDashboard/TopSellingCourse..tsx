import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
} from "@mui/material";
import { useGetTopSellingCoursesQuery } from "../../../../redux/features/adminDashboard/adminDashboardApi";
import Loader from "../../../../shared/components/Loader";

// Define the type for the row data
interface CourseRow {
  id: number;
  name: string;
  price: string;
}

const TopSellingCourses: React.FC = () => {
  const { data, isLoading } = useGetTopSellingCoursesQuery({});

  if (isLoading) {
    return <Loader />;
  }

  // Convert price to "999.29 TK"
  const rows: CourseRow[] =
    data.data.length === 0
      ? []
      : data?.data.map((row) => ({
          ...row,
          price: row.price + " TK",
        }));

  return (
    <Box
      sx={{ p: 2, bgcolor: "background.paper", borderRadius: 1, boxShadow: 1 }}
    >
      <Typography variant="h5" gutterBottom sx={{ fontWeight: "600" }}>
        Top Selling Course
      </Typography>
      <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
        <Table sx={{ minWidth: 200 }} aria-label="top selling courses table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", borderBottom: "none" }}>
                Course
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  borderBottom: "none",
                  textAlign: "right",
                }}
              >
                Price
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  borderBottom: "1px solid #e7e7e7",
                }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TopSellingCourses;
