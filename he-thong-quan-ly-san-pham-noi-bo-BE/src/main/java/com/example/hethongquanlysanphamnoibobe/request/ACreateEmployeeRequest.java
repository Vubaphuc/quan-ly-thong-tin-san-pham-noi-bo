package com.example.hethongquanlysanphamnoibobe.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ACreateEmployeeRequest {
    private String fullName;
    private String email;
    private String phoneNumber;
    private String password;
    private String address;
    private List<Integer> roleIds;
}
