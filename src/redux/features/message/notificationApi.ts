import { baseApi } from "../../api/baseApi";

const notificationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getNotifications: builder.query({
            query: (params) => ({
                url: '/notifications',
                method: 'GET',
                params,
            }),
            providesTags: ['Notifications']
        }),

        getUnreadCount: builder.query({
            query: () => ({
                url: '/notifications/unread-count',
                method: 'GET',
            }),
            providesTags: ['NotificationCount']
        }),

        markAsRead: builder.mutation({
            query: (notificationId) => ({
                url: `/notifications/${notificationId}/read`,
                method: 'PATCH',
            }),
            invalidatesTags: ['Notifications', 'NotificationCount']
        }),

        markAllAsRead: builder.mutation({
            query: () => ({
                url: '/notifications/mark-all-read',
                method: 'PATCH',
            }),
            invalidatesTags: ['Notifications', 'NotificationCount']
        }),
    }),
});

export const {
    useGetNotificationsQuery,
    useGetUnreadCountQuery,
    useMarkAsReadMutation,
    useMarkAllAsReadMutation
} = notificationApi;