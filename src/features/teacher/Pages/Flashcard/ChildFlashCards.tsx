import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, IconButton, Box, Button, Typography, SnackbarCloseReason } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteChildFlashcardsMutation, useGetChildFlashcardsQuery } from "../../../../redux/features/flashcard/flashcardApi";
import Loader from "../../../../shared/components/Loader";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteConfirmation from "../../../../shared/components/DeleteConfirmation";
import Alert from "../../../../shared/components/Alert";
import { hasDataProperty } from "../../../../utils/TypeGuardForErrorMessage";

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
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [childFlashcardId, setChildFlashcardId] = useState<string>('');
    const [open, setOpen] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    // fetching child flashcards
    const { data, isLoading } = useGetChildFlashcardsQuery({ flashcardId });
    // delete child flashcard function from redux
    const [deleteChildFlashcards, { isLoading: flashcardDeleteLoading, isSuccess, error }] = useDeleteChildFlashcardsMutation();
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    // table pages function
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    if (isLoading) {
        return <Loader />;
    }

    const rows = data?.data.items || [];
    const totalRows = rows.length;

    //*delete confirmation functions
    const handleDeleteClickOpen = () => {
        setOpen(true);
    };

    const handleDeleteClose = () => {
        setOpen(false);
    };



    //! close snackbar automatically
    const handleCloseSnackbar = (
        event: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason
    ) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    //*go back functionality
    const handleGoBack = () => {
        navigate('/teacher/flashcard');
    };

    //^handle delete from database

    const deleteChildFlashCard = async (id: string) => {
        await deleteChildFlashcards(id);
        setChildFlashcardId('');
        setOpenSnackbar(true);
    };

    console.log('child flashcards', rows);
    return (
        <>
            {/* table section */}
            <Box sx={{ width: '100%', height: 'auto' }}>
                <Paper variant="outlined" sx={{ width: '100%', height: '100%', borderRadius: '10px', p: 3 }}>
                    <Box component="section" sx={{ display: 'flex', gap: '20px', justifyContent: 'flex-start', alignItems: 'center', mb: 3 }}>
                        <Button variant='outlined' sx={{ width: '36px', height: '36px', borderRadius: '8px', borderColor: "grey.700", color: "#3F3F46" }}
                            onClick={handleGoBack}
                        >
                            <ArrowBackIcon fontSize='small' />
                        </Button>
                        <Typography variant='h3'>{data?.data.title}</Typography>
                    </Box>
                    {/* child flashcard table starts*/}
                    {
                        !flashcardDeleteLoading ? (
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
                                                                <IconButton aria-label="add an alarm">
                                                                    <DriveFileRenameOutlineOutlinedIcon />
                                                                </IconButton>
                                                                <IconButton aria-label="add an alarm"
                                                                    onClick={() => {
                                                                        handleDeleteClickOpen();
                                                                        setChildFlashcardId(row._id);
                                                                    }}
                                                                >
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
                        ) : (<Loader />)
                    }

                </Paper>
                {/* delete confirmation modal */}
                <DeleteConfirmation
                    type="flashcard"
                    id={childFlashcardId}
                    deleteFunction={deleteChildFlashCard}
                    handleDeleteClose={handleDeleteClose}
                    open={open}
                />
                {/* delete alert */}
                {hasDataProperty(error) && (
                    <Alert
                        message={error?.data.message}
                        openSnackbar={openSnackbar}
                        autoHideDuration={5000}
                        handleCloseSnackbar={handleCloseSnackbar}
                        isSuccess={isSuccess}
                    />
                )}
            </Box>
        </>
    );
};

export default ChildFlashCards;