import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const END_POINT = "http://localhost:8080/admin/api/v4";

export const customerManageApi = createApi ({
    reducerPath: "customerManageApi",
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
    tagTypes: ['Customers'],
    endpoints: (builder) => ({
        findCustomerAll: builder.query ({
            query: ({page,pageSize,term}) => `customers?page=${page}&pageSize=${pageSize}&term=${term}`,
            providesTags: ['Customers'],
        }),
        findCustomerById: builder.query ({
            query: (id) => `customer/${id}`,
            providesTags: ['Customers'],
        }),
        updateCustomerById: builder.mutation ({
            query: ({id, ...data}) => ({
                url: `customer/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ['Customers'],
        }),
        deleteCustomerById: builder.mutation ({
            query: (id) => ({
                url: `customer/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Customers'],
        }),
    }),
});;

export const { 
    useLazyFindCustomerAllQuery,
    useUpdateCustomerByIdMutation,
    useFindCustomerByIdQuery,
    useDeleteCustomerByIdMutation
} = customerManageApi;