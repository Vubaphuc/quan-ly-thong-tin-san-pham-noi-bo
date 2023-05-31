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
@Table(name = "order_material")
public class OrderMaterial {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;
    // mã order
    @Column(name = "order_code")
    private String orderCode;
    // số lượng
    @Column(name = "quantity")
    private int quantity;
    // trạng thái của order, isStatus = true => đã phê duyệt, isStatus = false => chờ phê duyệt
    @Column(name = "status")
    private boolean isStatus;
    // ngày tạo order
    @Column(name = "create_date")
    private LocalDateTime createDate;
    // ngày phê duyệt order
    @Column(name = "approval_date")
    private LocalDateTime approvalDate;
    @Column(name = "isDelete")
    private boolean isDelete;
    // loại linh kiện
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "components_id")
    private Components components;

    // vật liệu
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "material_id")
    private Material material;
    // người phê duyệt
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "approver_id")
    private User approver;
    // người tạo order
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "orderer_id")
    private User orderer;

    @PrePersist
    public void prePersist() {
        this.createDate = LocalDateTime.now();
        this.isDelete = true;
    }
}