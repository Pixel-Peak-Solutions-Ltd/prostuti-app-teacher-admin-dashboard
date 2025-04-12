import React from 'react';
import {
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Typography,
    Box,
    Chip,
    IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import { INotification } from '../../types/notification.types.ts';
import { formatDistanceToNow } from 'date-fns';
import DoneIcon from '@mui/icons-material/Done';
import { useMarkNotificationAsReadMutation } from '../../redux/features/notificationApi.tsx';
import { useAppDispatch } from '../../redux/hooks.ts';
import { markAsRead } from '../../redux/features/notificationSlice.ts';

interface NotificationItemProps {
    notification: INotification;
    handleNotificationClick?: (notification: INotification) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
                                                               notification,
                                                               handleNotificationClick
                                                           }) => {
    const [markNotificationAsRead] = useMarkNotificationAsReadMutation();
    const dispatch = useAppDispatch();

    const getNotificationIcon = () => {
        switch (notification.type) {
            case 'EditRequest':
                return <EditIcon />;
            case 'CourseApproved':
                return <CheckCircleIcon />;
            default:
                return <AnnouncementIcon />;
        }
    };

    const getNotificationColor = () => {
        switch (notification.type) {
            case 'EditRequest':
                return '#ff9800'; // Orange for edit requests
            case 'CourseApproved':
                return '#4caf50'; // Green for approvals
            default:
                return '#2196f3'; // Blue for general notifications
        }
    };

    const getResourceLabel = () => {
        switch (notification.resourceType) {
            case 'Course':
                return 'Course';
            case 'Assignment':
                return 'Assignment';
            case 'RecodedClass':
                return 'Recorded Class';
            case 'Resource':
                return 'Resource';
            case 'Test':
                return 'Test';
            default:
                return 'Resource';
        }
    };

    const formatTime = (dateString: string) => {
        try {
            return formatDistanceToNow(new Date(dateString), { addSuffix: true });
        } catch (error) {
            return 'some time ago';
        }
    };

    const handleMarkAsRead = async (e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            await markNotificationAsRead(notification._id).unwrap();
            dispatch(markAsRead(notification._id));
        } catch (error) {
            console.error('Failed to mark notification as read', error);
        }
    };

    return (
        <ListItem
            alignItems="flex-start"
            sx={{
                borderRadius: 1,
                mb: 1,
                cursor: 'pointer',
                backgroundColor: notification.isRead ? 'transparent' : 'rgba(25, 118, 210, 0.04)',
                '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
            }}
            onClick={() => handleNotificationClick && handleNotificationClick(notification)}
        >
            <ListItemAvatar>
                <Avatar sx={{ bgcolor: getNotificationColor() }}>
                    {getNotificationIcon()}
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="subtitle2" component="span">
                            {notification.title}
                        </Typography>
                        <Chip
                            size="small"
                            label={getResourceLabel()}
                            sx={{
                                fontSize: '0.7rem',
                                height: 20,
                            }}
                        />
                    </Box>
                }
                secondary={
                    <React.Fragment>
                        <Typography
                            variant="body2"
                            color="text.primary"
                            component="span"
                            sx={{
                                display: 'block',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}
                        >
                            {notification.message}
                        </Typography>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            mt={0.5}
                        >
                            <Typography variant="caption" color="text.secondary">
                                {formatTime(notification.createdAt)}
                            </Typography>
                            {!notification.isRead && (
                                <IconButton
                                    size="small"
                                    color="primary"
                                    onClick={handleMarkAsRead}
                                    aria-label="mark as read"
                                >
                                    <DoneIcon fontSize="small" />
                                </IconButton>
                            )}
                        </Box>
                    </React.Fragment>
                }
            />
        </ListItem>
    );
};

export default NotificationItem;