package com.example.hethongquanlysanphamnoibobe.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GuaranteeDto {
    private Integer guaranteeId;
    private Integer productId;
    private String nameModel;
    private String phoneCompany;
    private String IME;
    private String defectName;
    private boolean status;
}
