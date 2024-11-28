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
        })
    })
});

export const { useCreateRecordClassMutation } = materialApi;