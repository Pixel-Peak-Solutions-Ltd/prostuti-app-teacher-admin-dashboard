import React from 'react';
import { Box, Typography, Avatar, styled } from '@mui/material';
import { format } from 'date-fns';

interface MessageBubbleProps {
    message: {
        content: string;
        senderId: string;
        createdAt: string;
        attachments?: Array<{
            path: string;
            diskType: string;
        }>;
    };
    isOwnMessage: boolean;
    senderName?: string;
    senderProfileImage?: string;
}

const MessageContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'isOwnMessage',
})<{ isOwnMessage: boolean; }>(({ theme, isOwnMessage }) => ({
    display: 'flex',
    flexDirection: isOwnMessage ? 'row-reverse' : 'row',
    alignItems: 'flex-end',
    marginBottom: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
}));

const MessageContent = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'isOwnMessage',
})<{ isOwnMessage: boolean; }>(({ theme, isOwnMessage }) => ({
    backgroundColor: isOwnMessage ? '#1976d2' : '#f5f5f5',
    color: isOwnMessage ? 'white' : 'black',
    borderRadius: '16px',
    padding: theme.spacing(1, 2),
    maxWidth: '70%',
    wordBreak: 'break-word',
    marginLeft: isOwnMessage ? 0 : theme.spacing(1),
    marginRight: isOwnMessage ? theme.spacing(1) : 0,
}));

const TimeStamp = styled(Typography)(({ theme }) => ({
    fontSize: '0.75rem',
    color: 'gray',
    marginTop: theme.spacing(0.5),
    textAlign: 'right',
}));

const Attachment = styled('img')({
    maxWidth: '100%',
    maxHeight: '200px',
    borderRadius: '8px',
    marginTop: '8px',
});

const MessageBubble: React.FC<MessageBubbleProps> = ({
    message,
    isOwnMessage,
    senderName,
    senderProfileImage,
}) => {
    // Check if message contains image attachments
    const hasImageAttachments = message.attachments?.some(attachment =>
        attachment.diskType.startsWith('image/'));

    return (
        <MessageContainer isOwnMessage={isOwnMessage}>
            {!isOwnMessage && (
                <Avatar
                    src={senderProfileImage}
                    alt={senderName || 'User'}
                    sx={{ width: 32, height: 32 }}
                />
            )}
            <Box sx={{ maxWidth: '70%' }}>
                <MessageContent isOwnMessage={isOwnMessage}>
                    <Typography variant="body1">{message.content}</Typography>

                    {/* Display image attachments if any */}
                    {hasImageAttachments && (
                        <Box sx={{ mt: 1 }}>
                            {message.attachments?.filter(attachment =>
                                attachment.diskType.startsWith('image/')
                            ).map((attachment, index) => (
                                <Attachment
                                    key={index}
                                    src={attachment.path}
                                    alt="Attachment"
                                />
                            ))}
                        </Box>
                    )}

                    <TimeStamp>
                        {format(new Date(message.createdAt), 'h:mm a')}
                    </TimeStamp>
                </MessageContent>
            </Box>
        </MessageContainer>
    );
};

export default MessageBubble;