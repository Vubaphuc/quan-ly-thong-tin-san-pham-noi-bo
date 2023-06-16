package com.example.hethongquanlysanphamnoibobe.service.receptionisrservice;

import com.example.hethongquanlysanphamnoibobe.config.GenerateCode;
import com.example.hethongquanlysanphamnoibobe.dto.dto.BillDto;
import com.example.hethongquanlysanphamnoibobe.dto.dto.GuaranteeDto;
import com.example.hethongquanlysanphamnoibobe.dto.page.PageDto;
import com.example.hethongquanlysanphamnoibobe.dto.projection.ProductInfo;
import com.example.hethongquanlysanphamnoibobe.dto.projection.ProductProjection;
import com.example.hethongquanlysanphamnoibobe.entity.*;
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
import java.util.ArrayList;
import java.util.List;

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
    @Autowired
    private GenerateCode generateCode;
    @Autowired
    private GuaranteeRepository guaranteeRepository;

    // lấy ra danh sách sản phẩm chưa đăng ký người sửa có phân trang
    public PageDto findProductWaitingRepairAll(int page, int pageSize, String term) {

        // lấy ra danh sách có phân trang product theo term - 1
        Page<ProductProjection> products = productRepository.findProductWaitingRepairAll(PageRequest.of(page - 1, pageSize),term, Product.ProductStatus.WAITING_FOR_REPAIR);
        //
        return new PageDto(
                products.getNumber() + 1,
                products.getSize(),
                products.getTotalPages(),
                (int) Math.ceil(products.getTotalElements()),
                products.getContent()
        );
    }


    // lấy ra product theo Id - 2
    public ProductInfo getproductById(Integer id) {
        return productRepository.getproductById(id).orElseThrow(() -> new NotFoundException("Not Found with id a " + id));
    }




    // cập nhật thông tin nhân viên sửa chữa  theo id product - 3
    public StatusResponse updateEngineerInformationByProduct(InformationEngineerRequest request, Integer id) {

        // lấy ra user engineer theo employee code
        User user = userRepository.findUsersByEmployeeCode(request.getEmployeeCode()).orElseThrow(() -> new NotFoundException("Not Found with employee code a " + request.getEmployeeCode()));
        // lấy ra pproduct theo id
        Product product = productRepository.findById(id).orElseThrow(() -> new NotFoundException("Not Found with id a " + id));
        // thêm thông tin engineer
        product.setEngineer(user);
        product.setStatus(Product.ProductStatus.UNDER_REPAIR);
        product.setTransferDate(LocalDateTime.now());
        // lưu lại trên csdl
        productRepository.save(product);

        return new StatusResponse(HttpStatus.OK,"update Engineer success",DataMapper.toDataResponse(product.getId(), product.getIme(), product.getNameModel()));

    }

   // lấy ra danh sách sản phẩm đã sửa chữa ok chờ trả khách có phaân trang - 4
    public PageDto findProductWaitingReturnCustomerAll(int page, int pageSize, String term) {

        Page<ProductProjection> products = productRepository.findProductWaitingReturnCustomerAll(PageRequest.of(page - 1, pageSize),term, Product.ProductStatus.WAITING_FOR_RETURN);

        return new PageDto(
                products.getNumber() + 1,
                products.getSize(),
                products.getTotalPages(),
                (int) Math.ceil(products.getTotalElements()),
                products.getContent()
        );
    }
    // lấy danh sách sản phẩm ok chờ tạo bảo hành
    public PageDto findProductWaitingRegisterGuaranteeAll(int page, int pageSize, String term) {

        Page<ProductProjection> products = productRepository.findProductWaitingRegisterGuaranteeAll(PageRequest.of(page - 1, pageSize), term, Product.ProductStatus.REPAIRED);

        return new PageDto(
                products.getNumber() + 1,
                products.getSize(),
                products.getTotalPages(),
                (int) Math.ceil(products.getTotalElements()),
                products.getContent()
        );

    }





    // tìm kiếm lịch sử product có phân trang - 5
    public PageDto searchHistoryProductByTerm(int page, int pageSize, String term) {
        // kiểm tra xem term có null hoặc rỗng không
        if (term == null || term.trim().isEmpty()) {
            return new PageDto(
                    0,0,0,0,new ArrayList<>()
            );
        }
        // lấy ra danh sách có phân trang product theo term
        Page<ProductProjection> products = productRepository.searchHistoryProductByTerm(PageRequest.of(page - 1, pageSize),term);

        return new PageDto(
                products.getNumber() + 1,
                products.getSize(),
                products.getTotalPages(),
                (int) Math.ceil(products.getTotalElements()),
                products.getContent()
        );
    }
    // đăng ký sản phẩm mới - 6
    public StatusResponse createProduct(CreateProductRequet requet) {
        // lấy ra khách hàng theo id
        Customer customer = customerRepository.findCustomerById(requet.getCustomerId()).orElseThrow(() -> new NotFoundException("Not Found with id: " + requet.getCustomerId()));
        // tạo sản phẩm mới
        Product product = Product.builder()
                .phoneCompany(requet.getPhoneCompany())
                .nameModel(requet.getModel())
                .ime(requet.getIme())
                .defectName(requet.getDefectName())
                .price(requet.getPrice())
                .isRepair(false)
                .customer(customer)
                .receptionists(iCurrentUserLmpl.getUser())
                .build();
        // lưu vào csdl
        productRepository.save(product);


        return new StatusResponse(HttpStatus.OK, "Create Product a success", DataMapper.toDataResponse(product.getId(), product.getIme(), product.getNameModel()));
    }
    // tạo hóa đơn mới - 7
    public StatusResponse createBill(Integer id) {
        // lấy ra sản phẩm theo id
        Product product = productRepository.findById(id).orElseThrow(() -> new NotFoundException("Not Found with id : " + id));
        // kiểm tra sản phẩm đã hoàn thành chưa
        if (product.getStatus() != Product.ProductStatus.WAITING_FOR_RETURN) {
            throw new BadRequestException("Payment for the product has been completed");
        }
        product.setFinishDate(LocalDateTime.now());
        product.setStatus(Product.ProductStatus.DELIVERED);
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
    // tạo bảo hành
    public StatusResponse createNewWarranty (Integer id) {
        // lấy ra sản phẩm theo id
        Product product = productRepository.findById(id).orElseThrow(() -> new NotFoundException("Not Found with id:  " + id));
        // // kiểm tra xem sản phẩm đã hoàn thành chưa
        if (product.getStatus() == Product.ProductStatus.UNDER_REPAIR) {
            throw new BadRequestException("Product repair completed repair");
        }
        if (product.getStatus() == Product.ProductStatus.DELIVERED || product.getStatus() == Product.ProductStatus.WAITING_FOR_RETURN) {
            throw new BadRequestException("Product repair completed repair");
        }
        // kiểm tra sản phẩm đã tạo hoá đơn chưa
        if (checkProduct(product)) {
            throw new BadRequestException("The product has been registered for guarantee");
        }
        // tạo bảo hành mới
        Guarantee guarantee = Guarantee.builder()
                .guaranteeCode(generateCode.generateCode())
                .activationEmployee(iCurrentUserLmpl.getUser())
                .product(product)
                .build();
        guaranteeRepository.save(guarantee);

        product.getGuarantees().add(guarantee);
        product.setStatus(Product.ProductStatus.WAITING_FOR_RETURN);
        productRepository.save(product);

        return new StatusResponse(HttpStatus.CREATED, "registered guarantee successfully", DataMapper.toDataResponse(guarantee.getId(), guarantee.getGuaranteeCode(), guarantee.getActivationEmployee().getEmployeeName()));

    }
    // kiểm tra sản phẩm đã tạo hóa đơn chưa
    private boolean checkProduct(Product product) {
        List<Guarantee> guarantees = guaranteeRepository.findAll();
        for (Guarantee guarantee : guarantees) {
            if (guarantee.getProduct().getId().equals(product.getId())) {
                return true;
            }
        }
        return false;
    }
    // lấy ra hóa đơn theo id - 8
    public BillDto getBillById(Integer id) {
        return billRepository.getBillById(id).orElseThrow(() -> new NotFoundException("Not Found with id : " + id));
    }
    // lấy ra toàn bộ hóa đơn theo term - 9
    public PageDto getListBillAll(int page, int pageSize, String term) {
        // lấy ra danh sách có phân trang product theo term
        Page<BillDto> billDtos = billRepository.getListBillAll(PageRequest.of(page - 1, pageSize),term);

        return new PageDto(
                billDtos.getNumber() + 1,
                billDtos.getSize(),
                billDtos.getTotalPages(),
                (int) Math.ceil(billDtos.getTotalElements()),
                billDtos.getContent()
        );
    }
    // lấy ra danh sách sản phẩm đang pending chỗ người sửa chữa - 10
    public PageDto getListProductsPending(int page, int pageSize, String term) {

        Page<ProductProjection> products = productRepository.getListProductsPending(PageRequest.of(page - 1, pageSize), term, Product.ProductStatus.UNDER_REPAIR);

        return new PageDto(
                products.getNumber() + 1,
                products.getSize(),
                products.getTotalPages(),
                (int) Math.ceil(products.getTotalElements()),
                products.getContent()
        );
    }
    // thay đổi người sửa chữa - 11
    public StatusResponse updateEngineerProductPending(UpdateInformationEngineerRequest request, Integer id) {
        // lấy ra sản phẩm theo id
        Product product = productRepository.findProductById_Recep(id).orElseThrow(() -> new NotFoundException("Not Found with id: " + id));
        // kiểm tra sản phẩm đã sủa chữa hoàn thành chưa
        if (product.getStatus() != Product.ProductStatus.WAITING_FOR_REPAIR) {
            throw new BadRequestException("The product has been output. Can not change");
        }
        // lấy ra nhân viên sửa chữa theo mã nhân viên
        User engineer = userRepository.findUsersByEmployeeCode(request.getEmployeeCode()).orElseThrow(() -> new NotFoundException("Not Found with code: " + request.getEmployeeCode()));
        // cập nhật lại người sửa chữa
        product.setEngineer(engineer);
        productRepository.save(product);

        return new StatusResponse(HttpStatus.OK, "successful engineer change", DataMapper.toDataResponse(product.getId(), product.getIme(), product.getNameModel()));
    }

    // lấy danh sách hóa đơn
    public PageDto findGuaranteeAll(int page, int pageSize, String term) {

        Page<GuaranteeDto> guaranteeDtos = guaranteeRepository.findGuaranteeAll(PageRequest.of(page - 1, pageSize),term);

        return new PageDto(
                guaranteeDtos.getNumber() + 1,
                guaranteeDtos.getSize(),
                guaranteeDtos.getTotalPages(),
                (int) Math.ceil(guaranteeDtos.getTotalElements()),
                guaranteeDtos.getContent()
        );

    }

    // lấy sản phẩm  chờ trả khách theo id
    public ProductProjection findProductRepaiedById(Integer id) {
        return productRepository.findProductRepaiedById(id, Product.ProductStatus.WAITING_FOR_RETURN).orElseThrow(() -> new NotFoundException("Not Found With id: " + id));
    }

    // danh sách sản phẩm đã hoàn thành theo nhân viên người trả
    public PageDto findProductFinishByUserRegister(int page, int pageSize, String term) {

        Page<ProductProjection> products = productRepository.findProductFinishByUserRegister(PageRequest.of(page - 1, pageSize), term, Product.ProductStatus.DELIVERED, iCurrentUserLmpl.getUser().getId());

        return new PageDto(
                products.getNumber() + 1,
                products.getSize(),
                products.getTotalPages(),
                (int) Math.ceil(products.getTotalElements()),
                products.getContent()
        );
    }

    // lấy danh sách sản phẩm đang pending trong cửa hàng
    public PageDto findProductPendingInShop(int page, int pageSize, String term) {

        Page<ProductProjection> products = productRepository.findProductPendingInShop(PageRequest.of(page - 1, pageSize) ,term, Product.ProductStatus.WAITING_FOR_REPAIR, Product.ProductStatus.UNDER_REPAIR);

        return new PageDto(
                products.getNumber() + 1,
                products.getSize(),
                products.getTotalPages(),
                (int) Math.ceil(products.getTotalElements()),
                products.getContent()
        );
    }

    // hủy sản phẩm trả khách
    public StatusResponse deleteProductById(Integer id) {
        Product product = productRepository.findById(id).orElseThrow(() -> {
            throw new NotFoundException("Not Found With id: " + id);
        });

        if (product.getStatus() == Product.ProductStatus.REPAIRED || product.getStatus() == Product.ProductStatus.DELIVERED || product.getStatus() == Product.ProductStatus.WAITING_FOR_RETURN) {
            throw new BadRequestException("The product may have been repaired. The product cannot be canceled.");
        }

        product.setDelete(false);
        productRepository.save(product);
        return new StatusResponse(HttpStatus.NO_CONTENT,
                "Product Cancellation Successfully",
                DataMapper.toDataResponse(product.getId(), product.getIme(), product.getNameModel()));
    }
}
