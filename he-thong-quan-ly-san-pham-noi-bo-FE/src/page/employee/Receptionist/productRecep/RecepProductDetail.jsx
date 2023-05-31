import React from "react";
import { Link, useParams } from "react-router-dom";

function RecepProductDetail() {

    const { productId } = useParams();


  return (
    <>
      <section className="content">
        <div className="container-fluid">
          <form>
            <div className="row py-2">
              <div className="col-6">
                <Link
                  to={"/employee/receptionist"}
                  className="btn btn-default"
                >
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
                        <h4 className="mb-4">Thông Tin Sản Phẩm</h4>
                        <div className="form-group">
                          <label>Hãng Sản Phẩm</label>
                          <input
                            type="text"
                            className="form-control"
                            id="hangSanPham"
                          />
                        </div>
                        <div className="form-group">
                          <label>Model</label>
                          <input
                            type="text"
                            className="form-control"
                            id="model"
                          />
                        </div>
                        <div className="form-group">
                          <label>Số IME</label>
                          <input
                            type="text"
                            className="form-control"
                            id="so-IME"
                          />
                        </div>
                        <div className="form-group">
                          <label>Mổ Tả Lỗi</label>
                          <input
                            type="text"
                            className="form-control"
                            id="ten-loi"
                          />
                        </div>
                        <div className="form-group">
                          <label>Trạng Thái</label>
                          <input
                            type="text"
                            className="form-control"
                            id="trang-thai"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default RecepProductDetail;
