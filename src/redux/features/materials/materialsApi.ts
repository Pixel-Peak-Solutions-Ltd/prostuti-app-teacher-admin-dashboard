import { baseApi } from "../../api/baseApi";

const materialApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createRecordClass: builder.mutation({
            query: (recordClassData) => {
                // validation
                if (!recordClassData || Object.keys(recordClassData).length === 0) {
                    console.warn('Empty data being sent to API');
                    throw new Error('No Data to Send'); // or throw an error
                }
                return {
                    url: '/recoded-class',
                    method: 'POST',
                    body: recordClassData
                };
            }
        })
    })
});

export const { useCreateRecordClassMutation } = materialApi;