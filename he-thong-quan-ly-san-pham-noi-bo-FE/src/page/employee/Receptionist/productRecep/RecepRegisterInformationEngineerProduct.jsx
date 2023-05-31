import React from "react";
import { Controller } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import Select from "react-select";
import hookRecepRegisterInformationEngineer from "../../../hookForm/hook/hookReceptionist/hookRecepRegisterInformationEngineer";
import { useGetListEngineerQuery } from "../../../../app/apis/employee/employeeApi";
import { getEmployees } from "../../../formHTML/options";
import { useGetProductByIdQuery } from "../../../../app/apis/receptionist/productApi";

function RecepRegisterInformationEngineerProduct() {
  const { productId } = useParams();

  const { control, handleSubmit, register, errors, onRegisterEnginner } =
    hookRecepRegisterInformationEngineer(productId);

  const { data: productData, isLoading: productLoading } =
    useGetProductByIdQuery(productId);

  const { data: engineerData, isLoading: engineerLoading } =
    useGetListEngineerQuery();

  if (engineerLoading || productLoading) {
    return <h2>Loading...</h2>;
  }

  const listEngineerOptions = getEmployees(engineerData);

  return (
    <>
      <section className="content">
        <div className="container-fluid">
          <form onSubmit={handleSubmit(onRegisterEnginner)}>
            <div className="row py-2">
              <div className="col-6">
                <Link
                  to={"/employee/receptionist/products"}
                  className="btn btn-default"
                >
                  <i className="fas fa-chevron-left"></i> Quay lại
                </Link>
                <button type="submit" className="btn btn-info px-4">
                  Lưu
                </button>
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
                          <label>Hãng Điện Thoại</label>
                          <input
                            type="text"
                            className="form-control"
                            id="hang-san-pham"
                            defaultValue={productData?.phoneCompany}
                            disabled
                          />
                        </div>
                        <div className="form-group">
                          <label>Model</label>
                          <input
                            type="text"
                            className="form-control"
                            id="model"
                            defaultValue={productData?.nameModel}
                            disabled
                          />
                        </div>
                        <div className="form-group">
                          <label>Số IME</label>
                          <input
                            type="text"
                            className="form-control"
                            id="so-IME"
                            defaultValue={productData?.ime}
                            disabled
                          />
                        </div>
                        <div className="form-group">
                          <label>Mổ Tả Lỗi</label>
                          <input
                            type="text"
                            className="form-control"
                            id="ten-loi"
                            defaultValue={productData?.defectName}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col-md-5">
                        <h4 className="mb-4">Thông Tin Nhân Viên Sửa Chữa</h4>
                        <div className="form-group">
                          <label className="mb-3">Nhân Viên Sửa Chữa</label>
                          <Controller
                            name="employeeCode"
                            control={control}
                            render={({ field }) => (
                              <div>
                                <Select
                                  {...field}
                                  placeholder="--Chọn Nhân Viên--"
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

export default RecepRegisterInformationEngineerProduct;
