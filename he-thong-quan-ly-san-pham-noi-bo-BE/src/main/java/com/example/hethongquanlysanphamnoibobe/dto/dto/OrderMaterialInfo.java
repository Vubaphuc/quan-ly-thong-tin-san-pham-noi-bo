package com.example.hethongquanlysanphamnoibobe.dto.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderMaterialInfo {
    private String materialCode;
    private String componentName;
    private long totalQuantityExport;
}
