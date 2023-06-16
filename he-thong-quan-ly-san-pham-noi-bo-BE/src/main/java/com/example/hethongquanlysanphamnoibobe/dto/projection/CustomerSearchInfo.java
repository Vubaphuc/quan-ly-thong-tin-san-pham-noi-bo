package com.example.hethongquanlysanphamnoibobe.dto.projection;

import com.example.hethongquanlysanphamnoibobe.entity.Guarantee;
import com.example.hethongquanlysanphamnoibobe.entity.Product;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Projection for {@link com}
 */

public interface CustomerSearchInfo {
    Integer getId();
    String getNameModel();
    String getPhoneCompany();
    String getIme();
    String getDefectName();
    String getStatus();
    double getPrice();
    boolean getIsRepair();
    LocalDateTime getInputDate();
    String getLocation();
    String getNote();
    EmployeeInfo getReceptionists();
    CustomerInfo getCustomer();
    ComponentInfo getComponents();
    EmployeeInfo getProductPayer();
    List<GuaranteeInfo>getGuarantees();

    @RequiredArgsConstructor
    class CustomerSearchImpl implements CustomerSearchInfo {
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
        public String getLocation() {
            return product.getLocation();
        }

        @Override
        public String getNote() {
            return product.getNote();
        }


        @Override
        public EmployeeInfo getReceptionists() {
            return EmployeeInfo.of(product.getReceptionists());
        }

        @Override
        public CustomerInfo getCustomer() {
            return CustomerInfo.of(product.getCustomer());
        }

        @Override
        public ComponentInfo getComponents() {
            return ComponentInfo.of(product.getComponents());
        }

        @Override
        public EmployeeInfo getProductPayer() {
            return EmployeeInfo.of(product.getProductPayer());
        }

        @Override
        public List<GuaranteeInfo> getGuarantees() {
            return product.getGuarantees().stream()
                    .map(GuaranteeInfo::of)
                    .collect(Collectors.toList());
        }
    }

    static CustomerSearchInfo of(Product product) {
        return new CustomerSearchImpl(product);
    }
}
