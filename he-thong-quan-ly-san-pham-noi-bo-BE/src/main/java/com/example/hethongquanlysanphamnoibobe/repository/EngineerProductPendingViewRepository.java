package com.example.hethongquanlysanphamnoibobe.repository;

import com.example.hethongquanlysanphamnoibobe.dto.admin.DanhSachSuaChuaEngineerDto;
import com.example.hethongquanlysanphamnoibobe.entity.EngineerProductPendingView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EngineerProductPendingViewRepository extends JpaRepository<EngineerProductPendingView, Integer> {

    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.admin.DanhSachSuaChuaEngineerDto " +
            "(engP.employeeCode, engP.employeeName, engP.totalProducts, engO.totalProductsOk) " +
            "from EngineerProductPendingView engP " +
            "left join EngineerProductOkTrongNgayView engO on engO.employeeCode = engP.employeeCode ")
    List<DanhSachSuaChuaEngineerDto> findTotalProductEngineerAll();

}