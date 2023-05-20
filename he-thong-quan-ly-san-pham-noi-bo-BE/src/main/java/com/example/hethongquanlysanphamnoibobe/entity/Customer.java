package com.example.hethongquanlysanphamnoibobe.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "customer")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    // họ và tên khách hàng
    @Column(name = "full_name")
    private String fullName;
    // số điện thoại khách hàng
    @Column(name = "phone_number")
    private String phoneNumber;
    // email khách hàng
    @Column(name = "email",unique = true)
    private String email;
    // địa chỉ khách hàng
    @Column(name = "address")
    private String address;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receptionists_id")
    private User receptionists;

}