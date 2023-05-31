import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { useSearchHistoryProductByTermQuery } from "../../../app/apis/receptionist/productApi";

function RecepSearchHistoryProduct() {
  const [term, setTerm] = useState("");
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);

  const { data: historyData, isLoading: historyLoading } =
    useSearchHistoryProductByTermQuery({
      page: page + 1,
      pageSize: 10,
      term: term,
    });

  if (historyLoading) {
    return <h2>Loading...</h2>;
  }

  console.log(historyData);

  const handleSearchTermChange = (e) => {
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
              placeholder="Tìm kiếm sản phẩm..."
              onChange={handleSearchTermChange}
            />
          </div>
          <div className="search-results mt-3">
            {historyData && historyData.data.length > 0 ? (
              <div>
                <table className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>Model</th>
                      <th>Hãng Điện Thoại</th>
                      <th>Số IME</th>
                      <th>Tên Lỗi</th>
                      <th>Trạng Thái</th>
                      <th>Mã Nhân Viên nhận</th>
                      <th>Tên Nhân Viên Nhận</th>
                      <th>Ngày Nhận</th>
                      <th>Vị Trí Sửa</th>
                      <th>Loại Linh Kiện</th>
                      <th>Mã Nhân Viên Sửa Chữa</th>
                      <th>Tên Nhân Viên Sửa Chữa</th>
                      <th>Ngày Hoàn Thành</th>
                      <th>Mã Nhân Viên Trả Sản Phẩm</th>
                      <th>Tên Nhân Viên Trả Sản Phẩm</th>
                      <th>Ngày Trả Sản Phẩm</th>
                      <th>Mã Bảo Hành</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historyData?.data.map((sanPham, index) => (
                      <tr key={sanPham?.id}>
                        <td>{sanPham.nameModel ? sanPham.nameModel : ""}</td>
                        <td>
                          {sanPham.phoneCompany ? sanPham.phoneCompany : ""}
                        </td>
                        <td>{sanPham.ime ? sanPham.ime : ""}</td>
                        <td>{sanPham.defectName ? sanPham?.defectName : ""}</td>
                        <td>{sanPham.status === true ? "OK" : "PENDING"}</td>
                        <td>
                          {sanPham.receptionistCode ? sanPham.receptionistCode : ""}
                        </td>
                        <td>
                          {sanPham.receptionistName
                            ? sanPham.receptionistName
                            : ""}
                        </td>
                        <td>
                          {sanPham.inputDate
                            ? new Date(sanPham.inputDate).toLocaleDateString()
                            : ""}
                        </td>
                        <td>{sanPham.location ? sanPham.location : ""}</td>
                        <td>
                          {sanPham.componentsName ? sanPham.componentsName : ""}
                        </td>
                        <td>
                          {sanPham.engineerCode
                            ? sanPham?.engineerCode
                            : ""}
                        </td>
                        <td>
                          {sanPham.engineerName
                            ? sanPham.engineerName
                            : ""}
                        </td>
                        <td>
                          {sanPham.outputDate
                            ? new Date(
                                sanPham.outputDate
                              ).toLocaleDateString()
                            : " "}
                        </td>
                        <td>
                          {sanPham.maNhanVienTra ? sanPham.maNhanVienTra : ""}
                        </td>
                        <td>
                          {sanPham.fullNameNhanVienTra
                            ? sanPham.fullNameNhanVienTra
                            : ""}
                        </td>
                        <td>
                          {sanPham.ngayTra
                            ? new Date(sanPham.ngayTra).toLocaleDateString()
                            : " "}
                        </td>
                        <td>{sanPham.maBaoHanh ? sanPham.maBaoHanh : ""}</td>
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
                    pageCount={historyData?.totalPages}
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

export default RecepSearchHistoryProduct;
