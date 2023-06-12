package com.example.hethongquanlysanphamnoibobe.controller.admin;

import com.example.hethongquanlysanphamnoibobe.repository.ProductSummaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("admin/api/v1")
public class AdminController {

    @Autowired
    private ProductSummaryRepository productSummaryRepository;

    @GetMapping("products")
    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok(productSummaryRepository.findAll());
    }
}
