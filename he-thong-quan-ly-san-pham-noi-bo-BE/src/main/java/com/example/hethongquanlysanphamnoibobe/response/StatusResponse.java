package com.example.hethongquanlysanphamnoibobe.response;

import lombok.*;
import org.springframework.http.HttpStatus;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StatusResponse {
    private HttpStatus status;
    private String message;
    private Object data;

}
