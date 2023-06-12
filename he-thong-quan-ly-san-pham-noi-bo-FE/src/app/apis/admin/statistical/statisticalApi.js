import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const END_POINT = "http://localhost:8080/admin/api/v2";

export const statisticalApi = createApi ({
    reducerPath: "statisticalApi",
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
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        findStatisticsTotalProductToday: builder.query ({
            query: () => "products-total",
            providesTags: ['Product']
        }),
        findProductOKAlls: builder.query ({
            query: ({page,pageSize}) => `products-ok?page=${page}&pageSize=${pageSize}`,
            providesTags: ['Product'],
        }),
        findProductPendingAlls: builder.query ({
            query: ({page,pageSize}) => `products-pending?page=${page}&pageSize=${pageSize}`,
            providesTags: ['Product'],
        }),
        findTotalProductByEngineerAll: builder.query ({
            query: () => "products-engineer",
            providesTags: ['Product'],
        }),
        findTotalProductByEngineerYesterdayAll: builder.query ({
            query: () => "products-engineer-Yesterday",
            providesTags: ['Product'],
        }),
        findTotalPriceProductFinish: builder.query ({
            query: () => "total-price-finish",
            providesTags: ['Product'],
        }),
        findExportMaterialAll: builder.query ({
            query: ({page, pageSize}) => `export-material?page=${page}&pageSize=${pageSize}`,
            providesTags: ['Product'],
        }),
        totalPriceAndQuantityMaterial: builder.query ({
            query: () => "total-material",
            providesTags: ['Product'],
        }),
        findListTotalQuantityExportMaterialByMaterialCode: builder.query ({
            query: ({page,pageSize}) => `total-materials?page=${page}&pageSize=${pageSize}`,
            providesTags: ['Product'],
        }),
    }),
});;

export const { 
    useLazyFindStatisticsTotalProductTodayQuery,
    useFindProductOKAllsQuery,
    useFindProductPendingAllsQuery,
    useLazyFindTotalProductByEngineerAllQuery,
    useLazyFindTotalProductByEngineerYesterdayAllQuery,
    useLazyFindTotalPriceProductFinishQuery,
    useFindExportMaterialAllQuery,
    useTotalPriceAndQuantityMaterialQuery,
    useFindListTotalQuantityExportMaterialByMaterialCodeQuery
} = statisticalApi;