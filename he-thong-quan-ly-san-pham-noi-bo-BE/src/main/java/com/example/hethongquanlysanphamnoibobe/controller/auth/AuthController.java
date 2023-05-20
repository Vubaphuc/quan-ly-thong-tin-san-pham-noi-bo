package com.example.hethongquanlysanphamnoibobe.controller.auth;

import com.example.hethongquanlysanphamnoibobe.dto.request.LoginRequest;
import com.example.hethongquanlysanphamnoibobe.response.AuthResponse;
import com.example.hethongquanlysanphamnoibobe.service.auth.AuthSerice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/v1/public/auth")
public class AuthController {
    @Autowired
    private AuthSerice authSerice;

    @PostMapping("login")
    public ResponseEntity<?> login (@RequestBody LoginRequest request) {
        AuthResponse auth = authSerice.login(request);
        return ResponseEntity.ok(auth);
    }
}
