import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { useLazyFindProductEngineerPendingAllQuery } from "../../../../app/apis/warrantyEmployee/warrantyEmployeeApi";

function WarrantyProductPendingList() {
  const [term, setTerm] = useState("");

  const [getProduct, { data: productData, isLoading: productLoading }] =
    useLazyFindProductEngineerPendingAllQuery();

    useEffect(() => {
        getProduct({
            page: 1,
            pageSize: 10,
            term: term
        })
    }, [term])

  if (productLoading) {
    return <h2>Loading...</h2>;
  }

  console.log(productData);

  const handlePageClick = (page) => {
    getProduct({
      page: page.selected + 1,
      pageSize: 10,
      term: term,
    });
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
              onChange={(e) => setTerm(e.target.value)}
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
                            <th>Mã Nhân Viên Sửa</th>
                            <th>Tên Nhân Viên Sửa</th>
                            <th>Trạng Thái</th>
                          </tr>
                        </thead>
                        <tbody>
                          {productData.data.map((product) => (
                            <tr key={product.productId}>
                              <td>
                                <Link
                                  to={`/employee/warranty/product/pending/${product.productId}`}
                                  className="text-decoration-none"
                                >
                                  {product.nameModel}
                                </Link>
                              </td>
                              <td>
                                <Link
                                  to={`/employee/warranty/product/pending/${product.productId}`}
                                  className="text-decoration-none"
                                >
                                  {product.phoneCompany}
                                </Link>
                              </td>
                              <td>{product.ime}</td>
                              <td>{product.defectName}</td>
                              <td>{product.engineerCode}</td>
                              <td>{product.engineerName}</td>
                              <td>
                                {product.status === true ? "OK" : "PENDING"}
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

export default WarrantyProductPendingList;
