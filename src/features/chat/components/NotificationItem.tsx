import React from 'react';
import {
    ListItem,
    ListItemText,
    Typography,
    Box,
    IconButton,
    useTheme,
    Tooltip,
    CircularProgress,
} from '@mui/material';
import { format, formatDistanceToNow } from 'date-fns';
import DoneIcon from '@mui/icons-material/Done';
import { useMarkAsReadMutation } from '../../../redux/features/message/notificationApi';
import { useNavigate } from 'react-router-dom';

interface NotificationItemProps {
    notification: any;
    onClose: () => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onClose }) => {
    const [markAsRead, { isLoading }] = useMarkAsReadMutation();
    const theme = useTheme();
    const navigate = useNavigate();

    const handleMarkAsRead = async (e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            await markAsRead(notification._id).unwrap();
        } catch (error) {
            console.error('Failed to mark notification as read:', error);
        }
    };

    const handleClick = async () => {
        // If notification is unread, mark it as read
        if (!notification.isRead) {
            try {
                await markAsRead(notification._id).unwrap();
            } catch (error) {
                console.error('Failed to mark notification as read:', error);
            }
        }

        // Navigate based on notification type
        switch (notification.type) {
            case 'message_request':
                // Navigate to pending requests for teachers
                navigate('/teacher/messages');
                break;
            case 'message_request_accepted':
                // Navigate to the conversation
                if (notification.referenceId) {
                    navigate('/teacher/messages');
                    // You may want to auto-select the conversation here
                }
                break;
            default:
                navigate('/teacher/messages');
        }

        onClose();
    };

    // Format the timestamp
    const timestamp = notification.createdAt
        ? formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })
        : '';

    return (
        <ListItem
            sx={{
                bgcolor: notification.isRead ? 'transparent' : 'rgba(25, 118, 210, 0.08)',
                '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
                cursor: 'pointer',
                py: 1.5,
            }}
            secondaryAction={
                !notification.isRead && (
                    <Tooltip title="Mark as read">
                        <IconButton
                            edge="end"
                            onClick={handleMarkAsRead}
                            disabled={isLoading}
                            size="small"
                        >
                            {isLoading ? <CircularProgress size={16} /> : <DoneIcon />}
                        </IconButton>
                    </Tooltip>
                )
            }
            onClick={handleClick}
        >
            <ListItemText
                primary={
                    <Typography
                        variant="body2"
                        color="text.primary"
                        sx={{
                            fontWeight: notification.isRead ? 'normal' : 'bold',
                        }}
                    >
                        {notification.content}
                    </Typography>
                }
                secondary={
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: 'block', mt: 0.5 }}
                    >
                        {timestamp}
                    </Typography>
                }
            />
        </ListItem>
    );
};

export default NotificationItem;