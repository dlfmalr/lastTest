package com.korea.lastTest.article;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Controller
@RequiredArgsConstructor
@RequestMapping("/api/article")
public class ArticleController {
    private final MultiService multiService;

    @PostMapping
    public ResponseEntity<?> save(@RequestBody ArticleRequestDTO articleRequestDTO) {
        try {
            ArticleResponseDTO articleResponseDTO = this.multiService.save(articleRequestDTO.getTitle(), articleRequestDTO.getContent());
            return ResponseEntity.status(HttpStatus.OK).body(articleResponseDTO);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(ex.getMessage());
        }
    }

    @PutMapping
    public ResponseEntity<?> update(@RequestBody ArticleRequestDTO articleRequestDTO) {
        try {
            ArticleResponseDTO articleResponseDTO = this.multiService.update(articleRequestDTO.getArticleId(), articleRequestDTO.getTitle(), articleRequestDTO.getContent());
            return ResponseEntity.status(HttpStatus.OK).body(articleResponseDTO);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(ex.getMessage());
        }
    }

    @DeleteMapping
    public ResponseEntity<?> delete(@RequestHeader("ArticleId") Long articleId) {
        try {
            this.multiService.delete(articleId);
            return ResponseEntity.status(HttpStatus.OK).body("문제없음");
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(ex.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> detail(@RequestHeader("ArticleId") Long articleId) {
        try {
            ArticleResponseDTO articleResponseDTO = multiService.detail(articleId);
            return ResponseEntity.status(HttpStatus.OK).body(articleResponseDTO);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(ex.getMessage());
        }
    }

    @GetMapping("/list")
    public ResponseEntity<?> list() {
        try {
            List<ArticleResponseDTO> articleResponseDTOList = multiService.list();
            return ResponseEntity.status(HttpStatus.OK).body(articleResponseDTOList);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(ex.getMessage());
        }
    }
}
