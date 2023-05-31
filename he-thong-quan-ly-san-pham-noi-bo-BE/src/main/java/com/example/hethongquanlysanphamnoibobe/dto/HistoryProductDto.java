package com.example.hethongquanlysanphamnoibobe.dto;

import com.example.hethongquanlysanphamnoibobe.entity.Components;
import com.example.hethongquanlysanphamnoibobe.entity.Customer;
import com.example.hethongquanlysanphamnoibobe.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HistoryProductDto {

    private Integer id;
    // tên model
    private String nameModel;
    // công ty sản xuất
    private String phoneCompany;
    // số ime
    private String IME;
    // tên lỗi
    private String defectName;
    // trạng thái sản phẩm status = false: đang pending chờ sửa, status = true: đã sửa xong;
    private boolean status;
    // nếu charge = false và isRepair = true :  là hàng bảo hành không tính phí => price = 0;
    // nếu charge = true và isRepair = true : là hàng bảo hành có tính phí => price = người dùng nhập
    private double price;
    // loại hình sửa chữa , isRepair = false => hàng mới vào, isRepair = true => hàng bảo hành
    private boolean isRepair;
    private boolean charge;
    // ngày trả sản phẩm cho khách => ngày hoàn thành quá trình sửa chữa product

    private LocalDateTime inputDate;
    // nhân viên nhận sản phẩm. có thể là nhân viên lễ tân hoặc bảo hành
    private String receptionistCode;
    private String receptionistName;
    // ngày sản phẩm chuyển cho người sửa chữa
    private LocalDateTime transferDate;
    private String engineerCode;
    private String engineerName;
    // vị trí sửa => tên linh kiện ()
    private String location;
    private String note;
    // ngày sửa chữa hoàn thành;
    private LocalDateTime outputDate;
    // trạng thái tính phí hay không tính phí: charge = true => có tính phí , charge = false => không tính phí
    // ngươ trả
    private String productPayerCode;
    private String productPayerName;
    private LocalDateTime finishDate;
    // ngày hàng nhận vào cửa hàng
    // khách hàng
    private String customerName;
    private String customerEmail;
    private String customerPhone;
    private String componentName;
    private Integer componentsWarrantyPeriod;
    private String guaranteeCode;

}
