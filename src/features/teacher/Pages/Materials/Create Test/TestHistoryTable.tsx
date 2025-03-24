import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Loader from '../../../../../shared/components/Loader';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../../../../redux/hooks';
import { saveTestHistory } from '../../../../../redux/features/course/courseSlice';

interface Column {
    id: 'sl' | 'student_name' | 'student_id' | 'marks' | 'submission_date' | 'action';
    label: string;
    minWidth?: number;
    align?: 'right';
}

const columns: readonly Column[] = [
    { id: 'sl', label: 'Sl', minWidth: 50 },
    { id: 'student_name', label: 'Student Name', minWidth: 170 },
    {
        id: 'student_id',
        label: 'Student ID',
        minWidth: 170,
        align: 'right',
    },
    {
        id: 'marks',
        label: 'Marks',
        minWidth: 100,
        align: 'right',
    },
    {
        id: 'submission_date',
        label: 'Submission Date',
        minWidth: 170,
        align: 'right',
    },
    {
        id: 'action',
        label: 'Action',
        minWidth: 100,
        align: 'right',
    },
];

interface TestHistoryData {
    _id: string;
    student_id: {
        _id: string;
        studentId: string;
        name: string;
    };
    score: number;
    totalScore: number;
    createdAt: string;
}

export default function TestHistoryTable({ testHistoryData, isLoading }: { testHistoryData: any; isLoading: boolean; }) {
    const dispatch = useAppDispatch();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    if (isLoading) {
        return <Loader />;
    }

    const handleViewAnswers = (id: string) => {
        console.log('View answers for test history ID:', id);
        // Implement your view answers logic here
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // Extract the data array from the API response
    console.log('from testHistory table', testHistoryData);
    const rows = testHistoryData || [];
    const totalRows = rows.length;

    return (
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
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row: TestHistoryData, index: number) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                                        <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                        <TableCell>{row.student_id.name}</TableCell>
                                        <TableCell align="right">{row.student_id.studentId}</TableCell>
                                        <TableCell align="right">{`${row.score}/${row.totalScore}`}</TableCell>
                                        <TableCell align="right">
                                            {format(new Date(row.createdAt), 'dd MMM yyyy, hh:mm a')}
                                        </TableCell>
                                        <TableCell align="right">
                                            <Link to={`/teacher/answer-sheet/${row._id}`}>
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    onClick={() => dispatch(saveTestHistory({ history: row }))}
                                                >
                                                    View Answers
                                                </Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={totalRows}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}