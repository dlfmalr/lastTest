package com.korea.lastTest.article;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ArticleService {
    private final ArticleRepository articleRepository;

    public Article save(String title, String content) {
        return articleRepository.save(Article.builder()
                .title(title)
                .content(content)
                .build());
    }

    public Article update(Long articleId, String title, String content) {
        Article article = articleRepository.findById(articleId).orElse(null);
        article.setTitle(title);
        article.setContent(content);
        return articleRepository.save(article);
    }

    public void delete(Long articleId) {
        articleRepository.deleteById(articleId);
    }

    public Article getId(Long articleId) {
        return articleRepository.findById(articleId).orElse(null);
    }

    public List<Article> getList() {
        return articleRepository.findAll();
    }
}
