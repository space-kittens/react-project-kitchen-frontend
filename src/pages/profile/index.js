import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import UserBanner from '../../components/UserBanner/UserBanner';
import ArticleList from '../../components/ArticleList/ArticleList';
import TagFilterTab from '../../components/TagFilterTab/TagFilterTab';
import TabList from '../../ui/Tablist/Tablist';
import Tab from '../../ui/Tab/Tab';

import MainLayout from '../../ui/MainLayout/MainLayout';

import agent from '../../agent';
import {
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED,
} from '../../constants/actionTypes';

const mapStateToProps = (state) => ({
  ...state.articleList,
  userProfile: state.profile,
  tag: state.articleList.tag,
});

const mapDispatchToProps = (dispatch) => ({
  onLoad: ( payload ) => dispatch( { type: PROFILE_PAGE_LOADED, payload } ),
  onUnload: () => dispatch({ type: PROFILE_PAGE_UNLOADED }),
} );

const Profile = ( {
  userProfile,
  onLoad,
  onUnload,
  match,
  pager,
  articles,
  articlesCount,
  currentPage,
  tag
} ) => {
  const { url, params } = match;
  const username = userProfile.username;

  useEffect( () => {
    onLoad(
      Promise.all([
        agent.Profile.get( params.username ),
        url.endsWith( '/favorites' ) ?
        agent.Articles.favoritedBy( params.username ) :
          agent.Articles.byAuthor( params.username ),
        agent.Tags.getAll()
      ])
    );
  }, [params] );

  useEffect( () => () => {
    onUnload();
  }, [])

  if (!userProfile) {
    return null;
  }

  return (
    <MainLayout banner={ <UserBanner /> }>
      <ProfilePageTabList url={url} username={username} tag={tag} />

      <ArticleList
        pager={pager}
        articles={articles}
        articlesCount={articlesCount}
        currentPage={currentPage}
      />
    </MainLayout>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

const ProfilePageTabList = ({ url, username, tag }) => {
  return (
    <TabList>
      <li className='nav-item'>
        <Tab isActive={url.endsWith(username)} as={Link} to={`/@${username}`}>
          Мои статьи
        </Tab>
      </li>

      <li className='nav-item'>
        <Tab isActive={url.endsWith(`${username}/favorites`)} as={Link} to={`/@${username}/favorites`}>
          Избранное
        </Tab>
      </li>

      <li className='nav-item'>
        <TagFilterTab tag={ tag } />
      </li>
    </TabList>
  );
}
