import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Headers from "./Headers";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Layout() {
  return (
    <>
      <div>
        <Sidebar />
        <div className="wrapper-container">
          <Headers />
          <Outlet />
        </div>
      </div>

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

export default Layout;
