import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import Select from "react-select";
import { getEmployees } from "../../../formHTML/options";
import { useGetListEngineerQuery } from "../../../../app/apis/employee/employeeApi";
import { useGetProductByIdQuery } from "../../../../app/apis/receptionist/productApi";
import { isEqual } from "lodash";
import hookRecepUpdateProductPending from "../../../hookForm/hook/hookReceptionist/hookRecepUpdateProductPeding";

function RecepProductPendingDetail() {
  const { productId } = useParams();

  const {
    control, register, handleSubmit, onUpdateProductPending, errors 
  } = hookRecepUpdateProductPending(productId);

  const { data: engineerData, isLoading: engineerLoading } =
    useGetListEngineerQuery();
  const { data: productData, isLoading: productLoading } =
    useGetProductByIdQuery(productId);

  if (engineerLoading || productLoading) {
    return <h2>Loading...</h2>;
  }
  const listEngineerOptions = getEmployees(engineerData);

  const isProductStatusTrue = productData?.status === true;

  const defaultEngineerOption = {
    value: productData?.engineerCode,
    label: productData?.engineerName
  }


  return (
    <>
      <section className="content">
        <div className="container-fluid">
          <form onSubmit={handleSubmit(onUpdateProductPending)} >
            <div className="row py-2">
              <div className="col-6">
                <Link to={"/employee/receptionist/products/pending"} className="btn btn-default">
                  <i className="fas fa-chevron-left"></i> Quay lại
                </Link>
                {!isProductStatusTrue && (
                  <button type="submit" className="btn btn-success px-4">
                    Cập Nhật
                  </button>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <div className="table-sp-kh">
                      <div className="col-md-5">
                        <h4 className="mb-4">Thông Tin Sản Phẩm</h4>
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
                          <label>Model</label>
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
                            id="so-IME"
                            defaultValue={productData?.ime}
                            readOnly
                          />
                        </div>
                        <div className="form-group">
                          <label>Mổ Tả Lỗi</label>
                          <input
                            type="text"
                            className="form-control"
                            id="ten-loi"
                            defaultValue={productData?.defectName}
                            readOnly
                          />
                        </div>
                        <div className="form-group">
                          <label className="mb-3">Nhân Viên Sửa Chữa</label>
                          <Controller
                            name="employeeCode"
                            control={control}
                            defaultValue={defaultEngineerOption.value}
                            render={({ field }) => (
                              <div>
                                <Select
                                  {...field}
                                  placeholder="--Chọn Nhân Viên--"
                                  defaultValue={defaultEngineerOption}
                                  options={listEngineerOptions}
                                  value={listEngineerOptions.find(
                                    (c) => c.value === field.value
                                  )}
                                  onChange={(val) => field.onChange(val.value)}
                                />
                                <p className="text-danger fst-italic mt-2">
                                  {errors.employeeCode?.message}
                                </p>
                              </div>
                            )}
                          />
                        </div>
                        <div className="form-group">
                          <label>Trạng Thái</label>
                          <input
                            type="text"
                            className="form-control"
                            id="trang-thai"
                            defaultValue={
                              productData?.status ? "OK" : "PENDING"
                            }
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

export default RecepProductPendingDetail;
