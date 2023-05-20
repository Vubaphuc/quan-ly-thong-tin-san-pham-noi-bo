package com.example.hethongquanlysanphamnoibobe.repository;

import com.example.hethongquanlysanphamnoibobe.entity.UsedCodes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsedCodesRepository extends JpaRepository<UsedCodes, Integer> {
    boolean existsByCode(String code);
}