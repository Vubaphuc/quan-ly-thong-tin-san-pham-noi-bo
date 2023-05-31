import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const END_POINT = "http://localhost:8080/admin";

export const statisticalApi = createApi ({
    reducerPath: "statisticalApi",
    baseQuery: fetchBaseQuery ({
        baseUrl:END_POINT,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;

            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Avatar'],
    endpoints: (builder) => ({
        findTotalProductEngineerAll: builder.query ({
            query: () => "products",
            providesTags: ['Avatar'],
        })
    }),
});;

export const { 
    useFindTotalProductEngineerAllQuery
} = statisticalApi;