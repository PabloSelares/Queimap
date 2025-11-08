package br.com.maisunifacisa.api.service.auth;

import br.com.maisunifacisa.api.controller.request.RegisterUserRequest;
import br.com.maisunifacisa.api.domain.User;
import br.com.maisunifacisa.api.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static br.com.maisunifacisa.api.mapper.UserMapper.toEntity;


@Service
@AllArgsConstructor
public class RegisterService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public ResponseEntity<Void> register(final RegisterUserRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadCredentialsException("Email já cadastrado.");
        }

        final User user = toEntity(request);
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(user);

        return ResponseEntity.noContent().build();
    }
}
