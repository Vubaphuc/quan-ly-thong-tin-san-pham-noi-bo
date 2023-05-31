import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { useGetListVendorAllQuery } from "../../../../app/apis/warehouseEmployee/warehouseEmployeeApi";

function WareVendorList() {

    const [page, setPage] = useState(0);

    const { data: vendorData, isLoading: vendorLoading } =
    useGetListVendorAllQuery({page: page + 1, pageSize: 10});


  if (vendorLoading) {
    return <h2>Loading...</h2>;
  }

  console.log(vendorData)
  const handlePageClick = (page) => {
    setPage(page.selected)
  };

  return (
    <>
      <section className="content">
        <div className="container-fluid">
          <div className="row py-2"></div>
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <table className="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th>Mã Vender</th>
                        <th>Tên Vender</th>
                        <th>Số Lượng loại vật liệu</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vendorData?.data &&
                        vendorData?.data.map((vendor) => (
                          <tr key={vendor?.id}>
                            <td>
                              <Link
                                to={`/employee/warehouse/vendor/${vendor.id}`}
                                className="text-decoration-none"
                              >
                                {vendor?.id}
                              </Link>
                            </td>
                            <td>
                              <Link
                                to={`/employee/warehouse/vendor/${vendor.id}`}
                                className="text-decoration-none"
                              >
                                {vendor?.name}
                              </Link>
                            </td>
                            <td>{vendor?.quantityMaterial}</td>
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
                      pageCount={vendorData?.totalPages}
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
        </div>
      </section>
    </>
  );
}

export default WareVendorList;
