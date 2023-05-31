package com.example.hethongquanlysanphamnoibobe.dto.admin;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DanhSachSuaChuaEngineerDto {
    private String emoloyeeCode;
    private String employeeName;
    private Integer totalProductOk;
    private Integer totalProductPending;
}
