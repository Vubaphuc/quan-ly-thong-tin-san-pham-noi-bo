package com.example.hethongquanlysanphamnoibobe.dto.projection;

import com.example.hethongquanlysanphamnoibobe.entity.Components;
import lombok.RequiredArgsConstructor;

/**
 * Projection for {@link com.example.hethongquanlysanphamnoibobe.entity.Components}
 */
public interface ComponentInfo {
    Integer getId();
    String getName();
    Integer getWarrantyPeriod();

    @RequiredArgsConstructor
    class ComponentImpl implements ComponentInfo {
        private final Components components;

        @Override
        public Integer getId() {
            return components.getId();
        }

        @Override
        public String getName() {
            return components.getName();
        }

        @Override
        public Integer getWarrantyPeriod() {
            return components.getWarrantyPeriod();
        }
    }
    static ComponentInfo of(Components components) {
        return new ComponentImpl(components);
    }
}
