import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../../../app/apis/receptionist/productApi";
import hookRecepBillCreate from "../../../hookForm/hook/hookReceptionist/hookRecepBillCreate";

function RecepBillDetail() {

  const { productId } = useParams();

  const { register, handleSubmit, onCreateBill } = hookRecepBillCreate();

  const { data: productData, isLoading: productLoading } = useGetProductByIdQuery(productId);

  if (productLoading) {
    return <h2>Loading...</h2>
  }  

  return (
    <>
      <section className="content">
        <div className="container-fluid">
          <form onSubmit={handleSubmit(onCreateBill)}>
            <div className="row py-2">
              <div className="col-6">
                <Link to={"/employee/receptionist"} className="btn btn-default">
                  <i className="fas fa-chevron-left"></i> Quay lại
                </Link>
                <button type="submit" className="btn btn-info px-4">
                  Tạo
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                {/* đoạn này để thêm sản phẩm thứ n + 1 */}
                <div className="card">
                  <div className="card-body">
                    <div className="table-sp-kh">
                      <div className="col-md-5">
                        <h4 className="mb-4">Hóa Đơn</h4>
                        <div className="form-group">
                          <label>Mã Sản Phẩm</label>
                          <input
                            type="text"
                            className="form-control"
                            id="maSanPham"
                            defaultValue={productData?.id}
                            readOnly
                            {...register("productId")}
                          />
                        </div>
                        <div className="form-group">
                          <label>Họ Và Tên Khách Hàng</label>
                          <input
                            type="text"
                            className="form-control"
                            id="fullNameKH"
                            defaultValue={productData?.customerName}
                            readOnly
                          />
                        </div>
                        <div className="form-group">
                          <label>Số điện thoại</label>
                          <input
                            type="text"
                            className="form-control"
                            id="phoneKH"
                            defaultValue={productData?.customerPhone}
                            readOnly
                          />
                        </div>

                        <div className="form-group">
                          <label>Hãng Sản Phẩm</label>
                          <input
                            type="text"
                            className="form-control"
                            id="hangSanPham"
                            defaultValue={productData?.phoneCompany}
                            readOnly
                          />
                        </div>
                        <div className="form-group">
                          <label>Tên Model</label>
                          <input
                            type="text"
                            className="form-control"
                            id="model"
                            defaultValue={productData?.nameModel}
                            readOnly
                          />
                        </div>
                        <div className="form-group">
                          <label>Số IME</label>
                          <input
                            type="text"
                            className="form-control"
                            id="soIME"
                            defaultValue={productData?.ime}
                            readOnly
                          />
                        </div>
                        <div className="form-group">
                          <label>Tên Lỗi</label>
                          <input
                            type="text"
                            className="form-control"
                            id="tenLoi"
                            defaultValue={productData?.defectName}
                            readOnly
                          />
                        </div>
                        <div className="form-group">
                          <label>Vị Trí Sửa</label>
                          <input
                            type="text"
                            className="form-control"
                            id="viTriSua"
                            defaultValue={productData?.location}
                            readOnly
                          />
                        </div>
                        <div className="form-group">
                          <label>Loại Bảo Hành</label>
                          <input
                            type="text"
                            className="form-control"
                            id="loaiBaoHanh"
                            defaultValue={productData?.componentsName}
                            readOnly
                          />
                        </div>
                        <div className="form-group">
                          <label>Thời gian bảo hành</label>
                          <input
                            type="text"
                            className="form-control"
                            id="thoiGianBaoHanh"
                            defaultValue={productData?.componentsWarrantyPeriod + " Tháng"}
                            readOnly
                          />
                        </div>     
                        <div className="form-group">
                          <label>Thành Tiền</label>
                          <input
                            type="text"
                            className="form-control"
                            id="thanh-tien"
                            defaultValue={productData ? productData.price.toLocaleString("vi-VN") + " VND" : ""}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default RecepBillDetail;
