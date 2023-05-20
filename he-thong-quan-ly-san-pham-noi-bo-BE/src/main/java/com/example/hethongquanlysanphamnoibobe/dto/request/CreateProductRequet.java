package com.example.hethongquanlysanphamnoibobe.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateProductRequet {
    private Integer customerId;
    private String phoneCompany;
    private String model;
    private String IME;
    private String defectName;
    private double price;
}
