package com.example.hethongquanlysanphamnoibobe.dto.dto;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ComponentsDto {
    private Integer componentId;
    private String componentName;
    private Integer warrantyPeriod;
}
