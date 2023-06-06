import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const END_POINT = "http://localhost:8080/api/v1/employee";

export const employeeApi = createApi ({
    reducerPath: "employeeApi",
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
    tagTypes: ['Avatar'],
    endpoints: (builder) => ({
        changePassword: builder.mutation ({
            query: (data) => ({
                url: "change-password",
                method: "PUT",
                body: data,
            }),
        }),
        updatePersonalInformation: builder.mutation ({
            query: (data) => ({
                url: "update-information",
                method: "PUT",
                body: data,
            }),
        }),
        getAvatar: builder.query ({
            query: (id) => `avatar/${id}`,
            providesTags: ['Avatar']
        }),
        updateAvatar: builder.mutation ({
            query: (data) => ({
                url: "upload-avatar",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ['Avatar']
        }),
        getListEngineer: builder.query ({
            query: () => "engineer",
            providesTags: ['Avatar'],
        }),
        findReceptionistAll: builder.query ({
            query: () => "receptionist",
            providesTags: ['Avatar'],
        }),
        findWarehouseEmployeeAll: builder.query ({
            query: () => "warehouse-employee",
            providesTags: ['Avatar'],
        }),
        findReceptionistAndWarrantyEmployeeAll: builder.query ({
            query: () => "receive-pay",
            providesTags: ['Avatar']
        }),
        
    }),
});;

export const { 
    useChangePasswordMutation,
    useUpdatePersonalInformationMutation,
    useGetAvatarQuery,
    useUpdateAvatarMutation,
    useGetListEngineerQuery,
    useFindReceptionistAllQuery,
    useFindWarehouseEmployeeAllQuery,
    useFindReceptionistAndWarrantyEmployeeAllQuery
} = employeeApi;