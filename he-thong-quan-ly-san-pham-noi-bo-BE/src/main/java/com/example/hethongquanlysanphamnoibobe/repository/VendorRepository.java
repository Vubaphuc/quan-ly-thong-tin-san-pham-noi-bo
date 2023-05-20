package com.example.hethongquanlysanphamnoibobe.repository;

import com.example.hethongquanlysanphamnoibobe.dto.VendorDto;
import com.example.hethongquanlysanphamnoibobe.entity.Vendor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface VendorRepository extends JpaRepository<Vendor, Integer> {
    Optional<Vendor> findByName(String name);
    Optional<Vendor> findById(Integer id);

    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.VendorDto" +
            "(vd.id, vd.name) " +
            "from Vendor vd " +
            "where vd.name =?1 ")
    Optional<VendorDto> getVendorByName(String name);

    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.VendorDto" +
            "(vd.id, vd.name) " +
            "from Vendor vd " +
            "where vd.id =?1 ")
    Optional<VendorDto> getVendorById(Integer id);
    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.VendorDto" +
            "(vd.id, vd.name) " +
            "from Vendor vd ")
    Page<VendorDto> getListVendorAll(Pageable pageable);
}