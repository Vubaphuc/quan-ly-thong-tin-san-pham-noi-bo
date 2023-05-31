package com.example.hethongquanlysanphamnoibobe.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "engineer_product_pending_view")
public class EngineerProductPendingView {
    @Id
    @Column(name = "employee_code")
    private String employeeCode;
    @Column(name = "employee_name")
    private String employeeName;
    @Column(name = "total_products")
    private Integer totalProducts;

}