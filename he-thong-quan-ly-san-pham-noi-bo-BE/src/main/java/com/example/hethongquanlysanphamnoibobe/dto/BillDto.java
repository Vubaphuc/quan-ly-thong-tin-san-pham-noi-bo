package com.example.hethongquanlysanphamnoibobe.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BillDto {
    private Integer billId;
    private String customerName;
    private String customerPhone;
    private String customerEmail;
    private String phoneCompany;
    private String modelName;
    private String IME;
    private String defectName;
    private String location;
    private String componentsName;
    private int warrantyPeriod;
    private double price;

}
