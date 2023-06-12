package com.example.hethongquanlysanphamnoibobe.dto.projection;

import com.example.hethongquanlysanphamnoibobe.entity.Guarantee;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

/**
 * Projection for {@link com.example.hethongquanlysanphamnoibobe.entity.Guarantee}
 */

public interface GuaranteeInfo {
    Integer getId();

    String getGuaranteeCode();

    LocalDateTime getActivationDate();

    LocalDateTime getExpirationDate();

    boolean getStatus();
    EmployeeInfo getActivationEmployee();

    @RequiredArgsConstructor
    class GuaranteeImpl implements GuaranteeInfo {
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
        public EmployeeInfo getActivationEmployee() {
            if (guarantee.getActivationEmployee() == null ) return null;
            return EmployeeInfo.of(guarantee.getActivationEmployee());
        }
    }


    static GuaranteeInfo of(Guarantee guarantee) {
        return new GuaranteeInfo.GuaranteeImpl(guarantee);
    }
}
