import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { useDeleteProductByIdMutation, useFindProductProjectionByIdQuery } from "../../../app/apis/admin/manage/productManageApi";
import { toast } from "react-toastify";
import { useFindComponentsAllQuery } from "../../../app/apis/admin/manage/materialManageApi";
import { useFindReceptionistAndWarrantyEmployeeAllQuery, useFindWarehouseEmployeeAllQuery, useGetListEngineerQuery } from "../../../app/apis/employee/employeeApi";
import { getAddress, getCharge, getComponents, getEmployees, getIsRepair, getStatus } from "../../formHTML/options";
import addressQuery from "../../formHTML/address";
import hookAdminUpdateProduct from "../../hookForm/hook/hookAdmin/hookAdminUpdateProduct";

function ProductManageDetail() {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [selectEngineer, setSelectEngineer] = useState(null);
    const [selectPay, setSelectPay] = useState(null);
    const [selectRecep, setSelectRecep] = useState(null);

    const { provinces } = addressQuery();

    const { control, register, errors, handleSubmit, onUpdateProduct } = hookAdminUpdateProduct();

    const { data: productData, isLoading: productLoading } = useFindProductProjectionByIdQuery(productId);
    const { data: componentData } = useFindComponentsAllQuery();
    const { data: engineerData } = useGetListEngineerQuery();
    const { data: wareHouseData } = useFindWarehouseEmployeeAllQuery();
    const { data: RecepWarrantyData } = useFindReceptionistAndWarrantyEmployeeAllQuery();

    const [deleteProduct] = useDeleteProductByIdMutation();

    if (productLoading) {
        return <h2>Loading...</h2>
    }

    console.log(productData)

    const defaultStatus = {
        value: productData?.status,
        label: productData?.status ? "OK" : "PENDING"
    }
    const defaultCharge = {
        value: productData?.charge,
        label: productData?.charge ? "Tính Phí" : "Không Tính Phí"
    }
    const defaultRepair = {
        value: productData?.isRepair,
        label: productData?.isRepair ? "Bảo Hành" : "Mới"
    }
    const defaultComponents = {
        value: productData?.components?.id,
        label: productData?.components?.name,
    }
    const defaultEngineer = {
        value: productData?.engineer?.employeeCode,
        label: productData?.engineer?.employeeName
    }
    const defaultRecep = {
        value: productData?.receptionists?.employeeCode,
        label: productData?.receptionists?.employeeName
    }
    const defaultPayer = {
        value: productData?.productPayer?.employeeCode,
        label: productData?.productPayer?.employeeName
    }
    const defaultAddress = {
        value: productData?.customer?.address,
        label: productData?.customer?.address
    }




    const engineerOption = getEmployees(engineerData);
    const RecepWarrantyOption = getEmployees(RecepWarrantyData);
    const componentOptions = getComponents(componentData);
    const addressOptions = getAddress(provinces);
    const statusOption = getStatus();
    const chargeOption = getCharge();
    const repairOption = getIsRepair();



    const handleDeleteMaterial = (id) => {
        event.preventDefault();
        deleteProduct(id)
            .unwrap()
            .then(() => {
                toast.success("Xóa Sản Phẩm Thành Công")
                setTimeout(() => {
                    navigate("/admin/products")
                })
            })
            .catch((err) => {
                toast.error(err.data.message);
            })
    }

    return (
        <>
            <section className="content">
                <div className="container-fluid">
                    <form onSubmit={handleSubmit(onUpdateProduct)}>
                        <div className="row py-2">
                            <div className="col-6">
                                <Link
                                    to={"/admin"}
                                    className="btn btn-default"
                                >
                                    <i className="fas fa-chevron-left"></i> Quay lại
                                </Link>
                                <button type="submit" className="btn btn-warning px-4">
                                    Cập Nhật
                                </button>
                                <button
                                    className="btn btn-danger px-4"
                                    onClick={() => handleDeleteMaterial(productId)}
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
                                                <h4 className="mb-4">Thông Tin Sản Phẩm</h4>
                                                <div className="form-group">
                                                    <label>ID Sản Phẩm</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="hangSanPham"
                                                        defaultValue={productData?.id}
                                                        {...register("id")}
                                                        readOnly
                                                    />
                                                    <p className="text-danger fst-italic mt-2">
                                                        {errors.id?.message}
                                                    </p>
                                                </div>
                                                <div className="form-group">
                                                    <label>Tên Model</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="model"
                                                        defaultValue={productData?.nameModel}
                                                        {...register("nameModel")}
                                                    />
                                                    <p className="text-danger fst-italic mt-2">
                                                        {errors.nameModel?.message}
                                                    </p>
                                                </div>
                                                <div className="form-group">
                                                    <label>Hãng Sản Xuất</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="so-IME"
                                                        defaultValue={productData?.phoneCompany}
                                                        {...register("phoneCompany")}
                                                    />
                                                    <p className="text-danger fst-italic mt-2">
                                                        {errors.phoneCompany?.message}
                                                    </p>
                                                </div>
                                                <div className="form-group">
                                                    <label>Số IME</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="so-IME"
                                                        defaultValue={productData?.ime}
                                                        {...register("ime")}
                                                    />
                                                    <p className="text-danger fst-italic mt-2">
                                                        {errors.ime?.message}
                                                    </p>
                                                </div>
                                                <div className="form-group">
                                                    <label>Tên Lỗi</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="so-IME"
                                                        defaultValue={productData?.defectName}
                                                        {...register("defectName")}
                                                    />
                                                    <p className="text-danger fst-italic mt-2">
                                                        {errors.defectName?.message}
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
                                                                    defaultValue={defaultStatus}
                                                                    options={statusOption}
                                                                    value={statusOption.find((c) => c.value === field.value)}
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
                                                    <label>Giá Tiền</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="ten-loi"
                                                        defaultValue={productData?.price}
                                                        {...register("price")}
                                                    />
                                                    <p className="text-danger fst-italic mt-2">
                                                        {errors.price?.message}
                                                    </p>
                                                </div>
                                                <div className="form-group">
                                                    <label>Loại Sản Phẩm</label>
                                                    <Controller
                                                        name="repair"
                                                        control={control}
                                                        defaultValue={defaultRepair.value}
                                                        render={({ field }) => (
                                                            <div>
                                                                <Select
                                                                    {...field}
                                                                    placeholder="--Chọn Địa Chỉ--"
                                                                    defaultValue={defaultRepair}
                                                                    options={repairOption}
                                                                    value={repairOption.find((c) => c.value === field.value)}
                                                                    onChange={(val) =>
                                                                        field.onChange(val.value)
                                                                    }
                                                                />
                                                                <p className="text-danger fst-italic mt-2">
                                                                    {errors.repair?.message}
                                                                </p>
                                                            </div>
                                                        )}
                                                    />

                                                </div>
                                                <div className="form-group">
                                                    <label>Chú Thích</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="ten-loi"
                                                        defaultValue={productData?.note}
                                                        {...register("note")}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Loại Tính Phí</label>
                                                    <Controller
                                                        name="charge"
                                                        control={control}
                                                        defaultValue={defaultCharge.value}
                                                        render={({ field }) => (
                                                            <div>
                                                                <Select
                                                                    {...field}
                                                                    placeholder="--Chọn Loại Tính Phí--"
                                                                    options={chargeOption}
                                                                    defaultValue={defaultCharge}
                                                                    value={chargeOption.find((c) => c.value === field.value)}
                                                                    onChange={(val) =>
                                                                        field.onChange(val.value)
                                                                    }
                                                                />
                                                                <p className="text-danger fst-italic mt-2">
                                                                    {errors.charge?.message}
                                                                </p>
                                                            </div>
                                                        )}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Vị Trí Sửa</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="ten-loi"
                                                        defaultValue={productData?.location}
                                                        {...register("location")}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Ngày inpput</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="ten-loi"
                                                        defaultValue={productData?.inputDate ? new Date(productData?.inputDate).toLocaleDateString() : ""}
                                                        readOnly
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Ngày output</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="ten-loi"
                                                        defaultValue={productData?.outputDate ? new Date(productData?.outputDate).toLocaleDateString() : ""}
                                                        readOnly
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Ngày hoàn thành</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="ten-loi"
                                                        defaultValue={productData?.finishDate ? new Date(productData?.finishDate).toLocaleDateString() : ""}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-5">
                                                <h4 className="mb-4">Thông Tin Nhân Viên</h4>
                                                <div className="form-group">
                                                    <label className="mb-3 mt-2">Tên Nhân Viên Nhận Sản Phẩm</label>
                                                    <Controller
                                                        name="employeeRecepCode"
                                                        control={control}
                                                        defaultValue={defaultRecep.value}
                                                        render={({ field }) => (
                                                            <div>
                                                                <Select
                                                                    {...field}
                                                                    placeholder="--Chọn Nhân Viên--"
                                                                    defaultValue={defaultRecep}
                                                                    options={RecepWarrantyOption}
                                                                    value={RecepWarrantyOption.find((c) =>
                                                                        c.value === field.value
                                                                    )}
                                                                    onChange={(val) => {
                                                                        setSelectRecep(val)
                                                                        field.onChange(val.value)
                                                                    }}
                                                                />
                                                                <p className="text-danger fst-italic mt-2">
                                                                    {errors.employeeRecepCode?.message}
                                                                </p>
                                                            </div>
                                                        )}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="mb-3 mt-2">Mã Nhân Viên Nhận Sản Phẩm</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="so-IME"
                                                        defaultValue={selectRecep ? selectRecep.value : productData?.receptionists?.employeeCode}
                                                        readOnly
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="mb-3 mt-2">Tên Nhân Viên Sửa Chữa</label>
                                                    <Controller
                                                        name="employeeEngineerCode"
                                                        control={control}
                                                        defaultValue={defaultEngineer.value}
                                                        render={({ field }) => (
                                                            <div>
                                                                <Select
                                                                    {...field}
                                                                    placeholder="--Chọn Nhân Viên--"
                                                                    defaultValue={defaultEngineer}
                                                                    options={engineerOption}
                                                                    value={engineerOption.find((c) =>
                                                                        c.value === field.value
                                                                    )}
                                                                    onChange={(val) => {
                                                                        setSelectEngineer(val)
                                                                        field.onChange(val.value)
                                                                    }}
                                                                />
                                                            </div>
                                                        )}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="mb-3 mt-2">Mã Nhân Viên Sửa Chữa</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="so-IME"
                                                        defaultValue={selectEngineer ? selectEngineer.value : productData?.engineer?.employeeCode}
                                                        readOnly
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="mb-3 mt-2">Tên Nhân Viên Trả sản Phẩm</label>
                                                    <Controller
                                                        name="employeePayerCode"
                                                        control={control}
                                                        defaultValue={defaultPayer.value}
                                                        render={({ field }) => (
                                                            <div>
                                                                <Select
                                                                    {...field}
                                                                    placeholder="--Chọn Nhân Viên--"
                                                                    defaultValue={defaultPayer}
                                                                    options={RecepWarrantyOption}
                                                                    value={RecepWarrantyOption.find((c) =>
                                                                        c.value === field.value
                                                                    )}
                                                                    onChange={(val) => {
                                                                        setSelectPay(val)
                                                                        field.onChange(val.value)
                                                                    }}
                                                                />

                                                            </div>
                                                        )}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="mb-3 mt-2">Mã Nhân Viên Trả Sản Phẩm</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="so-IME"
                                                        defaultValue={selectPay ? selectPay.value : productData?.productPayer?.employeeCode}
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
                                                                    value={componentOptions.find((c) => c.value === field.value)}
                                                                    onChange={(val) =>
                                                                        field.onChange(val.value)
                                                                    }
                                                                />

                                                            </div>
                                                        )}
                                                    />

                                                </div>
                                            </div>
                                            <div className="col-md-5">
                                                <h4 className="mb-4">Thông Tin Khách Hàng</h4>
                                                <div className="form-group">
                                                    <label className="mb-3 mt-2">ID Khách Hàng</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="so-IME"
                                                        defaultValue={productData?.customer.id}
                                                        readOnly
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="mb-3 mt-2">Tên Khách Hàng</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="so-IME"
                                                        defaultValue={productData?.customer.fullName}
                                                        readOnly
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="mb-3 mt-2">Số Điện Thoại</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="so-IME"
                                                        defaultValue={productData?.customer.phoneNumber}
                                                        readOnly
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="mb-3 mt-2">Email</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="so-IME"
                                                        defaultValue={productData?.customer.email}
                                                        readOnly
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Địa Chỉ</label>
                                                    <Controller
                                                        name="address"
                                                        control={control}
                                                        defaultValue={defaultAddress.value}
                                                        render={({ field }) => (
                                                            <div>
                                                                <Select
                                                                    {...field}
                                                                    placeholder="--Chọn Địa Chỉ--"
                                                                    defaultValue={defaultAddress}
                                                                    options={addressOptions}
                                                                    value={addressOptions.find((c) => c.value === field.value)}
                                                                    onChange={(val) =>
                                                                        field.onChange(val.value)
                                                                    }
                                                                    isDisabled
                                                                />
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

export default ProductManageDetail;