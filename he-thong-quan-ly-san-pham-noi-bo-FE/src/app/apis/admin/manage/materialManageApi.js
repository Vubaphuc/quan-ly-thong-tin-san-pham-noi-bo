import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const END_POINT = "http://localhost:8080/admin/api/v5";

export const materialManageApi = createApi ({
    reducerPath: "materialManageApi",
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
    tagTypes: ['Materials'],
    endpoints: (builder) => ({
        findMaterialsAll: builder.query ({
            query: ({page,pageSize,term}) => `materials?page=${page}&pageSize=${pageSize}&term=${term}`,
            providesTags: ['Materials'],
        }),
        findMaterialById: builder.query ({
            query: (id) => `material/${id}`,
            providesTags: ['Materials'],
        }),
        findVendorAll: builder.query ({
            query: () => "vendors",
            providesTags: ['Materials'],
        }),
        findComponentsAll: builder.query ({
            query: () => "components",
            providesTags: ['Materials'],
        }),
        deleteMaterialById: builder.mutation ({
            query: (id) => ({
                url: `material/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Materials'],
        }),
        updateMaterialById: builder.mutation ({
            query: ({id,...data}) => ({
                url: `material/${id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ['Materials'],
        }),
        findOrderMaterialsAll: builder.query ({
            query: ({page,pageSize,term}) => `order-materials?page=${page}&pageSize=${pageSize}&term=${term}`,
            providesTags: ['Materials'],
        }),
        findOrderMaterialsIsDeleteTrueAll: builder.query ({
            query: ({page,pageSize,term}) => `order-materials-isDelete?page=${page}&pageSize=${pageSize}&term=${term}`,
            providesTags: ['Materials'],
        }),
        findOrderMaterialById: builder.query ({
            query: (id) => `order-material/${id}`,
            providesTags: ['Materials'],
        }),
        updateOrderMaterialById: builder.mutation ({
            query: ({id,...data}) => ({
                url: `order-material/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ['Materials'],
        }),
        deleteOrderMaterialById: builder.mutation ({
            query: (id) => ({
                url: `order-material/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Materials'],
        }),
        findMaterialProjectionAll: builder.query ({
            query: () => "material-projection",
            providesTags: ['Materials'],
        }),
    }),
});;

export const { 
    useLazyFindMaterialsAllQuery,
    useFindMaterialByIdQuery,
    useFindComponentsAllQuery,
    useFindVendorAllQuery,
    useDeleteMaterialByIdMutation,
    useUpdateMaterialByIdMutation,
    useFindOrderMaterialByIdQuery,
    useLazyFindOrderMaterialsAllQuery,
    useLazyFindOrderMaterialsIsDeleteTrueAllQuery,
    useUpdateOrderMaterialByIdMutation,
    useDeleteOrderMaterialByIdMutation,
    useFindMaterialProjectionAllQuery
} = materialManageApi;