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
    tagTypes: ['User'],
    endpoints: (builder) => ({
        changePassword: builder.mutation ({
            query: (data) => ({
                url: "doi-mat-khau",
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ['User'],
        }),
        updatePersonalInformation: builder.mutation ({
            query: (data) => ({
                url: "update-information",
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ['User'],
        }),
        getAvatar: builder.query ({
            query: (id) => `avatar/${id}`,
            providesTags: ['User'],
        }),
        updateAvatar: builder.mutation ({
            query: (data) => ({
                url: "upload-avatar",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ['User'],
        }),
        getListEngineer: builder.query ({
            query: () => "engineer",
            providesTags: ['User'],
        }),
    }),
});;

export const { 
    useChangePasswordMutation,
    useUpdatePersonalInformationMutation,
    useGetAvatarQuery,
    useUpdateAvatarMutation
} = employeeApi;