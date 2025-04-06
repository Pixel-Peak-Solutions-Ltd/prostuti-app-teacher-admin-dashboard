import React, { useState, useRef } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
    Typography,
    IconButton,
    CircularProgress,
    Tooltip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ImageIcon from '@mui/icons-material/Image';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useCreateMessageRequestMutation } from '../../../redux/features/message/messageRequestApi';

interface MessageRequestModalProps {
    open: boolean;
    onClose: () => void;
}

const MessageRequestModal: React.FC<MessageRequestModalProps> = ({ open, onClose }) => {
    const [message, setMessage] = useState('');
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [createMessageRequest, { isLoading }] = useCreateMessageRequestMutation();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async () => {
        if (!message.trim() && selectedFiles.length === 0) return;

        try {
            const formData = new FormData();
            formData.append('content', message.trim());

            // Append files if any
            selectedFiles.forEach(file => {
                formData.append('attachments', file);
            });

            await createMessageRequest(formData).unwrap();

            // Reset form and close modal
            setMessage('');
            setSelectedFiles([]);
            onClose();
        } catch (error) {
            console.error('Error creating message request:', error);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setSelectedFiles(prevFiles => [...prevFiles, ...newFiles]);
        }
    };

    const handleRemoveFile = (index: number) => {
        setSelectedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
            PaperProps={{
                sx: {
                    borderRadius: 2,
                    overflow: 'hidden'
                }
            }}
        >
            <DialogTitle sx={{ bgcolor: '#f5f5f5', p: 2 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">Request Help from Teachers</Typography>
                    <IconButton onClick={onClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>

            <DialogContent sx={{ p: 3 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Your message will be sent to all available teachers. The first teacher to accept will be connected with you.
                </Typography>

                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    placeholder="Describe what you need help with..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    variant="outlined"
                    sx={{ mb: 2 }}
                />

                {/* Preview selected files */}
                {selectedFiles.length > 0 && (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 2, gap: 1 }}>
                        {selectedFiles.map((file, index) => (
                            <Box
                                key={index}
                                sx={{
                                    position: 'relative',
                                    width: 80,
                                    height: 80,
                                    borderRadius: 1,
                                    overflow: 'hidden',
                                    border: '1px solid #e0e0e0',
                                }}
                            >
                                {file.type.startsWith('image/') ? (
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={`Attachment ${index}`}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                ) : (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            height: '100%',
                                            backgroundColor: '#e0e0e0',
                                        }}
                                    >
                                        <AttachFileIcon />
                                    </Box>
                                )}
                                <IconButton
                                    size="small"
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        right: 0,
                                        bgcolor: 'rgba(0,0,0,0.5)',
                                        color: 'white',
                                        '&:hover': {
                                            bgcolor: 'rgba(0,0,0,0.7)',
                                        },
                                        p: 0.5,
                                    }}
                                    onClick={() => handleRemoveFile(index)}
                                >
                                    &times;
                                </IconButton>
                            </Box>
                        ))}
                    </Box>
                )}

                <input
                    type="file"
                    multiple
                    hidden
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept="image/*,.pdf,.doc,.docx"
                />

                <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <Tooltip title="Attach files">
                        <IconButton
                            color="primary"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isLoading}
                        >
                            <ImageIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            </DialogContent>

            <DialogActions sx={{ p: 2, bgcolor: '#f5f5f5' }}>
                <Button onClick={onClose} disabled={isLoading}>
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={isLoading || (!message.trim() && selectedFiles.length === 0)}
                    startIcon={isLoading && <CircularProgress size={20} />}
                >
                    {isLoading ? 'Sending...' : 'Send Request'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default MessageRequestModal;