import { baseApi } from "../../api/baseApi";

const conversationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getConversations: builder.query({
            query: (params = { page: "1", limit: "10" }) => ({  // Provide default query params
                url: `/conversations`,
                method: "GET",
                params,
            }),
            providesTags: ["Conversations"],
        }),

        getConversation: builder.query({
            query: (id) => ({
                url: `/conversations/${id}`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{ type: "Conversation", id }],
        }),

        createConversation: builder.mutation({
            query: (data) => ({
                url: `/conversations`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Conversations"],
        }),

        markAsRead: builder.mutation({
            query: (id) => ({
                url: `/conversations/${id}/read`,
                method: "PATCH",
            }),
            invalidatesTags: (result, error, id) => [
                { type: "Conversation", id },
                "Conversations",
            ],
        }),
    }),
});

export const {
    useGetConversationsQuery,
    useGetConversationQuery,
    useCreateConversationMutation,
    useMarkAsReadMutation,
} = conversationApi;