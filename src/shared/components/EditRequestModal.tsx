import { useState } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Box,
    TextField,
    IconButton,
    Typography,
    Snackbar
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useParams } from 'react-router-dom';

interface EditRequestModalProps {
    open: boolean;
    onClose: () => void;
    resourceType: 'Assignment' | 'RecordedClass' | 'Resource' | 'Notice' | 'Test';
}

const EditRequestModal = ({ open, onClose, resourceType }: EditRequestModalProps) => {
    const [requestDescription, setRequestDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const { assignmentId, recordId, resourceId, noticeId, testId } = useParams<{
        assignmentId?: string;
        recordId?: string;
        resourceId?: string;
        noticeId?: string;
        testId?: string;
    }>();

    // Determine which ID to use based on the resource type
    const getResourceId = () => {
        switch (resourceType) {
            case 'Assignment':
                return assignmentId;
            case 'RecordedClass':
                return recordId;
            case 'Resource':
                return resourceId;
            case 'Notice':
                return noticeId;
            case 'Test':
                return testId;
            default:
                return null;
        }
    };

    // const resourceId = getResourceId();

    const handleSubmit = async () => {
        if (!requestDescription.trim()) return;

        setIsSubmitting(true);

        try {
            // This would be replaced with your actual API call
            // For example:
            // await sendEditRequest({
            //   resourceType,
            //   resourceId,
            //   message: requestDescription
            // });

            console.log('Sending edit request:', {
                resourceType,
                resourceId,
                message: requestDescription
            });

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            setShowSuccessMessage(true);
            setRequestDescription('');
            setTimeout(() => {
                onClose();
                setShowSuccessMessage(false);
            }, 1500);
        } catch (error) {
            console.error('Error sending edit request:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle sx={{ p: 2 }}>
                    <Box display="flex" alignItems="center" gap={2}>
                        <IconButton
                            edge="start"
                            onClick={onClose}
                            aria-label="back"
                            sx={{ p: 0.5 }}
                        >
                            <ArrowBackIcon />
                        </IconButton>
                        <Typography variant="h6">
                            Request to edit {resourceType.toLowerCase()} {resourceId}
                        </Typography>
                    </Box>
                </DialogTitle>

                <DialogContent sx={{ p: 2, pt: 0 }}>
                    <Box mb={1}>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                            Request Description
                        </Typography>
                    </Box>
                    <TextField
                        autoFocus
                        multiline
                        rows={6}
                        fullWidth
                        value={requestDescription}
                        onChange={(e) => setRequestDescription(e.target.value)}
                        placeholder="Write your request description details here..."
                        variant="outlined"
                    />

                    <Box mt={2}>
                        <Typography variant="caption" color="textSecondary">
                            Note: Question will be deleted automatically after 3 days.
                        </Typography>
                    </Box>
                </DialogContent>

                <DialogActions sx={{ p: 2, pt: 0 }}>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting || !requestDescription.trim()}
                    >
                        Send Request
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={showSuccessMessage}
                aria-describedby="success-dialog-description"
                maxWidth="xs"
                fullWidth
            >
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    p={3}
                >
                    <Box
                        sx={{
                            bgcolor: 'primary.main',
                            borderRadius: '50%',
                            width: 48,
                            height: 48,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            mb: 2
                        }}
                    >
                        <Box
                            component="svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#ffffff"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </Box>
                    </Box>
                    <Typography variant="h6" id="success-dialog-description">
                        Request Sent Successfully
                    </Typography>
                </Box>
            </Dialog>
        </>
    );
};

export default EditRequestModal;