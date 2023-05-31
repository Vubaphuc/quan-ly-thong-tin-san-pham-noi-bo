import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPhoneCompany } from "../../../formHTML/options";
import { useGetCustomerByIdQuery } from "../../../../app/apis/warrantyEmployee/warrantyEmployeeApi";
import hookWarrantyProductCreateCharge from "../../../hookForm/hook/hookWarranty/hookWarrantyProductCreateCharge";
import hookWarrantyProductCreateNoCharge from "../../../hookForm/hook/hookWarranty/hookWarrantyProductCreateNoCharge";

function WarrantyProductCreate() {
  const { customerId } = useParams();
  const [status, setStatus] = useState("TINHPHI");

  useEffect(() => {
    if (status === "TINHPHI") {
      resetCharge(); // Đặt lại giá trị và validate của form tính phí
    } else {
      resetNoCharge(); // Đặt lại giá trị và validate của form không tính phí
    }
  }, [status]);

  const {
    register: registerCharge,
    handleSubmit: handleSubmitCharge,
    errors: errorsCharge,
    setValue: setValueCharge,
    reset: resetCharge,
    onProdcutCreateCharge,
  } = hookWarrantyProductCreateCharge();
  const {
    register: registerNoCharge,
    handleSubmit: handleSubmitNoCharge,
    errors: errorsNoCharge,
    reset: resetNoCharge,
    onProductCreateNoCharge,
  } = hookWarrantyProductCreateNoCharge();

  const { data: customerData, isLoading: customerLoading } =
    useGetCustomerByIdQuery(customerId);

  if (customerLoading) {
    return <h2>Loading...</h2>;
  }

  const phoneCompanyOptions = getPhoneCompany();

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);

    if (newStatus === "TINHPHI") {
      resetCharge(); // Đặt lại giá trị và validate của form tính phí
    } else {
      resetNoCharge(); // Đặt lại giá trị và validate của form không tính phí
    }
  };

  return (
    <>
      <section className="content">
        <div className="container-fluid">
          <div className="row py-2">
            <div className="col-6">
              <Link to={"/nhan-vien/bao-hanh"} className="btn btn-default">
                <i className="fas fa-chevron-left"></i> Quay lại
              </Link>
              <select
                id="statusSelect"
                className="btn mx-2"
                value={status}
                onChange={handleStatusChange}
              >
                <option value="TINHPHI">Tính Phí </option>
                <option value="KHONGTINHPHI">Không Tính Phí</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="table-sp-kh">
                    <div className="col-md-5">
                      <h4 className="mb-4">Thông Tin Khách Hàng</h4>
                      <div className="form-group">
                        <label>ID Khách Hàng</label>
                        <input
                          type="text"
                          className="form-control"
                          id="full-name"
                          defaultValue={customerData?.id}
                          {...(status === "TINHPHI"
                            ? registerCharge("customerId")
                            : registerNoCharge("customerId"))}
                          readOnly
                        />
                      </div>
                      <div className="form-group">
                        <label>Họ Và Tên</label>
                        <input
                          type="text"
                          className="form-control"
                          id="full-name"
                          defaultValue={customerData?.fullName}
                          readOnly
                        />
                      </div>
                      <div className="form-group">
                        <label>Số Điện Thoại</label>
                        <input
                          type="text"
                          className="form-control"
                          id="phone"
                          defaultValue={customerData?.phone}
                          readOnly
                        />
                      </div>
                      <div className="form-group">
                        <label>Email</label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue={customerData?.email}
                          readOnly
                        />
                      </div>
                      <div className="form-group">
                        <label>Địa Chỉ</label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue={customerData?.address}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {status === "TINHPHI" ? (
          <form onSubmit={handleSubmitCharge(onProdcutCreateCharge)}>
            <div className="container-fluid">
              <div className="row py-2"></div>
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="table-sp-kh">
                        <div className="col-md-5">
                          <h4 className="mb-4">Thông Tin Bảo Hành</h4>
                          <div className="form-group">
                            <label>Hãng Điện Thoại</label>
                            <input
                              type="text"
                              id="input-rs"
                              className="form-control"
                              {...registerCharge("phoneCompany")}
                            />
                            <p className="text-danger fst-italic mt-2">
                              {errorsCharge.phoneCompany?.message}
                            </p>
                          </div>
                          <div className="form-group">
                            <label>Model</label>
                            <input
                              type="text"
                              id="input-rs"
                              className="form-control"
                              {...registerCharge("model")}
                            />
                            <p className="text-danger fst-italic mt-2">
                              {errorsCharge.model?.message}
                            </p>
                          </div>
                          <div className="form-group">
                            <label>Số IME</label>
                            <input
                              type="text"
                              id="input-rs"
                              className="form-control"
                              {...registerCharge("ime")}
                            />
                            <p className="text-danger fst-italic mt-2">
                              {errorsCharge.ime?.message}
                            </p>
                          </div>
                          <div className="form-group">
                            <label>Tên Lỗi</label>
                            <input
                              type="text"
                              id="input-rs"
                              className="form-control"
                              {...registerCharge("defectName")}
                            />
                            <p className="text-danger fst-italic mt-2">
                              {errorsCharge.defectName?.message}
                            </p>
                          </div>
                          <div className="form-group">
                            <label>Nguyên Nhân Lỗi</label>
                            <input
                              type="text"
                              id="input-rs"
                              className="form-control"
                              {...registerCharge("note")}
                            />
                          </div>
                          <div className="form-group">
                            <label>Giá Tiền</label>
                            <input
                              type="text"
                              id="input-rs"
                              className="form-control"
                              value={registerCharge.price}
                              onChange={(e) => {
                                if (status === "TINHPHI") {
                                  setValueCharge("price", e.target.value); // Cập nhật giá trị vào biến trung gian
                                }
                              }}
                            />
                            <p className="text-danger fst-italic mt-2">
                              {errorsCharge.price?.message}
                            </p>
                          </div>
                          <div className="text-center mt-3">
                            <button type="submit" className="btn btn-info">
                              Đăng Ký
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmitNoCharge(onProductCreateNoCharge)}>
            <div className="container-fluid">
              <div className="row py-2"></div>
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="table-sp-kh">
                        <div className="col-md-5">
                          <h4 className="mb-4">Thông Tin Sản Phẩm</h4>
                          <div className="form-group">
                            <label>Hãng Điện Thoại</label>
                            <input
                              type="text"
                              id="input-rs"
                              className="form-control"
                              {...registerNoCharge("phoneCompany")}
                            />

                            <p className="text-danger fst-italic mt-2">
                              {errorsNoCharge.phoneCompany?.message}
                            </p>
                          </div>
                          <div className="form-group">
                            <label>Model</label>
                            <input
                              type="text"
                              id="input-rs"
                              className="form-control"
                              {...registerNoCharge("model")}
                            />

                            <p className="text-danger fst-italic mt-2">
                              {errorsNoCharge.model?.message}
                            </p>
                          </div>
                          <div className="form-group">
                            <label>Số IME</label>
                            <input
                              type="text"
                              id="input-rs"
                              className="form-control"
                              {...registerNoCharge("ime")}
                            />
                            <p className="text-danger fst-italic mt-2">
                              {errorsNoCharge.ime?.message}
                            </p>
                          </div>
                          <div className="form-group">
                            <label>Tên Lỗi</label>
                            <input
                              type="text"
                              id="input-rs"
                              className="form-control"
                              {...registerNoCharge("defectName")}
                            />
                            <p className="text-danger fst-italic mt-2">
                              {errorsNoCharge.defectName?.message}
                            </p>
                          </div>
                          <div className="form-group">
                            <label>Nguyên Nhân Lỗi</label>
                            <input
                              type="text"
                              id="input-rs"
                              className="form-control"
                              {...registerNoCharge("note")}
                            />
                          </div>
                          <div className="text-center mt-3">
                            <button type="submit" className="btn btn-info">
                              Đăng Ký
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </section>
    </>
  );
}

export default WarrantyProductCreate;
