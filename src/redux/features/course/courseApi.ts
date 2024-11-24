import { baseApi } from "../../api/baseApi";

const courseApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        saveCourse: builder.mutation({
            query: (courseData) => {
                console.log("from mutation:", courseData.get('courseData'));
                return {
                    url: '/course',
                    method: 'POST',
                    body: courseData
                };
            }
        })
    })
});


export const { useSaveCourseMutation } = courseApi;