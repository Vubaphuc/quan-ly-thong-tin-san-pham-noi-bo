import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const END_POINT = "http://localhost:8080/receptionist/v1";

export const customerApi = createApi ({
    reducerPath: "customerApi",
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
        searchProductStatusOKByCustomer: builder.query ({
            query: ({page, pageSize, term}) => `search/product-ok?page=${page}&pageSize=${pageSize}&term=${term}`,
            providesTags: ['Receptionist'],
        }),
        searchProductStatusPendingByCustomer: builder.query ({
            query: ({page, pageSize, term}) => `search/product-pending?page=${page}&pageSize=${pageSize}&term=${term}`,
            providesTags: ['Receptionist'],
        }),
        getListProductByCustomerId: builder.query ({
            query: ({id,page,pageSize}) => `products/${id}?page=${page}&pageSize=${pageSize}`,
            providesTags: ['Receptionist'],
        }),
        getCustomerById: builder.query({
            query: (id) => `customer/${id}`,
            providesTags: ['Receptionist'],
        }),
        createCustomer: builder.mutation ({
            query: (data) => ({
                url: "create-customer",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ['Receptionist'],
        }),
    }),
});;

export const { 
    useSearchProductStatusOKByCustomerQuery,
    useSearchProductStatusPendingByCustomerQuery,
    useGetListProductByCustomerIdQuery,
    useGetCustomerByIdQuery,
    useCreateCustomerMutation
} = customerApi;