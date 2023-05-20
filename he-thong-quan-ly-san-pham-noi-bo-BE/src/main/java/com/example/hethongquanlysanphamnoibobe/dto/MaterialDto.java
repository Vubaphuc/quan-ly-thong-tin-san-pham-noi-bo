package com.example.hethongquanlysanphamnoibobe.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MaterialDto {
    private Integer materialId;
    private String materialCode;
    private String nameModel;
    private String componentName;
    private Integer quantity;
}
