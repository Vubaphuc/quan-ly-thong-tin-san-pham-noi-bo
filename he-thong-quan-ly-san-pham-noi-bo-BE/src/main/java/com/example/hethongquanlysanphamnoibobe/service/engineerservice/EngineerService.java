package com.example.hethongquanlysanphamnoibobe.service.engineerservice;

import com.example.hethongquanlysanphamnoibobe.config.GenerateCode;
import com.example.hethongquanlysanphamnoibobe.dto.dto.ComponentsDto;
import com.example.hethongquanlysanphamnoibobe.dto.dto.MaterialDto;
import com.example.hethongquanlysanphamnoibobe.dto.dto.OrderMaterialDto;
import com.example.hethongquanlysanphamnoibobe.dto.page.PageDto;
import com.example.hethongquanlysanphamnoibobe.dto.projection.ProductInfo;
import com.example.hethongquanlysanphamnoibobe.request.CreateOrderMaterialRequest;
import com.example.hethongquanlysanphamnoibobe.request.InformationRepairRequest;
import com.example.hethongquanlysanphamnoibobe.request.UpdateOrderMaterialRequest;
import com.example.hethongquanlysanphamnoibobe.entity.Components;
import com.example.hethongquanlysanphamnoibobe.entity.Material;
import com.example.hethongquanlysanphamnoibobe.entity.OrderMaterial;
import com.example.hethongquanlysanphamnoibobe.entity.Product;
import com.example.hethongquanlysanphamnoibobe.exception.BadRequestException;
import com.example.hethongquanlysanphamnoibobe.exception.NotFoundException;
import com.example.hethongquanlysanphamnoibobe.repository.ComponentsRepository;
import com.example.hethongquanlysanphamnoibobe.repository.MaterialRepository;
import com.example.hethongquanlysanphamnoibobe.repository.OrderMaterialRepository;
import com.example.hethongquanlysanphamnoibobe.repository.ProductRepository;
import com.example.hethongquanlysanphamnoibobe.response.DataResponse;
import com.example.hethongquanlysanphamnoibobe.response.StatusResponse;
import com.example.hethongquanlysanphamnoibobe.security.ICurrentUserLmpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class EngineerService {
    @Autowired
    private OrderMaterialRepository orderMaterialRepository;
    @Autowired
    private MaterialRepository materialRepository;
    @Autowired
    private ComponentsRepository componentsRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ICurrentUserLmpl iCurrentUserLmpl;
    @Autowired
    private GenerateCode generateCode;

    // lấy danh sách sản suwawr chữa theo engineer - 1
    public PageDto getListProductByUser(int page, int pageSize, String term) {

        Page<ProductInfo> products = productRepository.getListProductByUser(PageRequest.of(page -1 , pageSize), iCurrentUserLmpl.getUser().getId(), term, Product.ProductStatus.UNDER_REPAIR);

        return new PageDto(
                products.getNumber() + 1,
                products.getSize(),
                products.getTotalPages(),
                (int) Math.ceil(products.getTotalElements()),
                products.getContent()
        );
    }
    // lấy ra sản phẩm theo id - 2
    public ProductInfo getProductById(Integer id) {
        return productRepository.getProductById(id, iCurrentUserLmpl.getUser().getId(), Product.ProductStatus.UNDER_REPAIR).orElseThrow(() -> new NotFoundException("Not Found with id: " + id));
    }


    // cappj nhật thông tin sửa chữa nhân viên engineer - 3
    public StatusResponse upDateInformationProductbyId(InformationRepairRequest request, Integer id) {
        if (!request.isStatus()) {
            throw new BadRequestException("Status change to OK");
        }
        // lấy ra sản phẩm theo id
        Product product = productRepository.findProductById_Engineer(id, iCurrentUserLmpl.getUser().getId(),Product.ProductStatus.UNDER_REPAIR).orElseThrow(() -> {
            throw new NotFoundException("Not Found with id : "  + id);
        });
        // lấy ra loại linh kiện
        Components components = componentsRepository.findById(request.getComponnentsId()).orElseThrow(() -> {
            throw new NotFoundException("Not Found with id : "  + request.getComponnentsId());
        });
        // cập nhật thông tin sửa chữa của sản phẩm
        product.setLocation(request.getLocation());
        product.setStatus(Product.ProductStatus.REPAIRED);
        product.setComponents(components);
        product.setNote(request.getNote());
        product.setOutputDate(LocalDateTime.now());
        // lưu lại lên csdl
        productRepository.save(product);
        // tạo response trả về
        DataResponse dataResponse = DataResponse.builder()
                .id(product.getId())
                .code(product.getIme())
                .name(product.getNameModel())
                .build();

        return new StatusResponse(HttpStatus.OK, "update information Product success", dataResponse);

    }
    // danh sách các loại linh kiện - 4
    public PageDto getListComponentPhone(int page, int pageSize) {

        Page<ComponentsDto> componentsDtoPage = componentsRepository.getListComponentPhone(PageRequest.of(page - 1, pageSize));

        return new PageDto(
                componentsDtoPage.getNumber() + 1,
                componentsDtoPage.getSize(),
                componentsDtoPage.getTotalPages(),
                (int) Math.ceil(componentsDtoPage.getTotalElements()),
                componentsDtoPage.getContent()
        );
    }
    // danh sách vật liệu có số lượng > 0 - 5
    public PageDto getListMaterialByQuantity(int page, int pageSize) {

        Page<MaterialDto> materialDtos = materialRepository.getListMaterialByQuantity(PageRequest.of(page - 1, pageSize));

        return new PageDto(
                materialDtos.getNumber() + 1,
                materialDtos.getSize(),
                materialDtos.getTotalPages(),
                (int) Math.ceil(materialDtos.getTotalElements()),
                materialDtos.getContent()
        );
    }
    // lấy ra vật liệu theo id - 6
    public MaterialDto getMaterialById(Integer id) {
        return materialRepository.getMaterialById(id)
                .orElseThrow(() -> new NotFoundException("Not Found with id : " + id));
    }
    // tạo order vật liệu mới - 7
    public StatusResponse CreateOrderMaterial(CreateOrderMaterialRequest request) {

        Material material = materialRepository.findByCodeAndDeleteTrue(request.getMaterialCode())
                .orElseThrow(() -> new NotFoundException("Not Found with code : " + request.getMaterialCode()));

        if (material.getRemainingQuantity() == 0) {
            throw new BadRequestException("material is no longer available");
        }
        if (request.getQuantity() > material.getRemainingQuantity()) {
            throw new BadRequestException("order quantity exceeds stock quantity");
        }

        Components components = material.getComponents();


        OrderMaterial orderMaterial = OrderMaterial.builder()
                .orderCode(generateCode.generateCode())
                .quantity(request.getQuantity())
                .material(material)
                .components(components)
                .orderer(iCurrentUserLmpl.getUser())
                .build();

        orderMaterialRepository.save(orderMaterial);

        DataResponse dataResponse = DataResponse.builder()
                .id(orderMaterial.getId())
                .code(orderMaterial.getOrderCode())
                .name(orderMaterial.getOrderer().getEmployeeName())
                .build();

        return new StatusResponse(HttpStatus.CREATED, "Create order material success", dataResponse);
    }
    // lây ra danh sách order vật liệu có status = true - 8
    public PageDto getListOrderMaterialByStatusTrue(int page, int pageSize) {

        Page<OrderMaterialDto> orderMaterialDtos = orderMaterialRepository.getListOrderMaterialByStatusTrue(PageRequest.of(page - 1, pageSize), iCurrentUserLmpl.getUser().getId());

        return new PageDto(
                orderMaterialDtos.getNumber() + 1,
                orderMaterialDtos.getSize(),
                orderMaterialDtos.getTotalPages(),
                (int) Math.ceil(orderMaterialDtos.getTotalElements()),
                orderMaterialDtos.getContent()
        );
    }
    // lấy ra danh sách order vật liệu có status = false - 9
    public Object getListOrderMaterialByStatusFalse(int page, int pageSize) {

        Page<OrderMaterialDto> orderMaterialDtos = orderMaterialRepository.getListOrderMaterialByStatusFalse(PageRequest.of(page - 1, pageSize), iCurrentUserLmpl.getUser().getId());

        return new PageDto(
                orderMaterialDtos.getNumber() + 1,
                orderMaterialDtos.getSize(),
                orderMaterialDtos.getTotalPages(),
                (int) Math.ceil(orderMaterialDtos.getTotalElements()),
                orderMaterialDtos.getContent()
        );
    }
    // chưa làm gì
    public Object getListMaterialAndComponents(String nameModel, String nameComponentts) {
        // chuaw vieets gif
        return null;
    }
    // lấy ra order vật liệu theo id - 10
    public OrderMaterialDto getOrderMaterialById(Integer id) {
        return orderMaterialRepository.getOrderMaterialById(id)
                .orElseThrow(() -> new NotFoundException("Not Found with id : " + id));
    }
    // xóa mềm order material - 11
    public void deleteOrderById(Integer id) {
        // lấy ra order vât liệu theo id
        OrderMaterial orderMaterial = orderMaterialRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Not Found with id: " + id));
        // kiểm tra order vật liệu đã được phê duyệt chưa
        if (orderMaterial.isStatus()) {
            throw new BadRequestException("Order approved successfully. Can't cancel");
        }
        // chuyển trạng thái ẩn cho order vật liệu
        orderMaterial.setDelete(false);
        // lưu lại
        orderMaterialRepository.save(orderMaterial);
    }
    // cập nhật số lượng trong order material - 12
    public StatusResponse updateQuantityOrderMaterialById(UpdateOrderMaterialRequest request, Integer id) {
        // lấy ra order vật liệu theo id
        OrderMaterial orderMaterial = orderMaterialRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Not Found with id: " + id));
        // kiểm tra order vật liệu đã được phê duyệt chưa
        if (orderMaterial.isStatus()) {
            throw new BadRequestException("Order approved successfully. Can't update");
        }
        // cập nhật lại thông tin order vật liệu
        orderMaterial.setQuantity(request.getQuantity());
        orderMaterialRepository.save(orderMaterial);

        DataResponse dataResponse = DataResponse.builder()
                .id(orderMaterial.getId())
                .code(orderMaterial.getOrderCode())
                .name(orderMaterial.getOrderer().getEmployeeName())
                .build();

        return new StatusResponse(HttpStatus.OK,"Update successful", dataResponse);
    }
}
