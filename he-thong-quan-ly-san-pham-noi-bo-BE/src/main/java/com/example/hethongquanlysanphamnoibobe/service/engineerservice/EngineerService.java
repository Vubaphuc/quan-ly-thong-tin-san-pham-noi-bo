package com.example.hethongquanlysanphamnoibobe.service.engineerservice;

import com.example.hethongquanlysanphamnoibobe.config.GenerateCode;
import com.example.hethongquanlysanphamnoibobe.dto.ComponentsDto;
import com.example.hethongquanlysanphamnoibobe.dto.MaterialDto;
import com.example.hethongquanlysanphamnoibobe.dto.OrderMaterialDto;
import com.example.hethongquanlysanphamnoibobe.dto.ProductDto;
import com.example.hethongquanlysanphamnoibobe.dto.page.PageDto;
import com.example.hethongquanlysanphamnoibobe.dto.request.CreateOrderMaterialRequest;
import com.example.hethongquanlysanphamnoibobe.dto.request.InformationRepairRequest;
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
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

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
    public PageDto getListProductByUser(int page, int pageSize) {

        Page<ProductDto> productDtoPage = productRepository.getListProductByUser(PageRequest.of(page -1 , pageSize), iCurrentUserLmpl.getUser().getId());

        return new PageDto(
                productDtoPage.getNumber() + 1,
                productDtoPage.getSize(),
                productDtoPage.getTotalPages(),
                (int) Math.ceil(productDtoPage.getTotalElements()),
                productDtoPage.getContent()
        );
    }

    public ProductDto getProductById(Integer id) {
        return productRepository.getProductById(id, iCurrentUserLmpl.getUser().getId()).orElseThrow(() -> {
           throw new NotFoundException("Not Found with id: " + id);
        });
    }

    public StatusResponse upDateInformationProductbyId(InformationRepairRequest request, Integer id) {
        // lấy ra sản phẩm theo id
        Product product = productRepository.findProductById(id).orElseThrow(() -> {
            throw new NotFoundException("Not Found with id : "  + id);
        });
        // lấy ra loại linh kiện
        Components components = componentsRepository.findById(request.getComponnentsId()).orElseThrow(() -> {
            throw new NotFoundException("Not Found with id : "  + request.getComponnentsId());
        });
        // set thông tin sửa chữa vào prodcut
        product.setLocation(request.getLocation());
        product.setStatus(request.isStatus());
        product.setComponents(components);
        // lưu lại lên csdl
        productRepository.save(product);
        // tạo response trả về
        DataResponse dataResponse = DataResponse.builder()
                .id(product.getId())
                .code(product.getIME())
                .name(product.getNameModel())
                .build();

        return new StatusResponse(HttpStatus.OK, "update information Product successs", dataResponse);

    }

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

    public MaterialDto getMaterialByCode(String code) {
        return materialRepository.getMaterialByCode(code).orElseThrow(() -> {
            throw new NotFoundException("Not Found with code : " + code);
        });
    }

    public StatusResponse CreateOrderMaterial(CreateOrderMaterialRequest request) {

        Material material = materialRepository.findByCode(request.getMaterialCode()).orElseThrow(() -> {
            throw new NotFoundException("Not Found with code : " + request.getMaterialCode());
        });

        if (material.getQuantity() == 0) {
            throw new BadRequestException("material is no longer available");
        }

        Components components = componentsRepository.findByName(request.getComponentsName()).orElseThrow(() -> {
           throw new NotFoundException("Not Found with Component name : " + request.getComponentsName());
        });

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

        return new StatusResponse(HttpStatus.OK, "Create order material success", dataResponse);
    }

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

    public Object getListMaterialAndComponents(String tenModel, String tenLinhKien) {
        // chuaw vieets gif
        return null;
    }

    public OrderMaterialDto getOrderMaterialById(Integer id) {
        return orderMaterialRepository.getOrderMaterialById(id).orElseThrow(() -> {
            throw new NotFoundException("Not Found with id : " + id);
        });
    }
}
