package com.example.hethongquanlysanphamnoibobe.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AUpdateProductRequest {
    private String nameModel;
    private String phoneCompany;
    private String ime;
    private String defectName;
    private boolean status;
    private double price;
    private boolean repair;
    private String note;
    private boolean charge;
    private String location;
    private String employeeRecepCode;
    private String employeeEngineerCode;
    private String employeePayerCode;
    private Integer componentId;
}
