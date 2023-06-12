package com.example.hethongquanlysanphamnoibobe.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "product_summary")
public class ProductSummary {
    @Id
    @Column(name = "total_products")
    private int totalProducts;
    @Column(name = "total_products_today")
    private int totalProductsOk;
    @Column(name = "total_products_false")
    private int totalProductPending;
    @Column(name = "total_products_input_today")
    private int totalProductInput;
}
