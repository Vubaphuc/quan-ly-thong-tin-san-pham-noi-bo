package com.example.hethongquanlysanphamnoibobe.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AUpdateCustomerRequest {
    private String fullName;
    private String email;
    private String phone;
    private String address;
    private String employeeCode;
}
