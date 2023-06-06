import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const END_POINT = "http://localhost:8080/admin/api/v3";

export const productManageApi = createApi ({
    reducerPath: "productManageApi",
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
    tagTypes: ['Products'],
    endpoints: (builder) => ({
        findProductAlls: builder.query ({
            query: ({page,pageSize,term}) => `products?page=${page}&pageSize=${pageSize}&term=${term}`,
            providesTags: ['Products'],
        }),
        findProductProjectionById: builder.query ({
            query: (id) => `product/${id}`,
            providesTags: ['Products'],
        }),
        updateProductById: builder.mutation ({
            query: ({id,...data}) => ({
                url: `product/${id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ['Products']
        }),
        deleteProductById: builder.mutation ({
            query: (id) => ({
                url: `product/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Products'],
        })
    }),
});;

export const { 
    useLazyFindProductAllsQuery,
    useFindProductProjectionByIdQuery,
    useUpdateProductByIdMutation,
    useDeleteProductByIdMutation
} = productManageApi;