package com.example.hethongquanlysanphamnoibobe.controller.warrantyemployee;

import com.example.hethongquanlysanphamnoibobe.dto.request.CreateEmployeeEngineerRequest;
import com.example.hethongquanlysanphamnoibobe.dto.request.CreateWarrantyChargeRequest;
import com.example.hethongquanlysanphamnoibobe.dto.request.CreateWarrantyNoChargeRequest;
import com.example.hethongquanlysanphamnoibobe.service.warrantyemployeeservice.WarrantyEmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("warranty-employee")
public class WarrantyEmployeeController {
    @Autowired
    private WarrantyEmployeeService warrantyEmployeeService;

    @GetMapping("search/history-product")
    public ResponseEntity<?> searchHistoryProductByTerm(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(defaultValue = "") String term) {
        return ResponseEntity.ok(warrantyEmployeeService.searchHistoryProductByTerm(page,pageSize,term));
    }

    @GetMapping("product/{id}")
    public ResponseEntity<?> findProductAndCustomerById(@PathVariable Integer id) {
        return ResponseEntity.ok(warrantyEmployeeService.findProductAndCustomerById(id));
    }

    @GetMapping("product/guarantee/{id}")
    public ResponseEntity<?> getProductWarrantyById(@PathVariable Integer id) {
        return ResponseEntity.ok(warrantyEmployeeService.getProductWarrantyById(id));
    }

    @PostMapping("create/charge")
    public ResponseEntity<?> createProductWarrantyMoney(@RequestBody CreateWarrantyChargeRequest request) {
        return ResponseEntity.ok(warrantyEmployeeService.createProductWarrantyMoney(request));
    }

    @PostMapping("create/no-charge")
    public ResponseEntity<?> createProductWarrantyNoMoney(@RequestBody CreateWarrantyNoChargeRequest request) {
        return ResponseEntity.ok(warrantyEmployeeService.createProductWarrantyNoMoney(request));
    }

    @GetMapping("product/pending")
    public ResponseEntity<?> getListProductWarrantyPending(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(defaultValue = "") String term) {
        return ResponseEntity.ok(warrantyEmployeeService.getListProductWarrantyPending(page,pageSize,term));
    }

    @GetMapping("product/ok")
    public ResponseEntity<?> getListProductWarrantyOk(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(defaultValue = "") String term) {
        return ResponseEntity.ok(warrantyEmployeeService.getListProductWarrantyOk(page,pageSize,term));
    }

    @GetMapping("product/all")
    public ResponseEntity<?> getListProductWarrantyAll(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(defaultValue = "") String term) {
        return ResponseEntity.ok(warrantyEmployeeService.getListProductWarrantyAll(page,pageSize,term));
    }

    @PutMapping("product/engineer/{id}")
    public ResponseEntity<?> updateInformationEngineer(@RequestBody CreateEmployeeEngineerRequest request, @PathVariable Integer id) {
        return ResponseEntity.ok(warrantyEmployeeService.updateInformationEngineer(request, id));
    }
}
