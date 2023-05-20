package com.example.hethongquanlysanphamnoibobe.service.warehouseemployeeservice;

import com.example.hethongquanlysanphamnoibobe.dto.HistoryOrderMaterialDto;
import com.example.hethongquanlysanphamnoibobe.dto.OrderMaterialDto;
import com.example.hethongquanlysanphamnoibobe.dto.page.PageDto;
import com.example.hethongquanlysanphamnoibobe.dto.request.ApproveOrderMaterialRequest;
import com.example.hethongquanlysanphamnoibobe.entity.Material;
import com.example.hethongquanlysanphamnoibobe.entity.OrderMaterial;
import com.example.hethongquanlysanphamnoibobe.exception.BadRequestException;
import com.example.hethongquanlysanphamnoibobe.exception.NotFoundException;
import com.example.hethongquanlysanphamnoibobe.repository.MaterialRepository;
import com.example.hethongquanlysanphamnoibobe.repository.OrderMaterialRepository;
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
public class ApproverOrderMaterialService {
    @Autowired
    private OrderMaterialRepository orderMaterialRepository;
    @Autowired
    private ICurrentUserLmpl iCurrentUserLmpl;
    @Autowired
    private MaterialRepository materialRepository;
    public PageDto getListOrderMaterialStatusFalse(int page, int pageSize) {
        // danh sách order material by status = false
        Page<OrderMaterialDto> orderMaterialDtos = orderMaterialRepository.getListOrderMaterialStatusFalse(PageRequest.of(page - 1, pageSize));

        return new PageDto(
                orderMaterialDtos.getNumber() + 1,
                orderMaterialDtos.getSize(),
                orderMaterialDtos.getTotalPages(),
                (int) Math.ceil(orderMaterialDtos.getTotalElements()),
                orderMaterialDtos.getContent()
        );
    }
    // danh sách order material by status = true và do user phê duyệt
    public PageDto getListOrderMaterialStatusTrue(int page, int pageSize) {

        Page<OrderMaterialDto> orderMaterialDtos = orderMaterialRepository.getListOrderMaterialStatusTrue(PageRequest.of(page - 1, pageSize), iCurrentUserLmpl.getUser().getId());

        return new PageDto(
                orderMaterialDtos.getNumber() + 1,
                orderMaterialDtos.getSize(),
                orderMaterialDtos.getTotalPages(),
                (int) Math.ceil(orderMaterialDtos.getTotalElements()),
                orderMaterialDtos.getContent()
        );
    }
    // lấy 1 order Material theo ID
    public OrderMaterialDto getOrderMaterialById(Integer id) {
        return orderMaterialRepository.getOrderMaterialById(id).orElseThrow(() -> {
            throw new NotFoundException("Not Found with id : " + id);
        });
    }

    // phê duyệt order material cho nhân viên sửa chữa
    public StatusResponse approveOrderMaterial(ApproveOrderMaterialRequest request, Integer id) {

        // lấy ra order material đang chờ phê duyệt theo
        OrderMaterial orderMaterial = orderMaterialRepository.findById(id).orElseThrow(() -> {
            throw new NotFoundException("Not Found With id : " + id);
        });
        // lấy ra vật liệu theo code
        Material material = materialRepository.findByCode(request.getMaterialCode()).orElseThrow(() -> {
            throw new NotFoundException("Not Found with id : " + id);
        });
        // kiểm tra order đã phê duyệt chưa
        if (orderMaterial.getApprover() != null) {
            throw new BadRequestException("Order has been approved");
        }
        // chưa phê duyệt thì bắt đầu phê duyệt
        orderMaterial.setApprover(iCurrentUserLmpl.getUser());
        orderMaterial.setStatus(request.isStatus());
        // lưu ;lại lên csdl
        orderMaterialRepository.save(orderMaterial);
        // trừ số lượng vật liệu trong kho
        material.setQuantity(material.getQuantity() - request.getQuantity());
        // lưu lại vật liệu lên csdl
        materialRepository.save(material);

        // tạo reponse trả về
        DataResponse dataResponse = DataResponse.builder()
                .id(orderMaterial.getId())
                .code(orderMaterial.getOrderCode())
                .name(iCurrentUserLmpl.getUser().getEmployeeName())
                .build();

        return new StatusResponse(HttpStatus.OK, "approval success", dataResponse);
    }
    // tìm kiếm order material theo term
    public PageDto searchOrderMaterialByTerm(int page, int pageSize, String term) {
        // kiểm tra term rỗng hoặc null không
        if (term == null || term.trim().isEmpty()) {
            return new PageDto(
                    0,0,0,0,new ArrayList<>()
            );
        }

        Page<HistoryOrderMaterialDto> orderMaterialDtos = orderMaterialRepository.searchOrderMaterialByTerm(PageRequest.of(page - 1, pageSize), term);

        return new PageDto(
                orderMaterialDtos.getNumber() + 1,
                orderMaterialDtos.getSize(),
                orderMaterialDtos.getTotalPages(),
                (int) Math.ceil(orderMaterialDtos.getTotalElements()),
                orderMaterialDtos.getContent()
        );
    }
}
