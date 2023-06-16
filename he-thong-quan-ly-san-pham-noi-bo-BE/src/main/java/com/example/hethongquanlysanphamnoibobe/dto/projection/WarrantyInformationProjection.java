package com.example.hethongquanlysanphamnoibobe.dto.projection;

import com.example.hethongquanlysanphamnoibobe.entity.Product;
import com.example.hethongquanlysanphamnoibobe.entity.WarrantyInformation;
import lombok.RequiredArgsConstructor;

public interface WarrantyInformationProjection {
    Integer getId();

    String getCause();
    String getDefectName();
    boolean getCharge();
    double getPrice();

    WarrantyInformation.WarrantyStatus getStatus();

    ProductInfo getProduct();

    @RequiredArgsConstructor
    class WarrantyInformationProjectionImpl implements WarrantyInformationProjection {
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

        @Override
        public ProductInfo getProduct() {
            return ProductInfo.of(warrantyInformation.getProduct());
        }
    }

    static WarrantyInformationProjection of (WarrantyInformation warrantyInformation) {
        return new WarrantyInformationProjectionImpl(warrantyInformation);
    }
}
