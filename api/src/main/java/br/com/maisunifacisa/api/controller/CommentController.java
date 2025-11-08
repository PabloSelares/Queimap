package br.com.maisunifacisa.api.controller;

import br.com.maisunifacisa.api.controller.request.CommentRequest;
import br.com.maisunifacisa.api.controller.response.CommentResponse;
import br.com.maisunifacisa.api.service.CommentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comment")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping
    public void create(@Valid @RequestBody final CommentRequest request){
        commentService.create(request);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable final Long id){
        commentService.deleteById(id);
    }

    @GetMapping()
    public List<CommentResponse> listAll(){
        return commentService.listAll();
    }
}
