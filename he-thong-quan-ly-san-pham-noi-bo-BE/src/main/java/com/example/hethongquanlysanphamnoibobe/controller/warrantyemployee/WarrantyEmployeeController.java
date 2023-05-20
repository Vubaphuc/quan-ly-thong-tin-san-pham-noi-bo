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

    @GetMapping("san-pham/bao-hanh/{id}")
    public ResponseEntity<?> getProducWarrantyById(@PathVariable Integer id) {
        return ResponseEntity.ok(warrantyEmployeeService.getProducWarrantyById(id));
    }

    @PostMapping("dang-ky/tinh-phi")
    public ResponseEntity<?> createProductWarrantyMoney(@RequestBody CreateWarrantyChargeRequest request) {
        return ResponseEntity.ok(warrantyEmployeeService.createProductWarrantyMoney(request));
    }

    @PostMapping("dang-ky/khong-tinh-phi")
    public ResponseEntity<?> createProductWarrantyNoMoney(@RequestBody CreateWarrantyNoChargeRequest request) {
        return ResponseEntity.ok(warrantyEmployeeService.createProductWarrantyNoMoney(request));
    }

    @GetMapping("danh-sach/pending")
    public ResponseEntity<?> getListProductWarrantyPending(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(defaultValue = "") String term) {
        return ResponseEntity.ok(warrantyEmployeeService.getListProductWarrantyPending(page,pageSize,term));
    }

    @GetMapping("danh-sach/ok")
    public ResponseEntity<?> getListProductWarrantyOk(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(defaultValue = "") String term) {
        return ResponseEntity.ok(warrantyEmployeeService.getListProductWarrantyOk(page,pageSize,term));
    }

    @GetMapping("danh-sach/tat-ca")
    public ResponseEntity<?> getListProductWarrantyAll(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(defaultValue = "") String term) {
        return ResponseEntity.ok(warrantyEmployeeService.getListProductWarrantyAll(page,pageSize,term));
    }

    @PutMapping("san-pham/nhan-vien-sua-chua/{id}")
    public ResponseEntity<?> updateInformationEngineer(@RequestBody CreateEmployeeEngineerRequest request, @PathVariable Integer id) {
        return ResponseEntity.ok(warrantyEmployeeService.updateInformationEngineer(request, id));
    }
}
