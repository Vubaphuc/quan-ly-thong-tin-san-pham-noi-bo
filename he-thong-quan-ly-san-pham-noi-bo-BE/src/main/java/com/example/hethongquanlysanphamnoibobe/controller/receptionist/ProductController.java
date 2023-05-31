package com.example.hethongquanlysanphamnoibobe.controller.receptionist;

import com.example.hethongquanlysanphamnoibobe.request.*;
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
    @PutMapping("update-product")
    public ResponseEntity<?> updateEngineerInformationByProduct(@RequestBody InformationEngineerRequest request) {

        return ResponseEntity.ok(productService.updateEngineerInformationByProduct(request));
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

    @GetMapping("bills")
    public ResponseEntity<?> getListBillAll(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(defaultValue = "") String term) {
        return ResponseEntity.ok(productService.getListBillAll(page,pageSize,term));
    }

    @GetMapping("product")
    public ResponseEntity<?> getProductByIme(@RequestParam(defaultValue = "") String ime) {
        return ResponseEntity.ok(productService.getProductByIme(ime));
    }

    @GetMapping("product-customer/{id}") ///
    public ResponseEntity<?> getProductAndCustomerById(@PathVariable Integer id) {
        return ResponseEntity.ok(productService.getProductAndCustomerById(id));
    }

    // đăng ký bảo hành cho sản phẩm
    @PostMapping("guarantee/create")
    public ResponseEntity<?> createNewGuarantee (@RequestBody CreateGuaranteeRequest request) {
        return ResponseEntity.ok(productService.createNewWarranty(request));
    }
    // danh sách sản phẩm đang pending chỗ người sửa chữa
    @GetMapping("products/pending")
    public ResponseEntity<?> getListProductsPending(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(defaultValue = "") String term) {
        return ResponseEntity.ok(productService.getListProductsPending(page, pageSize, term));
    }

    // thay đổi người sửa chữa
    @PutMapping("product/pending/{id}")
    public ResponseEntity<?> updateEngineerProductPending (@RequestBody UpdateInformationEngineerRequest request, @PathVariable Integer id) {
        return ResponseEntity.ok(productService.updateEngineerProductPending(request, id));
    }


    // lấy danh sách sách hóa đơn
    @GetMapping("guarantees")
    public ResponseEntity<?> findGuaranteeAll(@RequestParam(defaultValue = "1") int page,
                                              @RequestParam(defaultValue = "10") int pageSize,
                                              @RequestParam(defaultValue = "") String term) {
        return ResponseEntity.ok(productService.findGuaranteeAll(page,pageSize, term));
    }

}
