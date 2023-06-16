package com.example.hethongquanlysanphamnoibobe.dto.dto;

import java.time.LocalDateTime;

public interface BillGuaranteeDto {
    Integer getId();
    LocalDateTime getInvoiceCreationDate();
    String getInvoiceCreatorCode();
    String getInvoiceCreatorName();
    ProductGuaranteeDto getData();
    String getGuaranteeCode();
}
