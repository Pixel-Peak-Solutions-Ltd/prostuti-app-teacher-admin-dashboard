import { baseApi } from "../../api/baseApi";

const categoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllCategoryTypes: builder.query({
            query: () => {
                return {
                    url: '/category/type',
                    method: 'GET',
                };
            }
        }),
        getCategoryById: builder.query({
            query: ({ id }) => {
                return {
                    url: `/category/${id}`,
                    method: 'GET',
                };
            }
        })
    })
});

export const { useGetAllCategoryTypesQuery, useGetCategoryByIdQuery } = categoryApi; 