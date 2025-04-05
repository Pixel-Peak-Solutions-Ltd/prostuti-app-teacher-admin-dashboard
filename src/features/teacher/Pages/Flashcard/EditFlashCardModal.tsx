import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";
import { CustomLabel, CustomTextField } from "../Materials/Create Test";

interface EditFlashcardModalProps {
    open: boolean;
    onClose: () => void;
    onSave: (data: { items: Array<{ id: string; term: string; answer: string; }>; }) => void;
    flashcard: {
        _id: string;
        term: string;
        answer: string;
    } | null;
}

const EditFlashcardModal = ({ open, onClose, onSave, flashcard }: EditFlashcardModalProps) => {
    const [flashCardDetails, setFlashCardDetails] = useState<Record<string, string>>({});

    // when component loads it automatically populate the state with flashcard data
    useEffect(() => {
        if (flashcard) {
            setFlashCardDetails(flashcard);
        }
    }, [flashcard]);

    // handle input changes and update the state accordingly
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFlashCardDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        if (flashcard) {
            onSave({
                items: [
                    {
                        id: flashcard._id,
                        term: flashCardDetails.term,
                        answer: flashCardDetails.answer,
                    },
                ],
            });
        }
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                Edit Flashcard
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <CustomLabel fieldName="Term" />
                <CustomTextField
                    name="term"
                    type="text"
                    autoFocus
                    value={flashCardDetails.term || ""}
                    handleInput={handleInputChange}
                />
                <CustomLabel fieldName="Answer" />
                <CustomTextField
                    name="answer"
                    type="text"
                    value={flashCardDetails.answer || ""}
                    handleInput={handleInputChange}
                    multiline
                    rows={4}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant="outlined" size="small">Cancel</Button>
                <Button onClick={handleSubmit} variant="contained" color="primary" size="small">Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditFlashcardModal;