package com.example.hethongquanlysanphamnoibobe.repository;

import com.example.hethongquanlysanphamnoibobe.dto.HistoryMaterialDto;
import com.example.hethongquanlysanphamnoibobe.dto.MaterialByVendorDto;
import com.example.hethongquanlysanphamnoibobe.dto.MaterialDto;
import com.example.hethongquanlysanphamnoibobe.dto.VendorTotalMaterialDto;
import com.example.hethongquanlysanphamnoibobe.entity.Material;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.Optional;

public interface MaterialRepository extends JpaRepository<Material, Integer> {

    Optional<Material> findByCode(String code);

    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.MaterialDto" +
            "(m.id , m.code, m.nameModel, cp.name, m.quantity) " +
            "from Material m " +
            "left join Components cp on cp.id = m.components.id " +
            "where m.quantity > 0 " +
            "order by m.quantity desc ")
    Page<MaterialDto> getListMaterialByQuantity(Pageable pageable);

    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.MaterialDto" +
            "(m.id , m.code, m.nameModel, cp.name, m.quantity) " +
            "from Material m " +
            "left join Components cp on cp.id = m.components.id " +
            "where m.code = ?1 ")
    Optional<MaterialDto> getMaterialByCode(String code);

    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.MaterialByVendorDto" +
            "(m.id, m.code, m.nameModel, m.quantity, cp.name, vd.name) " +
            "from Material m " +
            "left join Vendor vd on vd.id = m.vendor.id " +
            "left join Components cp on cp.id = m.components.id " +
            "where vd.id = ?1 " +
            "order by m.quantity desc")
    Page<MaterialByVendorDto> getListVendorById(Pageable pageable, int vendorId);

    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.VendorTotalMaterialDto" +
            "(vd.id, vd.name, count (m.id)) " +
            "from Material m " +
            "left join Vendor vd on vd.id = m.vendor.id " +
            "group by vd.id " +
            "having count (m.id) > 0 " +
            "order by count (m.id) desc")
    Page<VendorTotalMaterialDto> getListVendorTotalMaterial(Pageable pageable);

    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.HistoryMaterialDto" +
            "(m.id, m.code, m.nameModel, m.quantity, m.createDate, m.updateDate, u.employeeCode, u.employeeName, vd.id, vd.name, cp.id, cp.name) " +
            "from Material m " +
            "left join Components cp on cp.id = m.components.id " +
            "left join Vendor vd on vd.id = m.vendor.id " +
            "left join User u on u.id = m.warehouseEmployee.id " +
            "where (m.code like %?1% or m.nameModel like %?1% )")
    Page<HistoryMaterialDto> searchHistoryMaterial(Pageable pageable, String term);

    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.MaterialDto" +
            "(m.id , m.code, m.nameModel, cp.name, m.quantity) " +
            "from Material m " +
            "left join Components cp on cp.id = m.components.id " +
            "where m.quantity > 0 " +
            "order by  m.quantity desc ")
    Page<MaterialDto> getListMaterialAll(Pageable pageable);
}