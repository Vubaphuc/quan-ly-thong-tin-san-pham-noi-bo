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
        findProductWaitingRepairAll: builder.query ({
            query: ({page,pageSize,term}) => `product-waiting?page=${page}&pageSize=${pageSize}&term=${term}`,
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
        // lấy sản phẩm ok chờ trả khách
        findProductWaitingReturnCustomerAll: builder.query ({
            query: ({page, pageSize, term}) => `products-return-customer?page=${page}&pageSize=${pageSize}&term=${term}`,
            providesTags: ['Receptionist'],
        }),
        // danh sách sản phẩm chờ đăng ký bảo hành
        findProductWaitingRegisterGuaranteeAll: builder.query ({
            query: ({page, pageSize, term}) => `products-register-guarantee?page=${page}&pageSize=${pageSize}&term=${term}`,
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
        findProductRepaiedById: builder.query ({
            query: (id) => `product-repaired/${id}`,
            providesTags: ['Receptionist'],
        }),
        // tạo hóa đơn mới
        createBill: builder.mutation({
            query: (id) => ({
                url: `create-bill/${id}`,
                method: "POST",
            }),
            invalidatesTags: ['Receptionist'],
        }),
        // hóa đơn theo id
        getBillById: builder.query({
            query: (id) => `product/bill/${id}`,
            providesTags: ['Receptionist'],
        }),
        getListBillAll: builder.query ({
            query: ({page, pageSize, term}) => `bills?page=${page}&pageSize=${pageSize}&term=${term}`,
            providesTags: ['Receptionist'],
        }),
        getListProductsPending: builder.query ({
            query: ({page, pageSize, term}) => `products/pending?page=${page}&pageSize=${pageSize}&term=${term}`,
            providesTags: ['Receptionist'],
        }),
        updateEngineerProductById: builder.mutation ({
            query: ({id,...data}) => ({
                url: `product/pending/${id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ['Receptionist'],
        }),     
        createNewGuarantee: builder.mutation ({
            query: (id) => ({
                url: `guarantee/create/${id}`,
                method: "POST",
            }),
            invalidatesTags: ['Receptionist'],
        }),
        findGuaranteeAll: builder.query ({
            query: ({page, pageSize, term}) => `guarantees?page=${page}&pageSize=${pageSize}&term=${term}`,
            providesTags: ['Receptionist'],
        }),  
        findProductFinishByUserRegister: builder.query ({
            query: ({page, pageSize, term}) => `products-finish?page=${page}&pageSize=${pageSize}&term=${term}`,
            providesTags: ['Receptionist'],    
        }),
        findProductPendingInShop: builder.query ({
            query: ({page, pageSize, term}) =>  `pending/products?page=${page}&pageSize=${pageSize}&term=${term}`,
            providesTags: ['Receptionist'],
        }),
        deleteProductById: builder.mutation ({
            query: (id) => ({
                url: `product/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Receptionist'],
        }),
    }),
});;

export const { 
    useFindProductWaitingRepairAllQuery,
    useGetProductByIdQuery,
    useUpdateEngineerInformationByProductMutation,
    useLazyFindProductWaitingReturnCustomerAllQuery,
    useLazyFindProductWaitingRegisterGuaranteeAllQuery,
    useSearchHistoryProductByTermQuery,
    useCreateProductMutation,
    useFindProductRepaiedByIdQuery,
    useCreateBillMutation,
    useGetBillByIdQuery,
    useGetListBillAllQuery,
    useLazyGetListProductsPendingQuery,
    useUpdateEngineerProductByIdMutation,
    useCreateNewGuaranteeMutation,
    useFindGuaranteeAllQuery,
    useLazyFindProductFinishByUserRegisterQuery,
    useLazyFindProductPendingInShopQuery,
    useDeleteProductByIdMutation
} = productApi;