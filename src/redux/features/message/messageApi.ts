import { baseApi } from "../../api/baseApi";

const messageApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMessages: builder.query({
            query: ({ conversationId, params }) => ({
                url: `/messages/${conversationId}`,
                method: "GET",
                params,
            }),
            providesTags: (result, error, { conversationId }) => [
                { type: "Messages", id: conversationId },
            ],
        }),

        sendMessage: builder.mutation({
            query: (data) => ({
                url: `/messages`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: (result, error, { conversationId }) => [
                { type: "Messages", id: conversationId },
                { type: "Conversation", id: conversationId },
                "Conversations",
            ],
        }),
    }),
});

export const {
    useGetMessagesQuery,
    useSendMessageMutation
} = messageApi;