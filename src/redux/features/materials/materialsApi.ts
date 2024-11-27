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
            }
        })
    })
});

export const { useCreateRecordClassMutation } = materialApi;