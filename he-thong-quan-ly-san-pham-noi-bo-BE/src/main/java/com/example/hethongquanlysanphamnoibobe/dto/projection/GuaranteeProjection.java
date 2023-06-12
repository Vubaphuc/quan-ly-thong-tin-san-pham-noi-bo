package com.example.hethongquanlysanphamnoibobe.dto.projection;

import com.example.hethongquanlysanphamnoibobe.entity.Guarantee;
import com.example.hethongquanlysanphamnoibobe.entity.Product;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

/**
 * Projection for {@link com.example.hethongquanlysanphamnoibobe.entity.Guarantee}
 */
public interface GuaranteeProjection {
    Integer getId();

    String getGuaranteeCode();

    LocalDateTime getActivationDate();

    LocalDateTime getExpirationDate();

    boolean getStatus();
    ProductInfo getProduct();
    EmployeeInfo getActivationEmployee();


    @RequiredArgsConstructor
    class GuaranteeProjectionImpl implements GuaranteeProjection {
        private final Guarantee guarantee;

        @Override
        public Integer getId() {
            return guarantee.getId();
        }

        @Override
        public String getGuaranteeCode() {
            return guarantee.getGuaranteeCode();
        }

        @Override
        public LocalDateTime getActivationDate() {
            return guarantee.getActivationDate();
        }

        @Override
        public LocalDateTime getExpirationDate() {
            return guarantee.getExpirationDate();
        }

        @Override
        public boolean getStatus() {
            return guarantee.isStatus();
        }

        @Override
        public ProductInfo getProduct() {
            if (guarantee.getProduct() == null) return null;
            return ProductInfo.of(guarantee.getProduct());
        }

        @Override
        public EmployeeInfo getActivationEmployee() {
            return EmployeeInfo.of(guarantee.getActivationEmployee());
        }
    }

    static GuaranteeProjection of (Guarantee guarantee) {
        return new GuaranteeProjectionImpl(guarantee);
    }
}
