import { baseApi } from "../../api/baseApi";

const flashcardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllPublishedFlashcards: builder.query({
            query: () => (
                {
                    url: `/flashcard/all-flashcard?visibility=EVERYONE&isApproved=false`,
                    method: 'GET',
                }
            ),
            providesTags: ['Flashcards']
        }),
        getChildFlashcards: builder.query({
            query: ({ flashcardId }) => ({
                url: `/flashcard/single-flashcard/${flashcardId}`,
                method: 'GET',
            }),
            providesTags: ['ChildFlashcards']
        }),
        deleteChildFlashcards: builder.mutation({
            query: (flashcardId) => {
                console.log('received id in delete function:', flashcardId);
                return {
                    url: `/flashcard/delete-flashcard-item/${flashcardId}`,
                    method: 'DELETE',
                };
            },
            invalidatesTags: ['ChildFlashcards']
        })
    })
});

export const { useGetAllPublishedFlashcardsQuery, useGetChildFlashcardsQuery, useDeleteChildFlashcardsMutation } = flashcardApi; 