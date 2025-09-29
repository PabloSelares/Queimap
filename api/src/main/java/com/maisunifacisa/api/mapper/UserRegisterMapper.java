package com.maisunifacisa.api.mapper;

import com.maisunifacisa.api.controller.request.RegisterUserRequest;
import com.maisunifacisa.api.controller.response.IdResponse;
import com.maisunifacisa.api.domain.User;

public class UserRegisterMapper {
    public static IdResponse toResponse(User entity) {
        return IdResponse.builder()
                .Id(entity.getId())
                .build();
    }

    public static User toEntity(RegisterUserRequest request) {
        return User.builder()
                .email(request.getEmail())
                .password(request.getPassword())
                .name(request.getName())
                .build();
    }
}
