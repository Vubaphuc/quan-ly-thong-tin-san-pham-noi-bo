package com.example.hethongquanlysanphamnoibobe.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductDto {
    private Integer productId;
    private String model;
    private String phoneCompany;
    private String IME;
    private String defectName;
    private boolean status;
    private boolean isRepair;
}
