package com.example.hethongquanlysanphamnoibobe;

import com.example.hethongquanlysanphamnoibobe.config.GenerateCode;
import com.example.hethongquanlysanphamnoibobe.entity.Components;
import com.example.hethongquanlysanphamnoibobe.entity.Role;
import com.example.hethongquanlysanphamnoibobe.entity.User;
import com.example.hethongquanlysanphamnoibobe.entity.Vendor;
import com.example.hethongquanlysanphamnoibobe.repository.ComponentsRepository;
import com.example.hethongquanlysanphamnoibobe.repository.RoleRepository;
import com.example.hethongquanlysanphamnoibobe.repository.UserRepository;
import com.example.hethongquanlysanphamnoibobe.repository.VendorRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@SpringBootTest
class HeThongQuanLySanPhamNoiBoBeApplicationTests {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private GenerateCode generateCode;
    @Autowired
    private VendorRepository vendorRepository;
    @Autowired
    private ComponentsRepository componentsRepository;
    @Test
    void save_roles() {
        List<Role> roles = List.of(
                new Role(null, "NHANVIENLETAN"),
                new Role(null, "NHANVIENKHO"),
                new Role(null, "NHANVIENSUACHUA"),
                new Role(null, "NHANVIENBAOHANH"),
                new Role(null, "ADMIN")
        );

        roleRepository.saveAll(roles);
    }




    @Test
    void save_users () {

        Role khoRole = roleRepository.findRoleByName("NHANVIENKHO").orElse(null);
        Role baoHanhRole = roleRepository.findRoleByName("NHANVIENBAOHANH").orElse(null);
        Role suaChuaRole = roleRepository.findRoleByName("NHANVIENSUACHUA").orElse(null);
        Role leTanRole = roleRepository.findRoleByName("NHANVIENLETAN").orElse(null);
        Role ADMINRole = roleRepository.findRoleByName("ADMIN").orElse(null);


        List<User> users = List.of(
                new User(null, generateCode.generateCode(),"Diệu Linh", "linh@gmail.com",passwordEncoder.encode("111"),"0968616076","Hà Nội",null,List.of(khoRole)),
                new User(null, generateCode.generateCode(),"Bá Hậu", "hau@gmail.com",passwordEncoder.encode("111"),"0968616076","Hà Nội",null,List.of(baoHanhRole)),
                new User(null, generateCode.generateCode(),"Bá Phúc", "phuc@gmail.com",passwordEncoder.encode("111"),"0968616076","Hà Nội",null,List.of(ADMINRole)),
                new User(null, generateCode.generateCode(),"Giáp Nhàn", "nhan@gmail.com",passwordEncoder.encode("111"),"0968616076","Hà Nội",null,List.of(leTanRole)),
                new User(null, generateCode.generateCode(),"Đăng Quang", "quang@gmail.com",passwordEncoder.encode("111"),"0968616076","Hà Nội",null,List.of(suaChuaRole)),
                new User(null, generateCode.generateCode(),"Phùng Văn Tài", "tai@gmail.com",passwordEncoder.encode("111"),"0968616076","Hà Nội",null,List.of(suaChuaRole))
        );

        userRepository.saveAll(users);

    }

    @Test
    void save_vendor() {

        User user = userRepository.findUsersById(1).orElse(null);

        List<Vendor> vendors = List.of(
                new Vendor(null,"QUALCOMM",user),
                new Vendor(null,"MEDIAMART",user),
                new Vendor(null,"SHANNON",user),
                new Vendor(null,"SAMSUNG",user)
        );

        vendorRepository.saveAll(vendors);

    }

//    @Test
//    void save_linhKien () {
//
//        User user = userRepository.findUsersById(1).orElse(null);
//
//        List<Components> linhKiens = List.of(
//                new Components(null,"LCD",12,user),
//                new Components(null,"BackGlass",12,user),
//                new Components(null,"Rear",12,user),
//                new Components(null,"PIN",12,user),
//                new Components(null,"FRONT",12,user),
//                new Components(null,"PBA",12,user),
//                new Components(null,"Sub PBA",12,user),
//                new Components(null,"SPK",12,user),
//                new Components(null,"Camera Wide",9,user),
//                new Components(null,"Camera Ultra Wide",9,user),
//                new Components(null,"Camera Tele",9,user),
//                new Components(null,"Camera Bokeh",9,user),
//                new Components(null,"Front Camera",9,user),
//                new Components(null,"Camera Macro",9,user),
//                new Components(null,"Motor",16,user),
//                new Components(null,"Ant 5G",16,user),
//                new Components(null,"Power Key",16,user),
//                new Components(null,"Wifi",18,user),
//                new Components(null,"USB-C",18,user),
//                new Components(null,"GPS",18,user)
//        );
//
//        componentsRepository.saveAll(linhKiens);
//    }


}
