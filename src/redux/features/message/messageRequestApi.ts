import { baseApi } from "../../api/baseApi";

const messageRequestApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createMessageRequest: builder.mutation({
            query: (data) => ({
                url: '/message-requests',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Conversations']
        }),

        getPendingRequests: builder.query({
            query: (params) => ({
                url: '/message-requests/pending',
                method: 'GET',
                params,
            }),
            providesTags: ['MessageRequests']
        }),

        acceptRequest: builder.mutation({
            query: (messageRequestId) => ({
                url: `/message-requests/${messageRequestId}/accept`,
                method: 'POST',
            }),
            invalidatesTags: ['MessageRequests', 'Conversations']
        }),

        declineRequest: builder.mutation({
            query: (messageRequestId) => ({
                url: `/message-requests/${messageRequestId}/decline`,
                method: 'POST',
            }),
            invalidatesTags: ['MessageRequests']
        }),
    }),
});

export const {
    useCreateMessageRequestMutation,
    useGetPendingRequestsQuery,
    useAcceptRequestMutation,
    useDeclineRequestMutation
} = messageRequestApi;