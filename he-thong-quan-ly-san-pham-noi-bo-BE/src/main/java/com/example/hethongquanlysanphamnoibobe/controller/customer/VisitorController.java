package com.example.hethongquanlysanphamnoibobe.controller.customer;

import com.example.hethongquanlysanphamnoibobe.service.customer.VisitorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("customer")
public class VisitorController {
    @Autowired
    private VisitorService visitorService;

    @GetMapping("search")
    public ResponseEntity<?> searchHistoryProductByImeProductOrPhoneNumber(@RequestParam String ime,
                                                                           @RequestParam String phoneNumber) {
        return ResponseEntity.ok(visitorService.searchHistoryProductByImeProductOrPhoneNumber(ime, phoneNumber));
    }

    @GetMapping("guarantee")
    public ResponseEntity<?> searchGuaranteeByGuaranteeCode(@RequestParam String code) {
        return ResponseEntity.ok(visitorService.searchGuaranteeByGuaranteeCode(code));
    }
}
