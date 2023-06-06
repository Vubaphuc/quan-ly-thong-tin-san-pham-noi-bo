package com.example.hethongquanlysanphamnoibobe.service.admin;

import com.example.hethongquanlysanphamnoibobe.dto.ComponentsDto;
import com.example.hethongquanlysanphamnoibobe.dto.VendorDto;
import com.example.hethongquanlysanphamnoibobe.dto.page.PageDto;
import com.example.hethongquanlysanphamnoibobe.dto.projection.MaterialInfo;
import com.example.hethongquanlysanphamnoibobe.dto.projection.MaterialProjection;
import com.example.hethongquanlysanphamnoibobe.dto.projection.OrderMaterialProjection;
import com.example.hethongquanlysanphamnoibobe.entity.*;
import com.example.hethongquanlysanphamnoibobe.exception.BadRequestException;
import com.example.hethongquanlysanphamnoibobe.exception.NotFoundException;
import com.example.hethongquanlysanphamnoibobe.mapper.DataMapper;
import com.example.hethongquanlysanphamnoibobe.repository.*;
import com.example.hethongquanlysanphamnoibobe.request.AUpdateMaterialRequest;
import com.example.hethongquanlysanphamnoibobe.request.AUpdateOrderMaterialRequest;
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
public class MaterialManageService {
    @Autowired
    private MaterialRepository materialRepository;
    @Autowired
    private VendorRepository vendorRepository;
    @Autowired
    private ComponentsRepository componentsRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private OrderMaterialRepository orderMaterialRepository;
    @Autowired
    private ICurrentUserLmpl iCurrentUserLmpl;

    // lấy danh sách vật liệu
    public PageDto findMaterialsAll(Integer page, Integer pageSize, String term) {

        Page<MaterialProjection> materials = materialRepository.findMaterials(PageRequest.of(page - 1, pageSize), term);

        return new PageDto(
                materials.getNumber() + 1,
                materials.getSize(),
                materials.getTotalPages(),
                (int) Math.ceil(materials.getTotalElements()),
                materials.getContent()
        );
    }

    // lấy vật liệu theo id
    public MaterialProjection findMaterialById(Integer id) {
        return materialRepository.findMaterialById(id).orElseThrow(() -> {
            throw new NotFoundException("Not Found with id: " + id);
        });
    }

    // lấy danh sách vendor
    public List<VendorDto> findVendorAll() {
        return vendorRepository.findVendorAll();
    }

    // danh sách linh kiện
    public List<ComponentsDto> findComponentsAll() {
        return componentsRepository.findComponentsAll();
    }

    // cập nhật material theo id
    public StatusResponse updateMaterialById(AUpdateMaterialRequest request, Integer id) {
        // lấy ra vật liệu theo id
        Material material = materialRepository.findById(id).orElseThrow(() -> {
            throw new NotFoundException("Not Found with id: " + id);
        });
        // lấy ra user theo employeeCode
        User user = userRepository.findUsersByEmployeeCode(request.getEmployeeCode()).orElseThrow(() -> {
            throw new NotFoundException("Not Found With employee code: " + request.getEmployeeCode());
        });
        // lấy ra component theo id
        Components components = componentsRepository.findById(request.getComponentId()).orElseThrow(() -> {
            throw new NotFoundException("Not Found With id: " + request.getComponentId());
        });
        // lấy ra vendor theo id
        Vendor vendor = vendorRepository.findById(id).orElseThrow(() -> {
           throw new NotFoundException("Not Found With id: " + request.getVendorId());
        });
        // cập nhật thay đổi
        material.setCode(request.getCode());
        material.setNameModel(request.getNameModel());
        material.setQuantity(request.getQuantity());
        material.setWarehouseEmployee(user);
        material.setComponents(components);
        material.setVendor(vendor);
        material.setUpdateDate(LocalDateTime.now());
        // lưu lại
        materialRepository.save(material);

        return new StatusResponse(HttpStatus.OK,
                "Material update success",
                DataMapper.toDataResponse(material.getId(), material.getCode(), material.getNameModel()));
    }

    // xóa material theo id
    public StatusResponse deleteMaterialById(Integer id) {
        // lấy ra vật liệu theo id
        Material material = materialRepository.findById(id).orElseThrow(() -> {
            throw new NotFoundException("Not Found with id: " + id);
        });
        // kiểm tra xem vật liệu còn hàng không
        if (material.getQuantity() > 0 ) {
            throw new BadRequestException("Materials are still in stock. Can not delete");
        }
        // xóa
        materialRepository.deleteById(material.getId());

        return new StatusResponse(HttpStatus.NO_CONTENT,
                "Material remove success",
                DataMapper.toDataResponse(material.getId(), material.getCode(), material.getNameModel()));
    }


    // lấy danh sách order vật liệu
    public PageDto findOrderMaterialsAll(Integer page, Integer pageSize, String term) {

        Page<OrderMaterialProjection> orderMaterials = orderMaterialRepository.findOrderMaterialsAll(PageRequest.of(page - 1, pageSize), term);

        return new PageDto(
                orderMaterials.getNumber() + 1,
                orderMaterials.getSize(),
                orderMaterials.getTotalPages(),
                (int) Math.ceil(orderMaterials.getTotalElements()),
                orderMaterials.getContent()
        );
    }
    // lấy ra danh sách order material có isDelete = true
    public PageDto findOrderMaterialsIsDeleteTrueAll(Integer page, Integer pageSize, String term) {

        Page<OrderMaterialProjection> orderMaterials = orderMaterialRepository.findOrderMaterialsIsDeleteTrueAll(PageRequest.of(page - 1, pageSize), term);

        return new PageDto(
                orderMaterials.getNumber() + 1,
                orderMaterials.getSize(),
                orderMaterials.getTotalPages(),
                (int) Math.ceil(orderMaterials.getTotalElements()),
                orderMaterials.getContent()
        );
    }
    // lấy ra order material theo id
    public OrderMaterialProjection findOrderMaterialById(Integer id) {
        return orderMaterialRepository.findOrderMaterialById(id).orElseThrow(() -> {
            throw new NotFoundException("Not Found With id: " + id);
        });
    }

    // cập nhật order Material theo id
    public StatusResponse updateOrderMaterialById(AUpdateOrderMaterialRequest request, Integer id) {

        // lấy ra orderMaterial theo id
        OrderMaterial orderMaterial = orderMaterialRepository.findById(id).orElseThrow(() -> new NotFoundException("Not Found With id: " + id));

        // lấy ra linh kiện theo id
        Components components = componentsRepository.findById(request.getComponentId()).orElseThrow(() -> new NotFoundException("Not Found with id " + request.getComponentId()));

        // lấy ra nhân viên order vật liệu
        User employeeOrder = userRepository.findUsersByEmployeeCode(request.getEmployeeOrderCode())
                .orElseThrow(() -> new NotFoundException("Not Found With employee order code: " + request.getEmployeeOrderCode()));

        // lấy ra nhân viên appvoral

        User employeeAppvoral;
        if (request.getEmployeeAppvoralCode() != "") {
            employeeAppvoral = userRepository.findUsersByEmployeeCode(request.getEmployeeAppvoralCode()).orElseThrow(() -> new NotFoundException("Not Found with employee appvoral code: " + request.getEmployeeAppvoralCode()));
        } else {
            employeeAppvoral = orderMaterial.getApprover();
        }

        // lấy ra vật liệu theo id
        Material material = materialRepository.findById(request.getMaterialId()).orElseThrow(() -> new NotFoundException("Not Found With id: " + request.getMaterialId()));

        // update thông tin mới
        orderMaterial.setOrderCode(request.getOrderCode());
        orderMaterial.setQuantity(request.getOrderQuantity());
        orderMaterial.setStatus(request.isStatus());
        orderMaterial.setOrderer(employeeOrder);
        orderMaterial.setApprover(employeeAppvoral);
        orderMaterial.setComponents(components);
        orderMaterial.setMaterial(material);

        // lưu lại
        orderMaterialRepository.save(orderMaterial);

        if (request.isStatus()) {
            material.setQuantity(material.getQuantity() - request.getOrderQuantity());
            materialRepository.save(material);

            orderMaterial.setApprover(iCurrentUserLmpl.getUser());
            orderMaterial.setApprovalDate(LocalDateTime.now());
            orderMaterialRepository.save(orderMaterial);
        }

        return new StatusResponse(HttpStatus.OK,
                "Update success",
                DataMapper.toDataResponse(orderMaterial.getId(), orderMaterial.getOrderCode(), orderMaterial.getOrderer().getEmployeeName()));
    }


    public StatusResponse deleteOrderMaterialById(Integer id) {

        OrderMaterial orderMaterial = orderMaterialRepository.findById(id).orElseThrow(() -> {
            throw new NotFoundException("Not Found With id: " + id);
        });

        if (orderMaterial.isDelete() || !orderMaterial.isStatus()) {
            throw new BadRequestException("Order has been completed. Can not delete");
        }

        orderMaterialRepository.deleteById(orderMaterial.getId());

        return new StatusResponse(HttpStatus.NO_CONTENT,
                "Delete OrderMaterial success",
                DataMapper.toDataResponse(orderMaterial.getId(), orderMaterial.getOrderCode(), iCurrentUserLmpl.getUser().getEmployeeName()));
    }

    public List<MaterialInfo> findMaterialProjectionAll() {
        return materialRepository.findMaterialProjectionAll();
    }
}
