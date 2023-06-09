package com.example.hethongquanlysanphamnoibobe.request;

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
    private String ime;
    private String defectName;
    private double price;
}
