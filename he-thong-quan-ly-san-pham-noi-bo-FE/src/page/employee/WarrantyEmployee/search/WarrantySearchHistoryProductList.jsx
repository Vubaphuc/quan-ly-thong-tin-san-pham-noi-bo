import React, { useEffect, useState } from "react";
import { useLazyFindHistoryProductRepairShopQuery } from "../../../../app/apis/warrantyEmployee/warrantyEmployeeApi";
import { getStatusLabel } from "../../../formHTML/enum";
import { Link } from "react-router-dom";

function WarrantySearchHistoryProductList() {
  const [term, setTerm] = useState("");

  const [getProduct, { data: productData, isLoading: productLoading }] =
    useLazyFindHistoryProductRepairShopQuery();

    useEffect(() => {
      getProduct({
        page: 1,
        pageSize: 10,
        term: term
      })
    }, [term])

  if (productLoading) {
    return <h2>Loading...</h2>;
  }

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
                  onChange={(e) => setTerm(e.target.value)}
                />
              </div>            
            </div>
          </div>
        </div>
      </div>
      <section className="content">
        <div className="container-fluid">
          <div className="search-results mt-3">
            {productData && productData.data.length > 0 ? (
              <div>
                <table className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>Action</th>
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
                    {productData.data.map((product) => (
                      <tr key={product?.id}>
                        <td>
                          <Link 
                            to={`/employee/warranty/product/create/${product.id}`}
                            className="btn btn-success"
                          >
                            Guarantee
                          </Link>
                          </td>
                        <td>{product.id ? product.id : ""}</td>   
                        <td>{product.nameModel ? product.nameModel : ""}</td>
                        <td>{product.phoneCompany ? product.phoneCompany : ""}</td>
                        <td>{product.ime ? product.ime : ""}</td>
                        <td>{product.defectName ? product.defectName : ""}</td>
                        <td>{getStatusLabel(product.status)}</td>
                        <td>{product.price ? product.price : ""}</td>
                        <td>{product.repair ? "Bảo Hành" : "Sản Phẩm Mới"}</td>
                        <td>{product.charge ? "Tính Phí" : "Không Tính Phí"}</td>
                        <td>{product.inputDate ? new Date(product.inputDate).toLocaleDateString() : ""}</td>
                        <td>{product.receptionists ? product.receptionists.employeeCode : ""}</td>
                        <td>{product.receptionists ? product.receptionists.employeeName : ""}</td>
                        <td>{product.transferDate ? new Date(product.transferDate).toLocaleDateString() : ""}</td>
                        <td>{product.engineer ? product.engineer.employeeCode : ""}</td>
                        <td>{product.engineer ? product.engineer.employeeName : ""}</td>
                        <td>{product.location ? product.location : ""}</td>
                        <td>{product.note ? product.note : ""}</td>
                        <td>{product.outputDate ? new Date(product.outputDate).toLocaleDateString() : ""}</td>
                        <td>{product.productPayer ? product.productPayer.employeeCode : ""}</td>
                        <td>{product.productPayer ? product.productPayer.employeeName : ""}</td>
                        <td>{product.finishDate ? new Date(product.finishDate).toLocaleDateString() : ""}</td>
                        <td>{product.customer ? product.customer.fullName : ""}</td>
                        <td>{product.customer ? product.customer.email : ""}</td>
                        <td>{product.customer ? product.customer.phoneNumber : ""}</td>
                        <td>{product.components ? product.components.name : ""}</td>
                        <td>{product.components ? product.components.warrantyPeriod : ""}</td>
                        <td>{product.guarantees ? product.guarantees.map((guarantee) => guarantee.guaranteeCode).join(",") : ""}</td>
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
