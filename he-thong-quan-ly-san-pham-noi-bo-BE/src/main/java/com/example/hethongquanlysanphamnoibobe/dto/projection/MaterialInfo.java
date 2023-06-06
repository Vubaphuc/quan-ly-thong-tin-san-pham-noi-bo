package com.example.hethongquanlysanphamnoibobe.dto.projection;

import com.example.hethongquanlysanphamnoibobe.entity.Material;
import lombok.RequiredArgsConstructor;

/**
 * Projection for {@link com.example.hethongquanlysanphamnoibobe.entity.Material}
 */

public interface MaterialInfo {
    Integer getId();
    String getCode();
    String getNameModel();
    Integer getQuantity();

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
        public Integer getQuantity() {
            return material.getQuantity();
        }
    }

    static MaterialInfo of(Material material) {
        return new MaterialImpl(material);
    }
}
