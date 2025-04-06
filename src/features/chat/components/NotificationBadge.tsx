import React, { useState } from 'react';
import {
    Badge,
    IconButton,
    Tooltip,
    Popover,
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    Typography,
    Box,
    Button,
    Divider,
    CircularProgress,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useGetUnreadCountQuery, useGetNotificationsQuery, useMarkAllAsReadMutation } from '../../../redux/features/message/notificationApi';
import NotificationItem from './NotificationItem';

const NotificationBadge: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const { data: countData, isLoading: isCountLoading } = useGetUnreadCountQuery({});
    const { data: notifications, isLoading: isNotificationsLoading } = useGetNotificationsQuery({
        page: '1',
        limit: '10',
    });
    const [markAllAsRead, { isLoading: isMarking }] = useMarkAllAsReadMutation();

    const unreadCount = countData?.data?.count || 0;
    const notificationList = notifications?.data || [];

    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMarkAllAsRead = async () => {
        try {
            await markAllAsRead().unwrap();
        } catch (error) {
            console.error('Failed to mark notifications as read:', error);
        }
    };

    const open = Boolean(anchorEl);

    return (
        <>
            <Tooltip title="Notifications">
                <IconButton color="inherit" onClick={handleOpen}>
                    <Badge badgeContent={unreadCount} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
            </Tooltip>

            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                PaperProps={{
                    sx: {
                        width: 320,
                        maxHeight: 500,
                        borderRadius: 2,
                        overflow: 'hidden',
                    }
                }}
            >
                <Box sx={{ p: 2, bgcolor: '#f5f5f5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                        Notifications
                    </Typography>
                    {unreadCount > 0 && (
                        <Button
                            size="small"
                            onClick={handleMarkAllAsRead}
                            disabled={isMarking}
                        >
                            {isMarking ? <CircularProgress size={16} /> : 'Mark all as read'}
                        </Button>
                    )}
                </Box>
                <Divider />

                {isNotificationsLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                        <CircularProgress size={24} />
                    </Box>
                ) : notificationList.length > 0 ? (
                    <List sx={{ padding: 0 }}>
                        {notificationList.map((notification) => (
                            <React.Fragment key={notification._id}>
                                <NotificationItem
                                    notification={notification}
                                    onClose={handleClose}
                                />
                                <Divider />
                            </React.Fragment>
                        ))}
                    </List>
                ) : (
                    <Box sx={{ p: 3, textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                            No notifications
                        </Typography>
                    </Box>
                )}
            </Popover>
        </>
    );
};

export default NotificationBadge;