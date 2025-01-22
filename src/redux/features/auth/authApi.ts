import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (userInfo) => {
                return {
                    url: '/auth/login',
                    method: 'POST',
                    body: userInfo
                };
            },
            invalidatesTags: ['User']
        }),
    }),
});

export const { useLoginMutation } = authApi;