import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { useGetListBillAllQuery } from "../../../../app/apis/receptionist/productApi";

function RecepBillList() {
  const [page, setPage] = useState(0);
  const [term, setTerm] = useState("");

  const { data: billData, isLoading: billLoading } = useGetListBillAllQuery({
    page: page + 1,
    pageSize: 10,
    term: term,
  });

  if (billLoading) {
    return <h2>Loading...</h2>;
  }

  console.log(billData);

  const handleChaneNameCustomer = (e) => {
    setTerm(e.target.value);
  };

  const handlePageClick = (page) => {
    setPage(page.selected);
  };

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
              onChange={handleChaneNameCustomer}
            />
          </div>
          <div className="search-results mt-3">
            {billData && billData.data.length > 0 ? (
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-body">
                      <table className="table table-bordered table-hover">
                        <thead>
                          <tr>
                            <th>Mã Hóa Đơn</th>
                            <th>Tên Khách Hàng</th>
                            <th>Số Điện Thoại</th>
                            <th>Email</th>
                            <th>Thành Tiền</th>
                          </tr>
                        </thead>
                        <tbody>
                          {billData.data.map((bill) => (
                            <tr key={bill.billId}>
                              <td>
                                <Link
                                  to={`/employee/receptionist/bill/${bill.productId}`}
                                  className="text-decoration-none"
                                >
                                  {bill?.billId}
                                </Link>
                              </td>
                              <td>
                                <Link
                                  to={`/employee/receptionist/bill/${bill.productId}`}
                                  className="text-decoration-none"
                                >
                                  {bill?.customerName}
                                </Link>
                              </td>
                              <td>{bill?.customerPhone}</td>
                              <td>{bill?.customerEmail}</td>
                              <td>{bill?.price}</td>
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
                          pageCount={billData?.totalPages}
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
  );
}

export default RecepBillList;
