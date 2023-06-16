package com.example.hethongquanlysanphamnoibobe.dto.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MaterialByVendorDto {
    private Integer id;
    private String code;
    private String nameModel;
    private int quantity;
    private String componentsName;
    private String nameVendor;
}
