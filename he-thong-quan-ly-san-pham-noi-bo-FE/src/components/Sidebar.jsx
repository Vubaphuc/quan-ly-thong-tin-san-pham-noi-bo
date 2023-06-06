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
    <div className="sidebar">
      <div className="logo d-flex justify-content-center align-items-center">
        {isShowMenu(roles, ["ADMIN"]) && (
          <h3 className="fs-4 text-white">ADMIN</h3>
        )}
        {isShowMenu(roles, ["NHANVIENLETAN"]) && (
          <h3 className="fs-4 text-white">Nhân Viên Lễ Tân</h3>
        )}
        {isShowMenu(roles, ["NHANVIENSUACHUA"]) && (
          <h3 className="fs-4 text-white">Nhân viên sửa chữa</h3>
        )}
        {isShowMenu(roles, ["NHANVIENKHO"]) && (
          <h3 className="fs-4 text-white">Nhân viên Kho</h3>
        )}
        {isShowMenu(roles, ["NHANVIENBAOHANH"]) && (
          <h3 className="fs-4 text-white">Nhân viên Bảo Hành</h3>
        )}
      </div>
      <div className="menu">
        <div className="menu-item">
          <ul className="m-0 p-0">
            {isShowMenu(roles, ["NHANVIENLETAN"]) && (
              <>
                <div className="menu-item">
                  <h5>
                    <span className="d-inline-block me-1">
                      <i className="fa-solid fa-layer-group"></i>
                    </span>
                    Quản lý Sản Phẩm
                  </h5>
                  <ul className="m-0 p-0">
                    <li>
                      <Link
                        to={"/employee/receptionist"}
                        className="text-decoration-none"
                      >
                        Danh sách sản phẩm
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/employee/receptionist/products/pending"}
                        className="text-decoration-none"
                      >
                        Danh sách sản phẩm Pending
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/employee/receptionist/products"}
                        className="text-decoration-none"
                      >
                        Đăng ký nhân viên sửa
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/employee/receptionist/search"}
                        className="text-decoration-none"
                      >
                        Tìm kiếm sản phẩm
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="menu-item">
                  <h5>
                    <span className="d-inline-block me-1">
                      <i className="fa-solid fa-explosion"></i>
                    </span>
                    Quản lý Khách Hàng
                  </h5>
                  <ul className="m-0 p-0">
                    <li>
                      <Link
                        to={"/employee/receptionist/customers"}
                        className="text-decoration-none"
                      >
                        Danh sách khách hàng
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/employee/receptionist/customer/create"}
                        className="text-decoration-none"
                      >
                        Đăng ký khách hàng
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="menu-item">
                  <h5>
                    <span className="d-inline-block me-1">
                      <i className="fa-solid fa-explosion"></i>
                    </span>
                    Quản lý Bảo Hành
                  </h5>
                  <ul className="m-0 p-0">
                    <li>
                      <Link
                        to={"/employee/receptionist/guarantees"}
                        className="text-decoration-none"
                      >
                        Danh sách bảo hành
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/employee/receptionist/guarantee/create"}
                        className="text-decoration-none"
                      >
                        Đăng Ký Bảo Hành
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="menu-item">
                  <h5>
                    <span className="d-inline-block me-1">
                      <i className="fa-solid fa-explosion"></i>
                    </span>
                    Quản lý Hóa đơn
                  </h5>
                  <ul className="m-0 p-0">
                    <li>
                      <Link
                        to={"/employee/receptionist/bills"}
                        className="text-decoration-none"
                      >
                        Danh sách hóa đơn
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="menu-item">
                  <h5>
                    <span className="d-inline-block me-1">
                      <i className="fa-solid fa-user"></i>
                    </span>
                    Tài Khoản
                  </h5>
                  <ul className="m-0 p-0">
                    <li>
                      <Link
                        to={"/employee/personal-information"}
                        className="text-decoration-none"
                      >
                        Thông tin tài khoản
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/employee/change-password"}
                        className="text-decoration-none"
                      >
                        Đổi mật khẩu
                      </Link>
                    </li>
                  </ul>
                </div>
              </>
            )}

            {isShowMenu(roles, ["NHANVIENSUACHUA"]) && (
              <>
                <div className="menu-item">
                  <h5>
                    <span className="d-inline-block me-1">
                      <i className="fa-solid fa-explosion"></i>
                    </span>
                    Quản lý Sản Phẩm
                  </h5>
                  <ul className="m-0 p-0">
                    <li>
                      <Link
                        to={"/employee/engineer"}
                        className="text-decoration-none"
                      >
                        Danh sách Sản Phẩm
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="menu-item">
                  <h5>
                    <span className="d-inline-block me-1">
                      <i className="fa-solid fa-explosion"></i>
                    </span>
                    Quản lý Oder
                  </h5>
                  <ul className="m-0 p-0">
                    <li>
                      <Link
                        to={"/employee/engineer/orders"}
                        className="text-decoration-none"
                      >
                        Danh sách Oder
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="menu-item">
                  <h5>
                    <span className="d-inline-block me-1">
                      <i className="fa-solid fa-explosion"></i>
                    </span>
                    Vật liệu
                  </h5>
                  <ul className="m-0 p-0">
                    <li>
                      <Link
                        to={"/employee/engineer/materials"}
                        className="text-decoration-none"
                      >
                        Danh sách Vật Liệu
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="menu-item">
                  <h5>
                    <span className="d-inline-block me-1">
                      <i className="fa-solid fa-cookie-bite"></i>
                    </span>
                    Tài Khoản
                  </h5>
                  <ul className="m-0 p-0">
                    <li>
                      <Link
                        to={"/employee/personal-information"}
                        className="text-decoration-none"
                      >
                        Thông tin tài khoản
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/employee/change-password"}
                        className="text-decoration-none"
                      >
                        Đổi mật khẩu
                      </Link>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </ul>
        </div>
        {isShowMenu(roles, ["NHANVIENKHO"]) && (
          <>
            <div className="menu-item">
              <h5>
                <span className="d-inline-block me-1">
                  <i className="fa-solid fa-explosion"></i>
                </span>
                Quản lý Vật liệu
              </h5>
              <ul className="m-0 p-0">
                <li>
                  <Link
                    to={"/employee/warehouse"}
                    className="text-decoration-none"
                  >
                    Danh sách Vật liệu
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/employee/warehouse/material/create"}
                    className="text-decoration-none"
                  >
                    Đăng ký vật liệu
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/employee/warehouse/components"}
                    className="text-decoration-none"
                  >
                    Danh Sách Linh Kiện
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/employee/warehouse/component/create"}
                    className="text-decoration-none"
                  >
                    Đăng ký Linh Kiện Mới
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/employee/warehouse/search/material"}
                    className="text-decoration-none"
                  >
                    Tìm kiếm vật liệu
                  </Link>
                </li>
              </ul>
            </div>
            <div className="menu-item">
              <h5>
                <span className="d-inline-block me-1">
                  <i className="fa-solid fa-explosion"></i>
                </span>
                Quản lý Oder
              </h5>
              <ul className="m-0 p-0">
                <li>
                  <Link
                    to={"/employee/warehouse/orderMaterials"}
                    className="text-decoration-none"
                  >
                    Danh sách oder vật liệu
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/employee/warehouse/search/order"}
                    className="text-decoration-none"
                  >
                    Tìm kiếm oder
                  </Link>
                </li>
              </ul>
            </div>
            <div className="menu-item">
              <h5>
                <span className="d-inline-block me-1">
                  <i className="fa-solid fa-explosion"></i>
                </span>
                Quản lý Vender
              </h5>
              <ul className="m-0 p-0">
                <li>
                  <Link
                    to={"/employee/warehouse/vendors"}
                    className="text-decoration-none"
                  >
                    Danh sách Vender
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/employee/warehouse/vendor/create"}
                    className="text-decoration-none"
                  >
                    Thêm Vender Mới
                  </Link>
                </li>
              </ul>
            </div>
            <div className="menu-item">
              <h5>
                <span className="d-inline-block me-1">
                  <i className="fa-solid fa-cookie-bite"></i>
                </span>
                Tài Khoản
              </h5>
              <ul className="m-0 p-0">
                <li>
                  <Link
                    to={"/employee/personal-information"}
                    className="text-decoration-none"
                  >
                    Thông tin tài khoản
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/employee/change-password"}
                    className="text-decoration-none"
                  >
                    Đổi mật khẩu
                  </Link>
                </li>
              </ul>
            </div>
          </>
        )}
        {isShowMenu(roles, ["NHANVIENBAOHANH"]) && (
          <>
            <div className="menu-item">
              <h5>
                <span className="d-inline-block me-1">
                  <i className="fa-solid fa-explosion"></i>
                </span>
                Quản lý Bảo hành
              </h5>
              <ul className="m-0 p-0">
                <li>
                  <Link
                    to={"/employee/warranty"}
                    className="text-decoration-none"
                  >
                    Danh sách bảo hành
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/employee/warranty/customeries"}
                    className="text-decoration-none"
                  >
                    Danh Sách Khách hàng
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/employee/warranty/products"}
                    className="text-decoration-none"
                  >
                    Chuyển Sản Phẩm Bảo Hành
                  </Link>
                </li>
              </ul>
            </div>
            <div className="menu-item">
              <h5>
                <span className="d-inline-block me-1">
                  <i className="fa-solid fa-explosion"></i>
                </span>
                Quản lý Sản Phẩm
              </h5>
              <ul className="m-0 p-0">
                <li>
                  <Link
                    to={"/employee/warranty/product/pending"}
                    className="text-decoration-none"
                  >
                    Danh Sách sản phẩm Pending
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/employee/warranty/search/products"}
                    className="text-decoration-none"
                  >
                    Tìm Kiếm Lịch Sử Sản Phẩm
                  </Link>
                </li>
              </ul>
            </div>
            <div className="menu-item">
              <h5>
                <span className="d-inline-block me-1">
                  <i className="fa-solid fa-explosion"></i>
                </span>
                Danh sách hóa đơn và bảo hành
              </h5>
              <ul className="m-0 p-0">
                <li>
                  <Link
                    to={"/employee/warranty/bills"}
                    className="text-decoration-none"
                  >
                    Danh sách hóa đơn
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/employee/warranty/guarantees"}
                    className="text-decoration-none"
                  >
                    Danh sách bảo hành
                  </Link>
                </li>
              </ul>
            </div>
            <div className="menu-item">
              <h5>
                <span className="d-inline-block me-1">
                  <i className="fa-solid fa-cookie-bite"></i>
                </span>
                Tài Khoản
              </h5>
              <ul className="m-0 p-0">
                <li>
                  <Link
                    to={"/employee/personal-information"}
                    className="text-decoration-none"
                  >
                    Thông tin tài khoản
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/employee/change-password"}
                    className="text-decoration-none"
                  >
                    Đổi mật khẩu
                  </Link>
                </li>
              </ul>
            </div>
          </>
        )}
        {isShowMenu(roles, ["ADMIN"]) && (
          <>
            <div className="menu-item">
              <h5>
                <span className="d-inline-block me-1">
                  <i className="fa-solid fa-explosion"></i>
                </span>
                Quản lý danh mục
              </h5>
              <ul className="m-0 p-0">
                <li>
                  <Link to={"/admin/shop"} className="text-decoration-none">
                    Danh sách danh mục
                  </Link>
                </li>
              </ul>
            </div>
            <div className="menu-item">
              <h5>
                <span className="d-inline-block me-1">
                  <i className="fa-solid fa-explosion"></i>
                </span>
                Quản lý
              </h5>
              <ul className="m-0 p-0">
                <li>
                  <Link to={"/admin/customers"} className="text-decoration-none">
                    Danh sách Khách hàng
                  </Link>
                </li>
                <li>
                  <Link to={"/admin/materials"} className="text-decoration-none">
                    Danh sách Vật Liệu
                  </Link>
                </li>
                <li>
                  <Link to={"/admin/orderMaterials"} className="text-decoration-none">
                    Danh sách Order Vật Liệu
                  </Link>
                </li>
                <li>
                  <Link to={"/admin/products"} className="text-decoration-none">
                    Danh sách Sản Phẩm
                  </Link>
                </li>
                <li>
                  <Link to={"/admin/employees"} className="text-decoration-none">
                    Danh sách nhân viên
                  </Link>
                </li>
                <li>
                  <Link to={"/admin/employee/create"} className="text-decoration-none">
                    Đăng ký Nhân Viên mới
                  </Link>
                </li>
              </ul>
            </div>
            <div className="menu-item">
              <h5>
                <span className="d-inline-block me-1">
                  <i className="fa-solid fa-cookie-bite"></i>
                </span>
                Tài Khoản
              </h5>
              <ul className="m-0 p-0">
                <li>
                  <Link
                    to={"/employee/personal-information"}
                    className="text-decoration-none"
                  >
                    Thông tin tài khoản
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/employee/change-password"}
                    className="text-decoration-none"
                  >
                    Đổi mật khẩu
                  </Link>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
