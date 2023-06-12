import React from "react";
import hookMaterialCreate from "../../../hookForm/hook/hookWarehouse/hookMaterialCreate";
import {
  useGetComponentsQuery,
  useGetListVendorAllQuery,
} from "../../../../app/apis/warehouseEmployee/warehouseEmployeeApi";
import { Link } from "react-router-dom";
import { Controller } from "react-hook-form";
import Select from "react-select";
import { getComponents, getVender } from "../../../formHTML/options";

function WareMaterialCreate() {
  const { control, handleSubmit, register, errors, onMaterialCreate } =
    hookMaterialCreate();

  const { data: componentData, isLoading: componentLoading } =
    useGetComponentsQuery({ page: 1, pageSize: 10 });
  const { data: vendorData, isLoading: vendorLoading } =
    useGetListVendorAllQuery({ page: 1, pageSize: 10 });

  if (componentLoading || vendorLoading) {
    return <h2>Loading....</h2>;
  }

  const vendorOptions = getVender(vendorData?.data);
  const componentOptions = getComponents(componentData?.data);

  return (
    <>
      <section className="content">
        <div className="container-fluid">
          <form onSubmit={handleSubmit(onMaterialCreate)}>
            <div className="row py-2">
              <div className="col-6">
                <Link to={"/employee/warehouse"} className="btn btn-default">
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
                        <h4 className="mb-2">Thông Tin Vật Liệu</h4>

                        <div className="form-group">
                          <label className="mb-2 mt-2">Mã Vật Liệu</label>
                          <input
                            type="text"
                            className="form-control"
                            id="full-name"
                            {...register("materialCode")}
                          />
                          <p className="text-danger fst-italic mt-2">
                            {errors.materialCode?.message}
                          </p>
                        </div>
                        <div className="form-group">
                          <label className="mb-2 mt-2">Tên Model</label>
                          <input
                            type="text"
                            className="form-control"
                            id="tenModel"
                            {...register("nameModel")}
                          />
                          <p className="text-danger fst-italic mt-2">
                            {errors.nameModel?.message}
                          </p>
                        </div>
                        <div className="form-group">
                          <label className="mb-2 mt-2">Vender</label>
                          <Controller
                            name="venderId"
                            control={control}
                            render={({ field }) => (
                              <div>
                                <Select
                                  {...field}
                                  placeholder="--Chọn Vender--"
                                  options={vendorOptions}
                                  value={vendorOptions.find(
                                    (c) => c.value === field.value
                                  )}
                                  onChange={(val) => field.onChange(val.value)}
                                />
                              </div>
                            )}
                          />
                          <p className="text-danger fst-italic mt-2">
                            {errors.venderId?.message}
                          </p>
                        </div>
                        <div className="form-group">
                          <label className="mb-2 mt-2">Loại Linh Kiện</label>
                          <Controller
                            name="componentsId"
                            control={control}
                            render={({ field }) => (
                              <div>
                                <Select
                                  {...field}
                                  placeholder="--Chọn Loại Linh Kiện--"
                                  options={componentOptions}
                                  value={componentOptions.find(
                                    (c) => c.value === field.value
                                  )}
                                  onChange={(val) => field.onChange(val.value)}
                                />
                              </div>
                            )}
                          />
                          <p className="text-danger fst-italic mt-2">
                            {errors.componentsId?.message}
                          </p>
                        </div>
                        <div className="form-group">
                          <label className="mb-2 mt-2">số lượng</label>
                          <input
                            type="text"
                            className="form-control"
                            id="soLuong"
                            {...register("quantity")}
                          />
                          <p className="text-danger fst-italic mt-2">
                            {errors.quantity?.message}
                          </p>
                        </div>
                        <div className="form-group">
                          <label className="mb-2 mt-2">Giá Tiền</label>
                          <input
                            type="text"
                            className="form-control"
                            {...register("price")}
                          />
                          <p className="text-danger fst-italic mt-2">
                            {errors.price?.message}
                          </p>
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

export default WareMaterialCreate;
