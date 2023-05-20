package com.example.hethongquanlysanphamnoibobe.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VendorTotalMaterialDto {
    private Integer id;
    private String name;
    private long totalMaterial;
}
