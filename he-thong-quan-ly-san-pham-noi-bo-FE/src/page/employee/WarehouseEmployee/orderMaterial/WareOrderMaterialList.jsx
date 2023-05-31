import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import {
  useGetListOrderMaterialStatusFalseQuery,
  useGetListOrderMaterialStatusTrueQuery,
} from "../../../../app/apis/warehouseEmployee/approverOrderMaterialApi";

function WareOrderMaterialList() {
  const [status, setStatus] = useState("PENDING");
  const [pageOK, setPageOK] = useState(0);
  const [pagePD, setPagePD] = useState(0);
  const [count, setCount] = useState(0);
  const [term, setTerm] = useState("")

  const { data: OrderMaterialDataPD, isLoading: OKLoading } =
    useGetListOrderMaterialStatusFalseQuery({ page: pagePD + 1, pageSize: 10 });

  const { data: OrderMaterialDataOK, isLoading: PDLoading } =
    useGetListOrderMaterialStatusTrueQuery({ page: pageOK + 1, pageSize: 10});

  if (OKLoading || PDLoading) {
    return <h2>Loading....</h2>;
  }

  console.log(OrderMaterialDataOK)

  const handlePageClickOK = (page) => {
    setPageOK(page.selected);
  };

  const handlePageClickPD = (page) => {
    setPagePD(page.selected);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  return (
    <>
      <section className="content">
      <div className="container-fluid">
        <div className="btn-lua-chon">
          <label htmlFor="statusSelect" className="mb-2 mt-3">
            Trạng Thái:
          </label>
          <select
            id="statusSelect"
            className="form-control"
            value={status}
            onChange={handleStatusChange}
          >
            <option value="OK">OK</option>
            <option value="PENDING">PENDING</option>
          </select>
        </div>
        </div>
        <div className="container-fluid">
          {status === "OK" && (
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <div className="search-results mt-3">
                      {OrderMaterialDataOK &&
                      OrderMaterialDataOK?.data.length > 0 ? (
                        <div>
                          <table className="table table-bordered table-hover">
                            <thead>
                              <tr>
                                <th>STT</th>
                                <th>Mã Oder</th>
                                <th>Mã Vật Liệu</th>
                                <th>Tên Model</th>
                                <th>Loại Linh Kiện</th>
                                <th>Số Lượng</th>
                                <th>Mã Nhân Viên Oder</th>
                                <th>Tên Nhân Viên Oder</th>
                                <th>Trạng Thái</th>
                              </tr>
                            </thead>
                            <tbody>
                              {OrderMaterialDataOK.data.map((order) => (
                                <tr key={order.id}>
                                  <td>{order.id}</td>
                                  <td>
                                    <Link
                                      to={`/employee/warehouse/orderMaterial/${order.id}`}
                                      className="text-decoration-none"
                                    >
                                      {order.orderCode}
                                    </Link>
                                  </td>
                                  <td>
                                    <Link
                                      to={`/employee/warehouse/orderMaterial/${order.id}`}
                                      className="text-decoration-none"
                                    >
                                      {order.materialCode}
                                    </Link>
                                  </td>
                                  <td>{order.nameModel}</td>
                                  <td>{order.componentName}</td>
                                  <td>{order.quantity}</td>
                                  <td>{order.ordererCode}</td>
                                  <td>{order.ordererName}</td>
                                  <td>
                                    {order?.status === true
                                      ? "OK"
                                      : "PENDING"}
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
                              onPageChange={handlePageClickOK}
                              pageRangeDisplayed={3}
                              marginPagesDisplayed={2}
                              pageCount={OrderMaterialDataOK?.totalPages}
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
                        <p>Không có Order Material OK nào !!!</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {status === "PENDING" && (
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <div className="search-results mt-3">
                      {OrderMaterialDataPD &&
                      OrderMaterialDataPD?.data.length > 0 ? (
                        <div>
                          <table className="table table-bordered table-hover">
                            <thead>
                              <tr>
                                <th>STT</th>
                                <th>Mã Oder</th>
                                <th>Mã Vật Liệu</th>
                                <th>Tên Model</th>
                                <th>Loại Linh Kiện</th>
                                <th>Số Lượng</th>
                                <th>Mã Nhân Viên Oder</th>
                                <th>Tên Nhân Viên Oder</th>
                                <th>Trạng Thái</th>
                              </tr>
                            </thead>
                            <tbody>
                              {OrderMaterialDataPD.data.map((order) => (
                                <tr key={order.id}>
                                  <td>{order.id}</td>
                                  <td>
                                    <Link
                                      to={`/employee/warehouse/orderMaterial/${order.id}`}
                                      className="text-decoration-none"
                                    >
                                      {order?.orderCode}
                                    </Link>
                                  </td>
                                  <td>
                                    <Link
                                      to={`/employee/warehouse/orderMaterial/${order.id}`}
                                      className="text-decoration-none"
                                    >
                                      {order.materialCode}
                                    </Link>
                                  </td>
                                  <td>{order.nameModel}</td>
                                  <td>{order.componentName}</td>
                                  <td>{order.quantity}</td>
                                  <td>{order.ordererCode}</td>
                                  <td>{order.ordererName}</td>
                                  <td>
                                    {order.status === true
                                      ? "OK"
                                      : "PENDING"}
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
                              onPageChange={handlePageClickPD}
                              pageRangeDisplayed={3}
                              marginPagesDisplayed={2}
                              pageCount={OrderMaterialDataPD?.totalPages}
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
                        <p>Không có Order Material Pending nào !!!</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default WareOrderMaterialList;
