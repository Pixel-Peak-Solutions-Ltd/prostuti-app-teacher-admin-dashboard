import React, { useState } from 'react';
import {
    Drawer,
    Box,
    Typography,
    Divider,
    List,
    Button,
    CircularProgress,
    Tabs,
    Tab,
    IconButton
} from '@mui/material';
import NotificationItem from './NotificationItem';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { closeNotificationDrawer } from '../../redux/features/notificationSlice.ts';
import {
    useGetMyNotificationsQuery,
    useMarkAllNotificationsAsReadMutation
} from '../../redux/features/notificationApi.tsx';
import CloseIcon from '@mui/icons-material/Close';
import { INotification } from '../../types/notification.types';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`notification-tabpanel-${index}`}
            aria-labelledby={`notification-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 1 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const NotificationDrawer: React.FC = () => {
    const dispatch = useAppDispatch();
    const open = useAppSelector((state) => state.notification.notificationDrawerOpen);
    const [tabValue, setTabValue] = useState(0);
    const [filters, setFilters] = useState({
        limit: 10,
        page: 1,
        sortBy: 'createdAt',
        sortOrder: 'desc' as 'asc' | 'desc',
        isRead: undefined as boolean | undefined,
        type: undefined as string | undefined
    });

    const { data: notificationsData, isLoading, isFetching, refetch } = useGetMyNotificationsQuery(filters);
    const [markAllAsRead, { isLoading: isMarkingAllAsRead }] = useMarkAllNotificationsAsReadMutation();

    const handleClose = () => {
        dispatch(closeNotificationDrawer());
    };

    const handleNotificationClick = (notification: INotification) => {
        // Handle notification click based on type
        console.log('Notification clicked:', notification);
        // Implement routing logic here based on notification type & resourceType
    };

    const handleMarkAllAsRead = async () => {
        try {
            await markAllAsRead({}).unwrap();
            refetch();
        } catch (error) {
            console.error('Failed to mark all notifications as read', error);
        }
    };

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);

        // Update filters based on tab
        switch (newValue) {
            case 0: // All
                setFilters(prev => ({ ...prev, isRead: undefined, type: undefined }));
                break;
            case 1: // Unread
                setFilters(prev => ({ ...prev, isRead: false, type: undefined }));
                break;
            case 2: // Edit Requests
                setFilters(prev => ({ ...prev, isRead: undefined, type: 'EditRequest' }));
                break;
            default:
                setFilters(prev => ({ ...prev, isRead: undefined, type: undefined }));
        }
    };

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={handleClose}
            PaperProps={{
                sx: { width: { xs: '100%', sm: 400 }, maxWidth: '100%' }
            }}
        >
            <Box sx={{
                p: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Typography variant="h6">Notifications</Typography>
                <IconButton onClick={handleClose} edge="end" aria-label="close">
                    <CloseIcon />
                </IconButton>
            </Box>

            <Divider />

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    aria-label="notification tabs"
                    variant="fullWidth"
                    centered
                >
                    <Tab label="All" />
                    <Tab label="Unread" />
                    <Tab label="Edit Requests" />
                </Tabs>
            </Box>

            <Box sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                p: 1
            }}>
                <Button
                    size="small"
                    onClick={handleMarkAllAsRead}
                    disabled={isMarkingAllAsRead}
                >
                    Mark all as read
                </Button>
            </Box>

            <TabPanel value={tabValue} index={0}>
                {renderNotificationList(notificationsData?.data, isLoading, isFetching, handleNotificationClick)}
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
                {renderNotificationList(notificationsData?.data, isLoading, isFetching, handleNotificationClick)}
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
                {renderNotificationList(notificationsData?.data, isLoading, isFetching, handleNotificationClick)}
            </TabPanel>
        </Drawer>
    );
};

function renderNotificationList(
    notifications: INotification[] | undefined,
    isLoading: boolean,
    isFetching: boolean,
    handleNotificationClick: (notification: INotification) => void
) {
    if (isLoading || isFetching) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <CircularProgress size={24} />
            </Box>
        );
    }

    if (!notifications || notifications.length === 0) {
        return (
            <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography color="text.secondary">No notifications</Typography>
            </Box>
        );
    }

    return (
        <List sx={{ overflow: 'auto', maxHeight: 'calc(100vh - 200px)' }}>
            {notifications.map((notification) => (
                <NotificationItem
                    key={notification._id}
                    notification={notification}
                    handleNotificationClick={handleNotificationClick}
                />
            ))}
        </List>
    );
}

export default NotificationDrawer;