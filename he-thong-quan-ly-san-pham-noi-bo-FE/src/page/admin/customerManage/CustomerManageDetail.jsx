import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import addressQuery from "../../formHTML/address";
import { getAddress, getEmployees } from "../../formHTML/options";
import hookAdminUpdateCustomer from "../../hookForm/hook/hookAdmin/hookAdminUpdateCustomer";
import { useFindReceptionistAllQuery } from "../../../app/apis/employee/employeeApi";
import { useDeleteCustomerByIdMutation, useFindCustomerByIdQuery } from "../../../app/apis/admin/manage/CustomerManageApi";
import { toast } from "react-toastify";

function CustomerManageDetail() {

    const { customerId } = useParams();
    const navigate = useNavigate();

    const { provinces } = addressQuery();

    const { control, handleSubmit, register, errors, onUpdateCustomer } = hookAdminUpdateCustomer();

    const [deleteCustomer] = useDeleteCustomerByIdMutation();
    const { data: receptionistData, isLoading: receptionistLoading } = useFindReceptionistAllQuery();
    const { data: customerData, isLoading: customerLoading } = useFindCustomerByIdQuery(customerId);

    if (receptionistLoading || customerLoading) {
        return <h2>Loading...</h2>
    }

    console.log(customerData)


    const addressOptions = getAddress(provinces);
    const receptionistOption = getEmployees(receptionistData);

    const defaultAddress = {
        label: customerData?.address,
        value: customerData?.address
    }
    const defaultReceptionist = {
        label: customerData?.receptionists.employeeName,
        value: customerData?.receptionists.employeeCode,
    }
event
    const handleDeleteCustomer = (id) => {
        event.preventDefault();
        deleteCustomer(id)
        .unwrap()
        .then (() => {
            toast.success("Xóa Khách hàng thành công");
            setTimeout(() => {
                navigate("/admin/customers");
            }, 1000)
        })
        .catch((err) => {
            toast.error(err.data.message);
        })
    }



    return (
        <>
            <section className="content">
                <div className="container-fluid">
                    <form onSubmit={handleSubmit(onUpdateCustomer)}>
                        <div className="row py-2">
                            <div className="col-6">
                                <Link
                                    to={"/admin/customers"}
                                    className="btn btn-default"
                                >
                                    <i className="fas fa-chevron-left"></i> Quay lại
                                </Link>
                                <button type="submit" className="btn btn-warning px-4">
                                    Cập Nhật
                                </button>
                                <button 
                                    className="btn btn-danger px-4"
                                    onClick={() => handleDeleteCustomer(customerData?.id)}
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
                                                <h4 className="mb-4">Thông Tin Khách Hàng</h4>
                                                <div className="form-group">
                                                    <label>ID Khách Hàng</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="hangSanPham"
                                                        defaultValue={customerData?.id}
                                                        {...register("id")}
                                                    />
                                                    {errors.id && (
                                                        <p className="text-danger fst-italic mt-2">
                                                            {errors.id.message}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="form-group">
                                                    <label>Họ Và Tên</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="model"
                                                        defaultValue={customerData?.fullName}
                                                        {...register("fullName")}
                                                    />
                                                    {errors.fullName && (
                                                        <p className="text-danger fst-italic mt-2">
                                                            {errors.fullName.message}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="form-group">
                                                    <label>Email</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="so-IME"
                                                        defaultValue={customerData?.email}
                                                        {...register("email")}
                                                    />
                                                    {errors.email && (
                                                        <p className="text-danger fst-italic mt-2">
                                                            {errors.email.message}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="form-group">
                                                    <label>Số Điện Thoại</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="ten-loi"
                                                        defaultValue={customerData?.phoneNumber}
                                                        {...register("phone")}
                                                    />
                                                    {errors.phone && (
                                                        <p className="text-danger fst-italic mt-2">
                                                            {errors.phone.message}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="form-group">
                                                    <label>Địa chỉ</label>
                                                    <Controller
                                                        name="address"
                                                        control={control}
                                                        defaultValue={defaultAddress.value}
                                                        render={({ field }) => (
                                                            <div>
                                                                <Select
                                                                    {...field}
                                                                    placeholder="--chọn địa chỉ--"
                                                                    defaultValue={defaultAddress}
                                                                    options={addressOptions}
                                                                    value={addressOptions.find(
                                                                        (c) => c.value === field.value
                                                                    )}
                                                                    onChange={(val) => field.onChange(val.value)}
                                                                />
                                                            </div>
                                                        )}
                                                    />
                                                    {errors.address && (
                                                        <p className="text-danger fst-italic mt-2">
                                                            {errors.address.message}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-md-5">
                                                <h4 className="mb-4">Thông Tin Nhân Viên Đăng ký</h4>
                                                <div className="form-group">
                                                    <label className="mb-3">Nhân Viên Lễ Tân</label>
                                                    <Controller
                                                        name="employeeCode"
                                                        control={control}
                                                        defaultValue={defaultReceptionist.value}
                                                        render={({ field }) => (
                                                            <div>
                                                                <Select
                                                                    {...field}
                                                                    placeholder="--Chọn Nhân Viên--"
                                                                    options={receptionistOption}
                                                                    defaultValue={defaultReceptionist}
                                                                    value={receptionistOption.find(
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
    )
}

export default CustomerManageDetail;