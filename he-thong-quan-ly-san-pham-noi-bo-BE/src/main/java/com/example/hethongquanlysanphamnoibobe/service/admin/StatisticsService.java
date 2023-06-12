package com.example.hethongquanlysanphamnoibobe.service.admin;

import com.example.hethongquanlysanphamnoibobe.dto.OrderMaterialInfo;
import com.example.hethongquanlysanphamnoibobe.dto.TotalMaterialDto;
import com.example.hethongquanlysanphamnoibobe.dto.TotalPriceDto;
import com.example.hethongquanlysanphamnoibobe.dto.TotalProductDto;
import com.example.hethongquanlysanphamnoibobe.dto.page.PageDto;
import com.example.hethongquanlysanphamnoibobe.dto.projection.MaterialProjection;
import com.example.hethongquanlysanphamnoibobe.dto.projection.ProductProjection;
import com.example.hethongquanlysanphamnoibobe.entity.ProductSummary;
import com.example.hethongquanlysanphamnoibobe.mapper.Mapper;
import com.example.hethongquanlysanphamnoibobe.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class StatisticsService {
    @Autowired
    private ProductSummaryRepository productSummaryRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private MaterialRepository materialRepository;
    @Autowired
    private OrderMaterialRepository orderMaterialRepository;


    // lấy tổng sản phẩm ngày hôm nay
    public List<ProductSummary> findStatisticsTotalProductToday() {
        return productSummaryRepository.findAll();
    }

    // lấy tất cả danh sách Sản Phẩm OK hôm nay
    public PageDto findProductOKAlls(Integer page, Integer pageSize) {
        Page<ProductProjection> products = productRepository.findProductOKAlls(PageRequest.of(page - 1, pageSize));

        return new PageDto(
                products.getNumber() + 1,
                products.getSize(),
                products.getTotalPages(),
                (int) Math.ceil(products.getTotalElements()),
                products.getContent()
        );
    }

    // lấy tất cả danh sách Sản Phẩm Pending
    public PageDto findProductPendingAlls(Integer page, Integer pageSize) {

        Page<ProductProjection> products = productRepository.findProductPendingAlls(PageRequest.of(page - 1, pageSize));

        return new PageDto(
                products.getNumber() + 1,
                products.getSize(),
                products.getTotalPages(),
                (int) Math.ceil(products.getTotalElements()),
                products.getContent()
        );
    }
    // lấy tổng sản phẩm theo từng nhân viên sửa chữa
    public List<TotalProductDto> findTotalProductByEngineerAll() {
        return userRepository.findEmployeeEngineerAll()
                .stream()
                .map(user -> {
                    long totalOK = productRepository.countTotalProductOKByEmployeeCode(user.getEmployeeCode());
                    long totalPending = productRepository.countTotalProductPendingByEmployeeCode(user.getEmployeeCode());
                    return Mapper.toTotalProductDto(user,totalOK,totalPending);
                }).collect(Collectors.toList());
    }

    public List<TotalProductDto> findTotalProductByEngineerYesterdayAll() {
        LocalDate previousDate = LocalDate.now().minusDays(1);
        return userRepository.findEmployeeEngineerAll()
                .stream()
                .map(user -> {
                    long totalOK = productRepository.countTotalProductOKYesterdayByEmployeeCode(user.getEmployeeCode(), previousDate);
                    long totalPending = productRepository.countTotalProductPendingYesterdayByEmployeeCode(user.getEmployeeCode());
                    return Mapper.toTotalProductDto(user,totalOK,totalPending);
                }).collect(Collectors.toList());
    }

    // lấy tông tiền
    public TotalPriceDto findTotalPriceProductFinish() {

        return TotalPriceDto.builder()
                .totalToday(productRepository.sumTotalPriceProductByToday())
                .totalThisMonth(productRepository.sumTotalPriceProductByMonth())
                .totalLastMount(productRepository.sumTotalPriceProductByLastMonth())
                .totalThisYear(productRepository.sumTotalPriceProductByYear())
                .total1YearAgo(productRepository.sumTotalPriceProductBy1YearAgo())
                .total2YearAgo(productRepository.sumTotalPriceProductBy2YearAgo())
                .total3YearAgo(productRepository.sumTotalPriceProductBy3YearAgo())
                .total4YearAgo(productRepository.sumTotalPriceProductBy4YearAgo())
                .totalQ1(productRepository.sumTotalPriceProductByQ1())
                .totalQ2(productRepository.sumTotalPriceProductByQ2())
                .totalQ3(productRepository.sumTotalPriceProductByQ3())
                .totalQ4(productRepository.sumTotalPriceProductByQ4())
                .build();

    }
    // danh sách export material
    public PageDto findExportMaterialAll(Integer page, Integer pageSize) {

        Page<MaterialProjection> materials = materialRepository.findExportMaterialAll(PageRequest.of(page - 1, pageSize));

        return new PageDto(
                materials.getNumber() + 1,
                materials.getSize(),
                materials.getTotalPages(),
                (int) Math.ceil(materials.getTotalElements()),
                materials.getContent()
        );
    }

    // tổng tiền và số lượng material ngày và tháng
    public TotalMaterialDto totalPriceAndQuantityMaterial() {

        TotalMaterialDto totalMaterialDto = TotalMaterialDto.builder()
                .totalImportPrice(materialRepository.totalPriceMaterialImportQuantity())
                .totalExportPrice(materialRepository.totalPriceMaterialExportQuantity())
                .totalMonthExportPrice(orderMaterialRepository.totalPriceMaterialOrderThisMonth())
                .totalTodayExportPrice(orderMaterialRepository.totalPriceMaterialOrderToday())
                .totalImportQuantity(materialRepository.totalQuantityImportMaterial())
                .totalExportQuantity(materialRepository.totalQuantityExportMaterial())
                .totalToDayExportQuantity(orderMaterialRepository.totalQuantityExportMaterialToday())
                .totalMonthExportQuantity(orderMaterialRepository.totalQuantityExportMaterialThisMonth())
                .build();

        return totalMaterialDto;
    }

    // danh sách tổng số lượng export material theo từng mã vật liệu
    public PageDto findListTotalQuantityExportMaterialByMaterialCode(int page, int pageSize) {

        Page<OrderMaterialInfo> orderMaterialInfos = orderMaterialRepository.findListTotalQuantityExportMaterialByMaterialCode(PageRequest.of(page - 1, pageSize));

        return new PageDto(
                orderMaterialInfos.getNumber() + 1,
                orderMaterialInfos.getSize(),
                orderMaterialInfos.getTotalPages(),
                (int) Math.ceil(orderMaterialInfos.getTotalElements()),
                orderMaterialInfos.getContent()
        );
    }
}
