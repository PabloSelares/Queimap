package br.com.maisunifacisa.api.service.auth;

import br.com.maisunifacisa.api.controller.request.LoginRequest;
import br.com.maisunifacisa.api.controller.response.LoginResponse;
import br.com.maisunifacisa.api.domain.User;
import br.com.maisunifacisa.api.service.user.SearchUserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Optional;

@Service
@AllArgsConstructor
public class LoginService {

    private static final long EXPIRATION_TIME = 7200L;

    private final SearchUserService searchUserService;
    private final PasswordEncoder passwordEncoder;
    private final JwtEncoder jwtEncoder;

    @Transactional
    public ResponseEntity<LoginResponse> login(final LoginRequest request) {
        final Optional<User> optionalUser = searchUserService.searchUserByEmail(request.getEmail());

        if (optionalUser.isEmpty() || !isCorrectLogin(request.getPassword(), optionalUser.get().getPassword())) {
            throw new BadCredentialsException("Usuário ou senha incorretos.");
        }

        final User user = optionalUser.get();

        final JwtClaimsSet jwt = JwtClaimsSet.builder()
                .issuer("api")
                .subject(user.getFirstName())
                .expiresAt(Instant.now().plusSeconds(EXPIRATION_TIME))
                .issuedAt(Instant.now())
                .claim("email", user.getEmail())
                .build();

        final String token = jwtEncoder.encode(JwtEncoderParameters.from(jwt)).getTokenValue();

        return ResponseEntity.ok(new LoginResponse().accessToken(token).expiresIn(EXPIRATION_TIME));
    }

    private boolean isCorrectLogin(final String password, final String savedPassowrd) {
        return passwordEncoder.matches(password, savedPassowrd);
    }
}

