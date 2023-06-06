package com.example.hethongquanlysanphamnoibobe.dto.projection;


import com.example.hethongquanlysanphamnoibobe.entity.Material;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

/**
 * Projection for {@link com.example.hethongquanlysanphamnoibobe.entity.Material}
 */

public interface MaterialProjection {

    Integer getId();
    String getCode();
    String getNameModel();
    Integer getQuantity();
    LocalDateTime getCreateDate();
    LocalDateTime getUpdateDate();
    EmployeeInfo getWarehouseEmployee();
    VendorInfo getVendor();
    ComponentInfo getComponents();

    @RequiredArgsConstructor
    class MaterialImpl implements MaterialProjection {
        private final Material material;

        @Override
        public Integer getId() {
            return material.getId();
        }

        @Override
        public String getCode() {
            return material.getCode();
        }

        @Override
        public String getNameModel() {
            return material.getNameModel();
        }

        @Override
        public Integer getQuantity() {
            return material.getQuantity();
        }

        @Override
        public LocalDateTime getCreateDate() {
            return material.getCreateDate();
        }

        @Override
        public LocalDateTime getUpdateDate() {
            return material.getUpdateDate();
        }

        @Override
        public EmployeeInfo getWarehouseEmployee() {
            if (material.getWarehouseEmployee() == null) return null;
            return EmployeeInfo.of(material.getWarehouseEmployee());
        }

        @Override
        public VendorInfo getVendor() {
            if (material.getVendor() == null) return null;
            return VendorInfo.of(material.getVendor());
        }

        @Override
        public ComponentInfo getComponents() {
            if (material.getComponents() == null) return null;
           return ComponentInfo.of(material.getComponents());
        }
    }
    static MaterialProjection of(Material material) {
        return new MaterialImpl(material);
    }

}
