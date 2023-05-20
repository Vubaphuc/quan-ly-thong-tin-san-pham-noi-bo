package com.example.hethongquanlysanphamnoibobe.dto;


import com.example.hethongquanlysanphamnoibobe.entity.Role;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDto {
    private Integer id;
    private String maNhanVien;
    private String fullName;
    private String email;
    private String phone;
    private String address;
    private List<Role> roles;
}