package com.example.hethongquanlysanphamnoibobe.controller.admin;

import com.example.hethongquanlysanphamnoibobe.request.AUpdateMaterialRequest;
import com.example.hethongquanlysanphamnoibobe.request.AUpdateOrderMaterialRequest;
import com.example.hethongquanlysanphamnoibobe.service.admin.MaterialManageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("admin/api/v5")
public class MaterialManageController {
    @Autowired
    private MaterialManageService materialManageService;

    // lấy danh sách vật liệu
    @GetMapping("materials")
    public ResponseEntity<?> findMaterialsAll (@RequestParam(defaultValue = "1") Integer page,
                                               @RequestParam(defaultValue = "10") Integer pageSize,
                                               @RequestParam(defaultValue = "") String term) {
        return ResponseEntity.ok(materialManageService.findMaterialsAll(page, pageSize,term));
    }

    // lấy vật liệu theo id
    @GetMapping("material/{id}")
    public ResponseEntity<?> findMaterialById (@PathVariable(value = "id") Integer id) {
        return ResponseEntity.ok(materialManageService.findMaterialById(id));
    }
    // lấy danh sách vendor
    @GetMapping("vendors")
    public ResponseEntity<?> findVendorAll() {
        return ResponseEntity.ok(materialManageService.findVendorAll());
    }
    // danh sách linh kiện
    @GetMapping("components")
    public ResponseEntity<?> findComponentsAll() {
        return ResponseEntity.ok(materialManageService.findComponentsAll());
    }

    @PutMapping("material/{id}")
    public ResponseEntity<?> updateMaterialById (@RequestBody AUpdateMaterialRequest request, @PathVariable Integer id) {
        return ResponseEntity.ok(materialManageService.updateMaterialById(request, id));
    }
    @DeleteMapping("material/{id}")
    public ResponseEntity<?> deleteMaterialById(@PathVariable Integer id) {
        return ResponseEntity.ok(materialManageService.deleteMaterialById(id));
    }
    // lấy danh sách order material
    @GetMapping("order-materials")
    public ResponseEntity<?> findOrderMaterialsAll (@RequestParam(defaultValue = "1") Integer page,
                                                    @RequestParam(defaultValue = "10") Integer pageSize,
                                                    @RequestParam(defaultValue = "") String term) {
        return ResponseEntity.ok(materialManageService.findOrderMaterialsAll(page,pageSize,term));
    }

    @GetMapping("order-materials-isDelete")
    public ResponseEntity<?> findOrderMaterialsIsDeleteTrueAll (@RequestParam(defaultValue = "1") Integer page,
                                                    @RequestParam(defaultValue = "10") Integer pageSize,
                                                    @RequestParam(defaultValue = "") String term) {
        return ResponseEntity.ok(materialManageService.findOrderMaterialsIsDeleteTrueAll(page,pageSize,term));
    }

    @GetMapping("order-material/{id}")
    public ResponseEntity<?> findOrderMaterialById (@PathVariable Integer id) {
        return ResponseEntity.ok(materialManageService.findOrderMaterialById(id));
    }

    @PutMapping("order-material/{id}")
    public ResponseEntity<?> updateOrderMaterialById(@RequestBody AUpdateOrderMaterialRequest request, @PathVariable Integer id) {
        return ResponseEntity.ok(materialManageService.updateOrderMaterialById(request,id));
    }

    @DeleteMapping("order-material/{id}")
    public ResponseEntity<?> deleteOrderMaterialById(@PathVariable Integer id) {
        return ResponseEntity.ok(materialManageService.deleteOrderMaterialById(id));
    }

    @GetMapping("material-projection")
    public ResponseEntity<?> findMaterialProjectionAll () {
        return ResponseEntity.ok(materialManageService.findMaterialProjectionAll());
    }
}
