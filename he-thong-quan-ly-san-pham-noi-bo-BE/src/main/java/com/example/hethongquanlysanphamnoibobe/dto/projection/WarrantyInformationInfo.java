package com.example.hethongquanlysanphamnoibobe.dto.projection;

import com.example.hethongquanlysanphamnoibobe.entity.WarrantyInformation;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.RequiredArgsConstructor;

/**
 * Projection for {@link com.example.hethongquanlysanphamnoibobe.entity.WarrantyInformation}
 */
public interface WarrantyInformationInfo {
    Integer getId();

    String getCause();
    String getDefectName();
    boolean getCharge();
    double getPrice();

    WarrantyInformation.WarrantyStatus getStatus();

    @RequiredArgsConstructor
    class WarrantyInformationInfoImpl implements WarrantyInformationInfo {
        private final WarrantyInformation warrantyInformation;

        @Override
        public Integer getId() {
            return warrantyInformation.getId();
        }

        @Override
        public String getCause() {
            return warrantyInformation.getCause();
        }

        @Override
        public String getDefectName() {
            return warrantyInformation.getDefectName();
        }

        @Override
        public boolean getCharge() {
            return warrantyInformation.isCharge();
        }

        @Override
        public double getPrice() {
            return warrantyInformation.getPrice();
        }

        @Override
        public WarrantyInformation.WarrantyStatus getStatus() {
            return warrantyInformation.getStatus();
        }
    }

    static WarrantyInformationInfo of (WarrantyInformation warrantyInformation) {
        return new WarrantyInformationInfoImpl(warrantyInformation);
    }
}
