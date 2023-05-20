import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const END_POINT = "http://localhost:8080/api/v1/public/auth";

export const authApi = createApi ({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery ({ baseUrl: END_POINT }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: "login",
                method: "POST",
                body: data
            }),
        }),
    }),
});

export const {
    useLoginMutation
} = authApi;