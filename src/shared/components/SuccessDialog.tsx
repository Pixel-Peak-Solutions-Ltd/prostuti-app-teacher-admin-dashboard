// components/SuccessDialog.tsx
import { Dialog, DialogTitle, DialogActions, Button, Typography, Box } from "@mui/material";

interface SuccessDialogProps {
    open: boolean;
    onClose: () => void;
    message: string;
}

const SuccessDialog: React.FC<SuccessDialogProps> = ({ open, onClose, message }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle>
                <Box display="flex" justifyContent="center">
                    <Typography variant="h6" textAlign="center">{message}</Typography>
                </Box>
            </DialogTitle>
            <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
                <Button onClick={onClose} variant="contained" color="primary">
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SuccessDialog;
