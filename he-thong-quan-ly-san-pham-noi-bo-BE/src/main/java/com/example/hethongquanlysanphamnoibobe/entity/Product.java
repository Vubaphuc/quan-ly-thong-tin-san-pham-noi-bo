package com.example.hethongquanlysanphamnoibobe.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;
    // tên model
    @Column(name = "name_model")
    private String nameModel;
    // công ty sản xuất
    @Column(name = "phone_company")
    private String phoneCompany;
    // số ime
    @Column(name = "ime")
    private String IME;
    // tên lỗi
    @Column(name = "defect_name")
    private String defectName;
    // trạng thái sản phẩm status = false: đang pending chờ sửa, status = true: đã sửa xong;
    @Column(name = "status")
    private boolean status;
    // nếu charge = false và isRepair = true :  là hàng bảo hành không tính phí => price = 0;
    // nếu charge = true và isRepair = true : là hàng bảo hành có tính phí => price = người dùng nhập
    @Column(name = "price")
    private double price;
    // loại hình sửa chữa , isRepair = false => hàng mới vào, isRepair = true => hàng bảo hành
    @Column(name = "repair")
    private boolean isRepair;
    // ngày hàng nhận vào cửa hàng
    @Column(name = "input_date")
    private LocalDateTime inputDate;
    // ngày sản phẩm chuyển cho người sửa chữa
    @Column(name = "transfer_date")
    private LocalDateTime transferDate;
    // vị trí sửa => tên linh kiện ()
    @Column(name = "location")
    private String location;
    // ngày sửa chữa hoàn thành;
    @Column(name = "note")
    private String note;
    @Column(name = "output_date")
    private LocalDateTime outputDate;
    // trạng thái tính phí hay không tính phí: charge = true => có tính phí , charge = false => không tính phí
    @Column(name = "charge")
    private boolean charge;
    // ngày trả sản phẩm cho khách => ngày hoàn thành quá trình sửa chữa product
    @Column(name = "finish_date")
    private LocalDateTime finishDate;

    // nhân viên nhận sản phẩm. có thể là nhân viên lễ tân hoặc bảo hành
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receptionists_id")
    private User receptionists;

    // nhân viên sửa chữa (kỹ sư)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "engineer_id")
    private User engineer;

    // thông tin khách hàng
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id")
    private Customer customer;
    // loại linh kiện sửa
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "components_id")
    private Components components;

    @PrePersist
    public void prePersist() {
        // mặc định khi tạo sản phẩm là ngày nhận sản phẩm vào của hàng
        this.inputDate = LocalDateTime.now();
        // mặc định loại sản phẩm là mới sửa chữa
        this.isRepair = false;
        // mặc đinh là có tính phí
        this.charge = true;
        // mặc định hàng mới vào là false chờ  sửa chữa
        this.status = false;
    }
}