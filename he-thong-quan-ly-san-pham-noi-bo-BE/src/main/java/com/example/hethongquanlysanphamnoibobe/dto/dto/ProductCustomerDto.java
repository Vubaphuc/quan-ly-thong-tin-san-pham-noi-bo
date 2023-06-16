package com.example.hethongquanlysanphamnoibobe.dto.dto;

import com.example.hethongquanlysanphamnoibobe.entity.Product;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductCustomerDto {
    private Integer productId;
    private String model;
    private String phoneCompany;
    private String IME;
    private Product.ProductStatus status;
    private Integer customerId;
    private String customerName;
    private String customerPhoneNumber;
    private String customerEmail;
    private String customerAddress;
}
