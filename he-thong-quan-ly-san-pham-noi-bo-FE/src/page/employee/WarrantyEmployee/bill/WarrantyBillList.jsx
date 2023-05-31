import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { useLazyFindBillProductGuaranteeAllQuery } from "../../../../app/apis/warrantyEmployee/warrantyEmployeeApi";

function WarrantyBillList() {
  const [term, setTerm] = useState("");

  const [getProduct, { data: productData, isLoading: productLoading }] =
    useLazyFindBillProductGuaranteeAllQuery();
  useEffect(() => {
    getProduct({
      page: 1,
      pageSize: 10,
      term: term,
    });
  }, [term]);

  if (productLoading) {
    return <h2>Loading....</h2>;
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
          <div className="search-container">
            <input
              className="input-search mb-4"
              type="text"
              placeholder="Tìm kiếm kiếm sản phẩm..."
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
                            <th>ID Hóa Đơn</th>
                            <th>Mã Nhân Viên Tạo</th>
                            <th>Tên Nhân Viên Tạo</th>
                            <th>Ngày Tạo</th>
                            <th>ID Sản Phẩm</th>
                            <th>Số IME</th>
                            <th>Loại Hình Phí</th>
                            <th>Số Tiền</th>
                            <th>Mã Số Bảo Hành</th>
                          </tr>
                        </thead>
                        <tbody>
                          {productData.data.map((product) => (
                            <tr key={product.id}>
                              <td>{product?.id}</td>
                              <td>{product?.invoiceCreatorCode}</td>
                              <td>{product?.invoiceCreatorName}</td>
                              <td>{new Date(product?.invoiceCreationDate).toLocaleDateString()}</td>
                              <td>{product?.data.productId}</td>
                              <td>{product?.data.ime}</td>
                              <td>
                                {product?.data.repair
                                  ? "Tính Phí"
                                  : "Không Tính Phí"}
                              </td>
                              <td>{product?.data.price}</td>
                              <td>{product.guaranteeCode}</td>
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

export default WarrantyBillList;
