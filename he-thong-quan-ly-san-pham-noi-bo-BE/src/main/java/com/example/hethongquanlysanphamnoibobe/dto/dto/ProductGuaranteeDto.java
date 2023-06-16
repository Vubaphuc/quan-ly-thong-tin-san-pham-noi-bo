package com.example.hethongquanlysanphamnoibobe.dto.dto;

import com.example.hethongquanlysanphamnoibobe.entity.Product;
import lombok.*;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductGuaranteeDto {
    private Integer productId;
    private String model;
    private String phoneCompany;
    private String IME;
    private String defectName;
    private String location;
    private String note;
    private String componentName;
    private double price;
    private Product.ProductStatus status;
    private boolean isRepair;
}
