package com.example.hethongquanlysanphamnoibobe.dto.projection;


import com.example.hethongquanlysanphamnoibobe.entity.Vendor;
import lombok.RequiredArgsConstructor;

/**
 * Projection for {@link com.example.hethongquanlysanphamnoibobe.entity.Vendor}
 */

public interface VendorInfo {
    Integer getId();
    String getName();

    @RequiredArgsConstructor
    class VendorImpl implements VendorInfo {
        private final Vendor vendor;

        @Override
        public Integer getId() {
            return vendor.getId();
        }

        @Override
        public String getName() {
            return vendor.getName();
        }
    }
    static VendorInfo of(Vendor vendor) {
        return new VendorImpl(vendor);
    }
}
