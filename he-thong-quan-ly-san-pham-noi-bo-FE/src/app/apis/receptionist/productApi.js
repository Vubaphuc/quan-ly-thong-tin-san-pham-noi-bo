import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const END_POINT = "http://localhost:8080/receptionist/v2";

export const productApi = createApi ({
    reducerPath: "productApi",
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
    tagTypes: ['Receptionist'],
    endpoints: (builder) => ({
        getPageProductNewCreate: builder.query ({
            query: ({page,pageSize,term}) => `product-new?page=${page}&pageSize=${pageSize}&term=${term}`,
            providesTags: ['Receptionist'],
        }),
        getProductById: builder.query ({
            query: (id) => `product/${id}`,
            providesTags: ['Receptionist'],
        }),
        updateEngineerInformationByProduct: builder.mutation ({
            query: ({id,...data}) => ({
                url: `update-product/${id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ['Receptionist'],
        }),
        getPageProductStatusOK: builder.query ({
            query: ({page, pageSize, term}) => `product-ok?page=${page}&pageSize=${pageSize}&term=${term}`,
            providesTags: ['Receptionist'],
        }),
        searchHistoryProductByTerm: builder.query ({
            query: ({page, pageSize, term}) => `product-history?page=${page}&pageSize=${pageSize}&term=${term}`,
            providesTags: ['Receptionist'],
        }),
        createProduct: builder.mutation({
            query: (data) => ({
                url: "create-product",
                method: "POST",
                body: data
            }),
            invalidatesTags: ['Receptionist'],
        }),
        createBill: builder.mutation({
            query: (data) => ({
                url: "create-bill",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ['Receptionist'],
        }),
        getBillById: builder.query({
            query: (id) => `product/bill/${id}`,
            providesTags: ['Receptionist'],
        }),

    }),
});;

export const { 
    useGetPageProductNewCreateQuery,
    useGetProductByIdQuery,
    useUpdateEngineerInformationByProductMutation,
    useGetPageProductStatusOKQuery,
    useSearchHistoryProductByTermQuery,
    useCreateProductMutation,
    useCreateBillMutation,
    useGetBillByIdQuery
} = productApi;