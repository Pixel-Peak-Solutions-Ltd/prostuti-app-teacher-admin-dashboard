import React from 'react';
import { useGetAllStudentPerformanceQuery } from '../../../../../redux/features/course/courseApi';
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
import { useNavigate } from 'react-router-dom';

interface Column {
    id: 'sl' | 'student_name' | 'student_id' | 'test_attendance' | 'assignment_submitted' | 'action';
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
        id: 'test_attendance',
        label: 'Test Attendance',
        minWidth: 120,
        align: 'right',
    },
    {
        id: 'assignment_submitted',
        label: 'Assignment Submitted',
        minWidth: 150,
        align: 'right',
    },
    {
        id: 'action',
        label: 'Action',
        minWidth: 100,
        align: 'right',
    },
];

interface StudentPerformanceData {
    _id: string;
    student_id: {
        _id: string;
        studentId: string;
        name: string;
    };
    total_tests: number;
    attemptedTests: number;
    attemptedAssignments: number;
}

const StudentPerformanceList = () => {
    const { course_id } = useAppSelector((state) => state.courseAndLessonId.id);
    const { data, isLoading } = useGetAllStudentPerformanceQuery({ courseId: course_id });
    const navigate = useNavigate();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    if (isLoading) {
        return <Loader />;
    }

    const studentPerformanceData = data?.data.data || [];
    console.log(studentPerformanceData);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleViewDetails = (studentId: string) => {
        navigate(`/teacher/student-performance/${studentId}`);
    };

    return (
        <Box sx={{ width: '100%', height: 'auto' }}>
            <Paper variant="outlined" sx={{ width: '100%', height: 'auto', borderRadius: '10px', p: 3 }}>
                <Box component="section" sx={{ display: 'flex', gap: '20px', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Box component="section" sx={{ display: 'flex', gap: '20px' }}>
                        <Button
                            variant='outlined'
                            sx={{ width: '36px', height: '36px', minWidth: '36px', borderRadius: '8px', borderColor: "grey.700", color: "#3F3F46" }}
                            onClick={() => navigate(-1)}
                        >
                            <ArrowBackIcon fontSize='small' />
                        </Button>
                        <Typography variant='h3'>Student Performance</Typography>
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
                                {studentPerformanceData
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row: StudentPerformanceData, index: number) => (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                                            <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                            <TableCell>{row.student_id?.name || 'N/A'}</TableCell>
                                            <TableCell align="right">{row.student_id?.studentId || 'N/A'}</TableCell>
                                            <TableCell align="right">{row.attemptedTests}</TableCell>
                                            <TableCell align="right">{row.attemptedAssignments || 0}</TableCell>
                                            <TableCell align="right">
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    onClick={() => handleViewDetails(row.student_id?._id)}
                                                >
                                                    View Details
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={studentPerformanceData.length}
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

export default StudentPerformanceList;