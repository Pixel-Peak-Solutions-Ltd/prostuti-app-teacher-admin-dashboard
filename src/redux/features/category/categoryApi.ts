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
        })
    })
});

export const { useGetAllCategoryTypesQuery } = categoryApi; 