package com.example.hethongquanlysanphamnoibobe.service.receptionisrservice;

import com.example.hethongquanlysanphamnoibobe.dto.BillDto;
import com.example.hethongquanlysanphamnoibobe.dto.HistoryProductDto;
import com.example.hethongquanlysanphamnoibobe.dto.page.PageDto;
import com.example.hethongquanlysanphamnoibobe.dto.request.CreateBillRequest;
import com.example.hethongquanlysanphamnoibobe.dto.request.CreateProductRequet;
import com.example.hethongquanlysanphamnoibobe.dto.request.InformationEngineerRequest;
import com.example.hethongquanlysanphamnoibobe.entity.Bill;
import com.example.hethongquanlysanphamnoibobe.entity.Customer;
import com.example.hethongquanlysanphamnoibobe.entity.Product;
import com.example.hethongquanlysanphamnoibobe.entity.User;
import com.example.hethongquanlysanphamnoibobe.exception.BadRequestException;
import com.example.hethongquanlysanphamnoibobe.exception.NotFoundException;
import com.example.hethongquanlysanphamnoibobe.repository.BillRepository;
import com.example.hethongquanlysanphamnoibobe.repository.CustomerRepository;
import com.example.hethongquanlysanphamnoibobe.repository.ProductRepository;
import com.example.hethongquanlysanphamnoibobe.repository.UserRepository;
import com.example.hethongquanlysanphamnoibobe.response.DataResponse;
import com.example.hethongquanlysanphamnoibobe.response.StatusResponse;
import com.example.hethongquanlysanphamnoibobe.security.ICurrentUserLmpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ICurrentUserLmpl iCurrentUserLmpl;
    @Autowired
    private BillRepository billRepository;
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private UserRepository userRepository;

    // lấy ra danh sách sản phẩm chưa đăng ký người sửa có phân trang
    public PageDto getPageProductNewCreate(int page, int pageSize, String term) {
        // lấy ra danh sách có phân trang product theo term
        Page<HistoryProductDto> productDtoPage = productRepository.getPageProductNewCreate(PageRequest.of(page, pageSize),term);
        //
        return new PageDto(
                productDtoPage.getNumber() + 1,
                productDtoPage.getSize(),
                productDtoPage.getTotalPages(),
                (int) Math.ceil(productDtoPage.getTotalElements()),
                productDtoPage.getContent()
        );
    }
    // lấy ra product theo Id
    public HistoryProductDto getproductById(Integer id) {
        return productRepository.getproductById(id).orElseThrow(() -> {
            throw new NotFoundException("Not Found with id a " + id);
        });
    }
    // cập nhật thông tin nhân viên sửa chữa  theo id product
    public StatusResponse updateEngineerInformationByProduct(InformationEngineerRequest request, Integer id) {
        // lấy ra user engineer theo employee code
        User user = userRepository.findUsersByEmployeeCode(request.getEmployeeCode()).orElseThrow(() -> {
           throw new NotFoundException("Not Found with employee code a " + request.getEmployeeCode());
        });
        // lấy ra pproduct theo id
        Product product = productRepository.findProductById(id).orElseThrow(() -> {
            throw new NotFoundException("Not Found with id a " + id);
        });
        // thêm thông tin engineer
        product.setEngineer(user);
        // lưu lại trên csdl
        productRepository.save(product);
        // tạo response trả về
        DataResponse dataResponse = DataResponse.builder()
                // id product
                .id(product.getId())
                // ime product
                .code(product.getIME())
                // tên model
                .name(product.getNameModel())
                .build();

        return new StatusResponse(HttpStatus.OK,"update Engineer success",dataResponse);

    }
   // lấy ra danh sách sản phẩm đã sửa chữa ok có phaân trang
    public PageDto getPageProductStatusOK(int page, int pageSize, String term) {

        if (term == null || term.trim().isEmpty()) {
            return new PageDto(
                    0,0,0,0,new ArrayList<>()
            );
        }
        Page<HistoryProductDto> productDtoPage = productRepository.getPageProductStatusOK(PageRequest.of(page, pageSize),term);

        return new PageDto(
                productDtoPage.getNumber() + 1,
                productDtoPage.getSize(),
                productDtoPage.getTotalPages(),
                (int) Math.ceil(productDtoPage.getTotalElements()),
                productDtoPage.getContent()
        );
    }
    // tìm kiếm lịch sử product có phân trang
    public PageDto searchHistoryProductByTerm(int page, int pageSize, String term) {
        // kiểm tra xem term có null hoặc rỗng không
        if (term == null || term.trim().isEmpty()) {
            return new PageDto(
                    0,0,0,0,new ArrayList<>()
            );
        }
        // lấy ra danh sách có phân trang product theo term
        Page<HistoryProductDto> productDtoPage = productRepository.searchHistoryProductByTerm(PageRequest.of(page, pageSize),term);

        return new PageDto(
                productDtoPage.getNumber() + 1,
                productDtoPage.getSize(),
                productDtoPage.getTotalPages(),
                (int) Math.ceil(productDtoPage.getTotalElements()),
                productDtoPage.getContent()
        );
    }
    // đăng ký sản phẩm mới
    public StatusResponse createProduct(CreateProductRequet requet) {
        // lấy ra khách hàng theo id
        Customer customer = customerRepository.findCustomerById(requet.getCustomerId()).orElseThrow(() -> {
            throw new NotFoundException("Not Found with id: " + requet.getCustomerId());
        });
        // tạo sản phẩm mới
        Product product = Product.builder()
                .phoneCompany(requet.getPhoneCompany())
                .nameModel(requet.getModel())
                .IME(requet.getIME())
                .defectName(requet.getDefectName())
                .price(requet.getPrice())
                .customer(customer)
                .receptionists(iCurrentUserLmpl.getUser())
                .build();
        // lưu vào csdl
        productRepository.save(product);

        // tạo response trả về
        DataResponse dataResponse = DataResponse.builder()
                // id product
                .id(product.getId())
                // IME Product
                .code(product.getIME())
                // name model product
                .name(product.getNameModel())
                .build();

        return new StatusResponse(HttpStatus.OK, "Create Product a success", dataResponse);
    }

    public StatusResponse createBill(CreateBillRequest requet) {
        // lấy ra sản phẩm theo id
        Product product = productRepository.findProductById(requet.getProductId()).orElseThrow(() -> {
            throw new NotFoundException("Not Found with id : " + requet.getProductId());
        });
        // kiểm tra sản phẩm đã hoàn thành chưa
        if (product.getFinishDate() == null) {
            throw new BadRequestException("Payment for the product has been completed");
        }
        // tạo hóa đơn moi
        Bill bill = Bill.builder()
                .invoiceCreator(iCurrentUserLmpl.getUser())
                .invoiceCreationDate(LocalDateTime.now())
                .product(product)
                .build();
        // lưu vào csdl
        billRepository.save(bill);
        // tạo response trả về
        DataResponse dataResponse = DataResponse.builder()
                // id bill
                .id(bill.getId())
                // IME Product
                .code(bill.getProduct().getIME())
                // name model product
                .name(bill.getProduct().getNameModel())
                .build();

        return new StatusResponse(HttpStatus.OK, "Create bill a success", dataResponse);
    }

    public BillDto getBillById(Integer id) {
        return productRepository.getBillById(id).orElseThrow(() -> {
            throw new NotFoundException("Not Found with id : " + id);
        });
    }
}
