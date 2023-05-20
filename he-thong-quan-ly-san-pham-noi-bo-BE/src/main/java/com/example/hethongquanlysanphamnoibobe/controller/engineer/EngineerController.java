package com.example.hethongquanlysanphamnoibobe.controller.engineer;

import com.example.hethongquanlysanphamnoibobe.dto.request.CreateOrderMaterialRequest;
import com.example.hethongquanlysanphamnoibobe.dto.request.InformationRepairRequest;
import com.example.hethongquanlysanphamnoibobe.service.engineerservice.EngineerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("engineer")
public class EngineerController {
    @Autowired
    private EngineerService engineerService;

    @GetMapping("products")
    public ResponseEntity<?> getListProductByUser(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int pageSize) {
        return ResponseEntity.ok(engineerService.getListProductByUser(page,pageSize));
    }

    @GetMapping("product/{id}")
    public ResponseEntity<?> getProductById(@PathVariable Integer id) {
        return ResponseEntity.ok(engineerService.getProductById(id));
    }

    @PutMapping("update-product/{id}")
    public ResponseEntity<?> upDateInformationProductbyId(@RequestBody InformationRepairRequest request, @PathVariable Integer id) {
        return ResponseEntity.ok(engineerService.upDateInformationProductbyId(request, id));
    }
    @GetMapping("components")
    public ResponseEntity<?> getListComponentPhone(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int pageSize) {
        return ResponseEntity.ok(engineerService.getListComponentPhone(page,pageSize));
    }

    @GetMapping("materialies")
    public ResponseEntity<?> getListMaterialByQuantity(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int pageSize) {
        return ResponseEntity.ok(engineerService.getListMaterialByQuantity(page,pageSize));
    }

    @GetMapping("material/{code}")
    public ResponseEntity<?> getMaterialByCode(@PathVariable String code) {
        return ResponseEntity.ok(engineerService.getMaterialByCode(code));
    }

    @PostMapping("order")
    public ResponseEntity<?> CreateOrderMaterial (@RequestBody CreateOrderMaterialRequest request) {
        return ResponseEntity.ok(engineerService.CreateOrderMaterial(request));
    }

    @GetMapping("order/status-true")
    public ResponseEntity<?> getListOrderMaterialByStatusTrue(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int pageSize) {
        return ResponseEntity.ok(engineerService.getListOrderMaterialByStatusTrue(page,pageSize));
    }

    @GetMapping("order/status-false")
    public ResponseEntity<?> getListOrderMaterialByStatusFalse(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int pageSize) {
        return ResponseEntity.ok(engineerService.getListOrderMaterialByStatusFalse(page,pageSize));
    }

    @GetMapping("material-components")
    public ResponseEntity<?> getListMaterialAndComponents(@RequestParam String tenModel, @RequestParam String tenLinhKien) {
        return ResponseEntity.ok(engineerService.getListMaterialAndComponents(tenModel,tenLinhKien));
    }

    @GetMapping("order/{id}")
    public ResponseEntity<?> getOrderMaterialById (@PathVariable Integer id) {
        return ResponseEntity.ok(engineerService.getOrderMaterialById(id));
    }
}
