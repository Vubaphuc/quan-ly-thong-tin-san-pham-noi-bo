import React, { useState } from "react";
import {
  useSearchProductStatusOKByCustomerQuery,
  useSearchProductStatusPendingByCustomerQuery,
} from "../../../../app/apis/receptionist/customerApi";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

function RecepCustomerList() {
  const [status, setStatus] = useState("OK");
  const [term, setTerm] = useState("");
  const [page, setPage] = useState(0);


  const { data: customerData, isLoading: productLoading } =
    useSearchProductStatusPendingByCustomerQuery({
      page: page + 1,
      pageSize: 10,
      term: term,
    });

  if (productLoading) {
    return <h2>Loading...</h2>;
  }

  const handlePageClick = (page) => {
    setPage(page.selected);
  }


  const handleChaneNameCustomer = (e) => {
    setTerm(e.target.value);
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
              onChange={handleChaneNameCustomer}
            />
          </div>
          {customerData && customerData.data.length > 0 ? (
          <div className="row">
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
                        <th>Số lượng sản phẩm</th>
                        <th>Lựa Chọn</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        customerData.data.map((dataPending) => (
                          <tr key={dataPending.id}>
                            <td>
                              <Link
                                to={`/employee/receptionist/customer/${dataPending.id}`}
                                className="text-decoration-none"
                              >
                                {dataPending?.id}
                              </Link>
                            </td>
                            <td>
                              <Link
                                to={`/employee/receptionist/customer/${dataPending.id}`}
                                className="text-decoration-none"
                              >
                                {dataPending?.fullName}
                              </Link>
                            </td>
                            <td>{dataPending?.phone}</td>
                            <td>{dataPending?.email}</td>
                            <td>{dataPending?.object}</td>
                            <td>
                              <Link
                                to={`/employee/receptionist/products/create/${dataPending?.id}`}
                                className="btn btn-info px-2"
                              >
                                Thêm Sản Phẩm
                              </Link>
                            </td>
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
      </section>
    </>
  );
}

export default RecepCustomerList;
