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
    })
});

export const { useGetAllPublishedFlashcardsQuery, useGetChildFlashcardsQuery } = flashcardApi; 