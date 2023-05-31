package com.example.hethongquanlysanphamnoibobe.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "components")
public class Components {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;
    // tên các linh kiện điện thoại
    @Column(name = "name", unique = true)
    private String name;
    // thời hạn bảo hành => tính theo tháng
    @Column(name = "warranty_period")
    private Integer warrantyPeriod;
    // nhân viên kho
    @Column(name = "create_date")
    private LocalDateTime createDate;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "warehouse_employee_id")
    private User warehouseEmployee;

    @PrePersist
    public void prePersist() {
        this.createDate = LocalDateTime.now();
    }
}