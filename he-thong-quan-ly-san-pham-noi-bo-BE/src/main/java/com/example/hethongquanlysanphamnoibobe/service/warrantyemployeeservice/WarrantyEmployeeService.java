package com.example.hethongquanlysanphamnoibobe.service.warrantyemployeeservice;

import com.example.hethongquanlysanphamnoibobe.dto.GuaranteeDto;
import com.example.hethongquanlysanphamnoibobe.dto.HistoryProductDto;
import com.example.hethongquanlysanphamnoibobe.dto.ProductCustomerDto;
import com.example.hethongquanlysanphamnoibobe.dto.ProductDto;
import com.example.hethongquanlysanphamnoibobe.dto.page.PageDto;
import com.example.hethongquanlysanphamnoibobe.dto.request.CreateEmployeeEngineerRequest;
import com.example.hethongquanlysanphamnoibobe.dto.request.CreateWarrantyChargeRequest;
import com.example.hethongquanlysanphamnoibobe.dto.request.CreateWarrantyNoChargeRequest;
import com.example.hethongquanlysanphamnoibobe.entity.Customer;
import com.example.hethongquanlysanphamnoibobe.entity.Product;
import com.example.hethongquanlysanphamnoibobe.entity.User;
import com.example.hethongquanlysanphamnoibobe.exception.BadRequestException;
import com.example.hethongquanlysanphamnoibobe.exception.NotFoundException;
import com.example.hethongquanlysanphamnoibobe.repository.CustomerRepository;
import com.example.hethongquanlysanphamnoibobe.repository.GuaranteeRepository;
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

import java.util.ArrayList;

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

    // search history sản phẩm theo term
    public PageDto searchHistoryProductByTerm(int page, int pageSize, String term) {

        if (term == null || term.trim().isEmpty()) {
            return new PageDto(
                    0,0,0,0,new ArrayList<>()
            );
        }
        // dùng chung => nếu lỗi cần viết lại
        Page<HistoryProductDto> productDtos = productRepository.searchHistoryProductByTerm(PageRequest.of(page - 1, pageSize), term);

        return new PageDto(
                productDtos.getNumber() + 1,
                productDtos.getSize(),
                productDtos.getTotalPages(),
                (int) Math.ceil(productDtos.getTotalElements()),
                productDtos.getContent()
        );
    }
    // lấy ra thông tin sản phẩm và khách hàng
    public ProductCustomerDto findProductAndCustomerById(Integer id) {
        return productRepository.findProductAndCustomerById(id).orElseThrow(() -> {
            throw new NotFoundException("Not Found with id : " + id);
        });
    }

    // Lấy ra bảo hành theo id
    public GuaranteeDto getProductWarrantyById(Integer id) {
        return guaranteeRepository.getProducWarrantyById(id).orElseThrow(() -> {
            throw new NotFoundException("Not Found with id : " + id);
        });
    }


    // tạo sản phẩm bảo hành mơới có tính phí
    public StatusResponse createProductWarrantyMoney(CreateWarrantyChargeRequest request) {

        // kiểm tra xem sản phẩm đã từng sửa chữa trong cửa hàng không
        if (!productRepository.findProductById(request.getId()).isPresent()) {
            throw new BadRequestException("The product has not gone through the repair shop yet");
        }


        // lấy ra sản lịch sử sản phẩm trước đo
        Product oldProduct = productRepository.findProductById(request.getId()).orElseThrow(() -> {
            throw new NotFoundException("Not Found with Id : " + request.getId());
        });


        // tạo sản phẩm mới
        Product product = Product.builder()
                .phoneCompany(oldProduct.getPhoneCompany())
                .nameModel(oldProduct.getNameModel())
                .IME(oldProduct.getIME())
                .defectName(request.getDefectName())
                .isRepair(true)
                .price(request.getPrice())
                .customer(oldProduct.getCustomer())
                .note(request.getErrorCause())
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

        return new StatusResponse(HttpStatus.OK, "Create Product Warranty a success", dataResponse);
    }

    // tạo sản phẩm bảo hành mơới không tính phí
    public StatusResponse createProductWarrantyNoMoney(CreateWarrantyNoChargeRequest request) {
        // kiểm tra xem sản phẩm đã từng sửa chữa trong cửa hàng không
        if (!productRepository.findProductById(request.getId()).isPresent()) {
            throw new BadRequestException("The product has not gone through the repair shop yet");
        }


        // lấy ra sản lịch sử sản phẩm trước đo
        Product oldProduct = productRepository.findProductById(request.getId()).orElseThrow(() -> {
            throw new NotFoundException("Not Found with Id : " + request.getId());
        });


        // tạo sản phẩm mới
        Product product = Product.builder()
                .phoneCompany(oldProduct.getPhoneCompany())
                .nameModel(oldProduct.getNameModel())
                .IME(oldProduct.getIME())
                .defectName(request.getDefectName())
                .isRepair(true)
                .charge(false)
                .price(0)
                .customer(oldProduct.getCustomer())
                .note(request.getErrorCause())
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

        return new StatusResponse(HttpStatus.OK, "Create Product Warranty a success", dataResponse);
    }

    public PageDto getListProductWarrantyPending(int page, int pageSize, String term) {

        Page<ProductDto> productDtoPage = productRepository.getListProductWarrantyPending(PageRequest.of(page - 1, pageSize), term);

        return new PageDto(
                productDtoPage.getNumber() + 1,
                productDtoPage.getSize(),
                productDtoPage.getTotalPages(),
                (int) Math.ceil(productDtoPage.getTotalElements()),
                productDtoPage.getContent()
        );
    }

    public PageDto getListProductWarrantyOk(int page, int pageSize, String term) {

        Page<ProductDto> productDtoPage = productRepository.getListProductWarrantyOk(PageRequest.of(page - 1, pageSize), term);

        return new PageDto(
                productDtoPage.getNumber() + 1,
                productDtoPage.getSize(),
                productDtoPage.getTotalPages(),
                (int) Math.ceil(productDtoPage.getTotalElements()),
                productDtoPage.getContent()
        );
    }

    public PageDto getListProductWarrantyAll(int page, int pageSize, String term) {

        Page<ProductDto> productDtoPage = productRepository.getListProductWarrantyAll(PageRequest.of(page - 1, pageSize), term);

        return new PageDto(
                productDtoPage.getNumber() + 1,
                productDtoPage.getSize(),
                productDtoPage.getTotalPages(),
                (int) Math.ceil(productDtoPage.getTotalElements()),
                productDtoPage.getContent()
        );
    }

    public StatusResponse updateInformationEngineer(CreateEmployeeEngineerRequest request, Integer id) {
        // lấy ra user engineer theo employee code
       User user = userRepository.findUsersByEmployeeCode(request.getEmployeeCode()).orElseThrow(() -> {
           throw new NotFoundException("Not Found with code : " + request.getEmployeeCode());
       });
        // lấy ra pproduct theo id
        Product product = productRepository.findProductById(id).orElseThrow(() -> {
            throw new NotFoundException("Not Found with id : " + id);
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
}
