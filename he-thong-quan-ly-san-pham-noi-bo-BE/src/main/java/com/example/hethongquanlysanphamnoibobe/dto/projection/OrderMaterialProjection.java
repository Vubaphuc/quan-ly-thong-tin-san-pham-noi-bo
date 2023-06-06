package com.example.hethongquanlysanphamnoibobe.dto.projection;


import com.example.hethongquanlysanphamnoibobe.entity.OrderMaterial;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

/**
 * Projection for {@link com.example.hethongquanlysanphamnoibobe.entity.OrderMaterial}
 */

public interface OrderMaterialProjection {
    Integer getId();
    String getOrderCode();
    Integer getQuantity();
    boolean getIsStatus();
    boolean getIsDelete();
    LocalDateTime getCreateDate();
    LocalDateTime getApprovalDate();

    ComponentInfo getComponents();

    MaterialInfo getMaterial();

    EmployeeInfo getApprover();

    EmployeeInfo getOrderer();
    @RequiredArgsConstructor
    class OrderMaterialImpl implements OrderMaterialProjection {
        private final OrderMaterial orderMaterial;

        @Override
        public Integer getId() {
            return orderMaterial.getId();
        }

        @Override
        public String getOrderCode() {
            return orderMaterial.getOrderCode();
        }

        @Override
        public Integer getQuantity() {
            return orderMaterial.getQuantity();
        }

        @Override
        public boolean getIsStatus() {
            return orderMaterial.isStatus();
        }

        @Override
        public boolean getIsDelete() {
            return orderMaterial.isDelete();
        }

        @Override
        public LocalDateTime getCreateDate() {
            return orderMaterial.getCreateDate();
        }

        @Override
        public LocalDateTime getApprovalDate() {
            return orderMaterial.getApprovalDate();
        }

        @Override
        public ComponentInfo getComponents() {
            if (orderMaterial.getComponents() == null) {
                return null;
            }
            return ComponentInfo.of(orderMaterial.getComponents());
        }

        @Override
        public MaterialInfo getMaterial() {
            if (orderMaterial.getMaterial() == null) return null;
            return MaterialInfo.of(orderMaterial.getMaterial());
        }

        @Override
        public EmployeeInfo getApprover() {
            if (orderMaterial.getApprover() == null) return null;
            return EmployeeInfo.of(orderMaterial.getApprover());
        }

        @Override
        public EmployeeInfo getOrderer() {
            if (orderMaterial.getOrderer() == null) return null;
            return EmployeeInfo.of(orderMaterial.getOrderer());
        }
    }

    static OrderMaterialProjection of (OrderMaterial orderMaterial) {
        return new OrderMaterialImpl(orderMaterial);
    }
}
