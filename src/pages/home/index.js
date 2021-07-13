import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Banner from '../../ui/Banner/Banner';

import MainLayout from '../../ui/MainLayout/MainLayout';

import ArticleList from '../../components/ArticleList/ArticleList';
import TabList from '../../ui/Tablist/Tablist';
import Tab from '../../ui/Tab/Tab';
import TagFilterTab from '../../components/TagFilterTab/TagFilterTab';

import agent from '../../agent';
import { HOME_PAGE_LOADED, HOME_PAGE_UNLOADED, CHANGE_TAB } from '../../constants/actionTypes';

const Promise = global.Promise;

const mapStateToProps = (state) => ({
  ...state.home,
  articleList: state.articleList,
  token: state.common.token,
  tab: state.articleList.tab,
  tag: state.articleList.tag,
} );

const mapDispatchToProps = (dispatch) => ({
  onLoad: (tab, pager, payload) => dispatch({ type: HOME_PAGE_LOADED, tab, pager, payload }),
  onUnload: () => dispatch( { type: HOME_PAGE_UNLOADED } ),
  onTabClick: (tab, pager, payload) => dispatch({ type: CHANGE_TAB, tab, pager, payload }),
});

const Home = ( {
  token,
  tab,
  tag,
  onTabClick,
  onLoad,
  onUnload,
  articleList: {
    pager,
    articles,
    loading,
    articlesCount,
    currentPage
  }
} ) => {
  useEffect( () => {
    const tab = token ? 'feed' : 'all';
    const articlesPromise = token ?
      agent.Articles.feed :
      agent.Articles.all;

    onLoad(
      tab,
      articlesPromise,
      Promise.all( [ agent.Tags.getAll(), articlesPromise() ] )
    );

    return () => {
      onUnload()
    }
  }, [] );

  return (
    <MainLayout banner={ <Banner /> }>
      <HomePageTabList token={token} tab={tab} tag={tag} onTabClick={onTabClick}/>

      <ArticleList
      pager={pager}
      articles={articles}
      loading={loading}
      articlesCount={articlesCount}
      currentPage={currentPage}
    />
    </MainLayout>
  );
}

export default connect( mapStateToProps, mapDispatchToProps )( Home );

const HomePageTabList = ({ token, tab, tag, onTabClick }) => (
  <TabList>
    <YourFeedTab token={token} tab={tab} onTabClick={onTabClick} />

    <GlobalFeedTab tab={tab} onTabClick={onTabClick} />

    <li>
      <TagFilterTab tag={ tag } />
    </li>
  </TabList>
);

const YourFeedTab = ({token, tab, onTabClick}) => {
  if (token) {
    const clickHandler = (ev) => {
      ev.preventDefault();
      onTabClick('feed', agent.Articles.feed, agent.Articles.feed());
    };

    return (
      <li>
        <Tab type="button" isActive={tab === 'feed'} onClick={clickHandler}>
          Ваша лента
        </Tab>
      </li>
    );
  }
  return null;
};

const GlobalFeedTab = ({tab, onTabClick}) => {
  const clickHandler = (ev) => {
    ev.preventDefault();
    onTabClick('all', agent.Articles.all, agent.Articles.all());
  };
  return (
    <li>
      <Tab type="button" isActive={tab === 'all'} onClick={clickHandler}>
        Лента
      </Tab>
    </li>
  );
};
