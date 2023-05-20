package com.example.hethongquanlysanphamnoibobe.dto;

import com.example.hethongquanlysanphamnoibobe.entity.Components;
import com.example.hethongquanlysanphamnoibobe.entity.Material;
import com.example.hethongquanlysanphamnoibobe.entity.User;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HistoryOrderMaterialDto {
    private Integer id;
    private String orderCode;
    private String materialCode;
    private String nameModel;
    private String ComponentName;
    private int quantity;
    private String ordererCode;
    private String ordererName;
    private LocalDateTime createDate;
    private String approverCode;
    private String approverName;
    private LocalDateTime approvalDate;
    private boolean isStatus;

}