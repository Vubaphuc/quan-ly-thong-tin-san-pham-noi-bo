import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const END_POINT = "http://localhost:8080/customer";

export const visitorApi = createApi ({
    reducerPath: "visitorApi",
    baseQuery: fetchBaseQuery ({ baseUrl: END_POINT }),
    tagTypes: ['Visitor'],
    endpoints: (builder) => ({
        searchHistoryProductByImeProductOrPhoneNumber: builder.query ({     
            query: ({ime, phoneNumber}) => `search?ime=${ime}&phoneNumber=${phoneNumber}`,
            providesTags:['Visitor'],
        }),
        searchGuaranteeByGuaranteeCode: builder.query ({
            query: ({code}) => `guarantee?code=${code}`,
            providesTags: ['Visitor'],
        }),
    }),
});

export const {
    useLazySearchHistoryProductByImeProductOrPhoneNumberQuery,
    useLazySearchGuaranteeByGuaranteeCodeQuery
} = visitorApi;