package com.example.hethongquanlysanphamnoibobe.controller.admin;

import com.example.hethongquanlysanphamnoibobe.service.admin.StatisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.locks.ReentrantReadWriteLock;

@RestController
@RequestMapping("admin/api/v2")
public class StatisticsController {
    @Autowired
    private StatisticsService statisticsService;

    // lấy tổng sản phẩm ngày hôm nay
    @GetMapping("products-total")
    public ResponseEntity<?> findStatisticsTotalProductToday () {
        return ResponseEntity.ok(statisticsService.findStatisticsTotalProductToday());
    }

    // lấy tất cả danh sách Sản Phẩm OK hôm nay
    @GetMapping("products-ok")
    public ResponseEntity<?> findProductOKAlls(@RequestParam(defaultValue = "1") Integer page,
                                             @RequestParam(defaultValue = "5") Integer pageSize) {
        return ResponseEntity.ok(statisticsService.findProductOKAlls(page,pageSize));
    }

    // lấy tất cả danh sách Sản Phẩm Pending
    @GetMapping("products-pending")
    public ResponseEntity<?> findProductPendingAlls(@RequestParam(defaultValue = "1") Integer page,
                                             @RequestParam(defaultValue = "5") Integer pageSize) {
        return ResponseEntity.ok(statisticsService.findProductPendingAlls(page,pageSize));
    }


    // lấy tổng sản phẩm theo từng nhân viên sửa chữa
    @GetMapping("products-engineer")
    public ResponseEntity<?> findTotalProductByEngineerAll() {
        return ResponseEntity.ok(statisticsService.findTotalProductByEngineerAll());
    }

    // lấy tổng sản phẩm theo từng nhân viên sửa chữa ngày hôm trước
    @GetMapping("products-engineer-Yesterday")
    public ResponseEntity<?> findTotalProductByEngineerYesterdayAll() {
        return ResponseEntity.ok(statisticsService.findTotalProductByEngineerYesterdayAll());
    }


    // lấy tổng tiền của sản phẩm
    @GetMapping("total-price-finish")
    public ResponseEntity<?> findTotalPriceProductFinish() {
        return ResponseEntity.ok(statisticsService.findTotalPriceProductFinish());
    }

    // danh sách export vật liệu
    @GetMapping("export-material")
    public ResponseEntity<?> findExportMaterialAll (@RequestParam(defaultValue = "1") Integer page,
                                                    @RequestParam(defaultValue = "5") Integer pageSize) {
        return ResponseEntity.ok(statisticsService.findExportMaterialAll(page,pageSize));
    }

    // tổng tiền và số lượng material ngày và tháng
    @GetMapping("total-material")
    public ResponseEntity<?> totalPriceAndQuantityMaterial() {
        return ResponseEntity.ok(statisticsService.totalPriceAndQuantityMaterial());
    }

    // danh sách tổng số lượng export material theo từng mã vật liệu
    @GetMapping("total-materials")
    public ResponseEntity<?> findListTotalQuantityExportMaterialByMaterialCode(@RequestParam(defaultValue = "1") Integer page,
                                                                               @RequestParam(defaultValue = "5") Integer pageSize) {
        return ResponseEntity.ok(statisticsService.findListTotalQuantityExportMaterialByMaterialCode(page,pageSize));
    }
}
