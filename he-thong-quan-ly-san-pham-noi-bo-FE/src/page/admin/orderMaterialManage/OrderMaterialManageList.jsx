import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { useLazyFindOrderMaterialsAllQuery, useLazyFindOrderMaterialsIsDeleteTrueAllQuery } from "../../../app/apis/admin/manage/materialManageApi";

function OrderMaterialManageList() {
    const [term, setTerm] = useState("");
    const [status, setStatus] = useState("OK");

    const [getOrderMaterial, { data: orderMaterialData, isLoading: orderMaterialLoading }] = useLazyFindOrderMaterialsAllQuery();
    const [getOrderMaterialDelete, { data: orderMaterialDeleteData, isLoading: orderMaterialDeleteLoading }] = useLazyFindOrderMaterialsIsDeleteTrueAllQuery();

    useEffect(() => {
        getOrderMaterial({
            page: 1,
            pageSize: 10,
            term: term
        })
    }, [term])

    useEffect(() => {
        getOrderMaterialDelete({
            page: 1,
            pageSize: 10,
            term: term
        })
    }, [term])

    if (orderMaterialLoading || orderMaterialDeleteLoading) {
        return <h2>Loading...</h2>
    }


    const handlePageClick = (page) => {
        getOrderMaterial({
            page: page.selected + 1,
            pageSize: 10,
            term: term
        });
        getOrderMaterialDelete({
            page: page.selected + 1,
            pageSize: 10,
            term: term
        });
    }



    return (
        <>
            <section className="content">
                <div className="container-fluid">
                    <div className="search-container">
                        <input
                            className="input-search mb-4"
                            type="text"
                            placeholder="Tìm kiếm..."
                            value={term}
                            onChange={(e) => setTerm(e.target.value)}
                        />
                    </div>
                    <div className="search-results mt-3">
                        {(orderMaterialData && orderMaterialData.data.length > 0) || (orderMaterialDeleteData && orderMaterialDeleteData.data.length > 0) ? (
                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="btn-lua-chon">
                                                <label htmlFor="statusSelect" className="mb-2">
                                                    Trạng Thái:
                                                </label>
                                                <select
                                                    id="statusSelect"
                                                    className="form-control"
                                                    value={status}
                                                    onChange={(e) => setStatus(e.target.value)}
                                                >
                                                    <option value="OK">OK</option>
                                                    <option value="DELETE">Đã Hủy</option>
                                                </select>
                                            </div>
                                            {status === "OK" ? (
                                                <table className="table table-bordered table-hover">
                                                    <thead>
                                                        <tr>
                                                            <th>Mã Order</th>
                                                            <th>Số Lượng</th>
                                                            <th>Ngày Order</th>
                                                            <th>Ngày Phê Duyệt</th>
                                                            <th>Loại Linh kiện</th>
                                                            <th>ID Vật Liệu</th>
                                                            <th>Mã Vật liệu</th>
                                                            <th>Mã Nhân Viên Order</th>
                                                            <th>Tên Nhân Viên Order</th>
                                                            <th>Mã Nhân Viên Phê Duyệt</th>
                                                            <th>Tên Nhân Viên Phê duyệt</th>
                                                            <th>Trạng Thái</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                        {orderMaterialDeleteData.data.map((order, index) => (
                                                            <tr key={index}>
                                                                <td>
                                                                    <Link
                                                                        to={`/admin/orderMaterial/${order.id}`}
                                                                        className="text-decoration-none"
                                                                    >
                                                                        {order.orderCode}
                                                                    </Link>
                                                                </td>
                                                                <td>
                                                                    <Link
                                                                        to={`/admin/orderMaterial/${order.id}`}
                                                                        className="text-decoration-none"
                                                                    >
                                                                        {order.quantity}
                                                                    </Link>
                                                                </td>
                                                                <th>{new Date(order.createDate).toLocaleDateString()}</th>
                                                                <th>{order.approvalDate ? new Date(order.approvalDate).toLocaleDateString() : ""}</th>
                                                                <th>{order.components.name}</th>
                                                                <th>{order.material.id}</th>
                                                                <th>{order.material.code}</th>
                                                                <td>{order.orderer.employeeCode}</td>
                                                                <td>{order.orderer.employeeName}</td>
                                                                <td>{order.approver ? order.approver.employeeCode : ""}</td>
                                                                <td>{order.approver ? order.approver.employeeName : ""}</td>
                                                                <td>{order.isStatus ? "OK" : "PENDING"}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            ) : (
                                                <table className="table table-bordered table-hover">
                                                    <thead>
                                                        <tr>
                                                            <th>Mã Order</th>
                                                            <th>Số Lượng</th>
                                                            <th>Ngày Order</th>
                                                            <th>Ngày Phê Duyệt</th>
                                                            <th>Loại Linh kiện</th>
                                                            <th>ID Vật Liệu</th>
                                                            <th>Mã Vật liệu</th>
                                                            <th>Mã Nhân Viên Order</th>
                                                            <th>Tên Nhân Viên Order</th>
                                                            <th>Mã Nhân Viên Phê Duyệt</th>
                                                            <th>Tên Nhân Viên Phê duyệt</th>
                                                            <th>Trạng Thái</th>
                                                            <th>Tình Trạng</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {orderMaterialDeleteData.data.map((order, index) => (
                                                            <tr key={index}>
                                                                <td>{order.orderCode}</td>
                                                                <td>{order.quantity}</td>
                                                                <th>{new Date(order.createDate).toLocaleDateString()}</th>
                                                                <th>{order.approvalDate ? new Date(order.approvalDate).toLocaleDateString() : ""}</th>
                                                                <th>{order.components.name}</th>
                                                                <th>{order.material.id}</th>
                                                                <th>{order.material.code}</th>
                                                                <td>{order.orderer.employeeCode}</td>
                                                                <td>{order.orderer.employeeName}</td>
                                                                <td>{order.approver ? order.approver.employeeCode : ""}</td>
                                                                <td>{order.approver ? order.approver.employeeName : ""}</td>
                                                                <td>{order.isStatus ? "OK" : "PENDING"}</td>
                                                                <td>{order.isDelete ? "ĐÃ HỦY" : ""}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            )}
                                            <div
                                                className="d-flex justify-content-center mt-3"
                                                id="pagination"
                                            >
                                                <ReactPaginate
                                                    nextLabel="next >"
                                                    onPageChange={handlePageClick}
                                                    pageRangeDisplayed={3}
                                                    marginPagesDisplayed={2}
                                                    pageCount={status === "OK" ? orderMaterialData?.totalPages : orderMaterialDeleteData?.totalPages}
                                                    previousLabel="< previous"
                                                    pageClassName="page-item"
                                                    pageLinkClassName="page-link"
                                                    previousClassName="page-item"
                                                    previousLinkClassName="page-link"
                                                    nextClassName="page-item"
                                                    nextLinkClassName="page-link"
                                                    breakLabel="..."
                                                    breakClassName="page-item"
                                                    breakLinkClassName="page-link"
                                                    containerClassName="pagination"
                                                    activeClassName="active"
                                                    renderOnZeroPageCount={null}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p>Không có order vật liệu nào !!!</p>
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}

export default OrderMaterialManageList;