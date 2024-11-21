import { Snackbar, SnackbarCloseReason } from "@mui/material";

const Alert = ({ openSnackbar, autoHideDuration, handleCloseSnackbar, isSuccess }: { openSnackbar: boolean; autoHideDuration: number; handleCloseSnackbar: (event: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => void; isSuccess: boolean }) => {
    return (
        <Snackbar
            open={openSnackbar}
            autoHideDuration={autoHideDuration}
            onClose={handleCloseSnackbar}
            message={isSuccess ? 'Question added to database successfully!' : 'There was an error'}
        />
    );
};

export default Alert;