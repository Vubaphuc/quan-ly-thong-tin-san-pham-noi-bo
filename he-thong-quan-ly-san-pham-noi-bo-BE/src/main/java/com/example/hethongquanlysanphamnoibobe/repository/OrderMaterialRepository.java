package com.example.hethongquanlysanphamnoibobe.repository;

import com.example.hethongquanlysanphamnoibobe.dto.HistoryOrderMaterialDto;
import com.example.hethongquanlysanphamnoibobe.dto.OrderMaterialDto;
import com.example.hethongquanlysanphamnoibobe.entity.OrderMaterial;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.Optional;

public interface OrderMaterialRepository extends JpaRepository<OrderMaterial, Integer> {

    // khu vực nhân viên chung
    // ###################################################################################################

    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.OrderMaterialDto" +
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


    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.OrderMaterialDto" +
            "(odm.id, odm.orderCode, m.code, m.nameModel, cp.name, odm.quantity, u.employeeCode, u.employeeName, odm.isStatus) " +
            "from OrderMaterial odm " +
            "left join Components cp on cp.id = odm.components.id " +
            "left join Material m on m.id = odm.material.id " +
            "left join User u on u.id = odm.orderer.id " +
            "where odm.isStatus = true and odm.isDelete = true and odm.orderer.id = ?1 ")
    Page<OrderMaterialDto> getListOrderMaterialByStatusTrue(Pageable pageable, Integer id);

    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.OrderMaterialDto" +
            "(odm.id, odm.orderCode, m.code, m.nameModel, cp.name, odm.quantity, u.employeeCode, u.employeeName, odm.isStatus) " +
            "from OrderMaterial odm " +
            "left join Components cp on cp.id = odm.components.id " +
            "left join Material m on m.id = odm.material.id " +
            "left join User u on u.id = odm.orderer.id " +
            "where odm.isStatus = false and odm.isDelete = true and odm.orderer.id = ?1 ")
    Page<OrderMaterialDto> getListOrderMaterialByStatusFalse(Pageable pageable, Integer id);

    // khu vực nhân viên kho
    // ###################################################################################################

    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.OrderMaterialDto" +
            "(odm.id, odm.orderCode, m.code, m.nameModel, cp.name, odm.quantity, u.employeeCode, u.employeeName, odm.isStatus) " +
            "from OrderMaterial odm " +
            "left join Components cp on cp.id = odm.components.id " +
            "left join Material m on m.id = odm.material.id " +
            "left join User u on u.id = odm.orderer.id " +
            "where odm.isStatus = false and odm.isDelete = true ")
    Page<OrderMaterialDto> getListOrderMaterialStatusFalse(Pageable pageable);

    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.OrderMaterialDto" +
            "(odm.id, odm.orderCode, m.code, m.nameModel, cp.name, odm.quantity, u.employeeCode, u.employeeName, odm.isStatus) " +
            "from OrderMaterial odm " +
            "left join Components cp on cp.id = odm.components.id " +
            "left join Material m on m.id = odm.material.id " +
            "left join User u on u.id = odm.orderer.id " +
            "left join User u2 on u2.id = odm.approver.id " +
            "where odm.isStatus= true and odm.approver.id = ?1 and odm.isDelete = true ")
    Page<OrderMaterialDto> getListOrderMaterialStatusTrue(Pageable pageable, Integer id);

    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.HistoryOrderMaterialDto" +
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
}