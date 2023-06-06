package com.example.hethongquanlysanphamnoibobe.repository;

import com.example.hethongquanlysanphamnoibobe.dto.*;

import com.example.hethongquanlysanphamnoibobe.dto.projection.MaterialInfo;
import com.example.hethongquanlysanphamnoibobe.dto.projection.MaterialProjection;
import com.example.hethongquanlysanphamnoibobe.entity.Material;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface MaterialRepository extends JpaRepository<Material, Integer> {

    // khu vực nhân viên chung
    // ###################################################################################################

    Optional<Material> findByCode(String code);

    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.MaterialDto" +
            "(m.id , m.code, m.nameModel, cp.name, m.vendor.name, m.quantity) " +
            "from Material m " +
            "left join Components cp on cp.id = m.components.id " +
            "where m.id = :id ")
    Optional<MaterialDto> getMaterialById(@Param("id") Integer id);


    // khu vực nhân viên lễ tân
    // ###################################################################################################

    // khu vực nhân viên sửa chữa
    // ###################################################################################################

    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.MaterialDto" +
            "(m.id , m.code, m.nameModel, cp.name, m.vendor.name, m.quantity) " +
            "from Material m " +
            "left join Components cp on cp.id = m.components.id " +
            "where m.quantity > 0 " +
            "order by m.quantity desc ")
    Page<MaterialDto> getListMaterialByQuantity(Pageable pageable);

    // khu vực nhân viên kho
    // ###################################################################################################

    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.MaterialDto" +
            "(m.id , m.code, m.nameModel, cp.name, m.vendor.name, m.quantity) " +
            "from Material m " +
            "left join Components cp on cp.id = m.components.id " +
            "where m.quantity > 0 " +
            "order by  m.quantity desc ")
    Page<MaterialDto> getListMaterialAll(Pageable pageable);

    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.HistoryMaterialDto" +
            "(m.id, m.code, m.nameModel, m.quantity, m.createDate, m.updateDate, u.employeeCode, u.employeeName, vd.id, vd.name, cp.id, cp.name) " +
            "from Material m " +
            "left join Components cp on cp.id = m.components.id " +
            "left join Vendor vd on vd.id = m.vendor.id " +
            "left join User u on u.id = m.warehouseEmployee.id " +
            "where (m.code like %?1% or m.nameModel like %?1% )")
    Page<HistoryMaterialDto> searchHistoryMaterial(Pageable pageable, String term);

    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.VendorTotalMaterialDto" +
            "(vd.id, vd.name, count (m.id)) " +
            "from Material m " +
            "left join Vendor vd on vd.id = m.vendor.id " +
            "group by vd.id " +
            "having count (m.id) > 0 " +
            "order by count (m.id) desc")
    Page<VendorTotalMaterialDto> getListVendorTotalMaterial(Pageable pageable);

    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.MaterialDto" +
            "(m.id , m.code, m.nameModel, cp.name, m.vendor.name, m.quantity) " +
            "from Material m " +
            "join m.components cp " +
            "where m.vendor.id = ?1 " +
            "order by m.quantity desc")
    Page<MaterialDto> getListVendorById(Pageable pageable, int vendorId);


    // khu vực nhân viên bảo hành
    // ###################################################################################################

    // khu vực ADMIN
    // ###################################################################################################

    // danh sách materrial projection
    @Query("select m from Material m where m.code like %?1% ")
    Page<MaterialProjection> findMaterials(Pageable pageable, String term);
    // lấy ra Material Projection theo id
    @Query("select m from Material m where m.id = ?1 ")
    Optional<MaterialProjection> findMaterialById(Integer id);

    // xóa Material
    @Modifying
    @Query("delete from Material m where m.id = :id ")
    void deleteById(@Param("id") Integer id);

    @Query("select m from Material m where m.quantity > 0 ")
    List<MaterialInfo> findMaterialProjectionAll();

    // lấy vạt liệu theo id
}
