package com.example.hethongquanlysanphamnoibobe.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AUpdateOrderMaterialRequest {
    private String orderCode;
    private Integer orderQuantity;
    private boolean status;
    private String employeeOrderCode;
    private String employeeAppvoralCode;
    private Integer componentId;
    private Integer materialId;
}
