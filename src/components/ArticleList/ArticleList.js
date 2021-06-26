import ArticlePreview from '../ArticlePreview/ArticlePreview';
import ListPagination from '../ListPagination/ListPagination';
import React from 'react';

const ArticleList = ({ articles, pager, articlesCount, currentPage }) => {
  if (!articles) {
    return <div className='article-preview'>Загрузка...</div>;
  }

  if (articles.length === 0) {
    return <div className='article-preview'>Статей совсем нет... пока нет.</div>;
  }

  return (
    <div>
      {articles.map((article) => {
        return <ArticlePreview article={article} key={article.slug} />;
      })}

      <ListPagination
        pager={pager}
        articlesCount={articlesCount}
        currentPage={currentPage}
      />
    </div>
  );
};

export default ArticleList;
