package com.example.hethongquanlysanphamnoibobe.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateMaterialRequest {
    private String materialCode;
    private String tenModel;
    private Integer venderId;
    private Integer componentsId;
    private Integer quantity;
}
