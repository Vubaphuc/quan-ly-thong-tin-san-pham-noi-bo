package com.example.hethongquanlysanphamnoibobe.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class InformationRepairRequest {
    private String location;
    private boolean status;
    private Integer componnentsId;
}