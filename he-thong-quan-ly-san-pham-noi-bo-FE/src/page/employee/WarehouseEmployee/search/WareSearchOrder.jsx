import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { useSearchOrderMaterialByTermQuery } from "../../../../app/apis/warehouseEmployee/approverOrderMaterialApi";

function WareSearchOrder() {

    const [term, setTerm] = useState("");
    const [page, setPage] = useState(0);
  
    const { data: orderData, isLoading: orderLoading } = useSearchOrderMaterialByTermQuery({page: page + 1, pageSize: 10, term: term});
  
    if (orderLoading) {
      return <h2>Loading...</h2>
    }
  
    console.log(orderData)
  
    const handleOnChane = (e) => {
      setTerm(e.target.value);
    };
  
    const handlePageClick = (page) => {
      setPage(page.selected);
    }
  

  return (
    <>
      <div className="search-container">
        <input
          className="input-search"
          type="text"
          placeholder="Tìm kiếm..."
          value={term}
          onChange={handleOnChane}
        />
        <div className="search-results mt-3">
          {term !== "" && (
            <div>
              <table className="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>Mã Order</th>
                    <th>Mã Vật Liệu</th>
                    <th>Tên Model</th>
                    <th>Loại Linh Kiện</th>
                    <th>Vendor</th>
                    <th>Số Lượng</th>
                    <th>Trạng Thái</th>
                    <th>Mã Nhân Viên Order</th>
                    <th>Tên Nhân Viên Order</th>
                    <th>Ngày Order</th>
                    <th>Mã Nhân Viên Phê Duyệt</th>
                    <th>Tên Nhân Viên Phê Duyệt</th>
                    <th>Ngày Phê Duyệt</th>
                  </tr>
                </thead>
                <tbody>
                  {orderData &&
                    orderData?.data.map((order) => (
                      <tr key={order.id}>
                        <td>{order.orderCode ? order.orderCode : ""}</td>
                        <td>{order.materialCode ? order.materialCode : ""}</td>
                        <td>{order.nameModel ? order.nameModel : ""}</td>
                        <td>{order.componentName ? order.componentName : ""}</td>
                        <td>{order.nameVendor ? order.nameVendor : ""}</td>
                        <td>{order.quantity ? order.quantity : ""}</td>
                        <td>{order?.status === true ? "OK" : "PENDING"}</td>
                        <td>
                          {order.ordererCode ? order.ordererCode : ""}
                        </td>
                        <td>
                          {order.ordererName
                            ? order.ordererName
                            : ""}
                        </td>
                        <td>
                          {order.createDate
                            ? new Date(order.createDate).toLocaleDateString()
                            : ""}
                        </td>
                        <td>
                          {order.approverCode
                            ? order.approverCode
                            : ""}
                        </td>
                        <td>
                          {order.approverName
                            ? order.approverName
                            : ""}
                        </td>
                        <td>
                          {order.approvalDate
                            ? new Date(order.approvalDate).toLocaleDateString()
                            : ""}
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
                  pageCount={orderData?.totalPages}
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
          )}
          {term === "" && <p>Không có kết quả tìm kiếm nào !!!</p>}
        </div>
      </div>
    </>
  );
}

export default WareSearchOrder;
