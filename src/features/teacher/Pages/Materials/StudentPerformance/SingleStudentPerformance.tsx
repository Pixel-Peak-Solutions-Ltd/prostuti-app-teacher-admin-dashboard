import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetStudentPerformanceDetailsQuery } from '../../../../../redux/features/course/courseApi';
import { Loader, useAppSelector } from '../Create Test';
import { Box, Paper, Typography, Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface Column {
    id: 'sl' | 'student_name' | 'student_id' | 'total_marks' | 'tests' | 'test_marks';
    label: string;
    minWidth?: number;
    align?: 'right';
}

const columns: readonly Column[] = [
    { id: 'sl', label: 'SL', minWidth: 50 },
    { id: 'student_name', label: 'Student Name', minWidth: 170 },
    {
        id: 'student_id',
        label: 'Student ID',
        minWidth: 170,
        align: 'right',
    },
    {
        id: 'total_marks',
        label: 'Total Marks',
        minWidth: 120,
        align: 'right',
    },
    {
        id: 'tests',
        label: 'Tests',
        minWidth: 100,
        align: 'right',
    },
    {
        id: 'test_marks',
        label: 'Test Marks',
        minWidth: 120,
        align: 'right',
    },
];

interface TestPerformanceData {
    _id: string;
    studentName: string;
    title: string;
    totalMarks: string;
    studentMarks: string;
}

const SingleStudentPerformance = () => {
    const { course_id } = useAppSelector((state) => state.courseAndLessonId.id);
    const { studentId } = useParams();
    const navigate = useNavigate();
    const { data, isLoading } = useGetStudentPerformanceDetailsQuery({ studentId, courseId: course_id });
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    if (isLoading) {
        return <Loader />;
    }

    const performanceData = data?.data || [];

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Box sx={{ width: '100%', height: 'auto' }}>
            <Paper variant="outlined" sx={{ width: '100%', height: 'auto', borderRadius: '10px', p: 3 }}>
                {/* Back button and title section */}
                <Box component="section" sx={{ display: 'flex', gap: '20px', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Box component="section" sx={{ display: 'flex', gap: '20px' }}>
                        <Button
                            variant='outlined'
                            sx={{ width: '36px', height: '36px', minWidth: '36px', borderRadius: '8px', borderColor: "grey.700", color: "#3F3F46" }}
                            onClick={() => navigate(-1)}
                        >
                            <ArrowBackIcon fontSize='small' />
                        </Button>
                        <Typography variant='h3'>{performanceData[0].studentName}</Typography>
                    </Box>
                </Box>

                <Paper variant="outlined" sx={{ width: '100%', overflow: 'hidden', borderRadius: '10px' }}>
                    <TableContainer sx={{ maxHeight: '70vh' }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {performanceData
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row: TestPerformanceData, index: number) => (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                                            <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                            <TableCell>{row.studentName || 'N/A'}</TableCell>
                                            <TableCell align="right">{row._id || 'N/A'}</TableCell>
                                            <TableCell align="right">{row.totalMarks || 0}</TableCell>
                                            <TableCell align="right">{row.title || 0}</TableCell>
                                            <TableCell align="right">{row.studentMarks || 0}</TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={performanceData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Paper>
        </Box>
    );
};

export default SingleStudentPerformance; 