import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { useGetListMaterialByQuantityQuery } from "../../../app/apis/engineer/engineerApi";

function EngiMaterialList() {
  const [page, setPage] = useState(0);

  const { data: MaterialData, isLoading: materialLoading } = useGetListMaterialByQuantityQuery({page: page + 1, pageSize: 10});

  if (materialLoading) {
    return <h2>Loading...</h2>
  }

  console.log(MaterialData)

  const handlePageClick = (page) => {
    setPage(page.selected)
  };

  return (
    <>
    <div>
      {MaterialData && MaterialData.data.length > 0 ? (
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
                        <th>STT</th>
                        <th>Mã Vật Liệu</th>
                        <th>Tên Model</th>
                        <th>Loại Linh Kiện</th>
                        <th>Số Lượng</th>
                      </tr>
                    </thead>
                    <tbody>
                      {MaterialData.data.map((material) => (
                      <tr key={material?.materialId}>
                        <td>{material?.materialId}</td>
                        <td>
                          <Link
                            to={`/employee/engineer/order/create/${material.materialId}`}
                            className="text-decoration-none"
                          >
                            {material?.materialCode}
                          </Link>
                        </td>
                        <td>{material?.nameModel}</td>
                        <td>{material?.componentName}</td>
                        <td>{material?.quantity}</td>
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
                      pageCount={1}
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
      ) : (
        <p>Không có Vật Liệu nào trong kho !!!</p>
      )}
      </div>
    </>
  );
}

export default EngiMaterialList;
