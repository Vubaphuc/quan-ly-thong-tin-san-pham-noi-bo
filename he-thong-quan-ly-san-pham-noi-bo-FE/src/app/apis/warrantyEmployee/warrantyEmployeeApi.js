import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const END_POINT = "http://localhost:8080/warranty-employee";

export const warrantyEmployeeApi = createApi ({
    reducerPath: "warrantyEmployeeApi",
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
    tagTypes: ['Warranty'],
    endpoints: (builder) => ({
        searchHistoryProductByTerm: builder.query ({
            query: ({page,pageSize,term}) => `search/history-product?page=${page}&pageSize=${pageSize}&term=${term}`,
            providesTags: ['Warranty'],
        }),
        findProductAndCustomerById: builder.query ({
            query: (id) => `product/${id}`,
            providesTags: ['Warranty'],
        }),
        getProductWarrantyById: builder.query ({
            query: (id) => `product/guarantee/${id}`,
            providesTags: ['Warranty'],
        }),
        createProductWarrantyMoney: builder.mutation ({
            query: (data) => ({
                url: "create/charge",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ['Warranty'],
        }),
        createProductWarrantyNoMoney: builder.mutation ({
            query: (data) => ({
                url: "create/no-charge",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ['Warranty'],
        }),
        getListProductWarrantyPending: builder.query ({
            query: ({page,pageSize,term}) => `product/pending?page=${page}&pageSize=${pageSize}&term=${term}`,
            providesTags: ['Warranty'],
        }),
        getListProductWarrantyOk: builder.query ({
            query: ({page,pageSize,term}) => `product/ok?page=${page}&pageSize=${pageSize}&term=${term}`,
            providesTags: ['Warranty'],
        }),
        getListProductWarrantyAll: builder.query ({
            query: ({page,pageSize,term}) => `product/all?page=${page}&pageSize=${pageSize}&term=${term}`,
            providesTags: ['Warranty'],
        }),
        updateInformationEngineer: builder.query ({
            query: (id) => `product/engineer/${id}`,
            providesTags: ['Warranty'],
        }),
    }),
});;

export const { 
    useSearchHistoryProductByTermQuery,
    useFindProductAndCustomerByIdQuery,
    useGetProductWarrantyByIdQuery,
    useCreateProductWarrantyMoneyMutation,
    useCreateProductWarrantyNoMoneyMutation,
    useGetListProductWarrantyAllQuery,
    useGetListProductWarrantyPendingQuery,
    useGetListProductWarrantyOkQuery,
    useUpdateInformationEngineerQuery
} = warrantyEmployeeApi;