package com.maisunifacisa.api.controller;

import com.maisunifacisa.api.controller.request.RegisterUserRequest;
import com.maisunifacisa.api.controller.response.IdResponse;
import com.maisunifacisa.api.service.RegisterUserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.CREATED;

@RestController
@RequestMapping("/users")
@AllArgsConstructor
public class UserController {

    private final RegisterUserService registerUserService;

    @PostMapping
    @ResponseStatus(CREATED)
    public IdResponse register(@Valid @RequestBody RegisterUserRequest request){
        return registerUserService.register(request);
    }
}
