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
        // resource operations
        createResource: builder.mutation({
            query: (resourceData) => {
                // console.log('Data received in API call:', resourceData.get('files'));
                return {
                    url: '/resource',
                    method: 'POST',
                    body: resourceData
                };
            },
            invalidatesTags: ['Resource']
        }),
        getResourceById: builder.query({
            query: ({ resourceId }) => {
                return {
                    url: `/resource/${resourceId}`,
                    method: 'GET',
                };
            },
            providesTags: ['Resource'],
        }),
        updateResource: builder.mutation({
            query: ({ resourceData, resourceId }) => {
                return {
                    url: `/resource/${resourceId}`,
                    method: 'PATCH',
                    body: resourceData
                };
            },
            invalidatesTags: ['Resource']
        }),
        // assignment operations
        createAssignment: builder.mutation({
            query: (assignmentData) => {
                return {
                    url: '/assignment',
                    method: 'POST',
                    body: assignmentData
                };
            },
            invalidatesTags: ['Assignment']
        }),
        getAssignmentById: builder.query({
            query: ({ assignmentId }) => {
                return {
                    url: `/assignment/${assignmentId}`,
                    method: 'GET',
                };
            },
            providesTags: ['Assignment'],
        }),
        updateAssignment: builder.mutation({
            query: ({ assignmentData, assignmentId }) => {
                return {
                    url: `/assignment/${assignmentId}`,
                    method: 'PATCH',
                    body: assignmentData
                };
            },
            invalidatesTags: ['Assignment']
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
    useUpdateRecordClassMutation,
    useGetAssignmentByIdQuery,
    useUpdateAssignmentMutation,
    useGetResourceByIdQuery,
    useUpdateResourceMutation
} = materialApi;