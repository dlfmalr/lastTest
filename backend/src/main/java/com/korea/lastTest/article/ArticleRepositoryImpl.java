package com.korea.lastTest.article;

import com.querydsl.core.QueryResults;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

@RequiredArgsConstructor
public class ArticleRepositoryImpl implements ArticleRepositoryCustom{
    private final JPAQueryFactory jpaQueryFactory;

    QArticle qArticle = QArticle.article;

    @Override
    public Page<Article> getList(Pageable pageable) {
        JPAQuery<Article> query = jpaQueryFactory.selectFrom(qArticle).offset(pageable.getOffset()).limit(pageable.getPageSize());
        QueryResults<Article> results = query.fetchResults();
        return new PageImpl<>(results.getResults(), pageable, results.getTotal());
    }
}
