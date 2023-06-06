import React from "react";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { useLazyFindMaterialsAllQuery } from "../../../app/apis/admin/manage/materialManageApi";
import { useEffect } from "react";

function MaterialManageList() {
    const [term, setTerm] = useState("");

    const [getMaterial, { data: materialData, isLoading: materialLoading }] = useLazyFindMaterialsAllQuery();

    useEffect(() => {
        getMaterial({ page: 1, pageSize: 10, term: term });
    }, [materialData, term, getMaterial]);

    if (materialLoading) {
        return <h2>Loading...</h2>
    }

    const handlePageClick = (page) => {
        getMaterial({
            page: page.selected + 1,
            pageSize: 10,
            term: term
        })
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
                        {materialData && materialData.data.length > 0 ? (
                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <table className="table table-bordered table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>Mã Vật Liệu</th>
                                                        <th>Model</th>
                                                        <th>Số Lượng</th>
                                                        <th>Tên Vendor</th>
                                                        <th>Loại linh kiện</th>
                                                        <th>Thời gian Bảo hành</th>
                                                        <th>Tên Nhân Viên Kho</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        materialData.data.map((material) => (
                                                            <tr key={material.id}>
                                                                <td>
                                                                    <Link
                                                                        to={`/admin/material/${material.id}`}
                                                                        className="text-decoration-none"
                                                                    >
                                                                        {material?.code}
                                                                    </Link>
                                                                </td>
                                                                <td>
                                                                    <Link
                                                                        to={`/admin/material/${material.id}`}
                                                                        className="text-decoration-none"
                                                                    >
                                                                        {material?.nameModel}
                                                                    </Link>
                                                                </td>
                                                                <th>{material.quantity}</th>
                                                                <td>{material?.vendor.name}</td>
                                                                <td>{material?.components.name}</td>
                                                                <td>{material?.components.warrantyPeriod}</td>
                                                                <th>{material.warehouseEmployee.employeeName}</th>
                                                            </tr>
                                                        ))}
                                                </tbody>
                                            </table>
                                            <div
                                                className="d-flex justify-content-center mt-3"
                                                id="pagination"
                                            >
                                                <ReactPaginate
                                                    nextLabel="next >"
                                                    onPageChange={handlePageClick}
                                                    pageRangeDisplayed={3}
                                                    marginPagesDisplayed={2}
                                                    pageCount={materialData?.totalPages}
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
                            <p>Không có vật liệu nào !!!</p>
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}

export default MaterialManageList;