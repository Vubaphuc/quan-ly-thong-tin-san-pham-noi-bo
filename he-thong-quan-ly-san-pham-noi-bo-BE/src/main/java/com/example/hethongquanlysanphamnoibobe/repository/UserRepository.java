package com.example.hethongquanlysanphamnoibobe.repository;

import com.example.hethongquanlysanphamnoibobe.dto.EmployeeDto;
import com.example.hethongquanlysanphamnoibobe.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findUsersByEmail(String email);
    Optional<User> findUsersById(Integer id);


    Optional<User> findByEmail(String name);

    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.EmployeeDto(u.id, u.employeeCode, u.employeeName) " +
            "from User u " +
            "join u.roles rl " +
            "where rl.name = 'NHANVIENSUACHUA' ")
    List<EmployeeDto> getListEngineer();

    // khu vực nhân viên chung
    // ###################################################################################################

    Optional<User> findUsersByEmployeeCode(String employeeCode);

    // khu vực nhân viên lễ tân
    // ###################################################################################################

    // khu vực nhân viên sửa chữa
    // ###################################################################################################

    // khu vực nhân viên kho
    // ###################################################################################################

    // khu vực nhân viên bảo hành
    // ###################################################################################################

    // khu vực ADMIN
    // ###################################################################################################


}