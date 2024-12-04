import { baseApi } from "../../api/baseApi";

const materialApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createRecordClass: builder.mutation({
            query: (recordClassData) => {
                // validation
                if (!recordClassData || Object.keys(recordClassData).length === 0) {
                    throw new Error('No Data to Send'); // throw an error
                }
                return {
                    url: '/recoded-class',
                    method: 'POST',
                    body: recordClassData
                };
            }
        }),
        createResource: builder.mutation({
            query: (resourceData) => {
                console.log('Data received in API call:', resourceData.get('files'));
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

export const { useCreateRecordClassMutation, useCreateResourceMutation, useCreateAssignmentMutation, useCreateTestMutation } = materialApi;