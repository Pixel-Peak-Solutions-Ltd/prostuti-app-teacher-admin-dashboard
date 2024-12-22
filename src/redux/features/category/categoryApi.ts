import { baseApi } from "../../api/baseApi";

const categoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllCategoryTypes: builder.query({
            query: () => {
                return {
                    url: '/category/type',
                    method: 'GET',
                };
            },
            providesTags: ['Categories']
        }),
        getCategoryById: builder.query({
            query: ({ id }) => {
                return {
                    url: `/category/${id}`,
                    method: 'GET',
                };
            }
        }),
        createCategory: builder.mutation({
            query: (questions) => {
                return {
                    url: '/category',
                    method: 'POST',
                    body: questions
                };
            },
            invalidatesTags: ['Categories']
        }),
    })
});

export const { useGetAllCategoryTypesQuery, useGetCategoryByIdQuery, useCreateCategoryMutation } = categoryApi; 