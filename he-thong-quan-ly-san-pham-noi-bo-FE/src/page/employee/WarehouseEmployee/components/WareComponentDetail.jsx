import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetComponentsByIdQuery } from "../../../../app/apis/warehouseEmployee/warehouseEmployeeApi";

function WareComponentDetail() {

  const { componentId } = useParams();

  const { data: componentData, isLoading: componentLoading } = useGetComponentsByIdQuery(componentId);

  if (componentLoading) {
    return <h2>Loading...</h2>
  }

  console.log(componentData)

  return (
    <>
      <section className="content">
        <div className="container-fluid">
          <div className="row py-2">
            <div className="col-6">
              <Link to={"/employee/warehouse/components"} className="btn btn-default">
                <i className="fas fa-chevron-left"></i> Quay lại
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="table-sp-kh">
                    <div className="col-md-5">
                      <h4 className="mb-4">Thông Tin Vật Liệu</h4>
                      <div className="form-group">
                        <label>Mã Linh Kiện</label>
                        <input
                          type="text"
                          className="form-control"
                          id="hang-san-pham"
                          defaultValue={componentData?.componentId}
                          disabled
                        />
                      </div>
                      <div className="form-group">
                        <label>Loại Linh Kiện</label>
                        <input
                          type="text"
                          className="form-control"
                          id="model"
                          defaultValue={componentData?.componentName}
                          disabled
                        />
                      </div>
                      <div className="form-group">
                        <label>Thời hạn bảo hành</label>
                        <input
                          type="text"
                          className="form-control"
                          id="so-IME"
                          defaultValue={componentData?.warrantyPeriod}
                          disabled
                        />
                      </div>
                    </div>
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

export default WareComponentDetail;
