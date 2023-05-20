package com.example.hethongquanlysanphamnoibobe.controller.receptionist;

import com.example.hethongquanlysanphamnoibobe.dto.request.CreateBillRequest;
import com.example.hethongquanlysanphamnoibobe.dto.request.CreateProductRequet;
import com.example.hethongquanlysanphamnoibobe.dto.request.InformationEngineerRequest;
import com.example.hethongquanlysanphamnoibobe.service.receptionisrservice.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("receptionist/v2")
public class ProductController {
    @Autowired
    private ProductService productService;

    // lấy danh sách sản phẩm mới đăng ký
    @GetMapping("product-new")
    public ResponseEntity<?> getPageProductNewCreate(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(defaultValue = "") String term) {
        return ResponseEntity.ok(productService.getPageProductNewCreate(page,pageSize,term));
    }
    // lấy ra ra chi tiết sản phẩm theo id
    @GetMapping("product/{id}")
    public ResponseEntity<?> getproductById(@PathVariable Integer id) {
        return ResponseEntity.ok(productService.getproductById(id));
    }

    // cập nhật thông tin nhân viên sửa chữa
    @PutMapping("update-product/{id}")
    public ResponseEntity<?> updateEngineerInformationByProduct(@RequestBody InformationEngineerRequest request, @PathVariable Integer id) {

        return ResponseEntity.ok(productService.updateEngineerInformationByProduct(request, id));
    }

    // lấy ra danh sách sản phẩm sửa ok
    @GetMapping("product-ok")
    public ResponseEntity<?> getPageProductStatusOK(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(defaultValue = "") String term) {
        return ResponseEntity.ok(productService.getPageProductStatusOK(page, pageSize,term));
    }

    @GetMapping("product-history")
    public ResponseEntity<?> searchHistoryProductByTerm(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(defaultValue = "") String term) {
        return ResponseEntity.ok(productService.searchHistoryProductByTerm(page,pageSize,term));
    }

    @PostMapping("create-product")
    public ResponseEntity<?> createProduct (@RequestBody CreateProductRequet requet) {
        return ResponseEntity.ok(productService.createProduct(requet));
    }

    @PostMapping("create-bill")
    public ResponseEntity<?> createBill(@RequestBody CreateBillRequest requet) {
        return ResponseEntity.ok(productService.createBill(requet));
    }

    @GetMapping("product/bill/{id}")
    public ResponseEntity<?> getBillById(@PathVariable Integer id) {
        return ResponseEntity.ok(productService.getBillById(id));
    }
}
