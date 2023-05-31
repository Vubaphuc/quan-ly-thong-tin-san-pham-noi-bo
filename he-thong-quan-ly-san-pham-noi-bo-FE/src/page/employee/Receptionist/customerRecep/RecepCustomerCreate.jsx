import React from "react";
import { Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import Select from "react-select";
import hookRecepCustomerCreate from "../../../hookForm/hook/hookReceptionist/hookRecepCustomerCreate";
import addressQuery from "../../../formHTML/address";
import { getAddress } from "../../../formHTML/options";

function RecepCustomerCreate() {
  const { control, register, handleSubmit, onCreateCustomer, errors } =
    hookRecepCustomerCreate();

  const { provinces } = addressQuery();

  const addressOptions = getAddress(provinces);

  return (
    <>
      <section className="content">
        <div className="container-fluid">
          <form onSubmit={handleSubmit(onCreateCustomer)}>
            <div className="row py-2">
              <div className="col-6">
                <Link to={"/employee/receptionist"} className="btn btn-default">
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
                        <h4 className="mb-4">Thông Tin Khách Hàng</h4>
                        <div className="form-group">
                          <label>Họ Và Tên</label>
                          <input
                            type="text"
                            className="form-control"
                            id="full-name"
                            {...register("customerName")}
                          />
                          <p className="text-danger fst-italic mt-2">
                            {errors.customerName?.message}
                          </p>
                        </div>
                        <div className="form-group">
                          <label>Số Điện Thoại</label>
                          <input
                            type="text"
                            className="form-control"
                            id="phone"
                            {...register("phoneNumber")}
                          />
                          <p className="text-danger fst-italic mt-2">
                            {errors.phoneNumber?.message}
                          </p>
                        </div>
                        <div className="form-group">
                          <label>Email</label>
                          <input
                            type="text"
                            className="form-control"
                            id="email"
                            {...register("customerEmail")}
                          />
                          <p className="text-danger fst-italic mt-2">
                            {errors.customerEmail?.message}
                          </p>
                        </div>
                        <div className="form-group">
                          <label>Địa chỉ</label>
                          <Controller
                            name="customerAddress"
                            control={control}
                            render={({ field }) => (
                              <div>
                                <Select
                                  {...field}
                                  placeholder="--chọn địa chỉ--"
                                  options={addressOptions}
                                  value={addressOptions.find(
                                    (c) => c.value === field.value
                                  )}
                                  onChange={(val) => field.onChange(val.value)}
                                />
                              </div>
                            )}
                          />
                          {errors.customerAddress && (
                            <p className="text-danger fst-italic mt-2">
                              {errors.customerAddress.message}
                            </p>
                          )}
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

export default RecepCustomerCreate;
