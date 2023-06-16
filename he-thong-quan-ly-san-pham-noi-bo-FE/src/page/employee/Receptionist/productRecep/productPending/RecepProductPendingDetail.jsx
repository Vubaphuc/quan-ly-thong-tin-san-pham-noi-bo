import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDeleteProductByIdMutation, useGetProductByIdQuery } from "../../../../../app/apis/receptionist/productApi";
import { toast } from "react-toastify";
import { useDeleteCustomerByIdMutation } from "../../../../../app/apis/admin/manage/CustomerManageApi";

function RecepProductPendingDetail () {
    const { productId } = useParams();
    const navigate = useNavigate();

    const [deleteProduct] = useDeleteProductByIdMutation();
    
    const { data: productData, isLoading: productLoading } =
        useGetProductByIdQuery(productId);

    if (productLoading) {
        return <h2>Loading...</h2>;
    }

    console.log(productData)

    const handleClickDeleteProduct = (id) => {
        deleteProduct(id)
            .unwrap()
            .then(() => {
                toast.success("Hủy Thành Công");
                setTimeout(() => {
                    navigate("/employee/receptionist/products/pending")
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
                    <div className="row py-2">
                        <div className="col-6">
                            <Link
                                to={"/employee/receptionist/product-register-guarantee"}
                                className="btn btn-default"
                            >
                                <i className="fas fa-chevron-left"></i> Quay lại
                            </Link>
                            <button
                                type="button"
                                className="btn btn-danger px-4"
                                onClick={() => handleClickDeleteProduct(productData?.id)}
                            >
                                Hủy
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
                                                    id="hang-san-pham"
                                                    defaultValue={productData?.id}
                                                    disabled
                                                />
                                            </div>
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
                                            <div className="form-group">
                                                <label>Ngày nhận</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="hang-san-pham"
                                                    defaultValue={new Date(productData?.inputDate).toLocaleDateString()}
                                                    disabled
                                                />
                                            </div>                                            
                                            <div className="form-group">
                                                <label>Trạng Thái</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="ten-loi"
                                                    defaultValue={productData?.status}
                                                    disabled
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

export default RecepProductPendingDetail;