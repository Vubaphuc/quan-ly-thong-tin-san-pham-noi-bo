package com.example.hethongquanlysanphamnoibobe.dto.projection;

import com.example.hethongquanlysanphamnoibobe.entity.Material;
import jakarta.persistence.Column;
import lombok.RequiredArgsConstructor;

/**
 * Projection for {@link com.example.hethongquanlysanphamnoibobe.entity.Material}
 */

public interface MaterialInfo {
    Integer getId();
    String getCode();
    String getNameModel();
    int getImportQuantity();
    int getExportQuantity();
    int getRemainingQuantity();
    boolean getDelete();

    @RequiredArgsConstructor
    class MaterialImpl implements MaterialInfo {
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
        public int getImportQuantity() {
            return material.getImportQuantity();
        }

        @Override
        public int getExportQuantity() {
            return material.getExportQuantity();
        }

        @Override
        public int getRemainingQuantity() {
            return material.getRemainingQuantity();
        }

        @Override
        public boolean getDelete() {
            return material.isDelete();
        }


    }

    static MaterialInfo of(Material material) {
        return new MaterialImpl(material);
    }
}
