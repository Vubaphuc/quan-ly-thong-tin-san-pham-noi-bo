package com.example.hethongquanlysanphamnoibobe.dto;

import jakarta.persistence.Column;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GuaranteeDto {
    private Integer guaranteeId;
    private String guaranteeCode;
    private LocalDateTime activationDate;
    private LocalDateTime expirationDate;
    private boolean status;
    private String employeeCode;
    private String employeeName;
    private Integer productId;
    private String nameModel;
    private String phoneCompany;
    private String IME;

}
