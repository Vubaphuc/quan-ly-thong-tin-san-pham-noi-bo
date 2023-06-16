package com.example.hethongquanlysanphamnoibobe.dto.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderMaterialDto {
    private Integer id;
    private String orderCode;
    private String materialCode;
    private String nameModel;
    private String ComponentName;
    private int quantity;
    private String ordererCode;
    private String ordererName;
    private boolean isStatus;
}
