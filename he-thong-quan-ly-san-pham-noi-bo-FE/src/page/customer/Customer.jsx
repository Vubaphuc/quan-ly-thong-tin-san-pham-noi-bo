import React from "react";
import { Link } from "react-router-dom";

function Customer() {
  return (
    <>
      <div className="khach-wrapper-container">
        <nav className="d-flex justify-content-end align-items-center px-3">
          <div className="dropdown">
            <a
              className="btn btn-secondary dropdown-toggle"
              href="#"
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Xin Chào
            </a>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li>
                <a className="dropdown-item" href="#"></a>
              </li>
              <li>
                <Link to={"/login"} className="button">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <section className="container clearfix nav-bh">
        <div className="search-warranty">
          <div className="search-warranty-content">
            <h1 className="search-warranty-content__title">Tra cứu bảo hành</h1>
            <div className="tra-cuu-bh">
              <div className="v2-error"></div>
            </div>
            <div className="search-warranty-content__main v2-search">
              <form onSubmit={"/"}>
                <input type="hidden" name="_token" />
                <div className="v2-search-item">
                  <input
                    type="text"
                    name="phone"
                    className="v2-search-item__phone"
                    placeholder="Nhập số điện thoại..."
                  />
                </div>
                <div className="v2-search-item">
                  <input
                    type="text"
                    name="imei"
                    className="v2-search-item__imei"
                    placeholder="Nhập IMEI..."
                  />
                </div>

                <div className="v2-search-button">
                  <button
                    type="submit"
                    className="v2-search-submit v2-button-default v2-color-primary"
                  >
                    Tìm kiếm
                  </button>
                </div>
              </form>
            </div>
            <div className="v2-banner-search">
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-body">
                      <table className="table table-bordered table-hover">
                        <thead>
                          <tr>
                            <th>ID Danh Mục</th>
                            <th>Tên Danh Mục</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <Link to={"/"}></Link>
                            </td>
                            <td>
                              <Link to={"/"}></Link>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div
                        className="d-flex justify-content-center mt-3"
                        id="pagination"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <div className="container">
          <div className="footer-top">
            <div className="footer-top-item">
              <div className="title">
                <div className="all-icon icon-location"></div>
                Hệ thống cửa hàng
              </div>
              <div className="footer-top-content">
                <div className="address-group">
                  <div className="address-group-title">Hà Nội</div>
                  <div className="address-group-main">
                    <div className="address-group-item">
                      <address>
                        120 Thái Hà, Q. Đống Đa
                        <a href="#" target="_blank" rel="nofollow">
                          Xem bản đồ
                        </a>
                      </address>
                      <p>
                        Điện thoại: <a href="#">0969.120.120</a>-
                        <a href="#">037.437.9999</a>
                      </p>
                    </div>
                    <div className="address-group-item">
                      <address>
                        398 Cầu Giấy, Q. Cầu Giấy
                        <a href="#" target="_blank" rel="nofollow">
                          Xem bản đồ
                        </a>
                      </address>
                      <p>
                        Điện thoại: <a href="#">096.1111.398</a>-
                        <a href="#">037.437.9999</a>
                      </p>
                    </div>
                    <div className="address-group-item">
                      <address>
                        42 Phố Vọng, Hai Bà Trưng
                        <a href="#" target="_blank" rel="nofollow">
                          Xem bản đồ
                        </a>
                      </address>
                      <p>
                        Điện thoại: <a href="#">0979.884242</a>-
                        <a href="#">037.437.9999</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-top-item">
              <div className="title">
                <div className="all-icon icon-policy"></div>
                quy định - chính sách
              </div>
              <div className="footer-top-content">
                <ul className="footer-list">
                  <li>
                    <a href="#" target="_blank" rel="nofollow">
                      Chính sách bảo hành
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_blank" rel="nofollow">
                      Chính sách vận chuyển
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_blank" rel="nofollow">
                      Chính sách đổi trả hàng
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_blank" rel="nofollow">
                      Chính sách bảo mật thông tin
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_blank" rel="nofollow">
                      Hướng dẫn thanh toán
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_blank" rel="nofollow">
                      Hướng dẫn mua hàng Online
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_blank" rel="nofollow">
                      Dịch vụ Ship COD Toàn quốc
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_blank" rel="nofollow">
                      Chính sách đại lý linh, phụ kiện
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="footer-top-item">
              <div className="title">
                <div className="all-icon icon-email"></div>
                Đăng ký nhận bảng tin
              </div>
              <form>
                <div className="footer-top-content">
                  <div className="subscribe-form">
                    <input
                      type="text"
                      id="subscribe-email"
                      placeholder="Nhập email của bạn..."
                    />
                    <button
                      type="submit"
                      id="subscribe-btn"
                      className="btn_nhan"
                    >
                      Gửi
                    </button>
                  </div>
                </div>
              </form>
              <div className="title">
                <div className="all-icon icon-connect"></div>
                Liên kết
              </div>
              <div className="footer-top-content">
                <div className="connect-content">
                  <div className="connect-content-item">
                    <a target="_blank" href="#" rel="nofollow">
                      <img
                        src="https://cdn.mobilecity.vn/mobilecity-vn/images/2023/04/facebook-logo-25.png"
                        alt="hình ảnh mạng xã hội"
                      />
                      <span>Facebook</span>
                    </a>
                  </div>
                  <div className="connect-content-item">
                    <a target="_blank" href="#" rel="nofollow">
                      <img
                        src="https://cdn.mobilecity.vn/mobilecity-vn/images/2023/04/youtube-logo-25.png"
                        alt="hình ảnh mạng xã hội"
                      />
                      <span>Youtube</span>
                    </a>
                  </div>
                  <div className="connect-content-item">
                    <a target="_blank" href="#" rel="nofollow">
                      <img
                        src="https://cdn.mobilecity.vn/mobilecity-vn/images/2023/04/zalo-logo-25.png"
                        alt="hình ảnh mạng xã hội"
                      />
                      <span>OA Zalo</span>
                    </a>
                  </div>
                  <div className="connect-content-item">
                    <a target="_blank" href="#" rel="nofollow">
                      <img
                        src="https://cdn.mobilecity.vn/mobilecity-vn/images/2023/04/instagram-logo-25.png"
                        alt="hình ảnh mạng xã hội"
                      />
                      <span>Instagram</span>
                    </a>
                  </div>
                  <div className="connect-content-item">
                    <a target="_blank" href="#" rel="nofollow">
                      <img
                        src="https://cdn.mobilecity.vn/mobilecity-vn/images/2023/04/tiktok-logo-25.png"
                        alt="hình ảnh mạng xã hội"
                      />
                      <span>Tiktok</span>
                    </a>
                  </div>
                  <div className="connect-content-item">
                    <a target="_blank" href="#" rel="nofollow">
                      <img
                        src="https://cdn.mobilecity.vn/mobilecity-vn/images/2023/04/twitter-logo-25.png"
                        alt="hình ảnh mạng xã hội"
                      />
                      <span>Twitter</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-top-item">
              <div className="footer-top-content">
                <div className="icon-footer">
                  <div className="all-icon icon-norton"></div>
                  <div className="all-icon icon-notification"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Customer;
