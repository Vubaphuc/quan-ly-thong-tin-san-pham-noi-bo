import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const END_POINT = "http://localhost:8080/engineer";

export const engineerApi = createApi ({
    reducerPath: "engineerApi",
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
    tagTypes: ['Engineer'],
    endpoints: (builder) => ({
        getListProductbyUser: builder.query ({
            query: ({page, pageSize, term}) => `products?page=${page}&pageSize=${pageSize}&term=${term}`,
            providesTags: ['Engineer'],
        }),
        getProductByID: builder.query ({
            query: (id) => `product/${id}`,
            providesTags: ['Engineer'],
        }),
        upDateInformationProductbyId: builder.mutation ({
            query: ({id,...data}) => ({
                url: `update-product/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ['Engineer'],
        }),
        getListComponentPhone: builder.query ({
            query: ({page, pageSize}) => `components?page=${page}&pageSize=${pageSize}`,
            providesTags: ['Engineer'],
        }),
        getListMaterialByQuantity: builder.query ({
            query: ({page, pageSize}) => `materialies?page=${page}&pageSize=${pageSize}`,
            providesTags: ['Engineer'],
        }),
        getMaterialById: builder.query ({
            query: (id) => `material/${id}`,
            providesTags: ['Engineer'],
        }),
        CreateOrderMaterial: builder.mutation({
            query: (data) => ({
                url: "order",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ['Engineer'],
        }),
        getListOrderMaterialByStatusTrue: builder.query ({
            query: ({page, pageSize}) => `order/status-true?page=${page}&pageSize=${pageSize}`,
            providesTags: ['Engineer'],
        }),
        getListOrderMaterialByStatusFalse: builder.query ({
            query: ({page, pageSize}) => `order/status-false?page=${page}&pageSize=${pageSize}`,
            providesTags: ['Engineer'],
        }),
        getListMaterialAndComponents: builder.query({
            query: ({nameModel, nameComponentts}) => `material-components?nameModel=${nameModel}&nameComponents=${nameComponentts}`,
            providesTags: ['Engineer'],
        }),
        getOrderMaterialById: builder.query ({
            query: (id) => `order/${id}`,
            providesTags: ['Engineer'],
        }),
        deleteOrderMaterialById: builder.mutation ({
            query: (id) => ({
                url: `order/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Engineer'],
        }),
        updateOrderMaterialById: builder.mutation ({
            query: ({id, ...data}) => ({
                url: `order/${id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ['Engineer'],
        }),
    }),
});;

export const { 
    useGetListProductbyUserQuery,
    useLazyGetListProductbyUserQuery,
    useGetProductByIDQuery,
    useUpDateInformationProductbyIdMutation,
    useGetListComponentPhoneQuery,
    useGetListMaterialByQuantityQuery,
    useGetMaterialByIdQuery,
    useCreateOrderMaterialMutation,
    useGetListOrderMaterialByStatusFalseQuery,
    useGetListOrderMaterialByStatusTrueQuery,
    useGetListMaterialAndComponentsQuery,
    useGetOrderMaterialByIdQuery,
    useDeleteOrderMaterialByIdMutation,
    useUpdateOrderMaterialByIdMutation
} = engineerApi;