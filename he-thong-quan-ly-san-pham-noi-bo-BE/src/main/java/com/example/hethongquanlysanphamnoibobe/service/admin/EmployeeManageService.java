package com.example.hethongquanlysanphamnoibobe.service.admin;

import com.example.hethongquanlysanphamnoibobe.config.GenerateCode;
import com.example.hethongquanlysanphamnoibobe.dto.page.PageDto;
import com.example.hethongquanlysanphamnoibobe.dto.projection.EmployeeProjection;
import com.example.hethongquanlysanphamnoibobe.dto.projection.RoleInfo;
import com.example.hethongquanlysanphamnoibobe.entity.Image;
import com.example.hethongquanlysanphamnoibobe.entity.Role;
import com.example.hethongquanlysanphamnoibobe.entity.User;
import com.example.hethongquanlysanphamnoibobe.exception.BadRequestException;
import com.example.hethongquanlysanphamnoibobe.exception.NotFoundException;
import com.example.hethongquanlysanphamnoibobe.mapper.DataMapper;
import com.example.hethongquanlysanphamnoibobe.repository.ImageRepository;
import com.example.hethongquanlysanphamnoibobe.repository.RoleRepository;
import com.example.hethongquanlysanphamnoibobe.repository.UserRepository;
import com.example.hethongquanlysanphamnoibobe.request.ACreateEmployeeRequest;
import com.example.hethongquanlysanphamnoibobe.request.AUpdateInformationEmployeeRequest;
import com.example.hethongquanlysanphamnoibobe.request.AUpdatePasswordRequest;
import com.example.hethongquanlysanphamnoibobe.response.DataResponse;
import com.example.hethongquanlysanphamnoibobe.response.StatusResponse;
import com.example.hethongquanlysanphamnoibobe.service.employee.CheckFiles;
import com.example.hethongquanlysanphamnoibobe.service.employee.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class EmployeeManageService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private GenerateCode generateCode;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private EmailService emailService;


    public PageDto findEmployeesAlls(Integer page, Integer pageSize, String term) {

        Page<EmployeeProjection> employees = userRepository.findEmployeesAlls(PageRequest.of(page - 1, pageSize), term);

        return new PageDto(
                employees.getNumber() + 1,
                employees.getSize(),
                employees.getTotalPages(),
                (int) Math.ceil(employees.getTotalElements()),
                employees.getContent()
        );

    }

    // lấy nhân viên theo id
    public EmployeeProjection findEmployeeById(Integer id) {
        return userRepository.findEmployeeById(id)
                .orElseThrow(() -> new NotFoundException("Not Found With id: " + id));
    }

    // lấy danh sách roles
    public List<RoleInfo> findRolesAlls() {
        return roleRepository.findRolesAlls();
    }
    // tạo nhân viên mới
    public StatusResponse createEmployee(ACreateEmployeeRequest request) {
        // kiểm tra xem email có tồn tại không
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new BadRequestException("Email already exists. please use another email");
        }
        // tạo user mới
        User user = User.builder()
                .employeeName(request.getFullName())
                .employeeCode(generateCode.generateCode())
                .email(request.getEmail())
                .address(request.getAddress())
                .password(passwordEncoder.encode(request.getPassword()))
                .phoneNumber(request.getPhoneNumber())
                .roles(roleRepository.findAllById(request.getRoleIds()))
                .build();
        //lưu lại
        userRepository.save(user);

        return new StatusResponse(HttpStatus.CREATED,
                "Create Employee success",
                DataMapper.toDataResponse(user.getId(),user.getEmployeeCode(), user.getEmployeeName()));
    }

    // cập nhât thông tin nhân viên theo id
    public StatusResponse updateInformationEmployeeById(AUpdateInformationEmployeeRequest request, Integer id) {
        // lấy ra user theo id
        User user = userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Not Found With id" + id));
        // kiểm tra email đã tồn tại chưa
        if (userRepository.findByEmail(request.getEmail()).isPresent()){
            throw new BadRequestException("Email already exists. please use another email");
        }
        // cập nhật lại thông tin user
        user.setEmployeeName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPhoneNumber(request.getPhone());
        user.setAddress(request.getAddress());
        // lưu lại
        userRepository.save(user);

        return new  StatusResponse(HttpStatus.OK,
                "Update Information Employee success",
                DataMapper.toDataResponse(user.getId(), user.getEmployeeCode(), user.getEmployeeName()));
    }

    // cập nhật mật khẩu theo id
    public StatusResponse updatePasswordAccEmployeeById(AUpdatePasswordRequest request, Integer id) {
        // lấy ra thông tin user theo id
        User user = userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Not Found With id" + id));
        // cập nhật lại pass word mới
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        // lưu lại
        userRepository.save(user);

        // gửi mật khẩu mới về mail
        emailService.sendMail(user.getEmail(), "New Password", "Mật khẩu mới của bạn là " + request.getPassword());

        return new StatusResponse(HttpStatus.OK,
                "Update password success",
                DataMapper.toDataResponse(user.getId(), user.getEmployeeCode(), user.getEmployeeName()));
    }

    // khóa tài khoản
    public StatusResponse deleteEmployeeById(Integer id) {
        // lấy ra user theo id
        User user = userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Not Found With id" + id));
        // cập nhật lại trạng thái login
        user.setEnabled(false);
        // lưu lại
        userRepository.save(user);

        return new StatusResponse(HttpStatus.NO_CONTENT,
                "Update password success",
                DataMapper.toDataResponse(user.getId(), user.getEmployeeCode(), user.getEmployeeName()));
    }
}
