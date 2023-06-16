import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCreateBillMutation, useFindProductRepaiedByIdQuery } from "../../../../app/apis/receptionist/productApi";
import { toast } from "react-toastify";

function RecepBillDetail() {

  const { productId } = useParams();
  const navigate = useNavigate();


  const { data: productData, isLoading: productLoading } = useFindProductRepaiedByIdQuery(productId);
  const [createBill] = useCreateBillMutation();

  if (productLoading) {
    return <h2>Loading...</h2>
  }  

  const handleClickCreateBill = () => {
    createBill(productId)
    .unwrap()
    .then(() => {
      toast.success("Tạo Hóa Đơn Thành Công");
      setTimeout(() => {
        navigate("/employee/receptionist")
      },1000)
    })
    .catch((err) => {
      toast.error(err.data.message);
    })
  }

  return (
    <>
      <section className="content">
        <div className="container-fluid">
            <div className="row py-2">
              <div className="col-6">
                <Link to={"/employee/receptionist"} className="btn btn-default">
                  <i className="fas fa-chevron-left"></i> Quay lại
                </Link>
                <button 
                  type="button" 
                  className="btn btn-info px-4"
                  onClick={handleClickCreateBill}
                >
                  Tạo
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <div className="table-sp-kh">
                      <div className="col-md-5">
                        <h4 className="mb-4">Hóa Đơn</h4>
                        <div className="form-group">
                          <label>ID Sản Phẩm</label>
                          <input
                            type="text"
                            className="form-control"
                            id="maSanPham"
                            defaultValue={productData?.id}
                            readOnly
                          />
                        </div>
                        <div className="form-group">
                          <label>Họ Và Tên Khách Hàng</label>
                          <input
                            type="text"
                            className="form-control"
                            id="fullNameKH"
                            defaultValue={productData?.customer.fullName}
                            readOnly
                          />
                        </div>
                        <div className="form-group">
                          <label>Số điện thoại</label>
                          <input
                            type="text"
                            className="form-control"
                            id="phoneKH"
                            defaultValue={productData?.customer.phoneNumber}
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
                          <label>Loại Linh Kiện</label>
                          <input
                            type="text"
                            className="form-control"
                            id="loaiBaoHanh"
                            defaultValue={productData?.components.name}
                            readOnly
                          />
                        </div>
                        <div className="form-group">
                          <label>Thời gian bảo hành</label>
                          <input
                            type="text"
                            className="form-control"
                            id="thoiGianBaoHanh"
                            defaultValue={productData?.components.warrantyPeriod + " Tháng"}
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
        </div>
      </section>
    </>
  );
}

export default RecepBillDetail;
