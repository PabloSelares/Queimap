package br.com.maisunifacisa.api.service;

import br.com.maisunifacisa.api.controller.request.CommentRequest;
import br.com.maisunifacisa.api.controller.response.CommentResponse;
import br.com.maisunifacisa.api.domain.Comment;
import br.com.maisunifacisa.api.domain.User;
import br.com.maisunifacisa.api.mapper.CommentMapper;
import br.com.maisunifacisa.api.repository.CommentRepository;
import br.com.maisunifacisa.api.service.user.SearchUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

import static br.com.maisunifacisa.api.mapper.CommentMapper.toEntity;
import static org.springframework.http.HttpStatus.BAD_REQUEST;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final SearchUserService searchUserService;

    public void create(CommentRequest request) {
        User user = searchUserService.getAuthenticatedUser();

        Comment comment = toEntity(request);
        comment.setUser(user);

        commentRepository.save(comment);
    }

    public void deleteById(Long id) {
        Optional<Comment> comment = commentRepository.findById(id);

        if(comment.isEmpty()){
            throw new ResponseStatusException(BAD_REQUEST, "Mensagem não existe");
        }

        commentRepository.deleteById(id);
    }

    public List<CommentResponse> listAll() {
        return commentRepository.findAll().stream().map(CommentMapper::toResponse).toList();
    }
}
