package com.example.hethongquanlysanphamnoibobe.repository;

import com.example.hethongquanlysanphamnoibobe.dto.dto.EmployeeDto;
import com.example.hethongquanlysanphamnoibobe.dto.projection.EmployeeInfo;
import com.example.hethongquanlysanphamnoibobe.dto.projection.EmployeeProjection;
import com.example.hethongquanlysanphamnoibobe.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    // lấy user theo email
    Optional<User> findUsersByEmail(String email);
    // lấy user theo id
    Optional<User> findUsersById(Integer id);

    // lấy user theo email
    Optional<User> findByEmail(String name);
    // lấy danh sách nhân viên sửa chữa
    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.dto.EmployeeDto(u.id, u.employeeCode, u.employeeName) " +
            "from User u " +
            "join u.roles rl " +
            "where rl.name = 'NHANVIENSUACHUA' ")
    List<EmployeeDto> getListEngineer();

    // khu vực nhân viên chung
    // ###################################################################################################
    // lấy user theo code nhân viên
    Optional<User> findUsersByEmployeeCode(String employeeCode);
    // lấy danh sách nhân viên lễ tân
    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.dto.EmployeeDto(u.id, u.employeeCode, u.employeeName) " +
            "from User u " +
            "join u.roles rl " +
            "where rl.name = 'NHANVIENLETAN' ")
    List<EmployeeDto> findReceptionistAll();
    // lấy danh sách nhân viên kho
    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.dto.EmployeeDto(u.id, u.employeeCode, u.employeeName) " +
            "from User u " +
            "join u.roles rl " +
            "where rl.name = 'NHANVIENKHO' ")
    List<EmployeeDto> findWarehouseEmployeeAll();

    @Query("select u from User u join u.roles rl where rl.name = 'NHANVIENLETAN' or rl.name = 'NHANVIENBAOHANH' ")
    List<EmployeeInfo> findReceptionistAndWarrantyEmployeeAll();



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

    @Query("select u from User u where u.email like %?1% ")
    Page<EmployeeProjection> findEmployeesAlls(Pageable pageable, String term);


    @Query("select u from User u where u.id = ?1 ")
    Optional<EmployeeProjection> findEmployeeById(Integer id);

    @Query("select u from User u join u.roles rl where rl.name = 'NHANVIENSUACHUA' ")
    List<User> findEmployeeEngineerAll();


}