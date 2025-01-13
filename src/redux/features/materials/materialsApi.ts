import { baseApi } from "../../api/baseApi";

const materialApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createRecordClass: builder.mutation({
            query: (recordClassData) => {
                return {
                    url: '/recoded-class',
                    method: 'POST',
                    body: recordClassData
                };
            },
            invalidatesTags: ['Record']
        }),
        getRecordClassById: builder.query({
            query: ({ recordId }) => {
                return {
                    url: `/recoded-class/${recordId}`,
                    method: 'GET',
                };
            },
            providesTags: ['Record'],
        }),
        updateRecordClass: builder.mutation({
            query: ({ recordClassData, recordClassId }) => {
                return {
                    url: `/recoded-class/${recordClassId}`,
                    method: 'PATCH',
                    body: recordClassData
                };
            },
            invalidatesTags: ['Record']
        }),
        createResource: builder.mutation({
            query: (resourceData) => {
                // console.log('Data received in API call:', resourceData.get('files'));
                return {
                    url: '/resource',
                    method: 'POST',
                    body: resourceData
                };
            }
        }),
        createAssignment: builder.mutation({
            query: (assignmentData) => {
                return {
                    url: '/assignment',
                    method: 'POST',
                    body: assignmentData
                };
            }
        }),
        createTest: builder.mutation({
            query: (testData) => {
                return {
                    url: '/test',
                    method: 'POST',
                    body: testData
                };
            }
        })
    })
});

export const {
    useCreateRecordClassMutation,
    useCreateResourceMutation,
    useCreateAssignmentMutation,
    useCreateTestMutation,
    useGetRecordClassByIdQuery,
    useUpdateRecordClassMutation
} = materialApi;