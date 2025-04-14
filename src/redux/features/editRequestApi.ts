import { baseApi } from '../api/baseApi';

interface EditRequestPayload {
    resourceType: 'Course' | 'Assignment' | 'RecordedClass' | 'Resource' | 'Test' | 'Notice';
    resourceId: string;
    title: string;
    message: string;
}

interface EditRequestResponse {
    success: boolean;
    message: string;
    data: {
        _id: string;
        recipient: string;
        sender: string;
        type: string;
        title: string;
        message: string;
        resourceType: string;
        resourceId: string;
        isRead: boolean;
        metaData: {
            requestedBy: string;
            requestedAt: string;
        };
        createdAt: string;
        updatedAt: string;
    };
}

const editRequestApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createEditRequest: builder.mutation<EditRequestResponse, EditRequestPayload>({
            query: (payload) => ({
                url: '/edit-requests',
                method: 'POST',
                body: payload,
            }),
        }),

        getMyEditRequests: builder.query({
            query: (params) => ({
                url: '/edit-requests/my-requests',
                method: 'GET',
                params,
            }),
        }),
    }),
});

export const {
    useCreateEditRequestMutation,
    useGetMyEditRequestsQuery,
} = editRequestApi;