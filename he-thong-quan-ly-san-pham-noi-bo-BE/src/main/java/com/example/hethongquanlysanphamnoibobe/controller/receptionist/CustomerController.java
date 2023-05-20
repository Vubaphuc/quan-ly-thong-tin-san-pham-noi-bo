package com.example.hethongquanlysanphamnoibobe.controller.receptionist;

import com.example.hethongquanlysanphamnoibobe.dto.request.CreateCustomerRequest;
import com.example.hethongquanlysanphamnoibobe.service.receptionisrservice.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("receptionist/v1")
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @GetMapping("search/product-ok")
    public ResponseEntity<?> searchProductStatusOKByCustomer(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(defaultValue = "") String term) {
        return ResponseEntity.ok(customerService.searchProductStatusOKByCustomer(page,pageSize,term));
    }

    @GetMapping("search/product-pending")
    public ResponseEntity<?> searchProductStatusPendingByCustomer(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(defaultValue = "") String term) {
        return ResponseEntity.ok(customerService.searchProductStatusPendingByCustomer(page,pageSize,term));
    }

    @GetMapping("products/{id}")
    public ResponseEntity<?> getListProductByCustomerId(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int pageSize,
            @PathVariable Integer id) {
        return ResponseEntity.ok(customerService.getListProductByCustomerId(id,page,pageSize));
    }
    @GetMapping("{customer/{id}")
    public ResponseEntity<?> getCustomerById(@PathVariable Integer id) {
        return ResponseEntity.ok(customerService.getCustomerById(id));
    }

    @PostMapping("create-customer")
    public ResponseEntity<?> createCustomer (@RequestBody CreateCustomerRequest request) {
        return ResponseEntity.ok(customerService.createCustomer(request));
    }
}
