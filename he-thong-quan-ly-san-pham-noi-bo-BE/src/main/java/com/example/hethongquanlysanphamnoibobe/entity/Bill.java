package com.example.hethongquanlysanphamnoibobe.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "bill")
public class Bill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;
    // ngày tạo hóa đơn
    @Column(name = "invoice_creation_date")
    private LocalDateTime invoiceCreationDate;

    // người tạo hóa đơn => là người trả sản phẩm cho khách
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "invoice_creator_id")
    private User invoiceCreator;

    // thông tin sản phẩm => bao gồm tiền và thông tin khách hàng theo sản phẩm
    @OneToOne
    @JoinColumn(name = "product_id")
    private Product product;

}