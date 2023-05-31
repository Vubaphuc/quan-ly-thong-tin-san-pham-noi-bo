package com.example.hethongquanlysanphamnoibobe.repository;

import com.example.hethongquanlysanphamnoibobe.entity.UsedCodes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsedCodesRepository extends JpaRepository<UsedCodes, Integer> {
    boolean existsByCode(String code);

    // khu vực nhân viên chung
    // ###################################################################################################


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