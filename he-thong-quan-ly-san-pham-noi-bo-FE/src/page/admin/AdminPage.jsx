import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import chartBar from "../chartjs/chartBar";
import { useFindProductOKAllsQuery, useFindProductPendingAllsQuery, useLazyFindStatisticsTotalProductTodayQuery, useLazyFindTotalProductByEngineerAllQuery, useLazyFindTotalProductByEngineerYesterdayAllQuery } from "../../app/apis/admin/statistical/statisticalApi";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";



function AdminPage() {

  const [pageOK, setPageOK] = useState(0);
  const [pagePD, setPagePD] = useState(0);


  const [getTotalProduct, { data: totalProductData, isLoading: totalProductLoading }] = useLazyFindStatisticsTotalProductTodayQuery();
  const { data: productOkData } = useFindProductOKAllsQuery({page: pageOK + 1, pageSize: 5});
  const { data: productPendingData } = useFindProductPendingAllsQuery({page: pagePD + 1, pageSize: 5});
  const [getTotalProductEng, { data: productEngiData }] = useLazyFindTotalProductByEngineerAllQuery();
  const [getTotalProductEngYesterDay, { data: productEngiYesterDayData }] = useLazyFindTotalProductByEngineerYesterdayAllQuery();

  useEffect(() => {
    getTotalProduct()  
  },[])
  useEffect(() =>{
    getTotalProductEng()
  },[])
  useEffect(() =>{
    getTotalProductEngYesterDay()
  },[])

  if (totalProductLoading) {
    return <h2>Loading...</h2>
  }

  const totalProduct = totalProductData && totalProductData[0];
  const labels = productEngiData?.map((product) => product.employeeName);
  const ok = productEngiData?.map((product) => product.totalProductOk);
  const pending = productEngiData?.map((product) => product.totalProductPending);

  const labelsYes = productEngiYesterDayData?.map((product) => product.employeeName);
  const okYes = productEngiYesterDayData?.map((product) => product.totalProductOk);
  const pendingYes = productEngiYesterDayData?.map((product) => product.totalProductPending);



  const { data, options } = chartBar(labels, ok, pending);
  const { data: dataYes, options: optionYes } = chartBar(labelsYes, okYes, pendingYes);

  const handlePageClickOK = (page) => {
    setPageOK(page.selected);
  }

  const handlePageClickPending = (page) => {
    setPagePD(page.selected)
  }

  return (
    <>
      <div className="">

        <div className="tk">
          <div className="tk-ct d-flex align-items-center justify-content-between p-4">
            <i className="fa fa-chart-line fa-3x tk-ct-icon"></i>
            <div className="ms-3 tk-ct-text">
              <p className="mb-2">Tổng sản phẩm</p>
              <h6 className="mb-0">{totalProduct?.totalProducts}</h6>
            </div>
          </div>
          <div className="tk-ct d-flex align-items-center justify-content-between p-4">
            <i className="fa fa-chart-bar fa-3x tk-ct-icon"></i>
            <div className="ms-3 tk-ct-text">
              <p className="mb-2">Sản Phẩm Pending</p>
              <h6 className="mb-0">{totalProduct?.totalProductPending}</h6>
            </div>
          </div>
          <div className="tk-ct d-flex align-items-center justify-content-between p-4">
            <i className="fa fa-chart-area fa-3x tk-ct-icon"></i>
            <div className="ms-3 tk-ct-text">
              <p className="mb-2">Sản phẩm OK</p>
              <h6 className="mb-0">{totalProduct?.totalProductsOk}</h6>
            </div>
          </div>
          <div className="tk-ct d-flex align-items-center justify-content-between p-4">
            <i className="fa fa-chart-pie fa-3x tk-ct-icon"></i>
            <div className="ms-3 tk-ct-text">
              <p className="mb-2">Sản Phẩm Mới Today</p>
              <h6 className="mb-0">{totalProduct?.totalProductInput}</h6>
            </div>
          </div>
        </div>


 
        <div className="dt product-dt">
          <div className="dt-tp">
            <div className="text-center p-4">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h6 className="mb-0">Tỷ lệ Sửa Chữa Hôm Nay</h6>
                <a href="">Show All</a>
              </div>
              <Bar options={options} data={data} plugins={[ChartDataLabels]} />;
            </div>
          </div>
          <div className="dt-tp">
            <div className="text-center p-4">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h6 className="mb-0">Tỷ Lệ Sửa Chữa Hôm trước</h6>
                <a href="">Show All</a>
              </div>
              <Bar options={optionYes} data={dataYes} plugins={[ChartDataLabels]} />;
            </div>
          </div>
        </div>


        <div className="pt-4 px-4 table-product">
          <div className="text-center rounded p-4 table-table">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h6 className="mb-0">Danh Sách Sản Phẩm Sữa Chữa Thành Công</h6>
              <a href="">Show All</a>
            </div>
            {productOkData && productOkData.data.length > 0 ? (
            <div className="table-responsive">
              <table className="table text-start align-middle table-bordered table-hover mb-0">
                <thead>
                  <tr className="text-white">
                    <th scope="col">Date</th>
                    <th scope="col">IME</th>
                    <th scope="col">Employee Code</th>
                    <th scope="col">Employee Name</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                {productOkData.data.map((product, index) => (
                <tbody key={index}>                 
                  <tr>
                    <td>{product.outputDate ? new Date(product.outputDate).toLocaleDateString() : new Date(product.inputDate).toLocaleDateString()}</td>
                    <td>{product.ime}</td>
                    <td>{ product.engineer.employeeCode}</td>
                    <td>{product.engineer.employeeName}</td>
                    <td>{product.status ? "OK" : "PENDING"}</td>
                    <td><Link to={`/admin/product/${product.id}`} className="btn btn-sm btn-primary" href="">Detail</Link></td>
                  </tr>
                 
                </tbody>
                 ))}                 
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
                    pageCount={productOkData?.totalPages}
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
              <p>Không có sản phẩm nào!!!</p>
            )}
          </div>
        </div>
        <div className="pt-4 px-4">
          <div className="text-center rounded p-4 table-table">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h6 className="mb-0">Danh Sách Sản Phẩm Sữa Chữa Pending</h6>
              <a href="">Show All</a>
            </div>
            {productPendingData && productPendingData.data.length > 0 ? (
            <div className="table-responsive">
              <table className="table text-start align-middle table-bordered table-hover mb-0">
                <thead>
                  <tr className="text-white">
                    <th scope="col">Date</th>
                    <th scope="col">IME</th>
                    <th scope="col">Employee Code</th>
                    <th scope="col">Employee Name</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                {productPendingData.data.map((product, index) => (
                <tbody key={index}>
                  <tr >
                    <td>{product.outputDate ? new Date(product.outputDate).toLocaleDateString() : new Date(product.inputDate).toLocaleDateString()}</td>
                    <td>{product.ime}</td>
                    <td>{product.engineer ? product.engineer.employeeCode : product.receptionists.employeeCode}</td>
                    <td>{product.engineer ? product.engineer.employeeName : product.receptionists.employeeName}</td>
                    <td>{product.status ? "OK" : "PENDING"}</td>
                    <td><Link to={`/admin/product/${product.id}`} className="btn btn-sm btn-primary" href="">Detail</Link></td>
                  </tr>
                  
                </tbody>
                ))}                 
              </table>
              <div
                  className="d-flex justify-content-center mt-3"
                  id="pagination"
                >
                  <ReactPaginate
                    nextLabel="next >"
                    onPageChange={handlePageClickPending}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={productPendingData?.totalPages}
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
              <p>Không có sản phẩm nào!!!</p>
            )}
          </div>
        </div>
        <div className="footer">
        </div>

      </div>
    </>
  );
}

export default AdminPage;
