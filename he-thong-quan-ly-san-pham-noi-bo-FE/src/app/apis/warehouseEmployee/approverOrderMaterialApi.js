import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const END_POINT = "http://localhost:8080/warehouse-employee/v2";

export const approverOrderMaterialApi = createApi ({
    reducerPath: "approverOrderMaterialApi",
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
    tagTypes: ['Warehouse'],
    endpoints: (builder) => ({
        getListOrderMaterialStatusFalse: builder.query ({
            query: ({page,pageSize, term}) => `order-pending?page=${page}&pageSize=${pageSize}&term=${term}`,
            providesTags: ['Warehouse'],
        }),
        getListOrderMaterialStatusTrue: builder.query ({
            query: ({page,pageSize, term}) => `order-ok?page=${page}&pageSize=${pageSize}&term=${term}`,
            providesTags: ['Warehouse'],
        }),
        getOrderMaterialById: builder.query ({
            query: (id) => `order-material/${id}`,
            providesTags: ['Warehouse'],
        }),
        approveOrderMaterial: builder.mutation ({
            query: ({id,...data}) => ({
                url: `app-order/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ['Warehouse'],
        }),
        searchOrderMaterialByTerm: builder.query ({
            query: ({page,pageSize, term}) => `search-term?page=${page}&pageSize=${pageSize}&term=${term}`,
            providesTags: ['Warehouse'],
        }),
    }),
});;

export const { 
    useGetListOrderMaterialStatusFalseQuery,
    useGetListOrderMaterialStatusTrueQuery,
    useGetOrderMaterialByIdQuery,
    useApproveOrderMaterialMutation,
    useSearchOrderMaterialByTermQuery
} = approverOrderMaterialApi;