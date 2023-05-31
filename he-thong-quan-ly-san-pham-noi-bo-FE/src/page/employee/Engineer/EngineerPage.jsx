import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { useLazyGetListProductbyUserQuery } from "../../../app/apis/engineer/engineerApi";

function EngineerPage() {
  const [term, setTerm] = useState("");

  const [getProduct, { data: productData, isLoading: productLoading }] =
    useLazyGetListProductbyUserQuery(); 
  
  useEffect(() => {
    getProduct({
      page: 1,
      pageSize: 10,
      term: term
    })
  },[term])
    
  if (productLoading) {
    return <h2>Loading....</h2>;
  }
  console.log(productData);

  

  const handlePageClick = (page) => {
    console.log(term)
    getProduct({
      page: page.selected + 1,
      pageSize: 10,
      term: term
    })
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
                            <th>Model</th>
                            <th>Hãng Điện Thoại</th>
                            <th>Số IME</th>
                            <th>Tên Lỗi</th>
                            <th>Trạng Thái</th>
                            <th>Loại Sản Phẩm</th>
                          </tr>
                        </thead>
                        <tbody>
                          {productData.data.map((product) => (
                            <tr key={product.productId}>
                              <td>
                                <Link
                                  to={`/employee/engineer/${product.productId}`}
                                  className="text-decoration-none"
                                >
                                  {product?.model}
                                </Link>
                              </td>
                              <td>
                                <Link
                                  to={`/employee/engineer/${product.productId}`}
                                  className="text-decoration-none"
                                >
                                  {product?.phoneCompany}
                                </Link>
                              </td>
                              <td>{product?.ime}</td>
                              <td>{product?.defectName}</td>
                              <td>
                                {product?.status === true ? "OK" : "PENDING"}
                              </td>
                              <td>{product.repair ? "Bảo Hành" : "Mới"}</td>
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

export default EngineerPage;
