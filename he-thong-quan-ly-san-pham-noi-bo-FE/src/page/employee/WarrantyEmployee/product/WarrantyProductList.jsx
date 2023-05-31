import React from "react";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { useGetListProductPendingNoEngineerQuery } from "../../../../app/apis/warrantyEmployee/warrantyEmployeeApi";

function WarrantyProductList() {
  const [term, setTerm] = useState("");
  const [page, setPage] = useState(0);

  const { data: productData, isLoading: productLoading } =
    useGetListProductPendingNoEngineerQuery({
      page: page + 1,
      pageSize: 10,
      term: term,
    });

  if (productLoading) {
    return <h2>Loading...</h2>;
  }

  console.log(productData);

  const handlePageClick = (page) => {
    setPage(page.selected);
  };

  const handleChaneNameCustomer = (e) => {
    setTerm(e.target.value);
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
              placeholder="Tìm kiếm sản phẩm..."
              value={term}
              onChange={handleChaneNameCustomer}
            />
          </div>
          <div className="search-results mt-3">
            {productData && productData.data.length > 0 ? (
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-body">
                      <table className="table table-bordered table-hover">
                        <thead>
                          <tr>
                            <th>Model</th>
                            <th>Hãng Điện Thoại</th>
                            <th>Số IME</th>
                            <th>Tên Lỗi</th>
                            <th>Trạng Thái</th>
                            <th>Loại Hình bảo Hành</th>
                          </tr>
                        </thead>
                        <tbody>
                          {productData.data.map((product) => (
                            <tr key={product.productId}>
                              <td>
                                <Link
                                  to={`/employee/warranty/product/${product.productId}`}
                                  className="text-decoration-none"
                                >
                                  {product.model}
                                </Link>
                              </td>
                              <td>
                                <Link
                                  to={`/employee/warranty/product/${product.productId}`}
                                  className="text-decoration-none"
                                >
                                  {product.phoneCompany}
                                </Link>
                              </td>
                              <td>{product.ime}</td>
                              <td>{product.defectName}</td>
                              <td>
                                {product.status === true ? "OK" : "PENDING"}
                              </td>
                              <td>{product.repair ? "Tính Phí" : "Không Tính Phí" }</td>
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
                          pageCount={productData?.totalPages}
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

export default WarrantyProductList;