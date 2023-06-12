package com.example.hethongquanlysanphamnoibobe.mapper;

import com.example.hethongquanlysanphamnoibobe.dto.TotalProductDto;
import com.example.hethongquanlysanphamnoibobe.entity.User;

public class Mapper {

    public static TotalProductDto toTotalProductDto (User user, long totalOk, long totalPending){

        TotalProductDto totalProductDto = TotalProductDto.builder()
                .employeeCode(user.getEmployeeCode())
                .employeeName(user.getEmployeeName())
                .totalProductOk(totalOk)
                .totalProductPending(totalPending)
                .build();

        return totalProductDto;
    }
}
