import React from 'react';
import { connect } from 'react-redux';

import ArticleList from '../../ArticleList/ArticleList';
import HomePageTabList from './TabList/TabList';

const mapStateToProps = (state) => (state.articleList);

const MainView = ({ pager, articles, loading, articlesCount, currentPage }) => {
  return (
    <>
      <HomePageTabList/>

      <ArticleList
        pager={pager}
        articles={articles}
        loading={loading}
        articlesCount={articlesCount}
        currentPage={currentPage}
      />
    </>
  );
};

export default connect(mapStateToProps)(MainView);
