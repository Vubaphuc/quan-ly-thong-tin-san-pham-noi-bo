package com.example.hethongquanlysanphamnoibobe.service.admin;

import com.example.hethongquanlysanphamnoibobe.dto.page.PageDto;
import com.example.hethongquanlysanphamnoibobe.dto.projection.ProductProjection;
import com.example.hethongquanlysanphamnoibobe.entity.Components;
import com.example.hethongquanlysanphamnoibobe.entity.Product;
import com.example.hethongquanlysanphamnoibobe.entity.User;
import com.example.hethongquanlysanphamnoibobe.exception.BadRequestException;
import com.example.hethongquanlysanphamnoibobe.exception.NotFoundException;
import com.example.hethongquanlysanphamnoibobe.mapper.DataMapper;
import com.example.hethongquanlysanphamnoibobe.repository.ComponentsRepository;
import com.example.hethongquanlysanphamnoibobe.repository.ProductRepository;
import com.example.hethongquanlysanphamnoibobe.repository.UserRepository;
import com.example.hethongquanlysanphamnoibobe.request.AUpdateProductRequest;
import com.example.hethongquanlysanphamnoibobe.response.StatusResponse;
import com.example.hethongquanlysanphamnoibobe.security.ICurrentUserLmpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;


@Service
public class ProductManageService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ComponentsRepository componentsRepository;
    @Autowired
    private ICurrentUserLmpl iCurrentUserLmpl;

    // lấy tất cả danh sách sản phẩm
    public PageDto findProductAlls(Integer page, Integer pageSize, String term) {

        Page<ProductProjection> products = productRepository.findProductAlls(PageRequest.of(page - 1, pageSize), term);

        return new PageDto(
                products.getNumber() + 1,
                products.getSize(),
                products.getTotalPages(),
                (int) Math.ceil(products.getTotalElements()),
                products.getContent()
        );
    }

    // lấy ra sản phẩm theo id
    public ProductProjection findProductProjectionById(Integer id) {
        return productRepository.findProductProjectionById(id).orElseThrow(() -> {
            throw new NotFoundException("Not Found with id: " + id);
        });
    }

    // cập nhật thông tin theo id
    public StatusResponse updateProductById(AUpdateProductRequest request, Integer id) {
        // lấy ra sản phẩm theo id
        Product product = productRepository.findById(id).orElseThrow(() -> {
            throw new NotFoundException("Not Found With id: " + id);
        });
        // kiểm tra sản phẩm đã hoàn thành chưa
        if (product.getFinishDate() != null) {
            throw new BadRequestException("Products that have been repaired are not allowed to be repaired");
        }
        // lấy ra nhân viên sửa chữa theo employee code
        User employeeEngineer;
        if (request.getEmployeeEngineerCode() != "") {
            employeeEngineer = userRepository.findUsersByEmployeeCode(request.getEmployeeEngineerCode()).orElseThrow(() -> {
                throw new NotFoundException("Not Found with employee Engineer code: " + request.getEmployeeEngineerCode());
            });
        } else {
            employeeEngineer = product.getEngineer();
        }

        // lấy ra nhân viên nhập sản phẩm theo employee code
        User employeeRecep = userRepository.findUsersByEmployeeCode(request.getEmployeeRecepCode()).orElseThrow(() -> {
            throw new NotFoundException("Not Found With employee Code: " + request.getEmployeeRecepCode());
        });

        // lấy ra nhân viên Trả sản phẩm theo employee code
        User employeePayer;
        if (request.getEmployeePayerCode() == null) {
            employeePayer = product.getProductPayer();
        } else {
            employeePayer = userRepository.findUsersByEmployeeCode(request.getEmployeePayerCode()).orElseThrow(() -> {
                throw new NotFoundException("Not Found with employee player code: " + request.getEmployeePayerCode());
            });

        }
        // lấy ra linh kiện theo id
        Components components;
        if (request.getComponentId() == null) {
            components = product.getComponents();
        } else {
            components = componentsRepository.findById(request.getComponentId()).orElseThrow(() -> {
                throw new NotFoundException("Not Found With id: " + request.getComponentId());
            });
        }
        // cập nhật thông tin
        if (request.isStatus()) {
            product.setProductPayer(iCurrentUserLmpl.getUser());
            product.setEngineer(employeeEngineer);
            product.setFinishDate(LocalDateTime.now());
            product.setReceptionists(employeeRecep);
            product.setNameModel(request.getNameModel());
            product.setComponents(components);
            product.setPhoneCompany(request.getPhoneCompany());
            product.setOutputDate(LocalDateTime.now());
            product.setPrice(request.getPrice());
            product.setCharge(request.isCharge());
            product.setRepair(request.isRepair());
            product.setStatus(request.isStatus());
            product.setDefectName(request.getDefectName());
            product.setIME(request.getIme());
            product.setNote(request.getNote());
            product.setLocation(request.getLocation());

            // lưu lại
            productRepository.save(product);

        } else {
            product.setProductPayer(employeePayer);
            product.setEngineer(employeeEngineer);
            product.setReceptionists(employeeRecep);
            product.setNameModel(request.getNameModel());
            product.setComponents(components);
            product.setPhoneCompany(request.getPhoneCompany());
            product.setPrice(request.getPrice());
            product.setCharge(request.isCharge());
            product.setRepair(request.isRepair());
            product.setStatus(request.isStatus());
            product.setDefectName(request.getDefectName());
            product.setIME(request.getIme());
            product.setNote(request.getNote());
            product.setLocation(request.getLocation());

            // lưu lại
            productRepository.save(product);
        }

        return new StatusResponse(HttpStatus.OK,
                "Update product success",
                DataMapper.toDataResponse(product.getId(), product.getIME(), product.getCustomer().getFullName()));
    }

    // xóa sản phẩm theo id
    public StatusResponse deleteProductById(Integer id) {
        // lấy ra sản phẩm theo id
        Product product = productRepository.findById(id).orElseThrow(() -> {
            throw new NotFoundException("Not Found With id: " + id);
        });

        if (product.getFinishDate() != null) {
            throw new BadRequestException("The product has been repaired. Can not delete");
        }

        productRepository.deleteById(product.getId());

        return new StatusResponse(HttpStatus.NO_CONTENT,
                "Delete product success",
                DataMapper.toDataResponse(product.getId(), product.getIME(), product.getCustomer().getFullName()));
    }
}
