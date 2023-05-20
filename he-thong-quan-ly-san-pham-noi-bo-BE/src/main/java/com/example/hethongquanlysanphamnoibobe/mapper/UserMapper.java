package com.example.hethongquanlysanphamnoibobe.mapper;


import com.example.hethongquanlysanphamnoibobe.dto.UserDto;
import com.example.hethongquanlysanphamnoibobe.entity.User;

public class UserMapper {
    public static UserDto toUserDto(User user) {

        UserDto userDto = new UserDto (
                user.getId(),
                user.getMaNhanVien(),
                user.getFullName(),
                user.getEmail(),
                user.getPhoneNumber(),
                user.getAddress(),
                user.getRoles()

        );
        return userDto;
    }
}
