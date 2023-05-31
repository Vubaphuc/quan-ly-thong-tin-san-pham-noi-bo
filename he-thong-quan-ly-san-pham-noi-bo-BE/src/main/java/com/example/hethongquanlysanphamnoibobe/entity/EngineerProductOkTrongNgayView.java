package com.example.hethongquanlysanphamnoibobe.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "engineer_product_ok_trong_ngay_view")
public class EngineerProductOkTrongNgayView {
    @Id
    @Column(name = "employee_code")
    private String employeeCode;
    @Column(name = "employee_name")
    private String employeeName;
    @Column(name = "total_products")
    private Integer totalProductsOk;
}
