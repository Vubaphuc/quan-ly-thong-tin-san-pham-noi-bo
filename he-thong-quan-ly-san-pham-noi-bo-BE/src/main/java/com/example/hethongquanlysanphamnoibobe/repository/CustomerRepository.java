package com.example.hethongquanlysanphamnoibobe.repository;

import com.example.hethongquanlysanphamnoibobe.dto.CustomerDto;
import com.example.hethongquanlysanphamnoibobe.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    Optional<Customer> findCustomerById(Integer id);
    Optional<Customer> findCustomerByEmail(String email);

    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.CustomerDto" +
            "(c.id, c.fullName, c.phoneNumber, c.email, c.address, count (p.id)) " +
            "from Customer c " +
            "left join Product p on p.customer.id = c.id " +
            "where c.id = ?1 " +
            "group by c.id")
    Optional<CustomerDto> getCustomerById(Integer id);
}