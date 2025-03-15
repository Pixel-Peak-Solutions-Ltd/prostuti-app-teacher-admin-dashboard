import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography } from '@mui/material';

// Define the type for the row data
interface CourseRow {
  id: number;
  name: string;
  price: string;
}

const TopSellingCourses: React.FC = () => {
  // Define the rows with the CourseRow type
  const rows: CourseRow[] = [
    { id: 1, name: 'Apple iPhone 13', price: '$999.29' },
    { id: 2, name: 'Apple iPhone 13', price: '$999.29' },
    { id: 3, name: 'Apple iPhone 13', price: '$999.29' },
    { id: 4, name: 'Apple iPhone 13', price: '$999.29' },
    { id: 5, name: 'Apple iPhone 13', price: '$999.29' },
    { id: 6, name: 'Apple iPhone 13', price: '$999.29' },
    { id: 7, name: 'Apple iPhone 13', price: '$999.29' },
    { id: 8, name: 'Apple iPhone 13', price: '$999.29' },
    { id: 9, name: 'Apple iPhone 13', price: '$999.29' },
    { id: 10, name: 'Apple iPhone 13', price: '$999.29' },
  ];

  return (
    <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1, boxShadow: 1 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: "600" }}>
        Top Selling Course
      </Typography>
      <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
        <Table sx={{ minWidth: 200 }} aria-label="top selling courses table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', borderBottom: 'none' }}>Course</TableCell>
              <TableCell sx={{ fontWeight: 'bold', borderBottom: 'none', textAlign: 'right' }}>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 }, borderBottom: '1px solid #e7e7e7' }}
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