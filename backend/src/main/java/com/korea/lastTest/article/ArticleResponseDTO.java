package com.korea.lastTest.article;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ArticleResponseDTO {
    private Long id;
    private String title;
    private String content;

    @Builder
    public ArticleResponseDTO(Long id, String content, String title) {
        this.id = id;
        this.content = content;
        this.title = title;
    }
}
