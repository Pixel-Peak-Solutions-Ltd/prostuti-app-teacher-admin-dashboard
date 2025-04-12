import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INotification } from "../../types/notification.types.ts";

interface NotificationState {
    notifications: INotification[];
    unreadCount: number;
    notificationDrawerOpen: boolean;
}

const initialState: NotificationState = {
    notifications: [],
    unreadCount: 0,
    notificationDrawerOpen: false
};

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotifications: (state, action: PayloadAction<INotification[]>) => {
            state.notifications = action.payload;
        },
        setUnreadCount: (state, action: PayloadAction<number>) => {
            state.unreadCount = action.payload;
        },
        addNotification: (state, action: PayloadAction<INotification>) => {
            state.notifications.unshift(action.payload);
            if (!action.payload.isRead) {
                state.unreadCount += 1;
            }
        },
        markAsRead: (state, action: PayloadAction<string>) => {
            const notification = state.notifications.find(n => n._id === action.payload);
            if (notification && !notification.isRead) {
                notification.isRead = true;
                state.unreadCount = Math.max(0, state.unreadCount - 1);
            }
        },
        markAllAsRead: (state) => {
            state.notifications.forEach(notification => {
                notification.isRead = true;
            });
            state.unreadCount = 0;
        },
        toggleNotificationDrawer: (state) => {
            state.notificationDrawerOpen = !state.notificationDrawerOpen;
        },
        closeNotificationDrawer: (state) => {
            state.notificationDrawerOpen = false;
        }
    }
});

export const {
    setNotifications,
    setUnreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    toggleNotificationDrawer,
    closeNotificationDrawer
} = notificationSlice.actions;

export default notificationSlice.reducer;