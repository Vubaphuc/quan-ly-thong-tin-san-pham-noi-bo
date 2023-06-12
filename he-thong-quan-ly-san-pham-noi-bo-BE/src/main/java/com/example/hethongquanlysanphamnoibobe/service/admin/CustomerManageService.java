package com.example.hethongquanlysanphamnoibobe.service.admin;

import com.example.hethongquanlysanphamnoibobe.dto.page.PageDto;
import com.example.hethongquanlysanphamnoibobe.dto.projection.CustomerProjection;
import com.example.hethongquanlysanphamnoibobe.entity.Customer;
import com.example.hethongquanlysanphamnoibobe.entity.Product;
import com.example.hethongquanlysanphamnoibobe.entity.User;
import com.example.hethongquanlysanphamnoibobe.exception.BadRequestException;
import com.example.hethongquanlysanphamnoibobe.exception.NotFoundException;
import com.example.hethongquanlysanphamnoibobe.mapper.DataMapper;
import com.example.hethongquanlysanphamnoibobe.repository.CustomerRepository;
import com.example.hethongquanlysanphamnoibobe.repository.ProductRepository;
import com.example.hethongquanlysanphamnoibobe.repository.UserRepository;
import com.example.hethongquanlysanphamnoibobe.request.AUpdateCustomerRequest;
import com.example.hethongquanlysanphamnoibobe.response.StatusResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class CustomerManageService {
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProductRepository productRepository;

    // lấy tất cả danh sách khách hàng
    public PageDto findCustomerAll(Integer page, Integer pageSize,String term) {

        Page<CustomerProjection> customers = customerRepository.findAllCustomer(PageRequest.of(page - 1, pageSize),term);

        return new PageDto(
                customers.getNumber() + 1,
                customers.getSize(),
                customers.getTotalPages(),
                (int) Math.ceil(customers.getTotalElements()),
                customers.getContent()
        );

    }

    // lấy ra khách hàng theo id
    public CustomerProjection findCustomerById(Integer id) {
        return customerRepository.findCustomerAndReceptionistById(id)
                .orElseThrow(() -> new NotFoundException("Not Found With Id: " + id));
    }


    // cập nhật thông tin khách hàng và thông tin người đăng ký khách hàng
    public StatusResponse updateCustomerById(AUpdateCustomerRequest request, Integer id) {
        // lấy ra khác hàng theo id
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Not Found With id: " + id));
        // lấy ra thông tin nhân viên theo mã nhân viên
        User user = userRepository.findUsersByEmployeeCode(request.getEmployeeCode())
                .orElseThrow(() -> new NotFoundException("Not Found With employee Code: " + request.getEmployeeCode()));
        // cập nhật lại thông tin khách hàng
        customer.setFullName(request.getFullName());
        customer.setEmail(request.getEmail());
        customer.setAddress(request.getAddress());
        customer.setPhoneNumber(request.getPhone());
        customer.setReceptionists(user);
        // lưu lại
        customerRepository.save(customer);

        return new StatusResponse(HttpStatus.OK, "Cập Nhật Thành Công", DataMapper.toDataResponse(customer.getId(), customer.getFullName(), customer.getPhoneNumber()));
    }

    // xóa khách hàng theo id.
    public StatusResponse deleteCustomerById(Integer id) {
        // lấy ra khách hàng theo id
        Customer customer = customerRepository.findById(id).orElseThrow(() -> new NotFoundException("Not Found With id: " + id));
        // kiểm tra khách hàng có sản phẩm nào sửa trong cửa hàng không
        if (productRepository.findByCustomer_Id(customer.getId()).isPresent()) {
            throw new BadRequestException("Customer has product information so it can't be deleted");
        }
        // xóa khách hàng nếu không có sản phẩm nào
        customerRepository.deleteById(customer.getId());

        return new
                StatusResponse(HttpStatus.NO_CONTENT,
                "Delete Customer success",
                DataMapper.toDataResponse(customer.getId(), customer.getFullName(), customer.getPhoneNumber()));
    }
}
