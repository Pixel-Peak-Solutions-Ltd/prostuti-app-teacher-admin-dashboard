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
        }),
        getProfile: builder.query({
            query: () => ({
                url: '/user/profile',
                method: 'GET',
            })
        })
    }),
});

export const { useLoginMutation, useGetProfileQuery } = authApi;