import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { useState } from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import ArrowOutwardOutlinedIcon from '@mui/icons-material/ArrowOutwardOutlined';

interface Column {
    id: 'sl' | 'title' | 'total_cards' | 'created_by' | 'created_on' | 'explore';
    label: string;
    minWidth?: number;
    align?: 'right';
}

const columns: readonly Column[] = [
    { id: 'sl', label: 'Sl', minWidth: 50 },
    { id: 'title', label: 'Flashcard', minWidth: 170 },
    { id: 'created_by', label: 'Created by', minWidth: 170, align: 'right' },
    { id: 'created_on', label: 'Created on', minWidth: 100, align: 'right' },
    { id: 'explore', label: 'Explore', minWidth: 100, align: 'right' },
];

interface TFlashCardData {
    _id: string;
    title: string;
    studentId: {
        _id: string;
        studentId: string;
        name: string;
    };
    totalScore: number;
    createdAt: string;
}

const PublishedFlashCards = ({ cards }: { cards: any; }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const rows = cards || [];
    const totalRows = rows.length;

    console.log(cards);

    return (
        <>
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
                                .map((row: TFlashCardData, index: number) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                                            <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                            <TableCell>{row.title}</TableCell>
                                            <TableCell>{row.studentId.name}</TableCell>
                                            <TableCell align="right">
                                                {format(new Date(row.createdAt), 'dd MMM yyyy, hh:mm a')}
                                            </TableCell>
                                            <TableCell align="right">
                                                <Link to={`/teacher/flashcard/${row._id}`}>
                                                    <IconButton color="primary" aria-label="add an alarm">
                                                        <ArrowOutwardOutlinedIcon />
                                                    </IconButton>
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
        </>
    );
};

export default PublishedFlashCards;