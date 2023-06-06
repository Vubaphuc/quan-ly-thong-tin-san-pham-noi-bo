package com.example.hethongquanlysanphamnoibobe.repository;

import com.example.hethongquanlysanphamnoibobe.dto.CustomerDto;
import com.example.hethongquanlysanphamnoibobe.dto.projection.CustomerProjection;
import com.example.hethongquanlysanphamnoibobe.entity.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {

    Optional<Customer> findCustomerByEmail(String email);



    // khu vực nhân viên chung
    // ###################################################################################################

    Optional<Customer> findCustomerById(Integer id);

    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.CustomerDto" +
            "(c.id, c.fullName, c.phoneNumber, c.email, c.address, count (p.id)) " +
            "from Customer c " +
            "left join Product p on p.customer.id = c.id " +
            "where c.id = ?1 " +
            "group by c.id ")
    Optional<CustomerDto> getCustomerById(Integer id);


    // khu vực nhân viên lễ tân
    // ###################################################################################################

    // khu vực nhân viên sửa chữa
    // ###################################################################################################

    // khu vực nhân viên kho
    // ###################################################################################################

    // khu vực nhân viên bảo hành
    // ###################################################################################################

    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.CustomerDto" +
            "(c.id, c.fullName, c.phoneNumber, c.email, c.address, count (p.id)) " +
            "from Customer c " +
            "left join Product p on p.customer.id = c.id " +
            "where (c.phoneNumber like %?1% or c.email like %?1% and c.fullName like %?1% ) " +
            "group by c.id ")
    Page<CustomerDto> getListCustomeriesByTerm(Pageable pageable, String term);

    // khu vực ADMIN
    // ###################################################################################################
    @Query("select c from Customer c where (c.email like %?1% or c.phoneNumber like %?1% or c.fullName like %?1% )")
    Page<CustomerProjection> findAllCustomer(Pageable pageable, String term);

    @Query("select c from Customer c where c.id = ?1 ")
    Optional<CustomerProjection> findCustomerAndReceptionistById(Integer id);
}