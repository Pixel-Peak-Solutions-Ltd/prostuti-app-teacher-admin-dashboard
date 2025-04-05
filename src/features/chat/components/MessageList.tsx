import React, { useState, useRef } from 'react';
import {
    Box,
    TextField,
    IconButton,
    Tooltip,
    Paper,
    CircularProgress,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ImageIcon from '@mui/icons-material/Image';
import { useSendMessageMutation } from '../../../redux/features/message/messageApi';
import { useSocket } from '../context/SocketContext';

interface MessageComposerProps {
    conversationId: string;
}

const MessageComposer: React.FC<MessageComposerProps> = ({ conversationId }) => {
    const [messageText, setMessageText] = useState('');
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [sendMessage, { isLoading }] = useSendMessageMutation();
    const { socket } = useSocket();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!messageText.trim() && selectedFiles.length === 0) return;

        try {
            const formData = new FormData();
            formData.append('conversationId', conversationId);
            formData.append('content', messageText.trim());

            // Append files if any
            selectedFiles.forEach(file => {
                formData.append('attachments', file);
            });

            const response = await sendMessage(formData).unwrap();

            // Emit socket event for real-time update
            if (socket) {
                socket.emit('send_message', {
                    conversationId,
                    message: response.data,
                });
            }

            // Clear input fields
            setMessageText('');
            setSelectedFiles([]);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setSelectedFiles(prevFiles => [...prevFiles, ...newFiles]);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    const handleRemoveFile = (index: number) => {
        setSelectedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessageText(e.target.value);

        // Emit typing event
        if (socket && e.target.value) {
            socket.emit('typing', { conversationId });
        } else if (socket && !e.target.value) {
            socket.emit('stop_typing', { conversationId });
        }
    };

    return (
        <Paper
            component="form"
            onSubmit={handleSubmit}
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                width: '100%',
                backgroundColor: '#f5f5f5',
            }}
        >
            {/* Preview selected files */}
            {selectedFiles.length > 0 && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 1, gap: 1 }}>
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

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                    fullWidth
                    multiline
                    maxRows={4}
                    value={messageText}
                    onChange={handleTextChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    variant="outlined"
                    size="small"
                    disabled={isLoading}
                    sx={{ mr: 1 }}
                />

                <input
                    type="file"
                    multiple
                    hidden
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept="image/*,.pdf,.doc,.docx"
                />

                <Tooltip title="Attach files">
                    <IconButton
                        disabled={isLoading}
                        onClick={() => fileInputRef.current?.click()}
                        color="primary"
                    >
                        <ImageIcon />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Send message">
                    <IconButton
                        type="submit"
                        color="primary"
                        disabled={isLoading || (!messageText.trim() && selectedFiles.length === 0)}
                    >
                        {isLoading ? <CircularProgress size={24} /> : <SendIcon />}
                    </IconButton>
                </Tooltip>
            </Box>
        </Paper>
    );
};

export default MessageComposer;