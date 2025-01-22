import { baseApi } from "../../api/baseApi";

interface ICategoryQueryParams {
    type?: string;
    division?: string;
    subject?: string;
    chapter?: string;
    universityName?: string;
    universityType?: string;
}
const courseApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        saveCourse: builder.mutation({
            query: (courseData) => {
                return {
                    url: '/course',
                    method: 'POST',
                    body: courseData
                };
            },
            invalidatesTags: ['Courses']
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
        getCourseByTeacher: builder.query({
            query: () => ({
                url: '/course/course-by-me',
                method: 'GET',
            }),
            providesTags: ['Courses']
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
            }),
            providesTags: ['Courses']
        }),
        getCoursePreview: builder.query({
            query: ({ courseId }) => ({
                url: `/course/preview/${courseId}`,
                method: 'GET',
            }),
            providesTags: ['Courses']
        }),
        getCategoryForCourse: builder.query({
            query: (questionObj: Record<string, string>) => {
                // filters: type: questionObj.category_0, division,subject, chapter
                // console.log('coming from the questionAPI', questionObj);
                const queryParams: ICategoryQueryParams = {
                    ...(questionObj.category && { type: questionObj.category }),
                    ...(questionObj.division && { division: questionObj.division }),
                    ...(questionObj.subject && { subject: questionObj.subject }),
                    ...(questionObj.chapter && { chapter: questionObj.chapter }),
                    ...(questionObj.universityName && { universityName: questionObj.universityName }),
                    ...(questionObj.universityType && { universityType: questionObj.universityType }),
                };

                let URL = '/category';
                // console.log('from questionAPI', queryParams);

                if (queryParams.type) {
                    URL = Object.entries(queryParams).reduce((acc, [key, value], index) => {
                        const prefix = index === 0 ? '?' : '&';
                        return `${acc}${prefix}${key}=${value}`;
                    }, URL);
                }
                return {
                    url: URL,
                    method: 'GET'
                };
            }
        }),
        deleteCourse: builder.mutation({
            query: ({ courseId }) => {
                return {
                    url: `/course/${courseId}`,
                    method: 'DELETE'
                };
            },
            invalidatesTags: ['Courses']
        })
    })
});


export const { useSaveCourseMutation, useSaveLessonMutation, useGetLessonsByCourseIdQuery, useGetCourseByIdQuery, useGetCategoryForCourseQuery, useGetCourseByTeacherQuery, useGetCoursePreviewQuery, useDeleteCourseMutation } = courseApi;