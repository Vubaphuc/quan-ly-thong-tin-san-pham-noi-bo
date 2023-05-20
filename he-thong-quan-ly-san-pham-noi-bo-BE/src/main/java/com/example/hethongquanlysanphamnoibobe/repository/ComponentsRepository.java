package com.example.hethongquanlysanphamnoibobe.repository;

import com.example.hethongquanlysanphamnoibobe.dto.ComponentsDto;
import com.example.hethongquanlysanphamnoibobe.entity.Components;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ComponentsRepository extends JpaRepository<Components, Integer> {

    Optional<Components> findByName(String name);
    @Query("select new com.example.hethongquanlysanphamnoibobe.dto.ComponentsDto " +
            "(cp.id, cp.name, cp.warrantyPeriod ) " +
            "from Components cp ")
    Page<ComponentsDto> getListComponentPhone(Pageable pageable);
}