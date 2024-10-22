import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://prostuti-app-backend-production.up.railway.app/api/v1' }),
    endpoints: () => ({}),
});