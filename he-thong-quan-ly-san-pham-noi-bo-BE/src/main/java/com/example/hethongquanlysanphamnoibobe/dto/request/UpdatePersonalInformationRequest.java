package com.example.hethongquanlysanphamnoibobe.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UpdatePersonalInformationRequest {
    private String fullName;
    private String phone;
    private String address;
}
