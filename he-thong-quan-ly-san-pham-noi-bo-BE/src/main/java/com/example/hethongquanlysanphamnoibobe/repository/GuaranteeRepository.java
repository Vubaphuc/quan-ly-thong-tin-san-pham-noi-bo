package com.example.hethongquanlysanphamnoibobe.repository;

import com.example.hethongquanlysanphamnoibobe.dto.GuaranteeDto;
import com.example.hethongquanlysanphamnoibobe.entity.Guarantee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface GuaranteeRepository extends JpaRepository<Guarantee, Integer> {

    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.GuaranteeDto" +
            "(gt.id, p.id, p.nameModel, p.phoneCompany, p.IME, p.defectName, p.status) from Guarantee gt " +
            "left join Product p on p.id = gt.product.id " +
            "where gt.id = ?1 ")
    Optional<GuaranteeDto> getProducWarrantyById(Integer id);
}