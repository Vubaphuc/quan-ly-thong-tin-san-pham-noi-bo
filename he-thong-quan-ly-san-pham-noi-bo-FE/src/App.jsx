import { Route, Routes } from "react-router-dom";
import "./App.css";
import PrivateRoutes from "./components/PrivateRoutes";
import LoginPage from "./page/login/LoginPage";
import ForgotPassword from "./page/login/ForgotPassword";
import NotFound from "./page/notfound/NotFound";
import Customer from "./page/customer/Customer";
import PersonalInformation from "./page/employee/PersonalInformation";
import ChangePassword from "./page/employee/ChangePassword";
import WarranttyEmployeePage from "./page/employee/WarrantyEmployee/WarranttyEmployeePage";
import WarehouseEmployeePage from "./page/employee/WarehouseEmployee/WarehouseEmployeePage";
import EngineerPage from "./page/employee/Engineer/EngineerPage";
import ReceptionistPage from "./page/employee/Receptionist/ReceptionistPage";
import AuthorizeRoutes from "./components/AuthorizeRoutes";
import Layout from "./components/Layout";

function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/nhan-vien" element={<Layout />}>
            <Route path="le-tan">
              {/* Trang nhân viên lễ tân */}
              <Route
                element={<AuthorizeRoutes requireRoles={["NHANVIENLETAN"]} />}
              >
                <Route index element={<ReceptionistPage />} />
              </Route>

              {/* các đường dẫn còn lại */}
              <Route path="*" element={<NotFound />} />
            </Route>

            <Route path="sua-chua">
              {/* trang nhân viên sửa chữa */}
              <Route
                element={<AuthorizeRoutes requireRoles={["NHANVIENSUACHUA"]} />}
              >
                <Route index element={<EngineerPage />} />
              </Route>
            </Route>

            <Route path="kho">
              {/* trang nhân viên kho */}
              <Route
                element={<AuthorizeRoutes requireRoles={["NHANVIENKHO"]} />}
              >
                <Route index element={<WarehouseEmployeePage />} />
              </Route>
            </Route>

            <Route path="bao-hanh">
              {/* trang nhân viên kho */}
              <Route
                element={<AuthorizeRoutes requireRoles={["NHANVIENBAOHANH"]} />}
              >
                <Route index element={<WarranttyEmployeePage />} />
              </Route>
            </Route>

            {/* phần trang chung của nhân viên */}
            <Route path="thong-tin">
              <Route
                element={
                  <AuthorizeRoutes
                    requireRoles={[
                      "NHANVIENSUACHUA",
                      "NHANVIENLETAN",
                      "ADMIN",
                      "NHANVIENKHO",
                      "NHANVIENBAOHANH",
                    ]}
                  />
                }
              >
                <Route path="doi-mat-khau" element={<ChangePassword />} />
                <Route path="tai-khoan" element={<PersonalInformation />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>

        {/* trang login */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/quen-mat-khau" element={<ForgotPassword />} />

        <Route path="/" element={<Customer />} />

        {/* Trang chế độ khách */}
        {/* <Route path="/khach" /> */}

        {/* các đường dẫn khác */}
        <Route path="*" element={<NotFound />} />
      </Routes>

    </>
  );
}

export default App;
