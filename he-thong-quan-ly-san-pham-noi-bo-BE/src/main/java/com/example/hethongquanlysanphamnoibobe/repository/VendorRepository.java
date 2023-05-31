package com.example.hethongquanlysanphamnoibobe.repository;

import com.example.hethongquanlysanphamnoibobe.dto.VendorCountDto;
import com.example.hethongquanlysanphamnoibobe.dto.VendorDto;
import com.example.hethongquanlysanphamnoibobe.entity.Vendor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface VendorRepository extends JpaRepository<Vendor, Integer> {

    // khu vực nhân viên chung
    // ###################################################################################################

    Optional<Vendor> findByName(String name);
    Optional<Vendor> findById(Integer id);


    // khu vực nhân viên lễ tân
    // ###################################################################################################

    // khu vực nhân viên sửa chữa
    // ###################################################################################################

    // khu vực nhân viên kho
    // ###################################################################################################

    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.VendorCountDto" +
            "(vd.id, vd.name, count (m.id)) " +
            "from Vendor vd " +
            "left join Material m on m.vendor.id = vd.id " +
            "group by vd.id, vd.name")
    Page<VendorCountDto> getListVendorAll(Pageable pageable);

    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.VendorDto" +
            "(vd.id, vd.name) " +
            "from Vendor vd " +
            "where vd.id =?1 ")
    Optional<VendorDto> getVendorById(Integer id);

    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.VendorDto" +
            "(vd.id, vd.name) " +
            "from Vendor vd " +
            "where vd.name =?1 ")
    Optional<VendorDto> getVendorByName(String name);

    // khu vực nhân viên bảo hành
    // ###################################################################################################

    // khu vực ADMIN
    // ###################################################################################################
}