package com.example.hethongquanlysanphamnoibobe.repository;

import com.example.hethongquanlysanphamnoibobe.dto.projection.RoleInfo;
import com.example.hethongquanlysanphamnoibobe.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findRoleByName(String name);


    // khu vực nhân viên chung
    // ###################################################################################################


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
    @Query("select rl from Role rl where rl.name <> 'ADMIN' ")
    List<RoleInfo> findRolesAlls();
}