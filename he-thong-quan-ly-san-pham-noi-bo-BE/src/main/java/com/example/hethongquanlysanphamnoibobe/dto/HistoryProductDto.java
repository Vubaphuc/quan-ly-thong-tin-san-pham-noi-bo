package com.example.hethongquanlysanphamnoibobe.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HistoryProductDto {
    private Integer id;
    private String nameModel;
    private String phoneCompany;
    private String IME;
    private String defectName;
    private boolean status;
    private double price;
    private boolean isRepair;
    private LocalDateTime inputDate;
    private LocalDateTime transferDate;
    private String location;
    private LocalDateTime outputDate;
    private boolean charge;
    private LocalDateTime finishDate;
    private String receptionistCode;
    private String receptionistName;
    private String engineerCode;
    private String engineerName;
    private String customerName;
    private String customerPhone;
    private String componentsName;
}
