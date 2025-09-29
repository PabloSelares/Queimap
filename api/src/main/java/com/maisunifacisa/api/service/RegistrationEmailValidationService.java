package com.maisunifacisa.api.service;

import com.maisunifacisa.api.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.UNPROCESSABLE_ENTITY;

@Service
@AllArgsConstructor
public class RegistrationEmailValidationService {

    private final UserRepository userRepository;

    public void validar(String email) {
        if(userRepository.existsByEmail(email)){
            throw new ResponseStatusException(UNPROCESSABLE_ENTITY,"Já existe um usuário com esse email");
        }
    }
}
