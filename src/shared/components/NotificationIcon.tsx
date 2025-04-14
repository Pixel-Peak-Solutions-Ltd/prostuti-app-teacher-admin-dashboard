import React, { useEffect } from 'react';
import {
    IconButton,
    Badge,
    Tooltip,
    CircularProgress
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { toggleNotificationDrawer, setUnreadCount } from '../../redux/features/notificationSlice.ts';
import { useGetUnreadNotificationCountQuery } from '../../redux/features/notificationApi.tsx';

const NotificationIcon: React.FC = () => {
    const dispatch = useAppDispatch();
    const unreadCount = useAppSelector((state) => state.notification.unreadCount);

    const {
        data: unreadCountData,
        isLoading,
        refetch
    } = useGetUnreadNotificationCountQuery({});

    // Set up polling for new notifications
    useEffect(() => {
        const interval = setInterval(() => {
            refetch();
        }, 60000); // Poll every minute

        return () => clearInterval(interval);
    }, [refetch]);

    // Update unread count in state when data is fetched
    useEffect(() => {
        if (unreadCountData?.data) {
            dispatch(setUnreadCount(unreadCountData.data.count));
        }
    }, [unreadCountData, dispatch]);

    const handleClick = () => {
        dispatch(toggleNotificationDrawer());
    };

    if (isLoading) {
        return (
            <IconButton color="inherit" disabled>
                <CircularProgress size={24} color="inherit" />
            </IconButton>
        );
    }

    return (
        <Tooltip title="Notifications">
            <IconButton
                color="primary"
                onClick={handleClick}
                aria-label="notifications"
            >
                <Badge
                    badgeContent={unreadCount}
                    color="error"
                    overlap="circular"
                    max={99}
                >
                    <NotificationsIcon />
                </Badge>
            </IconButton>
        </Tooltip>
    );
};

export default NotificationIcon;