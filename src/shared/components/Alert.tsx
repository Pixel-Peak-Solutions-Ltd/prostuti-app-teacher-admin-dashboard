import { Snackbar, SnackbarCloseReason } from "@mui/material";

const Alert = ({ openSnackbar, autoHideDuration, handleCloseSnackbar, isSuccess, message }: { openSnackbar: boolean; autoHideDuration: number; handleCloseSnackbar: (event: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => void; isSuccess: boolean; message?: string }) => {
    return (
        <Snackbar
            open={openSnackbar}
            autoHideDuration={autoHideDuration}
            onClose={handleCloseSnackbar}
            message={isSuccess ? 'Question added to database successfully!' : (`${message}` || 'There was a problem')}
        />
    );
};

export default Alert;