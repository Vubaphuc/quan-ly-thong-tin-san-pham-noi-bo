package com.example.hethongquanlysanphamnoibobe.service.warehouseemployeeservice;

import com.example.hethongquanlysanphamnoibobe.dto.dto.*;
import com.example.hethongquanlysanphamnoibobe.dto.page.PageDto;
import com.example.hethongquanlysanphamnoibobe.mapper.DataMapper;
import com.example.hethongquanlysanphamnoibobe.request.CreateComponentsRequest;
import com.example.hethongquanlysanphamnoibobe.request.CreateMaterialRequest;
import com.example.hethongquanlysanphamnoibobe.request.CreateVendorRequest;
import com.example.hethongquanlysanphamnoibobe.entity.Components;
import com.example.hethongquanlysanphamnoibobe.entity.Material;
import com.example.hethongquanlysanphamnoibobe.entity.Vendor;
import com.example.hethongquanlysanphamnoibobe.exception.BadRequestException;
import com.example.hethongquanlysanphamnoibobe.exception.NotFoundException;
import com.example.hethongquanlysanphamnoibobe.repository.ComponentsRepository;
import com.example.hethongquanlysanphamnoibobe.repository.MaterialRepository;
import com.example.hethongquanlysanphamnoibobe.repository.VendorRepository;
import com.example.hethongquanlysanphamnoibobe.request.UpdateMaterialRequest;
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
public class WarehouseEmployeeService {
    @Autowired
    private ComponentsRepository componentsRepository;
    @Autowired
    private MaterialRepository materialRepository;
    @Autowired
    private VendorRepository vendorRepository;
    @Autowired
    private ICurrentUserLmpl iCurrentUserLmpl;

    // lấy ra danh sách Components có phân trang - 1
    public PageDto getListComponents(int page, int pageSize) {

        Page<ComponentsDto> componentsDtoPage = componentsRepository.getListComponentPhone(PageRequest.of(page -1 ,pageSize));

        return new PageDto(
                componentsDtoPage.getNumber() + 1,
                componentsDtoPage.getSize(),
                componentsDtoPage.getTotalPages(),
                (int) Math.ceil(componentsDtoPage.getTotalElements()),
                componentsDtoPage.getContent()
        );
    }
    // lấy ra linh kiện theo id - 2
    public ComponentsDto getComponentsById(Integer id) {
        return componentsRepository.getComponentsById(id)
                .orElseThrow(() -> new NotFoundException("Not Found with id: " + id));
    }
    // tạo mới Components - 3
    public StatusResponse createComponents(CreateComponentsRequest request) {
        // kiểm tra xem components đã tồn tại hãy chưa
        if (componentsRepository.findByName(request.getName()).isPresent()) {
            throw new BadRequestException("Components already exist");
        }
        // tạo 1 componentss mới
        Components components = Components.builder()
                .name(request.getName())
                .warrantyPeriod(request.getWarrantyPeriod())
                .warehouseEmployee(iCurrentUserLmpl.getUser())
                .build();
        // lưu vào csdl
        componentsRepository.save(components);

        return new StatusResponse(HttpStatus.CREATED,
                "Create Components success" ,
                DataMapper.toDataResponse(components.getId(), components.getName(), iCurrentUserLmpl.getUser().getEmployeeCode()));
    }

    // tạo mới Material - 4
    public StatusResponse createMaterial(CreateMaterialRequest request) {
        // kiểm tra xem material đã tồn tại hay chưa
        if (materialRepository.findByCodeAndDeleteTrue(request.getMaterialCode()).isPresent()) {
            // nếu tồn tại rồi lấy ra set lại số lương (quantity cũ + quantity mới)
            Material material = materialRepository.findByCodeAndDeleteTrue(request.getMaterialCode()).get();
            material.setImportQuantity(material.getImportQuantity() + request.getQuantity());
            // lưu lại vào csdl
            materialRepository.save(material);


            return new StatusResponse(HttpStatus.OK,
                    "Update quantity Material success" ,
                    DataMapper.toDataResponse(material.getId(), material.getCode(), material.getNameModel()));

        }
        // lấy ra Components theo ComponentsId - 5
        Components components = componentsRepository.findById(request.getComponentsId())
                .orElseThrow(() -> new NotFoundException("Not Found with id : " + request.getComponentsId()));
        // lấy ra Vendor theo VendorId
        Vendor vendor = vendorRepository.findById(request.getVenderId())
                .orElseThrow(() -> new NotFoundException("Not Found with id : " + request.getVenderId()));

        // tạo Material mới
        Material material = Material.builder()
                .code(request.getMaterialCode())
                .nameModel(request.getNameModel())
                .importQuantity(request.getQuantity())
                .price(request.getPrice())
                .components(components)
                .vendor(vendor)
                .warehouseEmployee(iCurrentUserLmpl.getUser())
                .build();
        // lưu vvào ccsdl
        materialRepository.save(material);

        return new StatusResponse(HttpStatus.CREATED,
                "Create Material success" ,
                DataMapper.toDataResponse(material.getId(), material.getCode(), material.getNameModel()));
    }

    // cập nhật số lượng vật liệu
    public StatusResponse updateMaterialById(UpdateMaterialRequest request, Integer id) {
        // lấy ra vật liệu theo id
        Material material = materialRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Not Found With id: " + id));
        //kiểm tra số lượng nhập vào có lớn hơn 0 không
        if (request.getQuantity() <= 0 ) {
            throw new BadRequestException("quantity must be greater than 0");
        }
        // cập nhât số lượng
        material.setImportQuantity(material.getImportQuantity() + request.getQuantity());
        // lưu lại
        materialRepository.save(material);

        return new StatusResponse(HttpStatus.OK,
                "Update quantity Material success" ,
                DataMapper.toDataResponse(material.getId(), material.getCode(), material.getNameModel()));
    }

    // lấy ra danh sách material all có phân trang - 6
    public PageDto getListMaterialAll(int page, int pageSize) {

        Page<MaterialDto> materialDtos = materialRepository.getListMaterialAll(PageRequest.of(page - 1, pageSize));

        return new PageDto(
                materialDtos.getNumber() + 1,
                materialDtos.getSize(),
                materialDtos.getTotalPages(),
                (int) Math.ceil(materialDtos.getTotalElements()),
                materialDtos.getContent()
        );
    }

    // tìm kiếm Material theo Term c phân trang - 7
    public PageDto searchHistoryMaterial(int page, int pageSize, String term) {

        if (term == null || term.trim().isEmpty()) {
            return new PageDto<>(
                    0,0,0,0,new ArrayList<>()
            );
        }

        Page<HistoryMaterialDto> materialDtos = materialRepository.searchHistoryMaterial(PageRequest.of(page - 1, pageSize), term);

        return new PageDto(
                materialDtos.getNumber() + 1,
                materialDtos.getSize(),
                materialDtos.getTotalPages(),
                (int) Math.ceil(materialDtos.getTotalElements()),
                materialDtos.getContent()
        );
    }


    // lấy danh vendor all có phân trang - 8
    public PageDto getListVendorAll(int page, int pageSize) {

        Page<VendorCountDto> vendorDtos = vendorRepository.getListVendorAll(PageRequest.of(page - 1, pageSize));

        return new PageDto(
                vendorDtos.getNumber() + 1,
                vendorDtos.getSize(),
                vendorDtos.getTotalPages(),
                (int) Math.ceil(vendorDtos.getTotalElements()),
                vendorDtos.getContent()
        );
    }

    // tạo mới vendor - 9
    public StatusResponse createVendor(CreateVendorRequest request) {
        // kiểm tra vendor đã tồn tại chưa
        if (vendorRepository.findByName(request.getName()).isPresent()) {
            throw new BadRequestException("Vendor already exists");
        }
        // tạo vendor mới
        Vendor vendor = Vendor.builder()
                .name(request.getName())
                .warehouseEmployee(iCurrentUserLmpl.getUser())
                .build();
        // lưu vào csdl
        vendorRepository.save(vendor);
        //t tạo response trả về
        DataResponse dataResponse = DataResponse.builder()
                .id(vendor.getId())
                .name(vendor.getName())
                .code(iCurrentUserLmpl.getUser().getEmployeeCode())
                .build();

        return new StatusResponse(HttpStatus.OK, "Create Vendor success" , dataResponse);
    }
    // lấy ra vendor theo id - 10
    public VendorDto getVendorById(Integer id) {
        return vendorRepository.getVendorById(id).orElseThrow(() -> {
            throw new NotFoundException("Not Found With id : " + id);
        });
    }
    // lấy ra vendor theo name - 11
    public VendorDto getVendorByName(String name) {
        return vendorRepository.getVendorByName(name).orElseThrow(() -> {
            throw new NotFoundException("Not Found With name : " + name);
        });
    }
    // update lại name vendor -- 12
    public Object updateNameVendor(CreateVendorRequest request, Integer id) {
        // kiểm tra vendor đã tồn tại chưa
        if (vendorRepository.findByName(request.getName()).isPresent()) {
            throw new BadRequestException("Vendor already exists");
        }
        // lấy ra vendor theo id
        Vendor vendor = vendorRepository.findById(id).orElseThrow(() -> {
            throw new NotFoundException("Not Found with id : " + id);
        });
        // cập nhật thông tin vendor
        vendor.setName(request.getName());
        vendor.setWarehouseEmployee(iCurrentUserLmpl.getUser());
        // lưu vào csdl
        vendorRepository.save(vendor);

        // tạo response trả veef
        DataResponse dataResponse = DataResponse.builder()
                .id(vendor.getId())
                .name(vendor.getName())
                .code(iCurrentUserLmpl.getUser().getEmployeeCode())
                .build();

        return new StatusResponse(HttpStatus.OK, "update Vendor name success" , dataResponse);
    }
    // lấy ra danh sách vendor có tính tổng số material theo từng vendor - 13
    public PageDto getListVendorTotalMaterial(int page, int pageSize) {

        Page<VendorTotalMaterialDto> vendorTotalMaterialDtos = materialRepository.getListVendorTotalMaterial(PageRequest.of(page - 1, pageSize));

        return new PageDto(
                vendorTotalMaterialDtos.getNumber() + 1,
                vendorTotalMaterialDtos.getSize(),
                vendorTotalMaterialDtos.getTotalPages(),
                (int) Math.ceil(vendorTotalMaterialDtos.getTotalElements()),
                vendorTotalMaterialDtos.getContent()
        );
    }
    // lấy danh sách vendot theo id vendor - 14
    public PageDto getListVendorById(int page, int pageSize, int vendorId) {

        Page<MaterialDto> materialByVendorDtos = materialRepository.getListVendorById(PageRequest.of(page - 1, pageSize), vendorId);

        return new PageDto(
                materialByVendorDtos.getNumber() + 1,
                materialByVendorDtos.getSize(),
                materialByVendorDtos.getTotalPages(),
                (int) Math.ceil(materialByVendorDtos.getTotalElements()),
                materialByVendorDtos.getContent()
        );
    }
    // lấy ra vật lieuejtheo id - 15
    public MaterialDto getMaterialById(Integer id) {
        return materialRepository.getMaterialById(id).orElseThrow(() -> {
            throw new NotFoundException("Not Found with id : " + id);
        });
    }


}
