package com.example.hethongquanlysanphamnoibobe.dto;

import lombok.*;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomerDto {
    private Integer id;
    private String fullName;
    private String phone;
    private String email;
    private String address;
    private Object object;

}
