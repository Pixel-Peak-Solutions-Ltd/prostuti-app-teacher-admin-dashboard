import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, IconButton, Box } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetChildFlashcardsQuery } from "../../../../redux/features/flashcard/flashcardApi";
import Loader from "../../../../shared/components/Loader";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';

interface Column {
    id: 'sl' | 'question' | 'answer' | 'action';
    label: string;
    minWidth?: number;
    align?: 'right';
}

const columns: readonly Column[] = [
    { id: 'sl', label: 'Sl', minWidth: 50 },
    { id: 'question', label: 'Question', minWidth: 170, },
    { id: 'answer', label: 'Answer', minWidth: 170, align: 'right' },
    { id: 'action', label: 'Action', minWidth: 100, align: 'right' },
];

const ChildFlashCards = () => {
    const { flashcardId } = useParams();
    const { data, isLoading } = useGetChildFlashcardsQuery({ flashcardId });
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    if (isLoading) {
        return <Loader />;
    }

    const rows = data?.data.items || [];
    const totalRows = rows.length;

    console.log('child flashcards', rows);
    return (
        <>
            {/* table section */}
            <Box sx={{ width: '100%', height: 'auto' }}>
                <Paper variant="outlined" sx={{ width: '100%', height: '100%', borderRadius: '10px', p: 3 }}>
                    <Box sx={{ width: "auto" }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Box >
                                <h2 style={{ fontSize: "30px", lineHeight: "38px", color: "#3F3F46" }}>{data?.data.title}</h2>
                            </Box>
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
                                    {rows
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index: number) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                                                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                                    <TableCell>{row?.term || ''}</TableCell>
                                                    <TableCell align="right">{row?.answer || ''}</TableCell>
                                                    <TableCell align="right">
                                                        <IconButton color="primary" aria-label="add an alarm">
                                                            <DriveFileRenameOutlineOutlinedIcon />
                                                        </IconButton>
                                                        <IconButton color="secondary" aria-label="add an alarm">
                                                            <DeleteForeverOutlinedIcon />
                                                        </IconButton>
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
                </Paper>
            </Box>
        </>
    );
};

export default ChildFlashCards;