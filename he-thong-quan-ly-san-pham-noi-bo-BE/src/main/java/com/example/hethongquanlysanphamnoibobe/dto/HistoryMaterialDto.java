package com.example.hethongquanlysanphamnoibobe.dto;

import com.example.hethongquanlysanphamnoibobe.entity.Components;
import com.example.hethongquanlysanphamnoibobe.entity.Vendor;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HistoryMaterialDto {
    private Integer materialId;
    private String materialCode;
    private String nameModel;
    private int quantity;
    private LocalDateTime createDate;

    private LocalDateTime updateDate;
    private String warehouseEmployeeCode;
    private String warehouseEmployeeName;
    private Integer vendorId;
    private String VendorName;
    private Integer componentId;
    private String componentName;

}
