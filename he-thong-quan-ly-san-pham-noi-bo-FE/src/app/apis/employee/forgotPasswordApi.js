import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";


const END_POINT = "http://localhost:8080/api/v1/employee"

export const forgotPasswordApi = createApi ({
    reducerPath: "forgotPasswordApi",
    baseQuery: fetchBaseQuery({ baseUrl: END_POINT }),
    endpoints: (builder) => ({
        forgotPassword: builder.mutation({
            query: (data) => ({
                url: "forgot-password",
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const {
    useForgotPasswordMutation
} = forgotPasswordApi;