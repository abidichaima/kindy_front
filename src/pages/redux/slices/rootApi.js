import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const rootApi = createApi({
    reducerPath: 'api',
    tagTypes: [],
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://elkindy-back.onrender.com/',
    }),
    endpoints: (builder) => ({}),
});