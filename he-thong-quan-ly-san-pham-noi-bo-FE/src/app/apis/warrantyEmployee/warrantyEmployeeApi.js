import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const END_POINT = "http://localhost:8080/warranty-employee";

export const warrantyEmployeeApi = createApi({
  reducerPath: "warrantyEmployeeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: END_POINT,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Warranty"],
  endpoints: (builder) => ({
    getListCustomeriesByTerm: builder.query({
      query: ({ page, pageSize, term }) =>
        `customeries?page=${page}&pageSize=${pageSize}&term=${term}`,
      providesTags: ["Warranty"],
    }),
    getCustomerById: builder.query({
      query: (id) => `customer/${id}`,
      providesTags: ["Warranty"],
    }),
    createProductCharge: builder.mutation({
      query: (data) => ({
        url: "product/create-charge",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Warranty"],
    }),
    createProductNoCharge: builder.mutation({
      query: (data) => ({
        url: "product/create-no-charge",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Warranty"],
    }),
    getListProductPendingNoEngineer: builder.query({
      query: ({ page, pageSize, term }) =>
        `product-pending?page=${page}&pageSize=${pageSize}&term=${term}`,
      providesTags: ["Warranty"],
    }),
    getListHistoryProductByIME: builder.query({
      query: ({ ime }) => `history-products?IME=${ime}`,
      providesTags: ["Warranty"],
    }),
    findProductById: builder.query({
      query: (id) => `product/${id}`,
      providesTags: ["Warranty"],
    }),
    updateEngineerInformationByProduct: builder.mutation({
      query: (data) => ({
        url: "update-product",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ['Warranty'],
    }),
    findProductGuaranteeStatusOKByTerm: builder.query ({
      query: ({page, pageSize, term}) => `products?page=${page}&pageSize=${pageSize}&term=${term}`,
      providesTags: ['Warranty'],
    }),
    warrantyCreateBill: builder.mutation ({
      query: (data) => ({
        url: "bill/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['Warranty'],
    }),
    findBillProductGuaranteeAll: builder.query({
      query: ({page, pageSize, term}) => `bills?page=${page}&pageSize=${pageSize}&term=${term}`,
      providesTags: ['Warranty'],
    }),
    findGuaranteeAll: builder.query({
      query: ({page, pageSize, term}) => `guarantees?page=${page}&pageSize=${pageSize}&term=${term}`,
      providesTags: ['Warranty'],
    }),
    findProductEngineerPendingAll: builder.query ({
      query: ({page, pageSize, term}) => `pending-product?page=${page}&pageSize=${pageSize}&term=${term}`,
      providesTags: ['Warranty'],
    }),
    findProductPendingEngineerById: builder.query ({
      query: (id) => `pending-product/${id}`,
      providesTags: ['Warranty'],
    }),
    updateEngineerProductById: builder.mutation ({
      query: ({id, ...data}) => ({
        url: `pending-product/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ['Warranty'],
    }),
    findHistoryProductRepairShop: builder.query ({
      query: ({page, pageSize, term}) => `history-product?page=${page}&pageSize=${pageSize}&term=${term}`,
      providesTags: ['Warranty'],
    }),
    findCustomerAndProductById: builder.query ({
      query: (id) => `customer-product/${id}`,
      providesTags: ['Warranty']
    }),
  }),
});

export const {
  useGetListCustomeriesByTermQuery,
  useGetCustomerByIdQuery,
  useCreateProductChargeMutation,
  useCreateProductNoChargeMutation,
  useLazyGetListProductPendingNoEngineerQuery,
  useLazyGetListHistoryProductByIMEQuery,
  useFindProductByIdQuery,
  useUpdateEngineerInformationByProductMutation,
  useLazyFindProductGuaranteeStatusOKByTermQuery,
  useWarrantyCreateBillMutation,
  useLazyFindBillProductGuaranteeAllQuery,
  useLazyFindGuaranteeAllQuery,
  useLazyFindProductEngineerPendingAllQuery,
  useFindProductPendingEngineerByIdQuery,
  useUpdateEngineerProductByIdMutation,
  useLazyFindHistoryProductRepairShopQuery,
  useFindCustomerAndProductByIdQuery
} = warrantyEmployeeApi;
