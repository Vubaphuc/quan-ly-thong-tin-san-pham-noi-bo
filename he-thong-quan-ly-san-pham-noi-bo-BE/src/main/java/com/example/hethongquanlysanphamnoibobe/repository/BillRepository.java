package com.example.hethongquanlysanphamnoibobe.repository;

import com.example.hethongquanlysanphamnoibobe.dto.dto.BillDto;
import com.example.hethongquanlysanphamnoibobe.dto.dto.BillGuaranteeDto;
import com.example.hethongquanlysanphamnoibobe.entity.Bill;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface BillRepository extends JpaRepository<Bill, Integer> {


    // khu vực nhân viên chung
    // ###################################################################################################

    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.dto.BillDto" +
            "(b.id, p.id, c.fullName, c.phoneNumber, c.email, p.phoneCompany, p.nameModel, p.ime, p.defectName, p.location, cp.name, cp.warrantyPeriod, p.price)" +
            "from Bill b " +
            "left join Product p on p.id = b.product.id " +
            "left join Customer c on c.id = p.customer.id " +
            "left join Components cp on cp.id = p.components.id " +
            "where b.id = ?1 ")
    Optional<BillDto> getBillById(Integer id);


    // khu vực nhân viên lễ tân
    // ###################################################################################################

    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.dto.BillDto" +
            "(b.id, p.id, c.fullName, c.phoneNumber, c.email, p.phoneCompany, p.nameModel, p.ime, p.defectName, p.location, cp.name, cp.warrantyPeriod, p.price) " +
            "from Bill b " +
            "left join Product p on p.id = b.product.id " +
            "left join Customer c on c.id = p.customer.id " +
            "left join Components cp on cp.id = p.components.id " +
            "where c.email like %?1% and c.phoneNumber like %?1% and c.fullName like %?1% ")
    Page<BillDto> getListBillAll(Pageable pageable, String term);



    // khu vực nhân viên sửa chữa
    // ###################################################################################################

    // khu vực nhân viên kho
    // ###################################################################################################

    // khu vực nhân viên bảo hành
    // ###################################################################################################
    @Query("select b.id as id, b.invoiceCreationDate as invoiceCreationDate, b.invoiceCreator.employeeCode as invoiceCreatorCode, b.invoiceCreator.employeeName as invoiceCreatorName," +
            "new com.example.hethongquanlysanphamnoibobe.dto.dto.ProductGuaranteeDto " +
            "(p.id, p.nameModel, p.phoneCompany,p.ime,p.defectName,p.location,p.note,p.components.name,p.price,p.status,p.isRepair) as data, g.guaranteeCode as guaranteeCode " +
            "from Bill b " +
            "join b.product p " +
            "join Guarantee g on g.product.id = p.id " +
            "where p.ime like %:term% ")
    Page<BillGuaranteeDto> findBillProductGuaranteeAll(Pageable pageable, @Param("term") String term);


    // khu vực ADMIN
    // ###################################################################################################

}