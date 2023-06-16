package com.example.hethongquanlysanphamnoibobe.dto.projection;

import com.example.hethongquanlysanphamnoibobe.entity.Product;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

/**
 * Projection for {@link com.example.hethongquanlysanphamnoibobe.entity.Product}
 */

public interface ProductInfo {

    Integer getId();
    String getNameModel();
    String getPhoneCompany();
    String getIme();
    String getDefectName();
    String getStatus();
    double getPrice();
    boolean getIsRepair();
    LocalDateTime getInputDate();
    LocalDateTime getTransferDate();
    String getLocation();
    String getNote();
    LocalDateTime getOutputDate();
    LocalDateTime getFinishDate();
    @RequiredArgsConstructor
    class ProductInfoImpl implements ProductInfo {
        private final Product product;

        @Override
        public Integer getId() {
            return product.getId();
        }
        @Override
        public String getNameModel() {
            return product.getNameModel();
        }

        @Override
        public String getPhoneCompany() {
            return product.getPhoneCompany();
        }

        @Override
        public String getIme() {
            return product.getIme();
        }

        @Override
        public String getDefectName() {
            return product.getDefectName();
        }

        @Override
        public String getStatus() {
            return product.getStatus().getMessage();
        }

        @Override
        public double getPrice() {
            return product.getPrice();
        }

        @Override
        public boolean getIsRepair() {
            return product.isRepair();
        }

        @Override
        public LocalDateTime getInputDate() {
            return product.getInputDate();
        }

        @Override
        public LocalDateTime getTransferDate() {
            return product.getTransferDate();
        }

        @Override
        public String getLocation() {
            return product.getLocation();
        }

        @Override
        public String getNote() {
            return product.getNote();
        }

        @Override
        public LocalDateTime getOutputDate() {
            return product.getOutputDate();
        }



        @Override
        public LocalDateTime getFinishDate() {
            return product.getFinishDate();
        }
    }

    static ProductInfo of (Product product) {
        return new ProductInfoImpl(product);
    }
}
