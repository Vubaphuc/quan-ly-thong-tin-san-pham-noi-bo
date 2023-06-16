import React from "react";
import { Link } from "react-router-dom";
import hookFetchQuery from "../page/hookForm/hook/hookAccount/hookFetchQuery";

function Sidebar() {
  const { auth } = hookFetchQuery();

  const roles = auth.roles.map((role) => role.name);

  const isShowMenu = (authRoles, requireRoles) => {
    return authRoles.some((role) => requireRoles.includes(role));
  };

  return (

    <>
      <div className="sidebar">
        <nav className="navbar navbar-dark">
          <div className="logo d-flex justify-content-center align-items-center">
            {isShowMenu(roles, ["ADMIN"]) && (
              <h4 className="fs-4 text-white">ADMIN</h4>
            )}
            {isShowMenu(roles, ["NHANVIENLETAN"]) && (
              <h4 className="fs-4 text-white">Nhân Viên Lễ Tân</h4>
            )}
            {isShowMenu(roles, ["NHANVIENSUACHUA"]) && (
              <h4 className="fs-4 text-white">Nhân viên sửa chữa</h4>
            )}
            {isShowMenu(roles, ["NHANVIENKHO"]) && (
              <h4 className="fs-4 text-white">Nhân viên Kho</h4>
            )}
            {isShowMenu(roles, ["NHANVIENBAOHANH"]) && (
              <h4 className="fs-4 text-white">Nhân viên Bảo Hành</h4>
            )}
          </div>
          {isShowMenu(roles, ["NHANVIENLETAN"]) && (
            <div className="navbar-nav w-100">
              <Link to={"/employee/receptionist"} className="nav-item nav-link active"><i className="fa fa-tachometer-alt me-2"></i>Dashboard</Link>
              <div className="nav-item dropdown">
                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="fa fa-th me-2"></i>Quản lý Sản Phẩm</a>
                <div className="dropdown-menu bg-transparent border-0">
                  <Link to={"/employee/receptionist/products/pending"} className="dropdown-item">Danh sách sản phẩm Pending</Link>
                  <Link to={"/employee/receptionist/products"} className="dropdown-item">Danh sách sản phẩm trả Khách</Link>
                  <Link to={"/employee/receptionist/product-waiting-engineer"} className="dropdown-item"> Danh sách sản phẩm đang sửa</Link>
                  <Link to={"/employee/receptionist/product-waiting-repair"} className="dropdown-item">Đăng ký nhân viên sửa</Link>
                  <Link to={"/employee/receptionist/search"} className="dropdown-item">Tìm kiếm sản phẩm</Link>
                </div>
              </div>
              <div className="nav-item dropdown">
                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="fa fa-laptop me-2"></i>Quản lý Khách Hàng</a>
                <div className="dropdown-menu bg-transparent border-0">
                  <Link to={"/employee/receptionist/customers"} className="dropdown-item">Danh sách khách hàng</Link>
                  <Link to={"/employee/receptionist/customer/create"} className="dropdown-item">Đăng ký khách hàng</Link>
                </div>
              </div>              
              <div className="nav-item dropdown">
                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="fa fa-keyboard me-2"></i>Quản lý Bảo Hành</a>
                <div className="dropdown-menu bg-transparent border-0">
                  <Link to={"/employee/receptionist/guarantees"} className="dropdown-item">Danh sách bảo hành</Link>
                  <Link to={"/employee/receptionist/product-register-guarantee"} className="dropdown-item">Sản phẩm chờ đăng ký bảo hành</Link>
                </div>
              </div>
              <div className="nav-item dropdown">
                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="fa fa-keyboard me-2"></i>Quản lý Hóa đơn</a>
                <div className="dropdown-menu bg-transparent border-0">
                  <Link to={"/employee/receptionist/bills"} className="dropdown-item">Danh sách hóa đơn</Link>
                </div>
              </div>
              <div className="nav-item dropdown">
                <a
                  href="#"
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  <i className="far fa-file-alt me-2"></i>
                  Tài khoản
                </a>
                <div className="dropdown-menu bg-transparent border-0">
                  <Link to={"/employee/personal-information"} className="dropdown-item">Thông tin tài khoản</Link>
                  <Link to={"/employee/change-password"} className="dropdown-item">Đổi Mật khẩu</Link>
                </div>
              </div>
            </div>
          )}
          {isShowMenu(roles, ["NHANVIENSUACHUA"]) && (
            <div className="navbar-nav w-100">
              <Link to={"/employee/engineer"} className="nav-item nav-link active"><i className="fa fa-tachometer-alt me-2"></i>Dashboard</Link>
              <div className="nav-item dropdown">
                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="fa fa-th me-2"></i>Sản Phẩm</a>
                <div className="dropdown-menu bg-transparent border-0">
                  <Link to={"/employee/engineer"} className="dropdown-item">Danh sách Sản Phẩm</Link>
                </div>
              </div>
              <div className="nav-item dropdown">
                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="fa fa-laptop me-2"></i>Quản lý Oder</a>
                <div className="dropdown-menu bg-transparent border-0">
                  <Link to={"/employee/engineer/orders"} className="dropdown-item">Danh sách Oder</Link>
                </div>
              </div>
              <div className="nav-item dropdown">
                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="fa fa-keyboard me-2"></i>Vật liệu</a>
                <div className="dropdown-menu bg-transparent border-0">
                  <Link to={"/employee/engineer/materials"} className="dropdown-item">Danh sách Vật Liệu</Link>
                </div>
              </div>
              <div className="nav-item dropdown">
                <a
                  href="#"
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  <i className="far fa-file-alt me-2"></i>
                  Thông tin tài khoản
                </a>
                <div className="dropdown-menu bg-transparent border-0">
                  <Link to={"/employee/personal-information"} className="dropdown-item">Thông tin tài khoản</Link>
                  <Link to={"/employee/change-password"} className="dropdown-item">Đổi Mật khẩu</Link>
                </div>
              </div>
            </div>
          )}
          {isShowMenu(roles, ["NHANVIENKHO"]) && (
            <div className="navbar-nav w-100">
              <Link to={"/employee/warehouse"} className="nav-item nav-link active"><i className="fa fa-tachometer-alt me-2"></i>Dashboard</Link>
              <div className="nav-item dropdown">
                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="fa fa-th me-2"></i>Quản lý Vật liệu</a>
                <div className="dropdown-menu bg-transparent border-0">
                  <Link to={"/employee/warehouse"} className="dropdown-item">Danh sách Vật liệu</Link>
                  <Link to={"/employee/warehouse/material/create"} className="dropdown-item">Đăng ký vật liệu</Link>
                  <Link to={"/employee/warehouse/search/material"} className="dropdown-item">Tìm kiếm vật liệu</Link>
                </div>
              </div>
              <div className="nav-item dropdown">
                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="fa fa-laptop me-2"></i>Linh Kiện</a>
                <div className="dropdown-menu bg-transparent border-0">
                  <Link to={"/employee/warehouse/components"} className="dropdown-item">Danh Sách Linh Kiện</Link>
                  <Link to={"/employee/warehouse/component/create"} className="dropdown-item">Đăng ký Linh Kiện Mới</Link>
                </div>
              </div>
              <div className="nav-item dropdown">
                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="fa fa-keyboard me-2"></i>Quản lý Oder</a>
                <div className="dropdown-menu bg-transparent border-0">
                  <Link to={"/employee/warehouse/orderMaterials"} className="dropdown-item">Danh sách oder vật liệu</Link>
                  <Link to={"/employee/warehouse/search/order"} className="dropdown-item">Tìm kiếm oder</Link>
                </div>
              </div>
              <div className="nav-item dropdown">
                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="fa fa-keyboard me-2"></i>Quản lý Vender</a>
                <div className="dropdown-menu bg-transparent border-0">
                  <Link to={"/employee/warehouse/vendors"} className="dropdown-item">Danh sách Vender</Link>
                  <Link to={"/employee/warehouse/vendor/create"} className="dropdown-item">Thêm Vender Mới</Link>
                </div>
              </div>
              <div className="nav-item dropdown">
                <a
                  href="#"
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  <i className="far fa-file-alt me-2"></i>
                  Tài khoản
                </a>
                <div className="dropdown-menu bg-transparent border-0">
                  <Link to={"/employee/personal-information"} className="dropdown-item">Thông tin tài khoản</Link>
                  <Link to={"/employee/change-password"} className="dropdown-item">Đổi Mật khẩu</Link>
                </div>
              </div>
            </div>
          )}
          {isShowMenu(roles, ["NHANVIENBAOHANH"]) && (
            <div className="navbar-nav w-100">
              <Link to={"/employee/warranty"} className="nav-item nav-link active"><i className="fa fa-tachometer-alt me-2"></i>Dashboard</Link>
              <div className="nav-item dropdown">
                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="fa fa-th me-2"></i>Quản lý Sản Phẩm</a>
                <div className="dropdown-menu bg-transparent border-0">
                  <Link to={"/employee/warranty/search/products"} className="dropdown-item">Danh sách Sản Phẩm</Link>
                  <Link to={"/employee/warranty"} className="dropdown-item">Danh sách Sản Phẩm bảo hành</Link>
                  <Link to={"/employee/warranty/customeries"} className="dropdown-item">Danh Sách Sản Phẩm Pending</Link>
                  <Link to={"/employee/warranty/products"} className="dropdown-item">Chuyển Sản Phẩm Bảo Hành</Link>
                </div>
              </div>
              <div className="nav-item dropdown">
                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="fa fa-th me-2"></i>Quản lý Bảo hành</a>
                <div className="dropdown-menu bg-transparent border-0">
                  <Link to={"/employee/warranty"} className="dropdown-item">Danh sách bảo hành</Link>
                  <Link to={"/employee/warranty/customeries"} className="dropdown-item">Danh Sách Khách hàng</Link>
                </div>
              </div>
              <div className="nav-item dropdown">
                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="fa fa-laptop me-2"></i>Danh sách hóa đơn và bảo hành</a>
                <div className="dropdown-menu bg-transparent border-0">
                  <Link to={"/employee/warranty/bills"} className="dropdown-item">Danh sách hóa đơn</Link>
                  <Link to={"/employee/warranty/guarantees"} className="dropdown-item">Danh sách bảo hành</Link>
                </div>
              </div>         
              <div className="nav-item dropdown">
                <a
                  href="#"
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  <i className="far fa-file-alt me-2"></i>
                  Tài khoản
                </a>
                <div className="dropdown-menu bg-transparent border-0">
                  <Link to={"/employee/personal-information"} className="dropdown-item">Thông tin tài khoản</Link>
                  <Link to={"/employee/change-password"} className="dropdown-item">Đổi Mật khẩu</Link>
                </div>
              </div>
            </div>
          )}
          {isShowMenu(roles, ["ADMIN"]) && (
            <div className="navbar-nav w-100">
              <Link to={"/admin"} className="nav-item nav-link active"><i className="fa fa-tachometer-alt me-2"></i>Dashboard</Link>
              <Link to={"/admin/shop"} className="nav-item nav-link chart" ><i className="fa fa-chart-bar me-2"></i>Charts</Link>
              <Link to={"/admin/material-manage"} className="nav-item nav-link material" ><i className="fa fa-chart-bar me-2"></i>Material</Link>
              <Link to={"/admin/product-manage"} className="nav-item nav-link product" ><i className="fa fa-chart-bar me-2"></i>Product</Link>
              <div className="nav-item dropdown">
                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="fa fa-th me-2"></i>Khách Hàng</a>
                <div className="dropdown-menu bg-transparent border-0">
                  <Link to={"/admin/customers"} className="dropdown-item">Danh sách Khách hàng</Link>
                  <Link to={"/admin/products"} className="dropdown-item">Danh sách Sản Phẩm</Link>
                </div>
              </div>
              <div className="nav-item dropdown">
                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="fa fa-laptop me-2"></i>Vật Liệu</a>
                <div className="dropdown-menu bg-transparent border-0">
                  <Link to={"/admin/materials"} className="dropdown-item">Danh sách Vật Liệu</Link>
                  <Link to={"/admin/orderMaterials"} className="dropdown-item">Danh sách Order Vật Liệu</Link>
                </div>
              </div>
              <div className="nav-item dropdown">
                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="fa fa-keyboard me-2"></i>Nhân Viên</a>
                <div className="dropdown-menu bg-transparent border-0">
                  <Link to={"/admin/employees"} className="dropdown-item">Danh sách nhân viên</Link>
                  <Link to={"/admin/employee/create"} className="dropdown-item">Đăng ký Nhân Viên mới</Link>
                </div>
              </div>
              <div className="nav-item dropdown">
                <a
                  href="#"
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  <i className="far fa-file-alt me-2"></i>
                  Thông tin tài khoản
                </a>
                <div className="dropdown-menu bg-transparent border-0">
                  <Link to={"/employee/personal-information"} className="dropdown-item">Thông tin tài khoản</Link>
                  <Link to={"/employee/change-password"} className="dropdown-item">Đổi Mật khẩu</Link>
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>
    </>
  );
}

export default Sidebar;
