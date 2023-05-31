import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useLazyFindGuaranteeAllQuery } from "../../../../app/apis/warrantyEmployee/warrantyEmployeeApi";

function WarrantyGuaranteeList() {
  const [term, setTerm] = useState("");

  const [getGuarantee, { data: guaranteeData, isLoading: guaranteeLoading }] =
    useLazyFindGuaranteeAllQuery();

  useEffect(() => {
    getGuarantee({
      page: 1,
      pageSize: 10,
      term: term,
    });
  }, [term]);

  if (guaranteeLoading) {
    return <h2>Loading....</h2>;
  }
  console.log(guaranteeData);

  const handlePageClick = (page) => {
    getGuarantee({
      page: page.selected + 1,
      pageSize: 10,
      term: term,
    });
  };

  return (
    <>
      <section className="content">
        <div className="container-fluid">
          <div className="search-container">
            <input
              className="input-search mb-4"
              type="text"
              placeholder="Tìm kiếm kiếm theo IME..."
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            />
          </div>
          <div className="search-results mt-3">
            {guaranteeData && guaranteeData.data.length > 0 ? (
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-body">
                      <table className="table table-bordered table-hover">
                        <thead>
                          <tr>
                            <th>ID Bảo Hành</th>
                            <th>Mã Bảo Hành</th>
                            <th>Ngày Bắt Đầu</th>
                            <th>Ngày hết hạn</th>
                            <th>Mã Nhân Viên Tạo</th>
                            <th>Tên Nhân Viên Tạo</th>
                            <th>ID Sản Phẩm</th>
                            <th>Model</th>
                            <th>Hãng Sản Xuất</th>
                            <th>Số IME</th>
                            <th>Trạng Thái</th>
                          </tr>
                        </thead>
                        <tbody>
                          {guaranteeData.data.map((guarantee) => (
                            <tr key={guarantee.guaranteeId}>
                              <td>{guarantee.guaranteeId}</td>
                              <td>{guarantee.guaranteeCode}</td>
                              <td>
                                {new Date(
                                  guarantee.activationDate
                                ).toLocaleDateString()}
                              </td>
                              <td>
                                {new Date(
                                  guarantee.expirationDate
                                ).toLocaleDateString()}
                              </td>
                              <td>{guarantee.employeeCode}</td>
                              <td>{guarantee.employeeName}</td>
                              <td>
                                {guarantee.productId}
                              </td>
                              <td>{guarantee.nameModel}</td>
                              <td>{guarantee.phoneCompany}</td>
                              <td>{guarantee.ime}</td>
                              <td>{guarantee.status ? "Còn Hạn Bảo Hành" : "Hết Hạn Bảo Hành"}</td>
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
                          pageCount={guaranteeData?.totalPages}
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
              <p>Không có hóa đơn nào !!!</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default WarrantyGuaranteeList;
