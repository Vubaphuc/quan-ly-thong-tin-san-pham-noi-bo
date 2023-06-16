import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import RecepCustomerCreate from "./page/employee/Receptionist/customerRecep/RecepCustomerCreate";
import RecepCustomerList from "./page/employee/Receptionist/customerRecep/RecepCustomerList";
import RecepCustomerDetail from "./page/employee/Receptionist/customerRecep/RecepCustomerDetail";
import RecepBillList from "./page/employee/Receptionist/BillRecep/RecepBillList";
import RecepBillDetail from "./page/employee/Receptionist/BillRecep/RecepBillDetail";
import RecepSearchHistoryProduct from "./page/employee/Receptionist/RecepSearchHistoryProduct";
import EngiInformationProdcutRepair from "./page/employee/Engineer/engiProduct/EngiInformationProdcutRepair";
import WareComponentCreate from "./page/employee/WarehouseEmployee/components/WareComponentCreate";
import WareComponentList from "./page/employee/WarehouseEmployee/components/WareComponentList";
import WareComponentDetail from "./page/employee/WarehouseEmployee/components/WareComponentDetail";
import WareVendorCreate from "./page/employee/WarehouseEmployee/vendor/WareVendorCreate";
import WareVendorDetail from "./page/employee/WarehouseEmployee/vendor/WareVendorDetail";
import WareVendorList from "./page/employee/WarehouseEmployee/vendor/WareVendorList";
import WareMaterialCreate from "./page/employee/WarehouseEmployee/material/WareMaterialCreate";
import WareMaterialDetail from "./page/employee/WarehouseEmployee/material/WareMaterialDetail";
import WareOrderMaterialList from "./page/employee/WarehouseEmployee/orderMaterial/WareOrderMaterialList";
import WareOerderMaterialDetail from "./page/employee/WarehouseEmployee/orderMaterial/WareOerderMaterialDetail";
import WareSearchOrder from "./page/employee/WarehouseEmployee/search/WareSearchOrder";
import WareSearchMaterial from "./page/employee/WarehouseEmployee/search/WareSearchMaterial";
import EngiOrderMaterialList from "./page/employee/Engineer/engiOrderMaterial/EngiOrderMaterialList";
import EngiOrderMaterialCreate from "./page/employee/Engineer/engiOrderMaterial/EngiOrderMaterialCreate";
import EngiOrderMaterialDetail from "./page/employee/Engineer/engiOrderMaterial/EngiOrderMaterialDetail";
import EngiMaterialList from "./page/employee/Engineer/EngiMaterialList";
import WarrantyBillList from "./page/employee/WarrantyEmployee/bill/WarrantyBillList";
import WarrantyBillCreate from "./page/employee/WarrantyEmployee/bill/WarrantyBillCreate";
import WarrantyProductDetail from "./page/employee/WarrantyEmployee/product/WarrantyProductDetail";
import WarrantyProductCreate from "./page/employee/WarrantyEmployee/product/WarrantyProductCreate";
import WarrantyCustomerList from "./page/employee/WarrantyEmployee/customer/WarrantyCustomerList";
import WarrantyProductList from "./page/employee/WarrantyEmployee/product/WarrantyProductList";
import WarrantySearchHistoryProductList from "./page/employee/WarrantyEmployee/search/WarrantySearchHistoryProductList";
import RecepGuranteeList from "./page/employee/Receptionist/guarantee/RecepGuranteeList";
import WarrantyGuaranteeList from "./page/employee/WarrantyEmployee/guarantee/WarrantyGuaranteeList";
import WarrantyProductPendingList from "./page/employee/WarrantyEmployee/product/WarrantyProductPendingList";
import WarrantyProductPendingDetail from "./page/employee/WarrantyEmployee/product/WarrantyProductPendingDetail";
import AdminPage from "./page/admin/AdminPage";
import InformationShopPage from "./page/admin/InformationShopPage";
import CustomerManageList from "./page/admin/customerManage/CustomerManageList";
import CustomerManageDetail from "./page/admin/customerManage/CustomerManageDetail";
import MaterialManageList from "./page/admin/materialManage/MaterialManageList";
import MaterialManageDetail from "./page/admin/materialManage/MaterialManageDetail";
import OrderMaterialManageList from "./page/admin/orderMaterialManage/OrderMaterialManageList";
import OrderMaterialManageDetail from "./page/admin/orderMaterialManage/OrderMaterialManageDetail"
import ProductManageList from "./page/admin/productManage/ProductManageList";
import ProductManageDetail from "./page/admin/productManage/ProductManageDetail";
import EmployeeManageList from "./page/admin/employeeManage/EmployeeManageList";
import EmployeeManageDetail from "./page/admin/employeeManage/EmployeeManageDetail";
import EmployeeManageCreate from "./page/admin/employeeManage/EmployeManageCreate";
import MaterialPage from "./page/admin/statistics/MaterialPage";
import ProductPage from "./page/admin/statistics/ProductPage";
import WareUpdateMaterial from "./page/employee/WarehouseEmployee/material/WareUpdateMaterial";
import RecepProdcutWaitingRepairList from "./page/employee/Receptionist/productRecep/waitingRepair/RecepProdcutWaitingRepairList";
import RecepRegisterInformationEngineerProduct from "./page/employee/Receptionist/productRecep/waitingRepair/RecepRegisterInformationEngineerProduct";
import RecepProductWaitingRegisterGuaranteeList from "./page/employee/Receptionist/productRecep/waitingRegisterGuarantee/RecepProductWaitingRegisterGuaranteeList";
import RecepProductWaitingRegisterGuaranteeDetail from "./page/employee/Receptionist/productRecep/waitingRegisterGuarantee/RecepProductWaitingRegisterGuaranteeDetail";
import RecepProductList from "./page/employee/Receptionist/productRecep/RecepProductList";
import RecepProductWaitingEngineerList from "./page/employee/Receptionist/productRecep/waitingEngineer/RecepProductWaitingEngineerList";
import RecepProductWaitingEngineerDetail from "./page/employee/Receptionist/productRecep/waitingEngineer/RecepProductWaitingEngineerDetail";
import RecepProductCreate from "./page/employee/Receptionist/productRecep/RecepProductCreate";
import RecepProductPendingList from "./page/employee/Receptionist/productRecep/productPending/RecepProductPendingList";
import RecepProductPendingDetail from "./page/employee/Receptionist/productRecep/productPending/RecepProductPendingDetail";

function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/employee" element={<Layout />}>
            <Route path="receptionist">
              {/* Trang nhân viên lễ tân */}
              <Route
                element={<AuthorizeRoutes requireRoles={["NHANVIENLETAN"]} />}
              >
                <Route index element={<ReceptionistPage />} />
                <Route
                  path="customer/create"
                  element={<RecepCustomerCreate />}
                />
                <Route path="customers" element={<RecepCustomerList />} />
                <Route
                  path="customer/:customerId"
                  element={<RecepCustomerDetail />}
                />

                <Route path="products" element={<RecepProductList />} />
                <Route path="products/create/:customerId" element={<RecepProductCreate />} />
                <Route path="product-waiting-repair" element={<RecepProdcutWaitingRepairList />} />
                <Route path="product-register-engineer/:productId" element={<RecepRegisterInformationEngineerProduct />} />
                <Route path="product-waiting-engineer" element={<RecepProductWaitingEngineerList />} />
                <Route path="product-waiting-engineer/:productId" element={<RecepProductWaitingEngineerDetail />} />
                <Route path="product-register-guarantee" element={<RecepProductWaitingRegisterGuaranteeList />} />
                <Route path="product-register-guarantee/:productId" element={<RecepProductWaitingRegisterGuaranteeDetail />} />
                <Route path="products/pending" element={<RecepProductPendingList />} />
                <Route path="products/pending/:productId" element={<RecepProductPendingDetail />} />










                <Route path="bills" element={<RecepBillList />} />
                <Route path="bill/:productId" element={<RecepBillDetail />} />
                <Route path="search" element={<RecepSearchHistoryProduct />} />


                <Route path="guarantees" element={<RecepGuranteeList />} />              
              </Route>

              {/* các đường dẫn còn lại */}
              <Route path="*" element={<NotFound />} />
            </Route>

            <Route path="engineer">
              {/* trang nhân viên sửa chữa */}
              <Route
                element={<AuthorizeRoutes requireRoles={["NHANVIENSUACHUA"]} />}
              >
                <Route index element={<EngineerPage />} />
                <Route
                  path=":productId"
                  element={<EngiInformationProdcutRepair />}
                />
                <Route path="orders" element={<EngiOrderMaterialList />} />
                <Route
                  path="order/create/:materialId"
                  element={<EngiOrderMaterialCreate />}
                />
                <Route
                  path="order/:orderId"
                  element={<EngiOrderMaterialDetail />}
                />

                <Route path="materials" element={<EngiMaterialList />} />
              </Route>
            </Route>

            <Route path="warehouse">
              {/* trang nhân viên kho */}
              <Route
                element={<AuthorizeRoutes requireRoles={["NHANVIENKHO"]} />}
              >
                <Route index element={<WarehouseEmployeePage />} />

                <Route
                  path="component/create"
                  element={<WareComponentCreate />}
                />
                <Route path="components" element={<WareComponentList />} />
                <Route
                  path="component/:componentId"
                  element={<WareComponentDetail />}
                />

                <Route path="vendor/create" element={<WareVendorCreate />} />
                <Route path="vendor/:vendorId" element={<WareVendorDetail />} />
                <Route path="vendors" element={<WareVendorList />} />

                <Route
                  path="material/create"
                  element={<WareMaterialCreate />}
                />
                <Route
                  path="material/:materialId"
                  element={<WareMaterialDetail />}
                />
                <Route path="update-material/:materialId" element={<WareUpdateMaterial />} />
                <Route
                  path="orderMaterials"
                  element={<WareOrderMaterialList />}
                />
                <Route
                  path="orderMaterial/:orderId"
                  element={<WareOerderMaterialDetail />}
                />

                <Route path="search/order" element={<WareSearchOrder />} />
                <Route
                  path="search/material"
                  element={<WareSearchMaterial />}
                />
              </Route>
            </Route>

            <Route path="warranty">
              <Route
                element={<AuthorizeRoutes requireRoles={["NHANVIENBAOHANH"]} />}
              >
                <Route index element={<WarranttyEmployeePage />} />
                <Route
                  path="product/create/:productId"
                  element={<WarrantyProductCreate />}
                />
                <Route
                  path="product/:productId"
                  element={<WarrantyProductDetail />}
                />
                <Route path="products" element={<WarrantyProductList />} />
                <Route
                  path="product/pending"
                  element={<WarrantyProductPendingList />}
                />
                <Route
                  path="product/pending/:productId"
                  element={<WarrantyProductPendingDetail />}
                />

                <Route
                  path="bill/create/:productId"
                  element={<WarrantyBillCreate />}
                />
                <Route path="bills" element={<WarrantyBillList />} />


                <Route path="customeries" element={<WarrantyCustomerList />} />

                <Route path="guarantees" element={<WarrantyGuaranteeList />} />

                <Route
                  path="search/products"
                  element={<WarrantySearchHistoryProductList />}
                />
              </Route>
            </Route>

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
              <Route path="change-password" element={<ChangePassword />} />
              <Route
                path="personal-information"
                element={<PersonalInformation />}
              />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>

          {/* admin */}
          <Route element={<AuthorizeRoutes requireRoles={["ADMIN"]} />}>
            <Route path="admin" element={<Layout />}>
              <Route index element={<AdminPage />} />
              <Route path="shop" element={<InformationShopPage />} />

              <Route path="customers" element={<CustomerManageList />} />
              <Route path="customer/:customerId" element={<CustomerManageDetail />} />
              <Route path="materials" element={<MaterialManageList />} />
              <Route path="material/:materialId" element={<MaterialManageDetail />} />
              <Route path="orderMaterials" element={<OrderMaterialManageList />} />
              <Route path="orderMaterial/:orderMaterialId" element={<OrderMaterialManageDetail />} />
              <Route path="products" element={<ProductManageList />} />
              <Route path="product/:productId" element={<ProductManageDetail />} />
              <Route path="employee/create" element={<EmployeeManageCreate />} />
              <Route path="employees" element={<EmployeeManageList />} />
              <Route path="employee/:employeeId" element={<EmployeeManageDetail />} />
              <Route path="material-manage" element={<MaterialPage />} />
              <Route path="product-manage" element={<ProductPage />} />



            </Route>
          </Route>


        </Route>

        {/* trang login */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/" element={<Customer />} />


        {/* test layout moi */}


        {/* Trang chế độ khách */}
        {/* <Route path="/khach" /> */}

        {/* các đường dẫn khác */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
