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
        }),
        saveLesson: builder.mutation({
            query: (lessonData) => {
                return {
                    url: '/lesson',
                    method: 'POST',
                    body: lessonData
                };
            }
        }),
        getLessonsByCourseId: builder.query({
            query: ({ courseId }) => {
                return {
                    url: `/lesson/course/${courseId}`,
                    method: 'GET',
                };
            }
        }),
        getCourseById: builder.query({
            query: ({ courseId }) => ({
                url: `/course/${courseId}`,
                method: 'GET',
            })
        })
    })
});


export const { useSaveCourseMutation, useSaveLessonMutation, useGetLessonsByCourseIdQuery, useGetCourseByIdQuery } = courseApi;