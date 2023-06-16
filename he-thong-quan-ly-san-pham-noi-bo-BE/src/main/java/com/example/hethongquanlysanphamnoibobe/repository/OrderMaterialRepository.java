package com.example.hethongquanlysanphamnoibobe.repository;

import com.example.hethongquanlysanphamnoibobe.dto.dto.HistoryOrderMaterialDto;
import com.example.hethongquanlysanphamnoibobe.dto.dto.OrderMaterialDto;
import com.example.hethongquanlysanphamnoibobe.dto.dto.OrderMaterialInfo;
import com.example.hethongquanlysanphamnoibobe.dto.projection.OrderMaterialProjection;
import com.example.hethongquanlysanphamnoibobe.entity.OrderMaterial;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface OrderMaterialRepository extends JpaRepository<OrderMaterial, Integer> {

    // khu vực nhân viên chung
    // ###################################################################################################

    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.dto.OrderMaterialDto" +
            "(odm.id, odm.orderCode, m.code, m.nameModel, cp.name, odm.quantity, u.employeeCode, u.employeeName, odm.isStatus) " +
            "from OrderMaterial odm " +
            "left join Components cp on cp.id = odm.components.id " +
            "left join Material m on m.id = odm.material.id " +
            "left join User u on u.id = odm.orderer.id " +
            "where odm.id = ?1 and odm.isDelete = true ")
    Optional<OrderMaterialDto> getOrderMaterialById(Integer id);


    // khu vực nhân viên lễ tân
    // ###################################################################################################

    // khu vực nhân viên sửa chữa
    // ###################################################################################################


    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.dto.OrderMaterialDto" +
            "(odm.id, odm.orderCode, m.code, m.nameModel, cp.name, odm.quantity, u.employeeCode, u.employeeName, odm.isStatus) " +
            "from OrderMaterial odm " +
            "left join Components cp on cp.id = odm.components.id " +
            "left join Material m on m.id = odm.material.id " +
            "left join User u on u.id = odm.orderer.id " +
            "where odm.isStatus = true and odm.isDelete = true and odm.orderer.id = ?1 ")
    Page<OrderMaterialDto> getListOrderMaterialByStatusTrue(Pageable pageable, Integer id);

    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.dto.OrderMaterialDto" +
            "(odm.id, odm.orderCode, m.code, m.nameModel, cp.name, odm.quantity, u.employeeCode, u.employeeName, odm.isStatus) " +
            "from OrderMaterial odm " +
            "left join Components cp on cp.id = odm.components.id " +
            "left join Material m on m.id = odm.material.id " +
            "left join User u on u.id = odm.orderer.id " +
            "where odm.isStatus = false and odm.isDelete = true and odm.orderer.id = ?1 ")
    Page<OrderMaterialDto> getListOrderMaterialByStatusFalse(Pageable pageable, Integer id);

    // khu vực nhân viên kho
    // ###################################################################################################

    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.dto.OrderMaterialDto" +
            "(odm.id, odm.orderCode, m.code, m.nameModel, cp.name, odm.quantity, u.employeeCode, u.employeeName, odm.isStatus) " +
            "from OrderMaterial odm " +
            "left join Components cp on cp.id = odm.components.id " +
            "left join Material m on m.id = odm.material.id " +
            "left join User u on u.id = odm.orderer.id " +
            "where odm.isStatus = false and odm.isDelete = true ")
    Page<OrderMaterialDto> getListOrderMaterialStatusFalse(Pageable pageable);

    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.dto.OrderMaterialDto" +
            "(odm.id, odm.orderCode, m.code, m.nameModel, cp.name, odm.quantity, u.employeeCode, u.employeeName, odm.isStatus) " +
            "from OrderMaterial odm " +
            "left join Components cp on cp.id = odm.components.id " +
            "left join Material m on m.id = odm.material.id " +
            "left join User u on u.id = odm.orderer.id " +
            "left join User u2 on u2.id = odm.approver.id " +
            "where odm.isStatus= true and odm.approver.id = ?1 and odm.isDelete = true ")
    Page<OrderMaterialDto> getListOrderMaterialStatusTrue(Pageable pageable, Integer id);

    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.dto.HistoryOrderMaterialDto" +
            "(odm.id, " +
            "odm.orderCode, " +
            "m.code," +
            "m.nameModel, " +
            "cp.name, " +
            "odm.quantity, " +
            "u1.employeeCode, " +
            "u1.employeeName," +
            "odm.createDate, " +
            "u2.employeeCode, " +
            "u2.employeeName, " +
            "odm.approvalDate, " +
            "odm.isStatus) " +
            "from OrderMaterial odm " +
            "left join Components cp on cp.id = odm.components.id " +
            "left join Material m on m.id = odm.material.id " +
            "left join User u1 on u1.id = odm.orderer.id " +
            "left join User u2 on u2.id = odm.approver.id " +
            "left join Vendor vd on vd.id = m.vendor.id " +
            "where odm.orderCode like %?1% and odm.isDelete = true ")
    Page<HistoryOrderMaterialDto> searchOrderMaterialByTerm(Pageable pageable, String term);





    // khu vực nhân viên bảo hành
    // ###################################################################################################

    // khu vực ADMIN
    // ###################################################################################################

    @Query("select od from OrderMaterial od where od.isDelete = false and od.orderCode like %?1% ")
    Page<OrderMaterialProjection> findOrderMaterialsAll(Pageable pageable, String term);

    @Query("select od from OrderMaterial od where od.isDelete = true and od.orderCode like %?1% ")
    Page<OrderMaterialProjection> findOrderMaterialsIsDeleteTrueAll(Pageable pageable, String term);

    @Query("select od from OrderMaterial od where od.id = ?1 ")
    Optional<OrderMaterialProjection> findOrderMaterialById(Integer id);

    @Modifying
    @Query("delete from OrderMaterial od where od.id = ?1 ")
    void deleteById(Integer id);


    // tổng số tiền vật liệu order ngày hôm nay
    @Query("select coalesce(sum(od.quantity * m.price), 0) from OrderMaterial od join od.material m where od.isStatus = true and function('DATE', od.approvalDate) = current_date ")
    long totalPriceMaterialOrderToday();

    // tổng số tiền vật liệu đã order theo tháng
    @Query("select coalesce(sum(od.quantity * m.price), 0) from OrderMaterial od join od.material m where month(od.approvalDate) = month(current_date) and year(od.approvalDate) = year(current_date) and od.isStatus = true ")
    long totalPriceMaterialOrderThisMonth();

    // tổng số lượng đã export material trong ngày hôm nay
    @Query("select coalesce(sum(od.quantity), 0) from OrderMaterial od where od.isStatus = true and function('DATE', od.approvalDate) = current_date ")
    long totalQuantityExportMaterialToday();
    // tổng số lượng material đã order trong tháng này
    @Query("select coalesce(sum(od.quantity), 0) from OrderMaterial od where od.isStatus = true and month(od.approvalDate) = month(current_date) ")
    long totalQuantityExportMaterialThisMonth();
    // danh sách tổng số lượng export material theo mã vật liệu
    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.dto.OrderMaterialInfo" +
            "(m.code, cp.name, coalesce(sum(od.quantity), 0)) from OrderMaterial od " +
            "join od.material m " +
            "join od.components cp " +
            "where od.isStatus = true " +
            "group by m.code, cp.name ")
    Page<OrderMaterialInfo> findListTotalQuantityExportMaterialByMaterialCode(Pageable pageable);
}