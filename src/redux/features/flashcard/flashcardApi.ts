import { baseApi } from "../../api/baseApi";

const flashcardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllPublishedFlashcards: builder.query({
            query: ({ searchTerm }) => {
                return {
                    url: `/flashcard/all-flashcard?visibility=EVERYONE&isApproved=true&searchTerm=${searchTerm}`,
                    method: 'GET',
                };
            },
            providesTags: ['Flashcards']
        }),
        getAllUnPublishedFlashcards: builder.query({
            query: ({ searchTerm }) => {
                return {
                    url: `/flashcard/all-flashcard?visibility=EVERYONE&isApproved=false&searchTerm=${searchTerm}`,
                    method: 'GET',
                };
            },
            providesTags: ['Flashcards']
        }),
        getChildFlashcards: builder.query({
            query: ({ flashcardId }) => ({
                url: `/flashcard/single-flashcard/${flashcardId}`,
                method: 'GET',
            }),
            providesTags: ['ChildFlashcards']
        }),
        updateChildFlashCard: builder.mutation({
            query: ({ flashcardId, data }) => {
                console.log('received data in update function:', data);
                return {
                    url: `/flashcard/update-flashcard/${flashcardId}`,
                    method: 'PATCH',
                    body: data,
                };
            },
            invalidatesTags: ['ChildFlashcards']
        }),
        deleteChildFlashcards: builder.mutation({
            query: (flashcardId) => {
                return {
                    url: `/flashcard/delete-flashcard-item/${flashcardId}`,
                    method: 'DELETE',
                };
            },
            invalidatesTags: ['ChildFlashcards']
        }),
        approveFlashCard: builder.mutation({
            query: (flashcardId) => {
                console.log('Flashcard ID in redux:', flashcardId);
                return {
                    url: `/flashcard/approve-flashcard/${flashcardId}`,
                    method: 'PATCH',
                };
            },
            invalidatesTags: ['Flashcards']
        })
    })
});

export const {
    useGetAllPublishedFlashcardsQuery,
    useGetAllUnPublishedFlashcardsQuery,
    useGetChildFlashcardsQuery,
    useDeleteChildFlashcardsMutation,
    useUpdateChildFlashCardMutation,
    useApproveFlashCardMutation
} = flashcardApi; 