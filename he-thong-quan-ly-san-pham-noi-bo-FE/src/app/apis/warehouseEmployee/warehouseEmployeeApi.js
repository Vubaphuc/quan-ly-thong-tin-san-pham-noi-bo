import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const END_POINT = "http://localhost:8080/warehouse-employee/v1";

export const warehouseEmployeeApi = createApi ({
    reducerPath: "warehouseEmployeeApi",
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
        getComponents: builder.query ({
            query: ({page,pageSize}) => `components?page=${page}&pageSize=${pageSize}`,
            providesTags: ['Warehouse'],
        }),
        createComponents: builder.mutation ({
            query: (data) => ({
                url: "components/create",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ['Warehouse'],
        }),
        createMaterial: builder.mutation ({
            query: (data) => ({
                url: "material/create",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ['Warehouse'],
        }),
        getListMaterialAll: builder.query ({
            query: ({page,pageSize}) => `materilies?page=${page}&pageSize=${pageSize}`,
            providesTags: ['Warehouse'],
        }),
        searchHistoryMaterial: builder.query ({
            query: ({page,pageSize,term}) => `history?page=${page}&pageSize=${pageSize}&term=${term}`,
            providesTags: ['Warehouse'],
        }),
        getListVendorAll: builder.query ({
            query: ({page,pageSize}) => `vendories?page=${page}&pageSize=${pageSize}`,
            providesTags: ['Warehouse'],
        }),
        createVendor: builder.mutation ({
            query: (data) => ({
                url: "vendor/create",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ['Warehouse'],
        }),
        getVendorById: builder.query ({
            query: (id) => `vendor/${id}`,
            providesTags: ['Warehouse'],
        }),
        getVendorByName: builder.query ({
            query: (name) => `search-vendor/${name}`,
            providesTags: ['Warehouse'],
        }),
        updateNameVendor: builder.mutation ({
            query: ({id,...data}) => ({
                url: `update-vendor/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ['Warehouse'],
        }),
        getListVendorTotalMaterial: builder.query ({
            query: ({page,pageSize}) => `warehouse?page=${page}&pageSize=${pageSize}`,
            providesTags: ['Warehouse'],
        }),
        getListVendorById: builder.query ({
            query: ({page,pageSize, vendorId}) => `vendor/detail?page=${page}&pageSize=${pageSize}&vendorId=${vendorId}`,
            providesTags: ['Warehouse'],
        }),
        getMaterialById: builder.query ({
            query: (id) => `material/${id}`,
            providesTags: ['Warehouse'],
        }),
        getComponentsById: builder.query ({
            query: (id) => `component/${id}`,
            providesTags: ['Warehouse'],
        }),
    }),
});;

export const { 
    useGetComponentsQuery,
    useCreateComponentsMutation,
    useCreateMaterialMutation,
    useGetListMaterialAllQuery,
    useSearchHistoryMaterialQuery,
    useGetListVendorAllQuery,
    useCreateVendorMutation,
    useGetVendorByIdQuery,
    useGetVendorByNameQuery,
    useUpdateNameVendorMutation,
    useGetListVendorByIdQuery,
    useGetListVendorTotalMaterialQuery,
    useGetMaterialByIdQuery,
    useGetComponentsByIdQuery
} = warehouseEmployeeApi;