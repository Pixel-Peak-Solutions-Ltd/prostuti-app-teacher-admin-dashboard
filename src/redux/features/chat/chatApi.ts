import { baseApi } from "../../api/baseApi";

const chatApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Get pending broadcast requests (Teacher only)
        getPendingBroadcasts: builder.query({
            query: () => {
                return {
                    url: '/chat/broadcasts/pending',
                    method: 'GET',
                };
            },
            providesTags: ['Chat']
        }),

        // Accept broadcast request (Teacher only)
        acceptBroadcast: builder.mutation({
            query: (broadcastId) => {
                return {
                    url: `/chat/broadcast/${broadcastId}/accept`,
                    method: 'POST',
                };
            },
            invalidatesTags: ['Chat']
        }),

        // Decline broadcast request (Teacher only)
        declineBroadcast: builder.mutation({
            query: (broadcastId) => {
                return {
                    url: `/chat/broadcast/${broadcastId}/decline`,
                    method: 'POST',
                };
            },
            invalidatesTags: ['Chat']
        }),

        // Get active conversations (Both roles)
        getActiveConversations: builder.query({
            query: () => {
                return {
                    url: '/chat/conversations',
                    method: 'GET',
                };
            },
            providesTags: ['Chat']
        }),

        // Get chat history (Both roles)
        getChatHistory: builder.query({
            query: ({ conversationId, page = 1, limit = 20 }) => {
                return {
                    url: `/chat/messages?conversation_id=${conversationId}&page=${page}&limit=${limit}`,
                    method: 'GET',
                };
            },
            providesTags: (result, error, { conversationId }) => [{ type: 'Chat', id: conversationId }]
        }),

        // Mark messages as read (Both roles)
        markMessagesAsRead: builder.mutation({
            query: (conversationId) => {
                return {
                    url: `/chat/messages/${conversationId}/read`,
                    method: 'POST',
                };
            },
            invalidatesTags: (result, error, conversationId) => [{ type: 'Chat', id: conversationId }]
        }),

        // Get unread message count (Both roles)
        getUnreadMessageCount: builder.query({
            query: () => {
                return {
                    url: '/chat/messages/unread',
                    method: 'GET',
                };
            },
            providesTags: ['Chat']
        }),
    }),
});

export const {
    useGetPendingBroadcastsQuery,
    useAcceptBroadcastMutation,
    useDeclineBroadcastMutation,
    useGetActiveConversationsQuery,
    useGetChatHistoryQuery,
    useMarkMessagesAsReadMutation,
    useGetUnreadMessageCountQuery,
} = chatApi;