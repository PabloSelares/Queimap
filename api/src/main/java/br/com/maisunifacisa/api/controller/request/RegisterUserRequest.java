package br.com.maisunifacisa.api.controller.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterUserRequest {

    @NotBlank(message = "Primeiro nome é obrigatório")
    private String firstName;

    @NotBlank(message = "Segundo nome é obrigatório")
    private String lastName;

    @Email
    private String email;

    @NotBlank(message = "Senha é obrigatório")
    private String password;
}
