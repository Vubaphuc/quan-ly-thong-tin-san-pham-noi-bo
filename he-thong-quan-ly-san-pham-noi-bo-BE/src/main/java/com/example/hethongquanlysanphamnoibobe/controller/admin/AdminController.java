package com.example.hethongquanlysanphamnoibobe.controller.admin;

import com.example.hethongquanlysanphamnoibobe.entity.EngineerProductPendingView;
import com.example.hethongquanlysanphamnoibobe.repository.EngineerProductOkTrongNgayViewRepository;
import com.example.hethongquanlysanphamnoibobe.repository.EngineerProductPendingViewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("admin/api/v1")
public class AdminController {
    @Autowired
    private EngineerProductPendingViewRepository engineerProductPendingViewRepository;
    @Autowired
    private EngineerProductOkTrongNgayViewRepository engineerProductOkTrongNgayViewRepository;

    @GetMapping("products")
    public ResponseEntity<?> findAll() {
        return null;
    }
}
