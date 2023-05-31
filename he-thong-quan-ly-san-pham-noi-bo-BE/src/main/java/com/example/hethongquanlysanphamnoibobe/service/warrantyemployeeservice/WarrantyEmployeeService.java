package com.example.hethongquanlysanphamnoibobe.service.warrantyemployeeservice;

import com.example.hethongquanlysanphamnoibobe.dto.*;
import com.example.hethongquanlysanphamnoibobe.dto.page.PageDto;
import com.example.hethongquanlysanphamnoibobe.entity.Bill;
import com.example.hethongquanlysanphamnoibobe.entity.Customer;
import com.example.hethongquanlysanphamnoibobe.entity.Product;
import com.example.hethongquanlysanphamnoibobe.entity.User;
import com.example.hethongquanlysanphamnoibobe.exception.BadRequestException;
import com.example.hethongquanlysanphamnoibobe.exception.NotFoundException;
import com.example.hethongquanlysanphamnoibobe.mapper.DataMapper;
import com.example.hethongquanlysanphamnoibobe.repository.*;
import com.example.hethongquanlysanphamnoibobe.request.*;
import com.example.hethongquanlysanphamnoibobe.response.StatusResponse;
import com.example.hethongquanlysanphamnoibobe.security.ICurrentUserLmpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class WarrantyEmployeeService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ICurrentUserLmpl iCurrentUserLmpl;
    @Autowired
    private GuaranteeRepository guaranteeRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private BillRepository billRepository;


    // lấy danh sách khách hàng trong cửa hàng
    public PageDto getListCustomeriesByTerm(int page, int pageSize, String term) {
        Page<CustomerDto> customerDtoPage = customerRepository.getListCustomeriesByTerm(PageRequest.of(page - 1, pageSize), term);
        return new PageDto(
                customerDtoPage.getNumber() + 1,
                customerDtoPage.getSize(),
                customerDtoPage.getTotalPages(),
                (int) Math.ceil(customerDtoPage.getTotalElements()),
                customerDtoPage.getContent()
        );
    }
    // lấy ra khách hàng theo id
    public CustomerDto getCustomerById(Integer id) {
        return customerRepository.getCustomerById(id).orElseThrow(() -> {
            throw new NotFoundException("Not Found with id: " + id);
        });
    }
    // tạo sản phẩm bảo hành mới có tính phí
    public StatusResponse createProductCharge(CreateProductChargeRequest requet) {
        // lấy ra khách hàng theo id
        Customer customer = customerRepository.findCustomerById(requet.getCustomerId()).orElseThrow(() -> {
            throw new NotFoundException("Not Found with id " + requet.getCustomerId());
        });

        if (!productRepository.findProductByIME(requet.getIme()).get().isStatus()) {
            throw new BadRequestException("The product has not been repaired. No warranty");
        }
        // tạo sản phẩm mới
        Product product = Product.builder()
                .phoneCompany(requet.getPhoneCompany())
                .nameModel(requet.getModel())
                .IME(requet.getIme())
                .defectName(requet.getDefectName())
                .price(requet.getPrice())
                .customer(customer)
                .note(requet.getNote())
                .receptionists(iCurrentUserLmpl.getUser())
                .isRepair(true) // hàng bảo hành
                .charge(true) // có tính phí
                .build();
        // lưu vào csdl
        productRepository.save(product);

        return new StatusResponse(HttpStatus.OK, "Create a successful new produc", DataMapper.toDataResponse(product.getId(), product.getIME(), product.getNameModel()));
    }
    // tạo sản phẩm bảo hành mới không tính phí
    public StatusResponse createProductNoCharge(CreateProductNoChargeRequest requet) {
        // lấy ra khách hàng theo id
        Customer customer = customerRepository.findCustomerById(requet.getCustomerId()).orElseThrow(() -> {
            throw new NotFoundException("Not Found with id " + requet.getCustomerId());
        });
        // tạo sản phẩm mới
        Product product = Product.builder()
                .phoneCompany(requet.getPhoneCompany())
                .nameModel(requet.getModel())
                .IME(requet.getIme())
                .defectName(requet.getDefectName())
                .customer(customer)
                .note(requet.getNote())
                .isRepair(true) // hàng bảo hành
                .charge(false) // không tính phí
                .price(0)
                .receptionists(iCurrentUserLmpl.getUser())
                .build();
        // lưu vào csdl
        productRepository.save(product);
        return new StatusResponse(HttpStatus.OK, "Create a successful new produc", DataMapper.toDataResponse(product.getId(), product.getIME(), product.getNameModel()));
    }

    // lấy danh sách sản phẩm đang pending chưa đăng ký người sửa chưaax
    public PageDto getListProductPendingNoEngineer(int page, int pageSize, String term) {

        Page<ProductDto> productDtoPage = productRepository.getListProductPendingNoEngineer(PageRequest.of(page - 1, pageSize), term);

        return new PageDto(
                productDtoPage.getNumber() + 1,
                productDtoPage.getSize(),
                productDtoPage.getTotalPages(),
                (int) Math.ceil(productDtoPage.getTotalElements()),
                productDtoPage.getContent()
        );
    }



    // lấy danh sách sản phẩm theo ime
    public List<HistoryProductDto> getListHistoryProductByIME(String IME) {
        return productRepository.getListHistoryProductByIME(IME);
    }
    // lấy danh sách sản phẩm theo id
    public HistoryProductDto getproductById(Integer id) {
        return productRepository.getproductById(id).orElseThrow(() -> {
            throw new NotFoundException("Not Found with id a " + id);
        });
    }

    // đăng ký nhân viên sửa chữa
    public StatusResponse updateEngineerInformationByProduct(InformationEngineerRequest request) {
        // lấy ra user engineer theo employee code
        User user = userRepository.findUsersByEmployeeCode(request.getEmployeeCode()).orElseThrow(() -> {
            throw new NotFoundException("Not Found with employee code: " + request.getEmployeeCode());
        });
        // lấy ra pproduct theo id
        Product product = productRepository.findProductById(request.getProductId()).orElseThrow(() -> {
            throw new NotFoundException("Not Found with id: " + request.getProductId());
        });
        // thêm thông tin engineer
        product.setEngineer(user);
        product.setTransferDate(LocalDateTime.now());
        // lưu lại trên csdl
        productRepository.save(product);

        return new StatusResponse(HttpStatus.OK,"update Engineer success",DataMapper.toDataResponse(product.getId(), product.getIME(), product.getNameModel()));
    }
    // lấy danh sách sản phẩm bảo hành sửa chữa ok
    public PageDto findProductGuaranteeStatusOKByTerm(int page, int pageSize, String term) {

        Page<ProductGuaranteeDto> productDtoPage = productRepository.findProductGuaranteeStatusOKByTerm(PageRequest.of(page - 1, pageSize), term);

        return new PageDto(
                productDtoPage.getNumber() + 1,
                productDtoPage.getSize(),
                productDtoPage.getTotalPages(),
                (int) Math.ceil(productDtoPage.getTotalElements()),
                productDtoPage.getContent()
        );

    }



    // tạo hóa đơn mới - 7
    public StatusResponse warrantyCreateBill(CreateBillRequest request) {
        // lấy ra sản phẩm theo id
       Product product = productRepository.findProductById_Eng(request.getProductId()).orElseThrow(() -> {
           throw new NotFoundException("Not Found with id: " + request.getProductId());
       });

        // kiểm tra sản phẩm đã hoàn thành chưa
        if (product.getFinishDate() != null) {
            throw new BadRequestException("Payment for the product has been completed");
        }
        product.setFinishDate(LocalDateTime.now());
        product.setProductPayer(iCurrentUserLmpl.getUser());
        productRepository.save(product);
        // tạo hóa đơn moi
        Bill bill = Bill.builder()
                .invoiceCreator(iCurrentUserLmpl.getUser())
                .invoiceCreationDate(LocalDateTime.now())
                .product(product)
                .build();
        // lưu vào csdl
        billRepository.save(bill);
        // tạo response trả về

        return new StatusResponse(HttpStatus.OK,
                "Create bill a success",
                DataMapper.toDataResponse(bill.getProduct().getId(), bill.getProduct().getIME(), bill.getProduct().getNameModel()));
    }
    // lấy danh saách hhoas đơn bảo hành
    public  PageDto findBillProductGuaranteeAll(int page, int pageSize, String term) {

        Page<BillGuaranteeDto> bills = billRepository.findBillProductGuaranteeAll(PageRequest.of(page - 1, pageSize), term);

        return new PageDto(
                bills.getNumber() + 1,
                bills.getSize(),
                bills.getTotalPages(),
                (int) Math.ceil(bills.getTotalElements()),
                bills.getContent()
        );
    }
    // lấy danh sách bảo hành và tìm kiếm theo IME
    public PageDto findGuaranteeAll(int page, int pageSize, String term) {

        Page<GuaranteeDto> bills = guaranteeRepository.findGuaranteeAll(PageRequest.of(page - 1, pageSize), term);

        return new PageDto(
                bills.getNumber() + 1,
                bills.getSize(),
                bills.getTotalPages(),
                (int) Math.ceil(bills.getTotalElements()),
                bills.getContent()
        );
    }
    // lấy danh sách sản phẩm đang pending bên chỗ người sửa chữa
    public PageDto findProductEngineerPendingAll(int page, int pageSize, String term) {
        Page<ProductAndEngineerDto> productAndEngineerDtos = productRepository.findProductEngineerPendingAll(PageRequest.of(page - 1, pageSize), term);

        return new PageDto(
                productAndEngineerDtos.getNumber() + 1,
                productAndEngineerDtos.getSize(),
                productAndEngineerDtos.getTotalPages(),
                (int) Math.ceil(productAndEngineerDtos.getTotalElements()),
                productAndEngineerDtos.getContent()
        );
    }
    // láy sản phẩm pending chỗ nhân viên sửa chữa theo id
    public ProductAndEngineerDto findProductPendingEngineerById(Integer id) {
        return productRepository.findProductPendingEngineerById(id).orElseThrow(() -> {
            throw new NotFoundException("Not Found With id : " + id);
        });
    }

    public StatusResponse updateEngineerProductById(UpdateInformationEngineerRequest request, Integer id) {

        Product product = productRepository.findProductById_Warranty(id).orElseThrow(() -> {
            throw new NotFoundException("Not Found with id: " + id);
        });

        if (product.isStatus()) {
            throw new BadRequestException("The product has been output. Can not change");
        }

        User engineer = userRepository.findUsersByEmployeeCode(request.getEmployeeCode()).orElseThrow(() -> {
            throw new NotFoundException("Not Found with code: " + request.getEmployeeCode());
        });

        product.setEngineer(engineer);
        productRepository.save(product);

        return new StatusResponse(HttpStatus.OK, "successful engineer change", DataMapper.toDataResponse(product.getId(), product.getIME(), product.getNameModel()));
    }
}
