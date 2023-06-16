package com.example.hethongquanlysanphamnoibobe.dto.dto;

import com.example.hethongquanlysanphamnoibobe.entity.Product;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductAndEngineerDto {
    private Integer productId;
    private String nameModel;
    private String phoneCompany;
    private String IME;
    private String defectName;
    private String engineerCode;
    private String engineerName;
    private Product.ProductStatus status;
    private boolean repair;

}
