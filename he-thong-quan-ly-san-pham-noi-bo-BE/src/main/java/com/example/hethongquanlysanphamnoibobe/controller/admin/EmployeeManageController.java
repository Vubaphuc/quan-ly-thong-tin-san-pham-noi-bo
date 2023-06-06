package com.example.hethongquanlysanphamnoibobe.controller.admin;

import com.example.hethongquanlysanphamnoibobe.request.ACreateEmployeeRequest;
import com.example.hethongquanlysanphamnoibobe.request.AUpdateInformationEmployeeRequest;
import com.example.hethongquanlysanphamnoibobe.request.AUpdatePasswordRequest;
import com.example.hethongquanlysanphamnoibobe.service.admin.EmployeeManageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("admin/api/v6")
public class EmployeeManageController {
    @Autowired
    private EmployeeManageService employeeManageService;

    // lấy tất cả danh sách Nhân Viên
    @GetMapping("employees")
    public ResponseEntity<?> findEmployeesAlls(@RequestParam(defaultValue = "1") Integer page,
                                             @RequestParam(defaultValue = "10") Integer pageSize,
                                             @RequestParam(defaultValue = "") String term) {
        return ResponseEntity.ok(employeeManageService.findEmployeesAlls(page,pageSize,term));
    }
    // lấy nhân viên theo id
    @GetMapping("employee/{id}")
    public ResponseEntity<?> findEmployeeById(@PathVariable Integer id) {
        return ResponseEntity.ok(employeeManageService.findEmployeeById(id));
    }
    // lấy danh sách roles
    @GetMapping("roles")
    public ResponseEntity<?> findRolesAlls() {
        return ResponseEntity.ok(employeeManageService.findRolesAlls());
    }
    // tạo nhân viên mới
    @PostMapping("create/employee")
    public ResponseEntity<?> createEmployee (@RequestBody ACreateEmployeeRequest request) {
        return ResponseEntity.ok(employeeManageService.createEmployee(request));
    }
    // cập nhật thông tin nhân viên theo id
   @PutMapping("employee/{id}")
    public ResponseEntity<?> updateInformationEmployeeById(@RequestBody AUpdateInformationEmployeeRequest request, @PathVariable Integer id) {
        return ResponseEntity.ok(employeeManageService.updateInformationEmployeeById(request, id));
   }
    // cập nhật mật khẩu tài khoản nhân viên theo id
    @PutMapping("employee/password/{id}")
    public ResponseEntity<?> updatePasswordAccEmployeeById(@RequestBody AUpdatePasswordRequest request, @PathVariable Integer id) {
        return ResponseEntity.ok(employeeManageService.updatePasswordAccEmployeeById(request, id));
    }
    // xóa nhân viên đồng thời  khóa tài khoản nhân viên không sử dụng nữa
    @DeleteMapping("employee/{id}")
    public ResponseEntity<?> deleteEmployeeById (@PathVariable Integer id) {
        return ResponseEntity.ok(employeeManageService.deleteEmployeeById(id));
    }
}
