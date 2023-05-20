package com.example.hethongquanlysanphamnoibobe.service.receptionisrservice;

import com.example.hethongquanlysanphamnoibobe.dto.CustomerDto;
import com.example.hethongquanlysanphamnoibobe.dto.page.PageDto;
import com.example.hethongquanlysanphamnoibobe.dto.request.CreateCustomerRequest;
import com.example.hethongquanlysanphamnoibobe.entity.Customer;
import com.example.hethongquanlysanphamnoibobe.exception.BadRequestException;
import com.example.hethongquanlysanphamnoibobe.exception.NotFoundException;
import com.example.hethongquanlysanphamnoibobe.repository.CustomerRepository;
import com.example.hethongquanlysanphamnoibobe.repository.ProductRepository;
import com.example.hethongquanlysanphamnoibobe.response.DataResponse;
import com.example.hethongquanlysanphamnoibobe.response.StatusResponse;
import com.example.hethongquanlysanphamnoibobe.security.ICurrentUserLmpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomerService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private ICurrentUserLmpl iCurrentUserLmpl;


    // tìm kiếm san phẩm theo tên khách hang
    public PageDto searchProductStatusOKByCustomer(int page, int pageSize, String term) {

        Page<CustomerDto> customerDtoPage = productRepository.searchProductStatusOKByCustomer(PageRequest.of(page - 1, pageSize),term);

        return new PageDto(
                customerDtoPage.getNumber() + 1,
                customerDtoPage.getSize(),
                customerDtoPage.getTotalPages(),
                (int) Math.ceil(customerDtoPage.getTotalElements()),
                customerDtoPage.getContent()
        );
    }

    public PageDto searchProductStatusPendingByCustomer(int page, int pageSize, String term) {

        Page<CustomerDto> customerDtoPage = productRepository.searchProductStatusPendingByCustomer(PageRequest.of(page - 1, pageSize),term);

        return new PageDto(
                customerDtoPage.getNumber() + 1,
                customerDtoPage.getSize(),
                customerDtoPage.getTotalPages(),
                (int) Math.ceil(customerDtoPage.getTotalElements()),
                customerDtoPage.getContent()
        );
    }

    public PageDto getListProductByCustomerId(Integer id, int page, int pageSize) {

        Page<CustomerDto> customerDtoPage = productRepository.getListProductByCustomerId(PageRequest.of(page - 1, pageSize), id);

        return new PageDto(
                customerDtoPage.getNumber() + 1,
                customerDtoPage.getSize(),
                customerDtoPage.getTotalPages(),
                (int) Math.ceil(customerDtoPage.getTotalElements()),
                customerDtoPage.getContent()
        );
    }

    public CustomerDto getCustomerById(Integer id) {
        return customerRepository.getCustomerById(id).orElseThrow(() -> {
            throw new NotFoundException("Not Found with id a " + id);
        });
    }

    public StatusResponse createCustomer(CreateCustomerRequest request) {

        // lấy ra khách hàng theo email response gửi
        Optional<Customer> customer = customerRepository.findCustomerByEmail(request.getCustomerEmail());
        // nếu tồn tại khách hàng => báo lỗi đã tồn tại
        if (customer.isPresent()) {
            throw new BadRequestException("customer already exists");
        }


        // tạo khách hàng mới
        Customer newCustomer = Customer.builder()
                .fullName(request.getCustomerName())
                .email(request.getCustomerEmail())
                .phoneNumber(request.getPhoneNumber())
                .address(request.getCustomerAddress())
                .receptionists(iCurrentUserLmpl.getUser())
                .build();
        // lưu vào csdl
        customerRepository.save(newCustomer);
        // tạo response trả về
        DataResponse dataResponse = DataResponse.builder()
                .id(newCustomer.getId())
                .code(newCustomer.getEmail())
                .name(newCustomer.getFullName())
                .build();

        return new StatusResponse(HttpStatus.OK, "Create Customer success" , dataResponse);
    }
}
