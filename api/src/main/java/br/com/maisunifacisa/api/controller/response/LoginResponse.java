package br.com.maisunifacisa.api.controller.response;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse {
    private String accessToken;
    private Long expiresIn;

    public LoginResponse accessToken(String accessToken) {
        this.accessToken = accessToken;
        return this;
    }

    public LoginResponse expiresIn(Long expiresIn) {
        this.expiresIn = expiresIn;
        return this;
    }
}
