import { baseApi } from "../../api/baseApi";

const teacherAPI = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        updateTeacher: builder.mutation({
            query: ({ teacherInfo, teacherId }) => {
                console.log('From RTK Query function:', teacherInfo.get('avatar'));
                console.log("Recieved in RTK Query:", Array.from(teacherInfo.entries()));
                return {
                    url: `/teacher/profile/${teacherId}`,
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    body: teacherInfo,
                };
            }
        })
    })
});

export const { useUpdateTeacherMutation } = teacherAPI; 