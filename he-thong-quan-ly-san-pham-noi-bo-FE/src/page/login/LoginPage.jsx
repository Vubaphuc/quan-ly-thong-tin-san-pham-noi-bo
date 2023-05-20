import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../app/apis/login/authApi";
import { toast } from "react-toastify";

function LoginPage() {
  // TODO : Validate form trước lên gửi lên server
  const navigate = useNavigate();

  const { isAuthenticated, auth } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useLoginMutation();

  // Nếu đã login -> chuyển hướng sang trang homepage
  if (isAuthenticated) {
    const roles = auth.roles.map((role) => role.name);

    if (roles.includes("NHANVIENLETAN")) {
      return <Navigate to={"/nhan-vien/le-tan"} />;
    }
    if (roles.includes("NHANVIENSUACHUA")) {
      return <Navigate to={"/nhan-vien/sua-chua"} />;
    }
    if (roles.includes("NHANVIENKHO")) {
      return <Navigate to={"/nhan-vien/kho"} />;
    }
    if (roles.includes("NHANVIENBAOHANH")) {
      return <Navigate to={"/nhan-vien/bao-hanh"} />;
    }
    if (roles.includes("ADMIN")) {
      return <Navigate to={"/admin"} />;
    }
  }

  // Xử lý logic login
  const handleLogin = (e) => {
    e.preventDefault();

    login({ email, password })
      .unwrap()
      .then(() => {
        toast.success("Đăng Nhập thành Công")
      })
      .catch((err) => {
          toast.error(err.data.message)
      });
  };

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh", overflow: "hidden" }}
      >
        <div className="login shadow p-5" style={{ width: 500 }}>
          <h1 className="mb-3 text-center">Đăng nhập</h1>
          <form
            onSubmit={handleLogin}
            className="d-flex flex-column align-items-center"
          >
            <input
              className="form-control mb-3"
              type="text"
              placeholder="Nhập email"
              required="required"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="form-control mb-3"
              type="password"
              placeholder="Nhập password"
              required="required"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="btn btn-primary  btn-block mt-1">
              Đăng nhập
            </button>
            <div className="mt-3">
              <Link to={"/quen-mat-khau"} className="text-decoration-none">
                Quên Mật Khẩu
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
