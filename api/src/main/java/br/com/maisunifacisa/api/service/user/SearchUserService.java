package br.com.maisunifacisa.api.service.user;

import br.com.maisunifacisa.api.controller.response.CommentResponse;
import br.com.maisunifacisa.api.controller.response.UserResponse;
import br.com.maisunifacisa.api.domain.User;
import br.com.maisunifacisa.api.exception.ResourceNotFoundException;
import br.com.maisunifacisa.api.mapper.CommentMapper;
import br.com.maisunifacisa.api.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static br.com.maisunifacisa.api.mapper.UserMapper.toResponse;


@Service
@AllArgsConstructor
public class SearchUserService {

    private final UserRepository userRepository;

    public String getEmail() {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        final Jwt jwt = (Jwt) authentication.getCredentials();
        return jwt.getClaim("email");
    }

    public User getAuthenticatedUser() {
        return userRepository.findByEmail(getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não existe ou não está autenticado"));
    }

    public UserResponse searchAuthenticatedUser() {
        final User authenticatedCustomer = getAuthenticatedUser();
        final User user = getById(authenticatedCustomer.getId());

        List<CommentResponse> commentResponse = user.getComments().stream().map(CommentMapper::toResponse).toList();
        UserResponse userResponse = toResponse(user);
        userResponse.setComments(commentResponse);

        return userResponse;
    }


    public Optional<User> searchUserByEmail(final String email) {
        return userRepository.findByEmail(email);
    }

    public User getById(final Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado."));
    }

    public UserResponse searchById(final Long id) {
        final User user = getById(id);

        return toResponse(user);
    }
}
