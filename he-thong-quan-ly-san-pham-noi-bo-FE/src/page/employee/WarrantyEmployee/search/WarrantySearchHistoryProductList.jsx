import React, { useEffect, useState } from "react";
import { useLazyGetListHistoryProductByIMEQuery } from "../../../../app/apis/warrantyEmployee/warrantyEmployeeApi";

function WarrantySearchHistoryProductList() {
  const [ime, setIme] = useState("");

  const [getProductList, { data: productData, isLoading: productLoading }] =
    useLazyGetListHistoryProductByIMEQuery();

  if (productLoading) {
    return <h2>Loading...</h2>;
  }

  console.log(ime);

  const handleClickTerm = () => {
    getProductList({
      ime: ime,
    });
  };

  console.log(productData);

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="search-results mt-3">
              <div className="col-md-5">
                <input
                  type="text"
                  className="form-control warranty-input"
                  placeholder="Nhập từ khóa"
                  onBlur={(e) => setIme(e.target.value)}
                />
              </div>

              <div className="col-md-5">
                <div className="input-group-append">
                  <button
                    className="btn btn-primary search-button mb-3"
                    type="button"
                    onClick={handleClickTerm}
                  >
                    Tìm kiếm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="content">
        <div className="container-fluid">
          <div className="search-results mt-3">
            {productData && productData.length > 0 ? (
              <div>
                <table className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>Mã Điện Thoại</th>
                      <th>Model</th>
                      <th>Hãng Điện Thoại</th>
                      <th>Số IME</th>
                      <th>Tên Lỗi</th>
                      <th>Trạng Thái</th>
                      <th>Giá Tiền</th>
                      <th>Loại Hình sửa chữa</th>
                      <th>Loại Hình Tính Phí</th>
                      <th>Ngày Nhận</th>
                      <th>Mã Nhân Viên nhận</th>
                      <th>Tên Nhân Viên Nhận</th>
                      <th>Ngày Chuyển</th>
                      <th>Mã Nhân Viên Sửa Chữa</th>
                      <th>Tên Nhân Viên Sửa Chữa</th>
                      <th>Vị Trí Sửa</th>
                      <th>Chú Thích</th>
                      <th>Ngày Hoàn Thành</th>
                      <th>Mã Nhân Viên Trả Sản Phẩm</th>
                      <th>Tên Nhân Viên Trả Sản Phẩm</th>
                      <th>Ngày Trả Sản Phẩm</th>
                      <th>Tên Khách Hàng</th>
                      <th>Email Khách Hàng</th>
                      <th>Số Điện thoại Khách Hàng</th>
                      <th>Loại Linh kiện</th>
                      <th>thời gian bảo hành</th>
                      <th>Mã Bảo Hành</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productData?.map((product) => (
                      <tr key={product?.id}>
                        <td>{product.id ? product.id : ""}</td>   
                        <td>{product.nameModel ? product.nameModel : ""}</td>
                        <td>{product.phoneCompany ? product.phoneCompany : ""}</td>
                        <td>{product.ime ? product.ime : ""}</td>
                        <td>{product.defectName ? product.defectName : ""}</td>
                        <td>{product.status ? "OK" : "PENDING"}</td>
                        <td>{product.price ? product.price : ""}</td>
                        <td>{product.repair ? "Bảo Hành" : "Sản Phẩm Mới"}</td>
                        <td>{product.charge ? "Tính Phí" : "Không Tính Phí"}</td>
                        <td>{product.inputDate ? new Date(product.inputDate).toLocaleDateString() : ""}</td>
                        <td>{product.receptionistCode ? product.receptionistCode : ""}</td>
                        <td>{product.receptionistName ? product.receptionistName : ""}</td>
                        <td>{product.transferDate ? new Date(product.transferDate).toLocaleDateString() : ""}</td>
                        <td>{product.engineerCode ? product.engineerCode : ""}</td>
                        <td>{product.engineerName ? product.engineerName : ""}</td>
                        <td>{product.location ? product.location : ""}</td>
                        <td>{product.note ? product.note : ""}</td>
                        <td>{product.outputDate ? new Date(product.outputDate).toLocaleDateString() : ""}</td>
                        <td>{product.productPayerCode ? product.productPayerCode : ""}</td>
                        <td>{product.productPayerName ? product.productPayerName : ""}</td>
                        <td>{product.finishDate ? new Date(product.finishDate).toLocaleDateString() : ""}</td>
                        <td>{product.customerName ? product.customerName : ""}</td>
                        <td>{product.customerEmail ? product.customerEmail : ""}</td>
                        <td>{product.customerPhone ? product.customerPhone : ""}</td>
                        <td>{product.componentName ? product.componentName : ""}</td>
                        <td>{product.componentsWarrantyPeriod ? product.componentsWarrantyPeriod : ""}</td>
                        <td>{product.guaranteeCode ? product.guaranteeCode : ""}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>Không có sản phẩm nào !!!</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default WarrantySearchHistoryProductList;
