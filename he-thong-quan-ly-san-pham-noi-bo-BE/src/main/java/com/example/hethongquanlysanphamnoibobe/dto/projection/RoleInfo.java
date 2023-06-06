package com.example.hethongquanlysanphamnoibobe.dto.projection;

import com.example.hethongquanlysanphamnoibobe.entity.Role;
import com.example.hethongquanlysanphamnoibobe.entity.User;
import lombok.RequiredArgsConstructor;

/**
 * Projection for {@link com.example.hethongquanlysanphamnoibobe.entity.Role}
 */
public interface RoleInfo {
    Integer getId();
    String getName();

    @RequiredArgsConstructor
    class RoleImpl implements RoleInfo {
        private final Role role;

        @Override
        public Integer getId() {
            return role.getId();
        }

        @Override
        public String getName() {
            return role.getName();
        }
    }

    static RoleInfo of(Role role) {
        return new RoleImpl(role);
    }
}
