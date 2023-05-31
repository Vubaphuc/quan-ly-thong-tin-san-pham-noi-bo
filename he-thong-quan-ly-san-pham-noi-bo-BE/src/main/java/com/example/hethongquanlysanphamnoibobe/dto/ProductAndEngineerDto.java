package com.example.hethongquanlysanphamnoibobe.dto;

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
    private boolean status;
    private boolean repair;

}
