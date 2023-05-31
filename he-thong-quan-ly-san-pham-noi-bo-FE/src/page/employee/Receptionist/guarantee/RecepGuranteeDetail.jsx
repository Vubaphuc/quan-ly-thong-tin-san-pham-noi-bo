import React, { useState } from "react";
import hookGuaranteecreate from "../../../hookForm/hook/hookReceptionist/hookRecepGuaranteeCreate";
import { Link, useParams } from "react-router-dom";
import { useGetProductAndCustomerByIdQuery } from "../../../../app/apis/receptionist/productApi";

function RecepGuranteeDetail() {

  const { productId } = useParams();


  const { register, handleSubmit, errors, onGuaranteeCreate } =
    hookGuaranteecreate();

  const { data: productData, isLoading: productLoading } =
    useGetProductAndCustomerByIdQuery(productId);

  if (productLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <section className="content">
        <div className="container-fluid">
          <form onSubmit={handleSubmit(onGuaranteeCreate)}>
            <div className="row py-2">
              <div className="col-6">
                <Link to={"/employee/receptionist"} className="btn btn-default">
                  <i className="fas fa-chevron-left"></i> Quay lại
                </Link>
              </div>
            </div>
            {productData ? (
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
                              defaultValue={productData?.customerId}
                            />
                          </div>
                          <div className="form-group">
                            <label>Tên Khách Hàng</label>
                            <input
                              type="text"
                              className="form-control"
                              id="phone"
                              defaultValue={productData?.customerName}
                            />
                          </div>
                          <div className="form-group">
                            <label>Email Khách Hàng</label>
                            <input
                              type="text"
                              className="form-control"
                              id="email"
                              defaultValue={productData?.customerEmail}
                            />
                          </div>
                          <div className="form-group">
                            <label>Số Điện Thoại Khách hàng</label>
                            <input
                              type="text"
                              className="form-control"
                              id="email"
                              defaultValue={productData?.customerPhoneNumber}
                            />
                          </div>
                          <div className="form-group">
                            <label>Địa Chỉ Khách Hàng</label>
                            <input
                              type="text"
                              className="form-control"
                              id="email"
                              defaultValue={productData?.customerAddress}
                            />
                          </div>
                        </div>
                        <div className="col-md-5">
                          <h4 className="mb-4">Thông Tin Sản Phẩm</h4>
                          <div className="form-group">
                            <label>ID Sản Phẩm</label>
                            <input
                              type="text"
                              className="form-control"
                              id="full-name"
                              defaultValue={productData?.productId}
                              {...register("productId")}
                            />
                            <p className="text-danger fst-italic mt-2">
                              {errors.productId?.message}
                            </p>
                          </div>
                          <div className="form-group">
                            <label>Tên Model</label>
                            <input
                              type="text"
                              className="form-control"
                              id="phone"
                              defaultValue={productData?.model}
                            />
                          </div>
                          <div className="form-group">
                            <label>Hãng Điện Thoại</label>
                            <input
                              type="text"
                              className="form-control"
                              id="email"
                              defaultValue={productData?.phoneCompany}
                            />
                          </div>
                          <div className="form-group">
                            <label>Số IME</label>
                            <input
                              type="text"
                              className="form-control"
                              id="email"
                              defaultValue={productData?.ime}
                            />
                          </div>
                          <div className="form-group">
                            <label>Trạng Thái</label>
                            <input
                              type="text"
                              className="form-control"
                              id="email"
                              defaultValue={
                                productData?.status ? "OK" : "PENDING"
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="text-center mt-5">
                        <button type="submit" className="btn btn-success">
                          Đăng Ký Bảo Hành
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p></p>
            )}
          </form>
        </div>
      </section>
    </>
  );
}

export default RecepGuranteeDetail;
