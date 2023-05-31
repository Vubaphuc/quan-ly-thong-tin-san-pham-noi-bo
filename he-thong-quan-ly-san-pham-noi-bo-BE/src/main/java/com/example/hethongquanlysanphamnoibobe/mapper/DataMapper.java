package com.example.hethongquanlysanphamnoibobe.mapper;

import com.example.hethongquanlysanphamnoibobe.response.DataResponse;

public class DataMapper {
    public static DataResponse toDataResponse (Integer id, String code, String name) {

        DataResponse dataResponse = DataResponse.builder()
                .name(name)
                .code(code)
                .id(id)
                .build();

        return dataResponse;
    }
}
