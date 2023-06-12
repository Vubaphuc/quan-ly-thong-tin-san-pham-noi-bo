import React from "react";
import { useLazyFindCustomerAllQuery } from "../../../app/apis/admin/manage/CustomerManageApi";
import { useEffect } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { useState } from "react";
import { exportToCSV } from "../../formHTML/excelUtils";

function CustomerManageList() {
    const [term, setTerm] = useState("")

    const [getCustomer, { data: customerData, isLoading: customerLoading }] = useLazyFindCustomerAllQuery();

    useEffect(() => {
        getCustomer({ page: 1, pageSize: 10, term: term });
    }, [term]);

    if (customerLoading) {
        return <h2>Loading...</h2>
    }


    const handlePageClick = (page) => {
        getCustomer({
            page: page.selected + 1,
            pageSize: 10,
            term: term
        })
    }

    const exportToExcel = () => {

        if (customerData && customerData.data.length > 0) {
            const csvData = customerData.data.map((customer) => ({
                "Mã Khách Hàng": customer.id,
                "Họ và Tên": customer.fullName,
                "Số Điện Thoại": customer.phoneNumber,
                "Email": customer.email
            }));

            exportToCSV(csvData, "customer.xlsx");
        }
    };

    return (
        <>
            <section className="content">
                <div className="container-fluid">
                    <div className="search-container">
                        <input
                            className="input-search mb-4"
                            type="text"
                            placeholder="Tìm kiếm khách hàng..."
                            value={term}
                            onChange={(e) => setTerm(e.target.value)}
                        />
                    </div>
                    <div className="search-results mt-3">
                        {customerData && customerData.data.length > 0 ? (
                            <div className="row">
                                <div className="d-flex align-items-center justify-content-between mb-4 border-bottom">
                                    <h6 className="mb-0">Danh Sách Khách hàng</h6>
                                    <div><button className="btn btn-warning px-4" variant="warning" onClick={exportToExcel}>Export</button></div>
                                </div>
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <table className="table table-bordered table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>Mã Khách Hàng</th>
                                                        <th>Họ và Tên</th>
                                                        <th>Số Điện Thoại</th>
                                                        <th>Email</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        customerData.data.map((dataPending) => (
                                                            <tr key={dataPending.id}>
                                                                <td>
                                                                    <Link
                                                                        to={`/admin/customer/${dataPending.id}`}
                                                                        className="text-decoration-none"
                                                                    >
                                                                        {dataPending?.id}
                                                                    </Link>
                                                                </td>
                                                                <td>
                                                                    <Link
                                                                        to={`/admin/customer/${dataPending.id}`}
                                                                        className="text-decoration-none"
                                                                    >
                                                                        {dataPending?.fullName}
                                                                    </Link>
                                                                </td>
                                                                <td>{dataPending?.phoneNumber}</td>
                                                                <td>{dataPending?.email}</td>
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
                                                    pageCount={customerData?.totalPages}
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
                            <p>Không có khách hàng nào !!!</p>
                        )}
                    </div>
                </div>
            </section>
        </>
    )

}

export default CustomerManageList;