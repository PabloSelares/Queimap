package br.com.maisunifacisa.api.service.user;

import br.com.maisunifacisa.api.exception.ResourceNotFoundException;
import br.com.maisunifacisa.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    @Transactional
    public void deleteById(final Long id) {
        userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Cliente não encontrado"));

        userRepository.deleteById(id);
    }

}
