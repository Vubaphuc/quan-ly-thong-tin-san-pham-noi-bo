package com.example.hethongquanlysanphamnoibobe.dto.projection;


import com.example.hethongquanlysanphamnoibobe.entity.Product;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

/**
 * Projection for {@link com.example.hethongquanlysanphamnoibobe.entity.Product}
 */

public interface ProductProjection {
    Integer getId();
    String getNameModel();
    String getPhoneCompany();
    String getIME();
    String getDefectName();
    boolean getStatus();
    double getPrice();
    boolean getIsRepair();
    LocalDateTime getInputDate();
    LocalDateTime getTransferDate();
    String getLocation();
    String getNote();
    LocalDateTime getOutputDate();
    boolean getCharge();
    LocalDateTime getFinishDate();
    EmployeeInfo getReceptionists();
    EmployeeInfo getEngineer();
    CustomerInfo getCustomer();
    ComponentInfo getComponents();
    EmployeeInfo getProductPayer();

    @RequiredArgsConstructor
    class ProductImpl implements ProductProjection {
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
        public String getIME() {
            return product.getIME();
        }

        @Override
        public String getDefectName() {
            return product.getDefectName();
        }

        @Override
        public boolean getStatus() {
            return product.isStatus();
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
        public boolean getCharge() {
            return product.isCharge();
        }

        @Override
        public LocalDateTime getFinishDate() {
            return product.getFinishDate();
        }

        @Override
        public EmployeeInfo getReceptionists() {
            if (product.getReceptionists() == null) return null;
            return EmployeeInfo.of(product.getReceptionists());
        }

        @Override
        public EmployeeInfo getEngineer() {
            if (product.getEngineer() == null) return null;
            return EmployeeInfo.of(product.getEngineer());
        }

        @Override
        public CustomerInfo getCustomer() {
            if (product.getCustomer() == null) return null;
            return CustomerInfo.of(product.getCustomer());
        }

        @Override
        public ComponentInfo getComponents() {
            if (product.getComponents() == null) return null;
            return ComponentInfo.of(product.getComponents());
        }

        @Override
        public EmployeeInfo getProductPayer() {
            if (product.getProductPayer() == null) return null;
            return EmployeeInfo.of(product.getProductPayer());
        }
    }

    static ProductProjection of (Product product) {
        return new ProductImpl(product);
    }
}
