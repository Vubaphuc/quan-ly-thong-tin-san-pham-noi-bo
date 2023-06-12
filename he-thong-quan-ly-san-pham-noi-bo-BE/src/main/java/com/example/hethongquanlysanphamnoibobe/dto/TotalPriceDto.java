package com.example.hethongquanlysanphamnoibobe.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TotalPriceDto {
    private long totalToday;
    private long totalThisMonth;
    private long totalLastMount;
    private long totalThisYear;
    private long total1YearAgo;
    private long total2YearAgo;
    private long total3YearAgo;
    private long total4YearAgo;
    private long totalQ1;
    private long totalQ2;
    private long totalQ3;
    private long totalQ4;

}
