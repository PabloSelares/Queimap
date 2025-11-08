package br.com.maisunifacisa.api.controller;

import br.com.maisunifacisa.api.controller.request.LoginRequest;
import br.com.maisunifacisa.api.controller.request.RegisterUserRequest;
import br.com.maisunifacisa.api.controller.response.LoginResponse;
import br.com.maisunifacisa.api.service.auth.LoginService;
import br.com.maisunifacisa.api.service.auth.LogoutService;
import br.com.maisunifacisa.api.service.auth.RegisterService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController  {

    private final LoginService loginService;
    private final RegisterService registerService;
    private final LogoutService logoutService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody final LoginRequest request) {
        return loginService.login(request);
    }

    @PostMapping("/register")
    public ResponseEntity<Void> register(@Valid @RequestBody final RegisterUserRequest request) {
        return registerService.register(request);
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout() {
        return logoutService.logout();
    }
}
