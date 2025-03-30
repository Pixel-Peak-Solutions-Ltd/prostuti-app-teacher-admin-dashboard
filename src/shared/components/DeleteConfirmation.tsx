/* eslint-disable @typescript-eslint/no-explicit-any */
import { Backdrop, DialogContentText, DialogTitle } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

type PropTypes = {
    deleteFunction?: (id: string) => void;
    handleDeleteClose: () => void;
    open: boolean;
    id: string;
    type: string;
};

const CustomBackdrop = (props: any) => {
    return (
        <Backdrop
            {...props}
            sx={{
                backgroundColor: 'rgba(100, 100, 100, 0.1)',
                backdropFilter: 'blur(1px)',
            }}
        />
    );
};
const DeleteConfirmation = ({ type, handleDeleteClose, open, deleteFunction, id }: PropTypes) => {
    console.log('Deletable id from delete dialog:', id);
    return (
        <>
            <Dialog
                open={open}
                onClose={handleDeleteClose}
                aria-labelledby="responsive-dialog-title"
                slots={{ backdrop: CustomBackdrop }}
                PaperProps={{
                    sx: {
                        boxShadow: 'none'
                    }
                }}
            >
                <DialogTitle id="responsive-dialog-title">
                    {
                        type === 'question' ? "Delete Question?" : "Delete?"
                    }
                </DialogTitle>
                <DialogContent>
                    {
                        type === 'question' ? (
                            <DialogContentText>
                                Are you sure to delete the question from the database permanently?
                            </DialogContentText>
                        ) : (
                            <DialogContentText>
                                Are you sure you want to delete?
                            </DialogContentText>
                        )
                    }

                </DialogContent>
                <DialogActions>
                    <Button
                        autoFocus
                        onClick={handleDeleteClose}
                        size='small'
                        sx={{ borderRadius: '6px', fontSize: '14px' }}
                    >
                        No
                    </Button>
                    <Button
                        onClick={() => {
                            handleDeleteClose();
                            deleteFunction(id);
                        }}
                        autoFocus
                        sx={{ borderRadius: '6px', fontSize: '14px', backgroundColor: '#e91e63' }}
                        size='small'
                    >
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DeleteConfirmation;