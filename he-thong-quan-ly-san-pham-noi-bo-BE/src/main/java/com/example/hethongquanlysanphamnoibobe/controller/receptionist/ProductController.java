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
    @GetMapping("product-waiting")
    public ResponseEntity<?> findProductWaitingRepairAll(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(defaultValue = "") String term) {
        return ResponseEntity.ok(productService.findProductWaitingRepairAll(page,pageSize,term));
    }
    // lấy ra ra chi tiết sản phẩm theo id
    @GetMapping("product/{id}")
    public ResponseEntity<?> getproductById(@PathVariable Integer id) {
        return ResponseEntity.ok(productService.getproductById(id));
    }

    // cập nhật thông tin nhân viên sửa chữa
    @PutMapping("update-product/{id}")
    public ResponseEntity<?> updateEngineerInformationByProduct(@RequestBody InformationEngineerRequest request,@PathVariable Integer id) {
        return ResponseEntity.ok(productService.updateEngineerInformationByProduct(request, id));
    }

    ///////////////////////////////////////////////////////////////////////

    // lấy ra danh sách sản phẩm sửa ok
    @GetMapping("products-return-customer")
    public ResponseEntity<?> findProductWaitingReturnCustomerAll(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(defaultValue = "") String term) {
        return ResponseEntity.ok(productService.findProductWaitingReturnCustomerAll(page, pageSize,term));
    }

    @GetMapping("products-register-guarantee")
    public ResponseEntity<?> findProductWaitingRegisterGuaranteeAll(@RequestParam(defaultValue = "1") int page,
                                                                    @RequestParam(defaultValue = "10") int pageSize,
                                                                    @RequestParam(defaultValue = "") String term) {
        return ResponseEntity.ok(productService.findProductWaitingRegisterGuaranteeAll(page,pageSize,term));
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

    // thay đổi người sửa chữa
    @PutMapping("product/pending/{id}")
    public ResponseEntity<?> updateEngineerProductPending (@RequestBody UpdateInformationEngineerRequest request, @PathVariable Integer id) {
        return ResponseEntity.ok(productService.updateEngineerProductPending(request, id));
    }

    // danh sách sản phẩm đang pending chỗ người sửa chữa
    @GetMapping("products/pending")
    public ResponseEntity<?> getListProductsPending(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(defaultValue = "") String term) {
        return ResponseEntity.ok(productService.getListProductsPending(page, pageSize, term));
    }


    // lấy sản phẩm chờ trả khách theo id
    @GetMapping("product-repaired/{id}")
    public ResponseEntity<?> findProductRepaiedById(@PathVariable Integer id) {
        return ResponseEntity.ok(productService.findProductRepaiedById(id));
    }
    // lấy danh sách sản phẩm đang pending trong cửa hàng
    @GetMapping("pending/products")
    public ResponseEntity<?> findProductPendingInShop ( @RequestParam(defaultValue = "1") int page,
                                                        @RequestParam(defaultValue = "10") int pageSize,
                                                        @RequestParam(defaultValue = "") String term) {
        return ResponseEntity.ok(productService.findProductPendingInShop(page,pageSize,term));
    }

    // hủy sản phẩm trả khách
    @DeleteMapping("product/{id}")
    public ResponseEntity<?> deleteProductById(@PathVariable Integer id) {
        return ResponseEntity.ok(productService.deleteProductById(id));
    }



    //////////////////////////////////////////////
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


    // đăng ký bảo hành cho sản phẩm
    @PostMapping("guarantee/create/{id}")
    public ResponseEntity<?> createNewGuarantee (@PathVariable Integer id) {
        return ResponseEntity.ok(productService.createNewWarranty(id));
    }

    // lấy danh sách sách hóa đơn
    @GetMapping("guarantees")
    public ResponseEntity<?> findGuaranteeAll(@RequestParam(defaultValue = "1") int page,
                                              @RequestParam(defaultValue = "10") int pageSize,
                                              @RequestParam(defaultValue = "") String term) {
        return ResponseEntity.ok(productService.findGuaranteeAll(page,pageSize, term));
    }
    @PostMapping("create-bill/{id}")
    public ResponseEntity<?> createBill(@PathVariable Integer id) {
        return ResponseEntity.ok(productService.createBill(id));
    }

    @GetMapping("products-finish")
    public ResponseEntity<?> findProductFinishByUserRegister(@RequestParam(defaultValue = "1") int page,
                                                             @RequestParam(defaultValue = "10") int pageSize,
                                                             @RequestParam(defaultValue = "")String term) {
        return ResponseEntity.ok(productService.findProductFinishByUserRegister(page,pageSize,term));
    }


}
