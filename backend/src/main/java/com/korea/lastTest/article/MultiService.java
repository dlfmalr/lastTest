package com.korea.lastTest.article;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class MultiService {
    private final ArticleService articleService;

    private ArticleResponseDTO articleResponseDTO(Article article) {
        return ArticleResponseDTO.builder()
                .id(article.getId())
                .title(article.getTitle())
                .content(article.getContent())
                .build();
    }

    @Transactional
    public ArticleResponseDTO save(String title, String content) {
        Article article = articleService.save(title, content);
        return this.articleResponseDTO(article);
    }

    @Transactional
    public ArticleResponseDTO update(Long articleId, String title, String content) {
        Article article = articleService.update(articleId, title, content);
        return this.articleResponseDTO(article);
    }

    @Transactional
    public void delete(Long articleId) {
        articleService.delete(articleId);
    }

    @Transactional
    public ArticleResponseDTO detail(Long articleId) {
        Article article = articleService.getId(articleId);
        return this.articleResponseDTO(article);
    }

    @Transactional
    public List<ArticleResponseDTO> list() {
        List<Article> articles = articleService.getList();
        List<ArticleResponseDTO> articleResponseDTOList = new ArrayList<>();
        for (Article article : articles){
            ArticleResponseDTO articleResponseDTO = this.articleResponseDTO(article);
            articleResponseDTOList.add(articleResponseDTO);
        }
        return articleResponseDTOList;
    }
}
