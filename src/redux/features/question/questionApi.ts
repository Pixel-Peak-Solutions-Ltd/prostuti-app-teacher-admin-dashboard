import { baseApi } from "../../api/baseApi";

interface IQueryParams {
    type?: string;
    division?: string;
    subject?: string;
    chapter?: string;
}

const questionAPI = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCategory: builder.query({
            query: (questionObj: Record<string, string>) => {
                // filters: type: questionObj.category_0, division,subject, chapter
                // console.log('coming from the questionAPI', questionObj);
                const queryParams: IQueryParams = {
                    ...(questionObj.category_0 && { type: questionObj.category_0 }),
                    ...(questionObj.division_0 && { division: questionObj.division_0 }),
                    ...(questionObj.subject_0 && { subject: questionObj.subject_0 }),
                    ...(questionObj.chapter_0 && { chapter: questionObj.chapter_0 })
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
        createQuestion: builder.mutation({
            query: (questions) => {
                return {
                    url: '/question',
                    method: 'POST',
                    body: questions
                };
            },
            invalidatesTags: ['Questions']
        }),
        getAllAcademicQuestions: builder.query({
            query: (filters) => {
                let URL = `/question?categoryType=Academic`;
                if (Object.keys(filters).length !== 0) {
                    URL = Object.entries(filters).reduce((acc, [key, value]) => {
                        const prefix = '&';
                        return `${acc}${prefix}${key}=${value}`;
                    }, URL);
                }
                return {
                    url: URL,
                    method: 'GET'
                };
            },
            providesTags: ['Questions']
        }),
        getAllQuestions: builder.query({
            query: (filters) => {
                let URL = `/question`;
                console.log('filters sent to redux:', filters);
                if (Object.keys(filters).length !== 0) {
                    URL = Object.entries(filters).reduce((acc, [key, value], index) => {
                        const prefix = index === 0 ? '?' : '&';
                        return `${acc}${prefix}${key}=${value}`;
                    }, URL);
                }
                return {
                    url: URL,
                    method: 'GET'
                };
            }
        })
    })
});

export const { useGetCategoryQuery, useCreateQuestionMutation, useGetAllAcademicQuestionsQuery, useGetAllQuestionsQuery } = questionAPI;