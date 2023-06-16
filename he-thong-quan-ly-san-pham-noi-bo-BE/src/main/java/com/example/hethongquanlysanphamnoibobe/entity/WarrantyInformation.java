package com.example.hethongquanlysanphamnoibobe.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "warranty_information")
public class WarrantyInformation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;
    @Column(name = "cause")
    private String cause;
    @Column(name = "defect_name")
    private String defectName;
    @Column(name = "charge")
    private boolean charge;
    @Column(name = "price")
    private double price;
    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private WarrantyInformation.WarrantyStatus status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    @PrePersist
    public void prePersist() {
        this.status = WarrantyStatus.WARRANTY_WAITING_FOR_REPAIR;
    }


    public enum WarrantyStatus {
        WARRANTY_WAITING_FOR_REPAIR("Đang chờ sửa chữa"),
        WARRANTY_UNDER_REPAIR("Đang được sửa chữa"),
        WARRANTY_REPAIRED("Đã sửa chữa xong"),
        WARRANTY_WAITING_FOR_RETURN("Đang chờ trả khách"),
        WARRANTY_DELIVERED("Đã giao trả khách hàng");

        private String status;

        WarrantyStatus(String status) {
            this.status = status;
        }
        public String getMessage() {
            return status;
        }

    }

}