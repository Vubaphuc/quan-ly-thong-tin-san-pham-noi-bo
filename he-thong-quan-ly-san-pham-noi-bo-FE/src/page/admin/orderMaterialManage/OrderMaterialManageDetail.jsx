import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { useDeleteOrderMaterialByIdMutation, useFindComponentsAllQuery, useFindMaterialProjectionAllQuery, useFindOrderMaterialByIdQuery } from "../../../app/apis/admin/manage/materialManageApi";
import hookAdminUpdateOrderMaterial from "../../hookForm/hook/hookAdmin/hookAdminUpdateOrderMaterial";
import { toast } from "react-toastify";
import { useFindWarehouseEmployeeAllQuery, useGetListEngineerQuery } from "../../../app/apis/employee/employeeApi";
import { getComponents, getEmployees } from "../../formHTML/options";
import { getStatus } from "../../formHTML/options";

function OrderMaterialManageDetail() {
    const { orderMaterialId } = useParams();
    const navigate = useNavigate();
    const [selectEngineer, setSelectEngineer] = useState(null);
    const [selectWarehouse, setSelectWarehouse] = useState(null);
    const [selectedId, setSelectedId] = useState(null);

    const { control, register, handleSubmit, errors, onUpdateOrderMaterial } = hookAdminUpdateOrderMaterial();

    const { data: orderMaterialData, isLoading: orderMaterialLoading } = useFindOrderMaterialByIdQuery(orderMaterialId);
    const { data: componentData } = useFindComponentsAllQuery();
    const { data: engineerData } = useGetListEngineerQuery();
    const { data: wareHouseData } = useFindWarehouseEmployeeAllQuery();
    const { data: materialData } = useFindMaterialProjectionAllQuery();

    const [deleteOrderMaterial] = useDeleteOrderMaterialByIdMutation();

    if (orderMaterialLoading) {
        return <h2>Loading...</h2>
    }


    const handleDeleteMaterial = (id) => {
        event.preventDefault();
        deleteOrderMaterial(id)
            .unwrap()
            .then(() => {
                toast.success("Xóa OrderMaterial Thành Công");
                setTimeout(() => {
                    navigate("/admin/orderMaterials");
                })
            })
            .catch((err) => {
                toast.error(err.data.message);
            })
    }

    const defaultComponents = {
        label: orderMaterialData?.components.name,
        value: orderMaterialData?.components.id
    }
    const defaultEngineer = {
        label: orderMaterialData?.orderer.employeeName,
        value: orderMaterialData?.orderer.employeeCode
    }
    const defaultWarehouse = {
        label: orderMaterialData?.approver ? orderMaterialData?.approver.employeeName : "",
        value: orderMaterialData?.approver ? orderMaterialData?.approver.employeeCode : ""
    }
    const defaultMaterial = {
        value: orderMaterialData?.material ? orderMaterialData?.material.id : "",
        label: orderMaterialData?.material ? orderMaterialData?.material.id : ""
    }
    const defaultStatus = {
        value: orderMaterialData?.isStatus,
        label: orderMaterialData?.isStatus ? "OK" : "PENDING"
    }


    const engineerOption = getEmployees(engineerData);
    const warehouseEmployeeOption = getEmployees(wareHouseData);
    const componentOptions = getComponents(componentData);
    const materialOption = materialData.map((m) => ({
        value: m.id,
        label: m.id.toString()
    }));
    const statusOption = getStatus();

    const selectMaterial = materialData.find((m) => m.id === selectedId);

    console.log(engineerOption)


    return (
        <>
            <section className="content">
                <div className="container-fluid">
                    <form onSubmit={handleSubmit(onUpdateOrderMaterial)}>
                        <div className="row py-2">
                            <div className="col-6">
                                <Link
                                    to={"/admin/orderMaterials"}
                                    className="btn btn-default"
                                >
                                    <i className="fas fa-chevron-left"></i> Quay lại
                                </Link>
                                <button type="submit" className="btn btn-warning px-4">
                                    Cập Nhật
                                </button>
                                <button
                                    className="btn btn-danger px-4"
                                    onClick={() => handleDeleteMaterial(orderMaterialData?.id)}
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
                                                <h4 className="mb-4">Thông Tin Order Vật Liệu</h4>
                                                <div className="form-group">
                                                    <label>ID Order Vật liệu</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="hangSanPham"
                                                        defaultValue={orderMaterialData?.id}
                                                        {...register("id")}
                                                    />
                                                    <p className="text-danger fst-italic mt-2">
                                                        {errors.id?.message}
                                                    </p>
                                                </div>
                                                <div className="form-group">
                                                    <label>Mã Order</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="model"
                                                        defaultValue={orderMaterialData?.orderCode}
                                                        {...register("orderCode")}
                                                    />
                                                    <p className="text-danger fst-italic mt-2">
                                                        {errors.orderCode?.message}
                                                    </p>
                                                </div>
                                                <div className="form-group">
                                                    <label>Số Lượng</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="so-IME"
                                                        defaultValue={orderMaterialData?.quantity}
                                                        {...register("orderQuantity")}
                                                    />
                                                    <p className="text-danger fst-italic mt-2">
                                                        {errors.orderQuantity?.message}
                                                    </p>
                                                </div>
                                                <div className="form-group">
                                                    <label>Trạng Thái</label>
                                                    <Controller
                                                        name="status"
                                                        control={control}
                                                        defaultValue={defaultStatus.value}
                                                        render={({ field }) => (
                                                            <div>
                                                                <Select
                                                                    {...field}
                                                                    placeholder="--Chọn Trạng Thái--"
                                                                    options={statusOption}
                                                                    defaultValue={defaultStatus}
                                                                    value={statusOption.find((c) =>
                                                                        c.value === field.value
                                                                    )}
                                                                    onChange={(val) =>
                                                                        field.onChange(val.value)
                                                                    }
                                                                />
                                                                <p className="text-danger fst-italic mt-2">
                                                                    {errors.status?.message}
                                                                </p>
                                                            </div>
                                                        )}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Ngày order</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="ten-loi"
                                                        defaultValue={orderMaterialData?.createDate ? new Date(orderMaterialData.createDate).toLocaleDateString() : ""}
                                                        readOnly
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Ngày Approval</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="ten-loi"
                                                        defaultValue={orderMaterialData?.approvalDate ? new Date(orderMaterialData.approvalDate).toLocaleDateString() : ""}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-5">
                                                <h4 className="mb-4">Thông Tin Nhân Viên</h4>
                                                <div className="form-group">
                                                    <label className="mb-3 mt-2">Tên Nhân Viên Order</label>
                                                    <Controller
                                                        name="employeeOrderCode"
                                                        control={control}
                                                        defaultValue={defaultEngineer.value}
                                                        render={({ field }) => (
                                                            <div>
                                                                <Select
                                                                    {...field}
                                                                    placeholder="--Chọn Nhân Viên--"
                                                                    options={engineerOption}
                                                                    defaultValue={defaultEngineer}
                                                                    value={engineerOption.find(
                                                                        (c) => c.value === field.value
                                                                    )}
                                                                    onChange={(val) => {
                                                                        setSelectEngineer(val.value)
                                                                        field.onChange(val.value)
                                                                    }}
                                                                />
                                                                <p className="text-danger fst-italic mt-2">
                                                                    {errors.employeeOrderCode?.message}
                                                                </p>
                                                            </div>
                                                        )}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="mb-3 mt-2">Mã Nhân Viên Order</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="so-IME"
                                                        value={selectEngineer ? selectEngineer : defaultEngineer.value}
                                                        readOnly
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="mb-3 mt-2">Tên Nhân Viên Approval</label>
                                                    <Controller
                                                        name="employeeAppvoralCode"
                                                        control={control}
                                                        defaultValue={defaultWarehouse.value}
                                                        render={({ field }) => (
                                                            <div>
                                                                <Select
                                                                    {...field}
                                                                    placeholder="--Chọn Nhân Viên--"
                                                                    options={warehouseEmployeeOption}
                                                                    defaultValue={defaultWarehouse}
                                                                    value={warehouseEmployeeOption.find(
                                                                        (c) => c.value === field.value)}
                                                                    onChange={(val) => {
                                                                        setSelectWarehouse(val);
                                                                        field.onChange(val.value)
                                                                    }}
                                                                />                                                             
                                                            </div>
                                                        )}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="mb-3 mt-2">Mã Nhân Viên Approval</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="so-IME"
                                                        value={selectWarehouse ? selectWarehouse.value : defaultWarehouse.value}
                                                        readOnly
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
                                                                <p className="text-danger fst-italic mt-2">
                                                                    {errors.componentId?.message}
                                                                </p>
                                                            </div>
                                                        )}
                                                    />

                                                </div>
                                            </div>
                                            <div className="col-md-5">
                                                <h4 className="mb-4">Thông Tin Vật Liệu</h4>
                                                <div className="form-group">
                                                    <label className="mb-3">Tên Vendor</label>
                                                    <Controller
                                                        name="materialId"
                                                        control={control}
                                                        defaultValue={defaultMaterial.value}
                                                        render={({ field }) => {
                                                            useEffect(() => {
                                                                setSelectedId(defaultMaterial.value);
                                                            }, []);
                                                            return (
                                                                <div>
                                                                    <Select
                                                                        {...field}
                                                                        placeholder="--Chọn Vendor--"
                                                                        defaultValue={defaultMaterial}
                                                                        options={materialOption}
                                                                        value={materialOption.find(
                                                                            (c) => c.value === field.value
                                                                        )}
                                                                        onChange={(val) => {
                                                                            setSelectedId(val.value)
                                                                            field.onChange(val.value)
                                                                        }}
                                                                    />
                                                                    <p className="text-danger fst-italic mt-2">
                                                                        {errors.materialId?.message}
                                                                    </p>
                                                                </div>
                                                            );
                                                        }}
                                                    />
                                                </div>
                                                {selectMaterial && (
                                                    <>
                                                        <div className="form-group">
                                                            <label className="mb-3 mt-2">Mã Vật Liệu</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="so-IME"
                                                                value={selectMaterial.code}
                                                                readOnly
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="mb-3 mt-2">Tên Model</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="so-IME"
                                                                value={selectMaterial.nameModel}
                                                                readOnly
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="mb-3 mt-2">Số Lượng</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="so-IME"
                                                                value={selectMaterial.quantity}
                                                                readOnly
                                                            />
                                                        </div>
                                                    </>
                                                )}
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

export default OrderMaterialManageDetail;