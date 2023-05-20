package com.example.hethongquanlysanphamnoibobe.dto;

import jakarta.persistence.Column;
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
