import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { useDeleteMaterialByIdMutation, useFindComponentsAllQuery, useFindMaterialByIdQuery, useFindVendorAllQuery } from "../../../app/apis/admin/manage/materialManageApi";
import { useFindWarehouseEmployeeAllQuery } from "../../../app/apis/employee/employeeApi";
import { getComponents, getEmployees, getVender } from "../../formHTML/options";
import { toast } from "react-toastify";
import hookAdminUpdateMaterial from "../../hookForm/hook/hookAdmin/hookAdminUpdateMaterial";

function MaterialManageDetail() {
    const { materialId } = useParams();
    const navigate = useNavigate();
    const [selectedWarehouseEmployee, setSelectedWarehouseEmployee] = useState(null);

    const { control, register, handleSubmit, errors, onUpdateMaterial } = hookAdminUpdateMaterial();

    const { data: componentData, isLoading: componentLoading } = useFindComponentsAllQuery();
    const { data: vendorData, isLoading: vendorLoading } = useFindVendorAllQuery();
    const { data: warehouseData, isLoading: warehouseLoading } = useFindWarehouseEmployeeAllQuery();
    const { data: materialData, isLoading: materialLoading } = useFindMaterialByIdQuery(materialId);

    const [deleteMaterial] = useDeleteMaterialByIdMutation();

    if (componentLoading || vendorLoading || warehouseLoading || materialLoading) {
        return <h2>Loading...</h2>
    }



    const handleDeleteMaterial = (id) => {
        event.preventDefault();
        deleteMaterial(id)
        .unwrap()
        .then(() => {
            toast.success("Xóa Thành Công");
            setTimeout(() => {
                navigate("/admin/materials");
            },1000)
        })
        .catch((err) => {
            toast.error(err.data.message);
        })
    }

    const defaultWarehouseOption = {
        label: materialData?.warehouseEmployee.employeeName,
        value: materialData?.warehouseEmployee.employeeCode
    }
    const defaultComponents = {
        label: materialData?.components.name,
        value: materialData?.components.id
    }
    const defaultVendor = {
        label: materialData?.vendor.name,
        value: materialData?.vendor.id
    }

    const vendorOptions = getVender(vendorData);
    const componentOptions = getComponents(componentData);
    const warehouseEmployeeData = getEmployees(warehouseData);



    return (
        <>
            <section className="content">
                <div className="container-fluid">
                    <form onSubmit={handleSubmit(onUpdateMaterial)}>
                        <div className="row py-2">
                            <div className="col-6">
                                <Link
                                    to={"/admin/materials"}
                                    className="btn btn-default"
                                >
                                    <i className="fas fa-chevron-left"></i> Quay lại
                                </Link>
                                <button type="submit" className="btn btn-warning px-4">
                                    Cập Nhật
                                </button>
                                <button
                                    className="btn btn-danger px-4"
                                    onClick={() => handleDeleteMaterial(materialData?.id)}
                                >
                                    xóa
                                </button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="table-sp-kh">
                                            <div className="col-md-5">
                                                <h4 className="mb-4">Thông Tin Vật Liệu</h4>
                                                <div className="form-group">
                                                    <label>ID Vật Liệu</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="hangSanPham"
                                                        defaultValue={materialData?.id}
                                                        {...register("id")}
                                                    />
                                                    {errors.id && (
                                                        <p className="text-danger fst-italic mt-2">
                                                            {errors.id.message}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="form-group">
                                                    <label>Mã Vật Liệu</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="model"
                                                        defaultValue={materialData?.code}
                                                        {...register("code")}
                                                    />
                                                    {errors.code && (
                                                        <p className="text-danger fst-italic mt-2">
                                                            {errors.code.message}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="form-group">
                                                    <label>Tên Model</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="so-IME"
                                                        defaultValue={materialData?.nameModel}
                                                        {...register("nameModel")}
                                                    />
                                                    {errors.nameModel && (
                                                        <p className="text-danger fst-italic mt-2">
                                                            {errors.nameModel.message}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="form-group">
                                                    <label>Số Lượng Nhập</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="so-IME"
                                                        defaultValue={materialData?.importQuantity}
                                                        readOnly
                                                    />                                                  
                                                </div>
                                                <div className="form-group">
                                                    <label>Số Lượng xuất</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="so-IME"
                                                        defaultValue={materialData?.exportQuantity}
                                                        readOnly
                                                    />                                                   
                                                </div>
                                                <div className="form-group">
                                                    <label>Số Lượng còn lại</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="so-IME"
                                                        defaultValue={materialData?.remainingQuantity}
                                                        readOnly
                                                    />                                                 
                                                </div>
                                                <div className="form-group">
                                                    <label>Ngày Tạo</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="ten-loi"
                                                        defaultValue={materialData?.createDate ? new Date(materialData?.createDate).toLocaleDateString() : ""}
                                                        readOnly
                                                    />                                       
                                                </div>
                                                <div className="form-group">
                                                    <label>Ngày Cập Nhật</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="ten-loi"
                                                        defaultValue={materialData?.updateDate ? new Date(materialData?.updateDate).toLocaleDateString() : ""}
                                                        readOnly
                                                    />                                                
                                                </div>
                                            </div>
                                            <div className="col-md-5">
                                                <h4 className="mb-4">Thông Tin Nhân Viên Đăng ký</h4>
                                                <div className="form-group">
                                                    <label>Mã Nhân Viên Đăng Ký</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="so-IME"
                                                        value={selectedWarehouseEmployee ? selectedWarehouseEmployee.value : defaultWarehouseOption.value}
                                                        readOnly
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="mb-3">Tên Nhân Viên Đăng Ký</label>
                                                    <Controller
                                                        name="employeeCode"
                                                        control={control}
                                                        defaultValue={defaultWarehouseOption.value}
                                                        render={({ field }) => (
                                                            <div>
                                                                <Select
                                                                    {...field}
                                                                    placeholder="--Chọn Nhân Viên--"
                                                                    defaultValue={defaultWarehouseOption}
                                                                    options={warehouseEmployeeData}
                                                                    value={warehouseEmployeeData.find(
                                                                        (c) => c.value === field.value
                                                                    )}
                                                                    onChange={(val) => {
                                                                        setSelectedWarehouseEmployee(val);
                                                                        field.onChange(val.value)
                                                                    }}
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
                                <div className="card">
                                    <div className="card-body">
                                        <div className="table-sp-kh">
                                            <div className="col-md-5">
                                                <h4 className="mb-4">Thông Tin loại linh kiện</h4>                                               
                                                <div className="form-group">
                                                    <label>Tên Linh Kiện</label>
                                                    <Controller
                                                        name="componentId"
                                                        control={control}
                                                        defaultValue={defaultComponents.value}
                                                        render={({ field }) => (
                                                            <div>
                                                                <Select
                                                                    {...field}
                                                                    placeholder="--Chọn Tên Linh Kiện--"
                                                                    defaultValue={defaultComponents}
                                                                    options={componentOptions}
                                                                    value={componentOptions.find(
                                                                        (c) => c.value === field.value
                                                                    )}
                                                                    onChange={(val) =>
                                                                        field.onChange(val.value)
                                                                    }
                                                                />
                                                            </div>
                                                        )}
                                                    />
                                                    {errors.componentId && (
                                                        <p className="text-danger fst-italic mt-2">
                                                            {errors.componentId.message}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-md-5">
                                                <h4 className="mb-4">Thông Tin vendor</h4>                                              
                                                <div className="form-group">
                                                    <label className="mb-3">Tên Vendor</label>
                                                    <Controller
                                                        name="vendorId"
                                                        control={control}
                                                        defaultValue={defaultVendor.value}
                                                        render={({ field }) => (
                                                            <div>
                                                                <Select
                                                                    {...field}
                                                                    placeholder="--Chọn Vendor--"
                                                                    defaultValue={defaultVendor}
                                                                    options={vendorOptions}
                                                                    value={vendorOptions.find(
                                                                        (c) => c.value === field.value
                                                                    )}
                                                                    onChange={(val) => field.onChange(val.value)}
                                                                />
                                                                <p className="text-danger fst-italic mt-2">
                                                                    {errors.vendorId?.message}
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
    )
}

export default MaterialManageDetail;