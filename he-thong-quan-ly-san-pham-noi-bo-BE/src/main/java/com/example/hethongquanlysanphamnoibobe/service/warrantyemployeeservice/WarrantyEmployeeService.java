package com.example.hethongquanlysanphamnoibobe.service.warrantyemployeeservice;

import com.example.hethongquanlysanphamnoibobe.dto.dto.*;
import com.example.hethongquanlysanphamnoibobe.dto.page.PageDto;
import com.example.hethongquanlysanphamnoibobe.dto.projection.ProductInfo;
import com.example.hethongquanlysanphamnoibobe.dto.projection.ProductProjection;
import com.example.hethongquanlysanphamnoibobe.entity.Bill;
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

        Page<CustomerDto> customers = customerRepository.getListCustomeriesByTerm(PageRequest.of(page - 1, pageSize), term);

        return new PageDto(
                customers.getNumber() + 1,
                customers.getSize(),
                customers.getTotalPages(),
                (int) Math.ceil(customers.getTotalElements()),
                customers.getContent()
        );
    }




    // lấy ra khách hàng theo id
    public CustomerDto getCustomerById(Integer id) {
        return customerRepository.getCustomerById(id)
                .orElseThrow(() -> new NotFoundException("Not Found with id: " + id));
    }



    // lấy danh sách sản phẩm đã qua shop sửa chữa
    public PageDto findHistoryProductRepairShop(int page, int pageSize, String term) {

        Page<ProductProjection> products = productRepository.findHistoryProductRepairShop(PageRequest.of(page - 1, pageSize), term, Product.ProductStatus.DELIVERED);

        return new PageDto(
                products.getNumber() + 1,
                products.getSize(),
                products.getTotalPages(),
                (int) Math.ceil(products.getTotalElements()),
                products.getContent()
        );
    }


    // tạo sản phẩm bảo hành mới có tính phí
    public StatusResponse createProductCharge(CreateProductChargeRequest requet) {
        // lấy ra sản phẩm theo id
        Product productOld = productRepository.findById(requet.getProductId())
                .orElseThrow(() -> new NotFoundException("Not Found with id " + requet.getProductId()));
        // kiểm tra sa phẩm đã hoàn thành sửa chữa chưa
        if (productOld.getStatus() != Product.ProductStatus.DELIVERED) {
            throw new BadRequestException("The product has not been repaired. No warranty");
        }
        // tạo sản phẩm mới
        Product product = Product.builder()
                .phoneCompany(productOld.getPhoneCompany())
                .nameModel(productOld.getNameModel())
                .ime(productOld.getIme())
                .defectName(requet.getDefectName())
                .price(requet.getPrice())
                .customer(productOld.getCustomer())
                .note(requet.getNote())
                .receptionists(iCurrentUserLmpl.getUser())
                .isRepair(true) // hàng bảo hành
                .build();
        // lưu vào csdl
        productRepository.save(product);

        return new StatusResponse(HttpStatus.CREATED, "Create a successful new produc", DataMapper.toDataResponse(product.getId(), product.getIme(), product.getNameModel()));
    }
    // tạo sản phẩm bảo hành mới không tính phí
    public StatusResponse createProductNoCharge(CreateProductNoChargeRequest requet) {
        // lấy ra sản phẩm theo id
        Product productOld = productRepository.findById(requet.getProductId())
                .orElseThrow(() -> new NotFoundException("Not Found with id " + requet.getProductId()));
        // kiểm tra sa phẩm đã hoàn thành sửa chữa chưa
        if (productOld.getStatus() != Product.ProductStatus.DELIVERED) {
            throw new BadRequestException("The product has not been repaired. No warranty");
        }
        // tạo sản phẩm mới
        Product product = Product.builder()
                .phoneCompany(productOld.getPhoneCompany())
                .nameModel(productOld.getNameModel())
                .ime(productOld.getIme())
                .defectName(requet.getDefectName())
                .customer(productOld.getCustomer())
                .note(requet.getNote())
                .isRepair(true) // hàng bảo hành
                .price(0)
                .receptionists(iCurrentUserLmpl.getUser())
                .build();
        // lưu vào csdl
        productRepository.save(product);
        return new StatusResponse(HttpStatus.CREATED, "Create a successful new produc", DataMapper.toDataResponse(product.getId(), product.getIme(), product.getNameModel()));
    }

    // lấy danh sách sản phẩm đang pending chưa đăng ký người sửa chưaax
    public PageDto getListProductPendingNoEngineer(int page, int pageSize, String term) {

        Page<ProductDto> products = productRepository.getListProductPendingNoEngineer(PageRequest.of(page - 1, pageSize), term, Product.ProductStatus.DELIVERED);

        return new PageDto(
                products.getNumber() + 1,
                products.getSize(),
                products.getTotalPages(),
                (int) Math.ceil(products.getTotalElements()),
                products.getContent()
        );
    }



    // lấy danh sách sản phẩm theo ime
    public List<ProductProjection> getListHistoryProductByIME(String IME) {
        return productRepository.getListHistoryProductByIME(IME);
    }
    // lấy danh sách sản phẩm theo id
    public ProductInfo getproductById(Integer id) {
        return productRepository.getproductById(id)
                .orElseThrow(() -> new NotFoundException("Not Found with id a " + id));
    }

    // đăng ký nhân viên sửa chữa
    public StatusResponse updateEngineerInformationByProduct(InformationEngineerRequest request,Integer id) {
        // lấy ra user engineer theo employee code
        User user = userRepository.findUsersByEmployeeCode(request.getEmployeeCode())
                .orElseThrow(() -> new NotFoundException("Not Found with employee code: " + request.getEmployeeCode()));
        // lấy ra pproduct theo id
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Not Found with id: " + id));
        // thêm thông tin engineer
        product.setEngineer(user);
        product.setTransferDate(LocalDateTime.now());
        // lưu lại trên csdl
        productRepository.save(product);

        return new StatusResponse(HttpStatus.OK,"update Engineer success",DataMapper.toDataResponse(product.getId(), product.getIme(), product.getNameModel()));
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
       Product product = productRepository.findProductById_Eng(request.getProductId())
               .orElseThrow(() -> new NotFoundException("Not Found with id: " + request.getProductId()));

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
                DataMapper.toDataResponse(bill.getProduct().getId(), bill.getProduct().getIme(), bill.getProduct().getNameModel()));
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
        return productRepository.findProductPendingEngineerById(id)
                .orElseThrow(() -> new NotFoundException("Not Found With id : " + id));
    }

    public StatusResponse updateEngineerProductById(UpdateInformationEngineerRequest request, Integer id) {
        // lấy ra sản phẩm theo id
        Product product = productRepository.findProductById_Warranty(id)
                .orElseThrow(() -> new NotFoundException("Not Found with id: " + id));
        // kiểm tra sản phẩm đã hoàn thành sửa chữa chưa
        if (product.getStatus() == Product.ProductStatus.REPAIRED) {
            throw new BadRequestException("The product has been output. Can not change");
        }
        // lấy ra nhân viên sủa chữa theo mã nhân viên
        User engineer = userRepository.findUsersByEmployeeCode(request.getEmployeeCode())
                .orElseThrow(() -> new NotFoundException("Not Found with code: " + request.getEmployeeCode()));
        // cập nhật nhân viên sửa chữa
        product.setEngineer(engineer);
        productRepository.save(product);

        return new StatusResponse(HttpStatus.OK, "successful engineer change", DataMapper.toDataResponse(product.getId(), product.getIme(), product.getNameModel()));
    }

    // lấy thông tin sản phẩm và khách hàng
    public ProductProjection findCustomerAndProductById(Integer id) {
        return productRepository.findCustomerAndProductById(id, Product.ProductStatus.DELIVERED).orElseThrow(() -> new NotFoundException("Not Found with id: " + id));
    }
}
