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
                        to={"/nhan-vien/le-tan"}
                        className="text-decoration-none"
                      >
                        Danh sách sản phẩm
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/nhan-vien/le-tan/dk-sc"}
                        className="text-decoration-none"
                      >
                        Đăng ký nhân viên sửa
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/nhan-vien/le-tan/tim-kiem"}
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
                        to={"/nhan-vien/le-tan/ds-kh"}
                        className="text-decoration-none"
                      >
                        Danh sách khách hàng
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/nhan-vien/le-tan/dk-kh"}
                        className="text-decoration-none"
                      >
                        Đăng ký khách hàng
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/nhan-vien/le-tan/hd-bh"}
                        className="text-decoration-none"
                      >
                        Hóa đơn và bảo hành
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/nhan-vien/le-tan/tk-kh"}
                        className="text-decoration-none"
                      >
                        Tìm kiếm khách hàng
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
                        to={"/nhan-vien/thong-tin/tai-khoan"}
                        className="text-decoration-none"
                      >
                        Thông tin tài khoản
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/nhan-vien/thong-tin/doi-mat-khau"}
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
                        to={"/nhan-vien/sua-chua"}
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
                        to={"/nhan-vien/sua-chua/vat-lieu"}
                        className="text-decoration-none"
                      >
                        Danh sách Vật Liệu
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/nhan-vien/sua-chua/order"}
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
                      <i className="fa-solid fa-cookie-bite"></i>
                    </span>
                    Tài Khoản
                  </h5>
                  <ul className="m-0 p-0">
                    <li>
                      <Link
                        to={"/nhan-vien/thong-tin/tai-khoan"}
                        className="text-decoration-none"
                      >
                        Thông tin tài khoản
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/nhan-vien/thong-tin/doi-mat-khau"}
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
                  <Link to={"/nhan-vien/kho"} className="text-decoration-none">
                    Danh sách Vật liệu
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/nhan-vien/kho/dang-ky"}
                    className="text-decoration-none"
                  >
                    Đăng ký vật liệu
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/nhan-vien/kho/linh-kien/new-linh-kien"}
                    className="text-decoration-none"
                  >
                    Đăng ký Linh Kiện Mới
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/nhan-vien/kho/search-vat-lieu"}
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
                    to={"/nhan-vien/kho/oder"}
                    className="text-decoration-none"
                  >
                    Danh sách oder vật liệu
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/nhan-vien/kho/search-oder"}
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
                    to={"/nhan-vien/kho/vender"}
                    className="text-decoration-none"
                  >
                    Danh sách Vender
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/nhan-vien/kho/vender/new-vender"}
                    className="text-decoration-none"
                  >
                    Thêm Vender Mới
                  </Link>
                </li>
                <li>
                  <Link to={"/"} className="text-decoration-none">
                    Tìm kiếm Vender
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
                    to={"/nhan-vien/thong-tin/tai-khoan"}
                    className="text-decoration-none"
                  >
                    Thông tin tài khoản
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/nhan-vien/thong-tin/doi-mat-khau"}
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
                    to={"/nhan-vien/bao-hanh"}
                    className="text-decoration-none"
                  >
                    Danh sách bảo hành
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/nhan-vien/bao-hanh/dang-ky"}
                    className="text-decoration-none"
                  >
                    Đăng Ký Sản Phẩm Bảo Hành
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/nhan-vien/bao-hanh/chuyen"}
                    className="text-decoration-none"
                  >
                    Chuyển Sản Phẩm Bảo Hành
                  </Link>
                </li>
                <li>
                  <Link to={"/"} className="text-decoration-none">
                    Tìm kiếm bảo hành
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
                    to={"/nhan-vien/thong-tin/tai-khoan"}
                    className="text-decoration-none"
                  >
                    Thông tin tài khoản
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/nhan-vien/thong-tin/doi-mat-khau"}
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
                  <Link to={"/"} className="text-decoration-none">
                    Danh sách danh mục
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
                  <Link to={"/"} className="text-decoration-none">
                    Thông tin tài khoản
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/admin/doi-mat-khau"}
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
