import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { useLazyFindProductAllsQuery } from "../../../app/apis/admin/manage/productManageApi";

function ProductManageList() {
  const [term, setTerm] = useState("");

  const [getProduct, { data: productData, isLoading: productLoading }] = useLazyFindProductAllsQuery();

  useEffect(() => {
    getProduct({
      page: 1,
      pageSize: 10,
      term: term
    })
  }, [term])

  if (productLoading) {
    return <h2>Loading...</h2>
  }

  console.log(productData)


  const handlePageClick = (page) => {

  }


  return (
    <>
      <section className="content">
        <div className="container-fluid">
        <div className="card-body">
          <div className="search-container">
            <input
              className="input-search mb-4"
              type="text"
              placeholder="Tìm kiếm..."
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            />
          </div>
          </div>
          <div className="search-results mt-3">
            {productData && productData.data.length > 0 ? (
              <div className="card-body">
                <table className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>ID Sản Phẩm</th>
                      <th>Tên Model</th>
                      <th>Hãng sản xuất</th>
                      <th>Số IME</th>
                      <th>Tên Lỗi</th>
                      <th>Trạng Thái</th>
                      <th>Giá Tiền</th>
                      <th>Loại Sản phẩm</th>
                      <th>Ngày Input</th>
                      <th>Ngày OutPut</th>
                      <th>Ngày Hoàn Thành</th>
                      <th>Vị Trí Sửa</th>
                      <th>Loại Sửa Chữa</th>
                      <th>Loại Linh kiện</th>
                      <th>Mã Nhân Viên Nhận</th>
                      <th>Tên Nhân Viên Nhận</th>
                      <th>Mã Nhân Viên Sửa Chữa</th>
                      <th>Tên Nhân Viên Sửa Chữa</th>
                      <th>Mã Nhân Viên Trả</th>
                      <th>Tên Nhân Viên Trả</th>
                      <th>Mã Khách Hàng</th>
                      <th>Tên Khách Hàng</th>
                      <th>Số Điện Thoại Khách</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      productData.data.map((product) => (
                        <tr key={product.id}>
                          <td>
                            <Link
                              to={`/admin/product/${product.id}`}
                              className="text-decoration-none"
                            >
                              {product.id}
                            </Link>
                          </td>
                          <td>
                            <Link
                              to={`/admin/product/${product.id}`}
                              className="text-decoration-none"
                            >
                              {product.nameModel}
                            </Link>
                          </td>
                          <th>{product.phoneCompany}</th>
                          <th>{product.ime}</th>
                          <th>{product.defectName}</th>
                          <th>{product.status ? "OK" : "PENDING"}</th>
                          <th>{product.price ? product.price : ""}</th>
                          <th>{product.isRepair ? "Bảo Hành" : "Mới"}</th>
                          <th>{product.inputDate ? new Date(product.inputDate).toLocaleDateString() : ""}</th>
                          <th>{product.outputDate ? new Date(product.outputDate).toLocaleDateString() : ""}</th>
                          <th>{product.finishDate ? new Date(product.finishDate).toLocaleDateString() : ""}</th>
                          <th>{product.location ? product.location : ""}</th>
                          <th>{product.charge ? "Tính Phí" : "Không Tính Phí"}</th>
                          <th>{product.components ? product.components.name : ""}</th>
                          <th>{product.receptionists ? product.receptionists.employeeCode : ""}</th>
                          <th>{product.receptionists ? product.receptionists.employeeName : ""}</th>
                          <th>{product.engineer ? product.engineer.employeeCode : ""}</th>
                          <th>{product.engineer ? product.engineer.employeeName : ""}</th>
                          <th>{product.productPayer ? product.productPayer.employeeCode : ""}</th>
                          <th>{product.productPayer ? product.productPayer.employeeName : ""}</th>
                          <th>{product.customer ? product.customer.id : ""}</th>
                          <th>{product.customer ? product.customer.fullName : ""}</th>
                          <th>{product.customer ? product.customer.phoneNumber : ""}</th>

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
            ) : (
              <p>Không có sản phẩm nào !!!</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductManageList;
