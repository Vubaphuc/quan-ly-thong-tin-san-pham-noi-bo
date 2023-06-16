import React, { useState } from "react";
import { useGetListCustomeriesByTermQuery } from "../../../../app/apis/warrantyEmployee/warrantyEmployeeApi";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

function WarrantyCustomerList() {
  const [term, setTerm] = useState("");
  const [page, setPage] = useState(0);

  const { data: customerData, isLoading: customerLoading } =
    useGetListCustomeriesByTermQuery({
      page: page + 1,
      pageSize: 10,
      term: term,
    });

  if (customerLoading) {
    return <h2>Loading...</h2>;
  }

  const handlePageClick = (page) => {
    setPage(page.selected);
  };

  return (
    <>
      <section className="content">
        <div className="container-fluid">
          <div className="row py-2"></div>
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
            {customerData && customerData.data.length > 0 ? (
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-body">
                      <table className="table table-bordered table-hover">
                        <thead>
                          <tr>
                            <th>ID Khách Hàng</th>
                            <th>Họ và Tên</th>
                            <th>Email</th>
                            <th>Số Điện Thoại</th>
                            <th>Địa Chỉ</th>
                          </tr>
                        </thead>
                        <tbody>
                          {customerData.data.map((customer) => (
                            <tr key={customer.id}>
                              <td>
                                {customer.id}
                              </td>
                              <td>
                                {customer.fullName}
                              </td>
                              <td>{customer.email}</td>
                              <td>{customer.phone}</td>
                              <td>
                                {customer.address}
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
              <p>Không có sản phẩm nào !!!</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default WarrantyCustomerList;
