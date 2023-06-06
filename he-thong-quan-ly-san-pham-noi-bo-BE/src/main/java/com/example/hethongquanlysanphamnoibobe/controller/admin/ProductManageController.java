package com.example.hethongquanlysanphamnoibobe.controller.admin;

import com.example.hethongquanlysanphamnoibobe.request.AUpdateProductRequest;
import com.example.hethongquanlysanphamnoibobe.service.admin.ProductManageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("admin/api/v3")
public class ProductManageController {
    @Autowired
    private ProductManageService productManageService;

    // lấy tất cả danh sách Sản Phẩm
    @GetMapping("products")
    public ResponseEntity<?> findProductAlls(@RequestParam(defaultValue = "1") Integer page,
                                             @RequestParam(defaultValue = "10") Integer pageSize,
                                             @RequestParam(defaultValue = "") String term) {
        return ResponseEntity.ok(productManageService.findProductAlls(page,pageSize,term));
    }
    // lấy sản phẩm theo id
    @GetMapping("product/{id}")
    public ResponseEntity<?> findProductProjectionById(@PathVariable Integer id) {
        return ResponseEntity.ok(productManageService.findProductProjectionById(id));
    }
    // update sản phẩm theo ID
    @PutMapping("product/{id}")
    public ResponseEntity<?> updateProductById(@RequestBody AUpdateProductRequest request, @PathVariable Integer id) {
        return ResponseEntity.ok(productManageService.updateProductById(request, id));
    }

    @DeleteMapping("product/{id}")
    public ResponseEntity<?> deleteProductById(@PathVariable Integer id) {
        return ResponseEntity.ok(productManageService.deleteProductById(id));
    }
}
