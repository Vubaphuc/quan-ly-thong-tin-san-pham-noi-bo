package com.example.hethongquanlysanphamnoibobe.controller.employee;

import com.example.hethongquanlysanphamnoibobe.request.ChangePasswordRequest;
import com.example.hethongquanlysanphamnoibobe.request.ForgotPasswordRequest;
import com.example.hethongquanlysanphamnoibobe.request.UpdatePersonalInformationRequest;
import com.example.hethongquanlysanphamnoibobe.entity.Image;
import com.example.hethongquanlysanphamnoibobe.service.employee.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("api/v1/employee")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;

    @PostMapping("forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        return ResponseEntity.ok(employeeService.forgotPassword(request));
    }


    @PutMapping("change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest request) {
        return ResponseEntity.ok(employeeService.changePassword(request));
    }

    @PutMapping("update-information")
    public ResponseEntity<?> updatePersonalInformation(@RequestBody UpdatePersonalInformationRequest request) {
        return ResponseEntity.ok(employeeService.updatePersonalInformation(request));
    }

    @PostMapping("upload-avatar")
    public ResponseEntity<?> updateProfilePicture(@ModelAttribute("avatar") MultipartFile avatar) {
        return ResponseEntity.ok(employeeService.updateProfilePicture(avatar));
    }

    @GetMapping("avatar/{id}")
    public ResponseEntity<?> getAvatarById(@PathVariable Integer id) {
        Image image = employeeService.getAvatarById(id);
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(image.getType()))
                .body(image.getData());

    }

    @GetMapping("engineer")
    public ResponseEntity<?> getListEngineer() {
        return ResponseEntity.ok(employeeService.getListEngineer());
    }
}
