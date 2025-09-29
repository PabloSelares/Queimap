package com.maisunifacisa.api.controller.request;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

@Getter
@Setter
public class RegisterUserRequest {

    @NotBlank(message = "Nome precisa ter entre 2 e 100 caracteres ")
    @Length(min = 3, max = 100)
    private String name;

    @Email(message = "Digite um email válido")
    private String email;

    @NotNull(message = "Senha deve ter entre 6 e 12 caracteres")
    @Length(min = 3, max = 12)
    private String password;
}
