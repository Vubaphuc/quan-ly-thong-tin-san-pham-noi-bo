package com.example.hethongquanlysanphamnoibobe.service.employee;

import com.example.hethongquanlysanphamnoibobe.dto.dto.EmployeeDto;
import com.example.hethongquanlysanphamnoibobe.dto.dto.UserDto;
import com.example.hethongquanlysanphamnoibobe.dto.projection.EmployeeInfo;
import com.example.hethongquanlysanphamnoibobe.request.ChangePasswordRequest;
import com.example.hethongquanlysanphamnoibobe.request.ForgotPasswordRequest;
import com.example.hethongquanlysanphamnoibobe.request.UpdatePersonalInformationRequest;
import com.example.hethongquanlysanphamnoibobe.entity.Image;
import com.example.hethongquanlysanphamnoibobe.entity.User;
import com.example.hethongquanlysanphamnoibobe.exception.BadRequestException;
import com.example.hethongquanlysanphamnoibobe.exception.NotFoundException;
import com.example.hethongquanlysanphamnoibobe.mapper.UserMapper;
import com.example.hethongquanlysanphamnoibobe.repository.ImageRepository;
import com.example.hethongquanlysanphamnoibobe.repository.UserRepository;
import com.example.hethongquanlysanphamnoibobe.response.DataResponse;
import com.example.hethongquanlysanphamnoibobe.response.StatusResponse;
import com.example.hethongquanlysanphamnoibobe.security.ICurrentUserLmpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Random;

@Service
public class EmployeeService {
    @Autowired
    private ICurrentUserLmpl iCurrentUserLmpl;
    @Autowired
    UserRepository userRepository;
    @Autowired
    private EmailService emailService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private ImageRepository imageRepository;
    @Autowired
    private CheckFiles checkFiles;

    // quên mật khẩu
    public StatusResponse forgotPassword(ForgotPasswordRequest request) {
        // lấy User theo Email;
        User user = userRepository.findUsersByEmail(request.getEmail()).orElseThrow(() ->
                new NotFoundException("Not Found with email: " + request.getEmail()));
        // tạo mật khẩu mới ngẫu nhiên
        Random rd = new Random();
        String newPassword = String.valueOf(rd.nextInt(900) + 100);
        // set lại mật khẩu cho user
        user.setPassword(passwordEncoder.encode(newPassword));
        // lưu user mới thay đổi mật khẩu vào csdl
        userRepository.save(user);

        // gửi mật khẩu về mail
        emailService.sendMail(user.getEmail(), "New Password", "Mật khẩu mới của bạn là " + newPassword);

        DataResponse dataResponse = DataResponse.builder()
                .id(user.getId())
                .name(user.getEmployeeName())
                .code(user.getEmployeeCode())
                .build();

        return new StatusResponse(HttpStatus.OK, newPassword, dataResponse);
    }

    // thay đổi mật khẩu
    public StatusResponse changePassword(ChangePasswordRequest request) {
        // lấy ra tài khoản đang login
        User user = iCurrentUserLmpl.getUser();
        // kiểm tra xem mật khẩu đúng không
        if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
            throw new BadRequestException("Old password is incorrect");
        }
        // kiểm tra xem mật khẩu mới và mật khẩu cũ có trùng nhau không
        if (request.getOldPassword().equals(request.getNewPassword())) {
            throw new BadRequestException("The new password cannot be the same as the old password");
        }
        // kiểm tra mật khẩu mới và nhập lại mật khẩu mới có trùng nhau không
        if (!request.getNewPassword().equals(request.getConfirmNewPassword())) {
            throw new BadRequestException("New password does not match confirm new password");
        }
        // set lại password cho user
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        // lưu lại trên csdl
        userRepository.save(user);

        DataResponse dataResponse = DataResponse.builder()
                .id(user.getId())
                .name(user.getEmployeeName())
                .code(user.getEmployeeCode())
                .build();

        return new StatusResponse(HttpStatus.OK, "Change password success", dataResponse);

    }

    // Cập nhât thông thông tin cá nhân
    public UserDto updatePersonalInformation(UpdatePersonalInformationRequest request) {
        // lấy ra tài khoản đang login
        User user = iCurrentUserLmpl.getUser();
        // set lại thông tin cho use
        user.setEmployeeName(request.getFullName());
        user.setPhoneNumber(request.getPhone());
        user.setAddress(request.getAddress());
        // lưu lên csdl
        userRepository.save(user);

        return UserMapper.toUserDto(user);

    }

    // cập nhật ảnh đại diện
    public StatusResponse updateProfilePicture(MultipartFile avatar) {

        // kiểm tra tiêu chuẩn file(kích thước file, type file, tên file)
        checkFiles.validataFile(avatar);

        try {
            // lấy ra user đang login
            User user = iCurrentUserLmpl.getUser();
            // tạo 1 image
            Image image = Image.builder()
                    .type(avatar.getContentType())
                    .data(avatar.getBytes())
                    .user(user)
                    .build();

            // lưu lại trên csdl
            imageRepository.save(image);

            // cập nhât avatar cho user
            user.setAvatar(image);
            // lưu lại thay đổi lên csdl
            userRepository.save(user);

            DataResponse dataResponse = DataResponse.builder()
                    .id(user.getId())
                    .name(user.getEmployeeName())
                    .code(user.getEmployeeCode())
                    .build();


            return new StatusResponse(HttpStatus.OK, "Cập nhật thành công", dataResponse);


        } catch (IOException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    // lấy ảnh đại diện user theo id
    public Image getAvatarById(Integer id) {
        // kểm tra xem id có phải id user đang login không
        if (iCurrentUserLmpl.getUser().getId() != id) {
            throw new BadRequestException("ID: " + id + " not your ID");
        }
        // kiểm tra xem user đã có avater hay chưa
        if (iCurrentUserLmpl.getUser().getAvatar() == null) {
            try {
                Path path = Paths.get("src/main/resources/static/images/avatar-mac-dinh.png");
                byte[] defaultImageData = Files.readAllBytes(path);

                Image image = Image.builder()
                        .type("avatar-mac-dinh/png")
                        .data(defaultImageData)
                        .build();
                // nếu không có avatar nào thì trả về 1 image mặc định
                return image;

            } catch (IOException e) {
                throw new NotFoundException("Unable to access avatar");
            }
        }
        // nếu có thì trả về image của user
        Image image = imageRepository.findImageById(iCurrentUserLmpl.getUser().getAvatar().getId()).orElseThrow(() -> {
            throw new NotFoundException("Not Found with id = " + id);
        });

        return image;

    }

    // lấy ra danh sách nhân viên sửa chữa
    public List<EmployeeDto> getListEngineer() {
        return userRepository.getListEngineer();
    }
    // lấy danh sách nhân viên lễ tân
    public List<EmployeeDto> findReceptionistAll() {
        return userRepository.findReceptionistAll();
    }
    // lấy danh sách nhân viên Kho
    public List<EmployeeDto> findWarehouseEmployeeAll() {
        return userRepository.findWarehouseEmployeeAll();
    }
    // lấy danh sách nhân viên lễ tân và bảo hành
    public List<EmployeeInfo> findReceptionistAndWarrantyEmployeeAll() {
        return userRepository.findReceptionistAndWarrantyEmployeeAll();
    }
    // lấy danh sách nhân viên bảo hành
}
