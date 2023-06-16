package com.example.hethongquanlysanphamnoibobe.controller.warrantyemployee;


import com.example.hethongquanlysanphamnoibobe.request.*;
import com.example.hethongquanlysanphamnoibobe.service.warrantyemployeeservice.WarrantyEmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("warranty-employee")
public class WarrantyEmployeeController {
    @Autowired
    private WarrantyEmployeeService warrantyEmployeeService;

    // lấy danh sách khách hàng trong cửa hàng
    @GetMapping("customeries")
    public ResponseEntity<?> getListCustomeriesByTerm(@RequestParam(defaultValue = "1") int page,
                                                @RequestParam(defaultValue = "10") int pageSize,
                                                @RequestParam(defaultValue = "") String term) {
        return ResponseEntity.ok(warrantyEmployeeService.getListCustomeriesByTerm(page, pageSize, term));
    }
    // lấy thông tin khách hàng bằng id
    @GetMapping("customer/{id}")
    public ResponseEntity<?> getCustomerById (@PathVariable Integer id) {
        return ResponseEntity.ok(warrantyEmployeeService.getCustomerById(id));
    }

    // lấy thông tin sản phẩm và khách hàng
    @GetMapping("customer-product/{id}")
    public ResponseEntity<?> findCustomerAndProductById (@PathVariable Integer id) {
        return ResponseEntity.ok(warrantyEmployeeService.findCustomerAndProductById(id));
    }

    // lấy danh sách sản phẩm đã qua shop sửa chữa
    @GetMapping("history-product")
    public ResponseEntity<?> findHistoryProductRepairShop (@RequestParam(defaultValue = "1") int page,
                                                           @RequestParam(defaultValue = "10") int pageSize,
                                                           @RequestParam(defaultValue = "") String term) {
        return ResponseEntity.ok(warrantyEmployeeService.findHistoryProductRepairShop(page,pageSize,term));
    }

    // tạo sản phẩm bảo hành mới
    @PostMapping("product/create-charge")
    public ResponseEntity<?> createProductCharge(@RequestBody CreateProductChargeRequest requet) {
        return ResponseEntity.ok(warrantyEmployeeService.createProductCharge(requet));
    }

    @PostMapping("product/create-no-charge")
    public ResponseEntity<?> createProductNoCharge(@RequestBody CreateProductNoChargeRequest requet) {
        return ResponseEntity.ok(warrantyEmployeeService.createProductNoCharge(requet));
    }
    // ấy danh sách sản phẩm pending chưa chưa cho người sửa chữa
    @GetMapping("product-pending")
    public ResponseEntity<?> getListProductPendingNoEngineer(@RequestParam(defaultValue = "1") int page,
                                                      @RequestParam(defaultValue = "10") int pageSize,
                                                      @RequestParam(defaultValue = "") String term) {
        return ResponseEntity.ok(warrantyEmployeeService.getListProductPendingNoEngineer(page, pageSize, term));
    }

    @GetMapping("history-products")
    public ResponseEntity<?> getListHistoryProductByIME(@RequestParam(defaultValue = "") String IME) {
        return ResponseEntity.ok(warrantyEmployeeService.getListHistoryProductByIME(IME));
    }

    @GetMapping("product/{id}")
    public ResponseEntity<?> findProductById (@PathVariable Integer id) {
        return ResponseEntity.ok(warrantyEmployeeService.getproductById(id));
    }
    // đăng ký nhân viên sửa chữa
    @PutMapping("update-product/{id}")
    public ResponseEntity<?> updateEngineerInformationByProduct(@RequestBody InformationEngineerRequest request, @PathVariable Integer id) {
        return ResponseEntity.ok(warrantyEmployeeService.updateEngineerInformationByProduct(request,id));
    }
    // lấy danh sách sản phẩm bảo hành sửa chữa ok
    @GetMapping("products")
    public ResponseEntity<?> findProductGuaranteeStatusOKByTerm(@RequestParam(defaultValue = "1") int page,
                                                                @RequestParam(defaultValue = "10") int pageSize,
                                                                @RequestParam(defaultValue = "") String term) {
        return ResponseEntity.ok(warrantyEmployeeService.findProductGuaranteeStatusOKByTerm(page,pageSize,term));
    }
    // tạo hóa đơn bảo hành
    @PostMapping("bill/create")
    public ResponseEntity<?> warrantyCreateBill (@RequestBody CreateBillRequest request){
        return ResponseEntity.ok(warrantyEmployeeService.warrantyCreateBill(request));
    }

    // lấy danh sách hóa đơn bảo hành
    @GetMapping("bills")
    public ResponseEntity<?> findBillProductGuaranteeAll (@RequestParam(defaultValue = "1") int page,
                                                          @RequestParam(defaultValue = "10") int pageSize,
                                                          @RequestParam(defaultValue = "") String term) {
        return ResponseEntity.ok(warrantyEmployeeService.findBillProductGuaranteeAll(page, pageSize, term));
    }
    // lấy danh sách bảo hành theo IME
    @GetMapping("guarantees")
    public ResponseEntity<?> findGuaranteeAll (@RequestParam(defaultValue = "1") int page,
                                                          @RequestParam(defaultValue = "10") int pageSize,
                                                          @RequestParam(defaultValue = "") String term) {
        return ResponseEntity.ok(warrantyEmployeeService.findGuaranteeAll(page, pageSize, term));
    }
    // lấy danh sách sản phẩm đang pending bên người sửa chữa
    @GetMapping("pending-product")
    public ResponseEntity<?> findProductEngineerPendingAll (@RequestParam(defaultValue = "1") int page,
                                               @RequestParam(defaultValue = "10") int pageSize,
                                               @RequestParam(defaultValue = "") String term) {
        return ResponseEntity.ok(warrantyEmployeeService.findProductEngineerPendingAll(page, pageSize, term));
    }
    // láy sản phẩm pending chỗ nhân viên sửa chữa theo id
    @GetMapping("pending-product/{id}")
    public ResponseEntity<?> findProductPendingEngineerById (@PathVariable Integer id) {
        return ResponseEntity.ok(warrantyEmployeeService.findProductPendingEngineerById(id));
    }

    @PutMapping("pending-product/{id}")
    public ResponseEntity<?> updateEngineerProductById (@RequestBody UpdateInformationEngineerRequest request, @PathVariable Integer id) {
        return ResponseEntity.ok(warrantyEmployeeService.updateEngineerProductById(request, id));
    }


}
