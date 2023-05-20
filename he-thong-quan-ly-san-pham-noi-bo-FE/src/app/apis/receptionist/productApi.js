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
        // danh sách sản phẩm mới thêm mới
        getPageProductNewCreate: builder.query ({
            query: ({page,pageSize,term}) => `product-new?page=${page}&pageSize=${pageSize}&term=${term}`,
            providesTags: ['Receptionist'],
        }),
        // lấy sản phẩm theo id
        getProductById: builder.query ({
            query: (id) => `product/${id}`,
            providesTags: ['Receptionist'],
        }),
        // cập nhât thông tin nhân viên sửa chữa
        updateEngineerInformationByProduct: builder.mutation ({
            query: ({id,...data}) => ({
                url: `update-product/${id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ['Receptionist'],
        }),
        // lấy sản phẩm status = ok
        getPageProductStatusOK: builder.query ({
            query: ({page, pageSize, term}) => `product-ok?page=${page}&pageSize=${pageSize}&term=${term}`,
            providesTags: ['Receptionist'],
        }),
        // lấy tìm kiếm lịch sử sản phẩm
        searchHistoryProductByTerm: builder.query ({
            query: ({page, pageSize, term}) => `product-history?page=${page}&pageSize=${pageSize}&term=${term}`,
            providesTags: ['Receptionist'],
        }),
        // tạo sản phẩm mới
        createProduct: builder.mutation({
            query: (data) => ({
                url: "create-product",
                method: "POST",
                body: data
            }),
            invalidatesTags: ['Receptionist'],
        }),
        // tạo hóa đơn mới
        createBill: builder.mutation({
            query: (data) => ({
                url: "create-bill",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ['Receptionist'],
        }),
        // hóa đơn theo id
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