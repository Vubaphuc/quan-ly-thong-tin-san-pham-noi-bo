package com.example.hethongquanlysanphamnoibobe.dto.dto;

import lombok.*;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VendorCountDto {
    private Integer id;
    private String name;
    private long quantityMaterial;
}
