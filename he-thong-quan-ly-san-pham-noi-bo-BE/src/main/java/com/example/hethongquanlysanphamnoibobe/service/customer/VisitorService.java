package com.example.hethongquanlysanphamnoibobe.service.customer;

import com.example.hethongquanlysanphamnoibobe.dto.projection.CustomerSearchInfo;
import com.example.hethongquanlysanphamnoibobe.dto.projection.GuaranteeProjection;
import com.example.hethongquanlysanphamnoibobe.dto.projection.ProductProjection;
import com.example.hethongquanlysanphamnoibobe.exception.NotFoundException;
import com.example.hethongquanlysanphamnoibobe.repository.GuaranteeRepository;
import com.example.hethongquanlysanphamnoibobe.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class VisitorService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private GuaranteeRepository guaranteeRepository;
    public List<CustomerSearchInfo> searchHistoryProductByImeProductOrPhoneNumber(String ime, String phoneNumber) {
        if (ime.isEmpty() && phoneNumber.isEmpty()) {
            return new ArrayList<>();
        }
        return productRepository.searchHistoryProductByImeProductOrPhoneNumber(ime, phoneNumber);
    }

    // tìm kiếm bảo hành theo mã bảo hành
    public GuaranteeProjection searchGuaranteeByGuaranteeCode(String code) {
        if (code.isEmpty()) return null;
        return guaranteeRepository.searchGuaranteeByGuaranteeCode(code).orElseThrow(() -> new NotFoundException("Not Found With Guarantee Code: " + code));
    }
}
