package com.example.hethongquanlysanphamnoibobe.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AUpdateMaterialRequest {
    private String code;
    private String nameModel;
    private String employeeCode;
    private Integer componentId;
    private Integer vendorId;
}
