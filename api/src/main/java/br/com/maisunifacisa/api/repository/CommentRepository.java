package br.com.maisunifacisa.api.repository;

import br.com.maisunifacisa.api.domain.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
