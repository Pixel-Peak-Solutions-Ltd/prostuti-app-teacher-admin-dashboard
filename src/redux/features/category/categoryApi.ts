import { baseApi } from "../../api/baseApi";


const categoryAPI = baseApi.injectEndpoints({
    endpoints: (builder) => ({
       createCategory: builder.mutation({
            query: (questions) => {
                return {
                    url: '/category',
                    method: 'POST',
                    body: questions
                };
            },
            // invalidatesTags: ['Categories']
        }),
        
    })
});

export const { useCreateCategoryMutation } = categoryAPI;