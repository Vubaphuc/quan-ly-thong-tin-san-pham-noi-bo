import React, { useState } from "react";
import { useEffect } from "react";
import { useFindExportMaterialAllQuery, useFindListTotalQuantityExportMaterialByMaterialCodeQuery, useLazyFindTotalPriceProductFinishQuery, useTotalPriceAndQuantityMaterialQuery } from "../../../app/apis/admin/statistical/statisticalApi";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { exportToCSV } from "../../formHTML/excelUtils";

function MaterialPage() {
    const [pageEx, setPageEx] = useState(0);

    const [getTotalPriceFinish, { data: totalPriceFinishData, isLoading: totalPriceFinishLoading }] = useLazyFindTotalPriceProductFinishQuery();
    const { data: ExportMaterialData } = useFindExportMaterialAllQuery({ page: pageEx + 1, pageSize: 5 });
    const { data: totalData } = useTotalPriceAndQuantityMaterialQuery();
    const { data: listTotalQuantity } = useFindListTotalQuantityExportMaterialByMaterialCodeQuery({ page: 1, pageSize: 5 });

    useEffect(() => {
        getTotalPriceFinish()
    }, [])

    if (totalPriceFinishLoading) {
        return <h2>Loading...</h2>
    }

    console.log(totalData)


    const labels = ["Tài", "Quang"];
    const ok = [17, 18]
    const pending = [1, 2]



    const handlePageClickOK = (page) => {

    }

    const handlePageClickExportMaterila = (page) => {

    }

    const exportToExcelExportMaterial = () => {
        if (ExportMaterialData && ExportMaterialData.data.length > 0) {
            const csvData = ExportMaterialData.data.map((material) => ({
                "ID Vật Liệu": material.id,
                "Mã Vật Liệu": material.code,
                "Tên Model": material.nameModel,
                "Số Lượng Nhập": material.importQuantity,
                "Số Lượng Xuất": material.exportQuantity,
                "Số Lượng Còn Lại": material.remainingQuantity,
                "Ngày Tạo": material.createDate ? new Date(material.createDate).toLocaleDateString() : "",
                "Ngày Cập Nhật mới nhất": material.updateDate ? new Date(material.updateDate).toLocaleDateString() : "",
                "Giá Tiền": material.price,
                "ID Vendor": material.vendor.id,
                "Tên Vendor": material.vendor.name,
                "Loại Linh Kiện": material.components.name,
                "Thời Gian Bảo Hành": material.components.warrantyPeriod
            }));

            exportToCSV(csvData, "Material.xlsx");
        }
    };

    const exportToExcelExportMaterialByCode = () => {

        if (listTotalQuantity && listTotalQuantity.data.length > 0) {
            const csvData = listTotalQuantity.data.map((material) => ({
                "Mã Vật Liệu": material.materialCode,
                "Loại Linh Kiện": material.componentName,
                "Tổng Số lượng Export": material.totalQuantityExport,
                "Tình Trạng": "Đã Hoàn Thành",
            }));

            exportToCSV(csvData, "MaterialByCode.xlsx");
        }
    }


    return (
        <>

            <div className="tk">
                <div className="tk-ct d-flex align-items-center justify-content-between p-4">
                    <i className="fa fa-chart-line fa-3x tk-ct-icon"></i>
                    <div className="ms-3 tk-ct-text">
                        <p className="mb-2">Import Quantity</p>
                        <h6 className="mb-0">{totalData?.totalImportQuantity}</h6>
                    </div>
                </div>
                <div className="tk-ct d-flex align-items-center justify-content-between p-4">
                    <i className="fa fa-chart-line fa-3x tk-ct-icon"></i>
                    <div className="ms-3 tk-ct-text">
                        <p className="mb-2">Import Price</p>
                        <h6 className="mb-0">{totalData?.totalImportPrice?.toLocaleString('vi-VN') + " VND"}</h6>
                    </div>
                </div>
                <div className="tk-ct d-flex align-items-center justify-content-between p-4">
                    <i className="fa fa-chart-bar fa-3x tk-ct-icon"></i>
                    <div className="ms-3 tk-ct-text">
                        <p className="mb-2">Total Export Quantity</p>
                        <h6 className="mb-0">{totalData?.totalExportQuantity}</h6>
                    </div>
                </div>
                <div className="tk-ct d-flex align-items-center justify-content-between p-4">
                    <i className="fa fa-chart-bar fa-3x tk-ct-icon"></i>
                    <div className="ms-3 tk-ct-text">
                        <p className="mb-2">Export Price</p>
                        <h6 className="mb-0">{totalData?.totalExportPrice?.toLocaleString('vi-VN') + " VND"}</h6>
                    </div>
                </div>
            </div>

            <div className="tk">
                <div className="tk-ct d-flex align-items-center justify-content-between p-4">
                    <i className="fa fa-chart-pie fa-3x tk-ct-icon"></i>
                    <div className="ms-3 tk-ct-text">
                        <p className="mb-2">Month Export Quantity</p>
                        <h6 className="mb-0">{totalData?.totalMonthExportQuantity}</h6>
                    </div>
                </div>
                <div className="tk-ct d-flex align-items-center justify-content-between p-4">
                    <i className="fa fa-chart-area fa-3x tk-ct-icon"></i>
                    <div className="ms-3 tk-ct-text">
                        <p className="mb-2">Month Export Price</p>
                        <h6 className="mb-0">{totalData?.totalMonthExportPrice?.toLocaleString('vi-VN') + " VND"}</h6>
                    </div>
                </div>
                <div className="tk-ct d-flex align-items-center justify-content-between p-4">
                    <i className="fa fa-chart-area fa-3x tk-ct-icon"></i>
                    <div className="ms-3 tk-ct-text">
                        <p className="mb-2">Today Export Quantity</p>
                        <h6 className="mb-0">{totalData?.totalToDayExportQuantity}</h6>
                    </div>
                </div>
                <div className="tk-ct d-flex align-items-center justify-content-between p-4">
                    <i className="fa fa-chart-pie fa-3x tk-ct-icon"></i>
                    <div className="ms-3 tk-ct-text">
                        <p className="mb-2">Today Export Price</p>
                        <h6 className="mb-0">{totalData?.totalTodayExportPrice?.toLocaleString('vi-VN') + " VND"}</h6>
                    </div>
                </div>
            </div>

            <div className="pt-4 px-4">
                <div className="text-center rounded p-4 table-table">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <h6 className="mb-0">Danh Sách Export Vật liệu theo từng mã Vật liệu</h6>
                        <div><button className="btn btn-warning px-4" variant="warning" onClick={exportToExcelExportMaterialByCode}>Export</button></div>
                    </div>
                    {listTotalQuantity && listTotalQuantity.data.length > 0 ? (
                        <div className="table-responsive">
                            <table className="table text-start align-middle table-bordered table-hover mb-0">
                                <thead>
                                    <tr className="text-white">
                                        <th scope="col">Mã Vật Liệu</th>
                                        <th scope="col">Loại Linh Kiện</th>
                                        <th scope="col">Tổng số Lượng</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {listTotalQuantity.data.map((material, index) => (
                                        <tr key={index}>
                                            <td>{material.materialCode}</td>
                                            <td>{material.componentName}</td>
                                            <td>{material.totalQuantityExport}</td>
                                            <td>Đã Hoàn Thành</td>
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
                                    pageCount={listTotalQuantity?.totalPages}
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
                        <p>Không có Thông tin nào!!!</p>
                    )}
                </div>
            </div>
            <div className="pt-4 px-4">
                <div className="text-center rounded p-4 table-table">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <h6 className="mb-0">Danh Sách export Material</h6>
                        <div><button className="btn btn-warning px-4" variant="warning" onClick={exportToExcelExportMaterial}>Export</button></div>
                    </div>
                    {ExportMaterialData && ExportMaterialData.data.length > 0 ? (
                        <div className="table-responsive">
                            <table className="table text-start align-middle table-bordered table-hover mb-0">
                                <thead>
                                    <tr className="text-white">
                                        <th scope="col">Date</th>
                                        <th scope="col">Mã Vật Liệu</th>
                                        <th scope="col">Số Lượng Nhập</th>
                                        <th scope="col">Số Lượng Xuất Name</th>
                                        <th scope="col">Số Lượng Còn</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {ExportMaterialData.data.map((material, index) => (
                                        <tr key={index}>
                                            <td>{material.updateDate ? new Date(material.updateDate).toLocaleDateString() : new Date(material.createDate).toLocaleDateString()}</td>
                                            <td>{material.code}</td>
                                            <td>{material.importQuantity}</td>
                                            <td>{material.exportQuantity}</td>
                                            <td>{material.remainingQuantity}</td>
                                            <td>{material.remainingQuantity === 0 ? "Hết Hàng" : "Còn Hàng"}</td>
                                            <td><Link to={`/admin/material/${material.id}`} className="btn btn-sm btn-primary" href="">Detail</Link></td>
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
                                    onPageChange={handlePageClickExportMaterila}
                                    pageRangeDisplayed={3}
                                    marginPagesDisplayed={2}
                                    pageCount={ExportMaterialData?.totalPages}
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
                        <p>Không có Export Material nào!!!</p>
                    )}
                </div>
            </div>
            <div className="footer">
            </div>



        </>
    )
}

export default MaterialPage;