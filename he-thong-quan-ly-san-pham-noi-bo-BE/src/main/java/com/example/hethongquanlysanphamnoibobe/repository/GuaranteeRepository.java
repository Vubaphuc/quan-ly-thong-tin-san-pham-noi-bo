package com.example.hethongquanlysanphamnoibobe.repository;

import com.example.hethongquanlysanphamnoibobe.dto.GuaranteeDto;
import com.example.hethongquanlysanphamnoibobe.dto.projection.GuaranteeProjection;
import com.example.hethongquanlysanphamnoibobe.entity.Guarantee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.Optional;

public interface GuaranteeRepository extends JpaRepository<Guarantee, Integer> {


    // khu vực nhân viên chung
    // ###################################################################################################
    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.GuaranteeDto" +
            "(g.id, g.guaranteeCode, g.activationDate, g.expirationDate, g.status, u.employeeCode, u.employeeName, p.id, p.nameModel, p.phoneCompany, p.IME ) " +
            "from Guarantee g " +
            "join g.activationEmployee u " +
            "join g.product p " +
            "where (p.IME like %?1% or g.guaranteeCode like %?1% )" +
            "order by g.expirationDate desc ")
    Page<GuaranteeDto> findGuaranteeAll(Pageable pageable, String term);

    @Query("select g from Guarantee g where g.guaranteeCode = ?1 ")
    Optional<GuaranteeProjection> searchGuaranteeByGuaranteeCode(String code);


    // khu vực nhân viên lễ tân
    // ###################################################################################################



    // khu vực nhân viên sửa chữa
    // ###################################################################################################

    // khu vực nhân viên kho
    // ###################################################################################################

    // khu vực nhân viên bảo hành
    // ###################################################################################################

    // khu vực ADMIN
    // ###################################################################################################


}