package com.example.hethongquanlysanphamnoibobe.response;


import com.example.hethongquanlysanphamnoibobe.dto.UserDto;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    private UserDto auth;
    private String token;

    @JsonProperty("isAuthenticated")
    private Boolean isAuthenticated;

}
