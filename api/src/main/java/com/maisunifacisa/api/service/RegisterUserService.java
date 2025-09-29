package com.maisunifacisa.api.service;

import com.maisunifacisa.api.controller.request.RegisterUserRequest;
import com.maisunifacisa.api.controller.response.IdResponse;
import com.maisunifacisa.api.domain.User;
import com.maisunifacisa.api.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import static com.maisunifacisa.api.mapper.UserRegisterMapper.toEntity;
import static com.maisunifacisa.api.mapper.UserRegisterMapper.toResponse;

@Service
@AllArgsConstructor
public class RegisterUserService {

    private final RegistrationEmailValidationService registrationEmailValidationService;
    private final UserRepository userRepository;

    public IdResponse register(RegisterUserRequest request) {
        registrationEmailValidationService.validar(request.getEmail());

        User user = toEntity(request);

        userRepository.save(user);

        return toResponse(user);
    }
}
