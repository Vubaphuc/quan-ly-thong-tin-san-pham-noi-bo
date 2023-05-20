import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import { authApi } from "./apis/login/authApi";
import { employeeApi } from "./apis/employee/employeeApi";
import { forgotPasswordApi } from "./apis/employee/forgotPasswordApi";
import { customerApi } from "./apis/receptionist/customerApi";
import { productApi } from "./apis/receptionist/productApi";
import { approverOrderMaterialApi } from "./apis/warehouseEmployee/approverOrderMaterialApi";
import { warehouseEmployeeApi } from "./apis/warehouseEmployee/warehouseEmployeeApi";
import { warrantyEmployeeApi } from "./apis/warrantyEmployee/warrantyEmployeeApi";
import { engineerApi } from "./apis/engineer/engineerApi";


const store = configureStore ({
    reducer: {
        auth: authReducer,
        [employeeApi.reducerPath]: employeeApi.reducer,
        [forgotPasswordApi.reducerPath]: forgotPasswordApi.reducer,
        [engineerApi.reducerPath]: engineerApi.reducer,
        [customerApi.reducerPath]: customerApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [approverOrderMaterialApi.reducerPath]: approverOrderMaterialApi.reducer,
        [warehouseEmployeeApi.reducerPath]: warehouseEmployeeApi.reducer,
        [warrantyEmployeeApi.reducerPath]: warrantyEmployeeApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        authApi.middleware,
        employeeApi.middleware,
        forgotPasswordApi.middleware,
        engineerApi.middleware,
        customerApi.middleware,
        productApi.middleware,
        approverOrderMaterialApi.middleware,
        warehouseEmployeeApi.middleware,
        warrantyEmployeeApi.middleware
    ),
});

export default store;