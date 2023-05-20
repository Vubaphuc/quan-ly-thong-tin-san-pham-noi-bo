import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import PrivateRoutes from "./components/PrivateRoutes";
import LoginPage from "./page/login/LoginPage";
import ForgotPassword from "./page/login/ForgotPassword";
import NotFound from "./page/notfound/NotFound";
import Customer from "./page/customer/Customer";

function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />}>
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

      <ToastContainer
        position="top-right"
        autoClose={2000}
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
