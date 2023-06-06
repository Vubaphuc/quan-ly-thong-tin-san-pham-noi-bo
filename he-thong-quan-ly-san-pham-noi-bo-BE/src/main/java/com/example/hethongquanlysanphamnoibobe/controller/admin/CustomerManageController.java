package com.example.hethongquanlysanphamnoibobe.controller.admin;

import com.example.hethongquanlysanphamnoibobe.request.AUpdateCustomerRequest;
import com.example.hethongquanlysanphamnoibobe.service.admin.CustomerManageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("admin/api/v4")
public class CustomerManageController {

    @Autowired
    private CustomerManageService customerManageService;

    // lấy tất cả danh sách khách hàng
    @GetMapping("customers")
    public ResponseEntity<?> findCustomerAll(@RequestParam(defaultValue = "1") Integer page,
                                             @RequestParam(defaultValue = "10") Integer pageSize,
                                             @RequestParam(defaultValue = "") String term) {
        return ResponseEntity.ok(customerManageService.findCustomerAll(page,pageSize,term));
    }

    @GetMapping("customer/{id}")
    public ResponseEntity<?> findCustomerById (@PathVariable Integer id) {
        return ResponseEntity.ok(customerManageService.findCustomerById(id));
    }

    @PutMapping("customer/{id}")
    public ResponseEntity<?> updateCustomerById (@RequestBody AUpdateCustomerRequest request, @PathVariable Integer id) {
        return ResponseEntity.ok(customerManageService.updateCustomerById(request,id));
    }
    // xóa khách hàng theo id;
    @DeleteMapping("customer/{id}")
    public ResponseEntity<?> deleteCustomerById(@PathVariable Integer id) {
        return ResponseEntity.ok(customerManageService.deleteCustomerById(id));
    }
}
