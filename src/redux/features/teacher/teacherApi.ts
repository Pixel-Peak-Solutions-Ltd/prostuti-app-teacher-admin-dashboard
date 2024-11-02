import { baseApi } from "../../api/baseApi";

const teacherAPI = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTeacherProfile: builder.query({
            query: () => ({
                url: '/user/profile',
                method: 'GET',
            }),
            providesTags: ['Teacher'],
        }),
        updateTeacher: builder.mutation({
            query: ({ teacherInfo, teacherId }) => {
                return {
                    url: `/teacher/profile/${teacherId}`,
                    method: 'PATCH',
                    body: teacherInfo,
                };
            },
            invalidatesTags: ['Teacher']
        })
    })
});

export const { useUpdateTeacherMutation, useGetTeacherProfileQuery } = teacherAPI; 