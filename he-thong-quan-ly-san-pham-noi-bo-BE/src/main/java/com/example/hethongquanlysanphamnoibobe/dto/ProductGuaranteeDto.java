package com.example.hethongquanlysanphamnoibobe.dto;

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
    private boolean status;
    private boolean isRepair;
    private boolean charge;
}
