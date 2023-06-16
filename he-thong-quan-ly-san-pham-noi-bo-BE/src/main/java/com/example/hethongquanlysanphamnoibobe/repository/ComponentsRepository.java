package com.example.hethongquanlysanphamnoibobe.repository;

import com.example.hethongquanlysanphamnoibobe.dto.dto.ComponentsDto;
import com.example.hethongquanlysanphamnoibobe.entity.Components;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ComponentsRepository extends JpaRepository<Components, Integer> {





    // khu vực nhân viên chung
    // ###################################################################################################

    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.dto.ComponentsDto" +
            "(cp.id, cp.name, cp.warrantyPeriod) " +
            "from Components cp " +
            "where cp.id = ?1")
    Optional<ComponentsDto> getComponentsById(Integer id);


    Optional<Components> findByName(String name);
    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.dto.ComponentsDto " +
            "(cp.id, cp.name, cp.warrantyPeriod ) " +
            "from Components cp ")
    Page<ComponentsDto> getListComponentPhone(Pageable pageable);

    // lấy danh sách component
    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.dto.ComponentsDto" +
            "(cp.id, cp.name, cp.warrantyPeriod) " +
            "from Components cp ")
    List<ComponentsDto> findComponentsAll();


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