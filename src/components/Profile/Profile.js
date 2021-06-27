import ArticleList from '../ArticleList/ArticleList';
import React from 'react';
import { Link } from 'react-router-dom';
import agent from '../../agent';
import { connect } from 'react-redux';
import {
  FOLLOW_USER,
  UNFOLLOW_USER,
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED,
} from '../../constants/actionTypes';

import styled from 'styled-components';

import { textStyles } from '../../scss/mixins'

import Container from '../Container/Container';
import TagsCloud from '../Home/TagsCloud/TagsCloud';
import TabList from '../../ui/Tablist/Tablist';
import Tab from '../../ui/Tab/Tab';
import { FollowBtn, EditLink } from '../Buttons/Buttons';

import userAvatar from '../../images/icons/avatar.svg';

const EditProfileSettings = ({isUser}) => {
  if (isUser) {
    return (
      <ProfileEditLink to='/settings'>
        Редактировать профиль
      </ProfileEditLink>
    );
  }
  return null;
};

const FollowUserButton = ({
  isUser,
  user: { following, username },
  unfollow,
  follow
}) => {
  if (isUser) {
    return null;
  }

  const handleClick = (ev) => {
    ev.preventDefault();
    if (following) {
      unfollow(username);
    } else {
      follow(username);
    }
  };

  return (
    <UserFollowBtn onClick={handleClick}>
      {following ? 'Отписаться от' : 'Подписаться на'} {username}
    </UserFollowBtn>
  );
};

const mapStateToProps = (state) => ({
  ...state.articleList,
  currentUser: state.common.currentUser,
  profile: state.profile,
});

const mapDispatchToProps = (dispatch) => ({
  onFollow: (username) =>
    dispatch({
      type: FOLLOW_USER,
      payload: agent.Profile.follow(username),
    }),
  onLoad: ( payload ) => dispatch( { type: PROFILE_PAGE_LOADED, payload } ),
  onUnfollow: (username) =>
    dispatch({
      type: UNFOLLOW_USER,
      payload: agent.Profile.unfollow(username),
    }),
  onUnload: () => dispatch({ type: PROFILE_PAGE_UNLOADED }),
});

class Profile extends React.Component {
  UNSAFE_componentWillMount() {
    this.props.onLoad(
      Promise.all([
        agent.Profile.get(this.props.match.params.username),
        agent.Articles.byAuthor( this.props.match.params.username ),
        agent.Tags.getAll()
      ])
    );
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  renderTabs() {
    const url = this.props.match.url;
    const username = this.props.profile.username;
    return (
      <TabList>
        <li className='nav-item'>
          <Tab isActive={url.endsWith(username)} as={Link} to={`/@${this.props.profile.username}`}>
            Мои статьи
          </Tab>
        </li>

        <li className='nav-item'>
          <Tab isActive={url.endsWith(`${username}/favorites`)} as={Link} to={`/@${this.props.profile.username}/favorites`}>
            Избранное
          </Tab>
        </li>
      </TabList>
    );
  }

  render () {
    const profile = this.props.profile;
    if (!profile) {
      return null;
    }

    const isUser = this.props.currentUser && this.props.profile.username === this.props.currentUser.username;

    return (
      <>
        <UserBanner>
          <UserAvatar width='120' height='120' src={userAvatar} alt={profile.username} />
          <UserName>{profile.username}</UserName>
          <UserBio>{profile.bio}</UserBio>

          <EditProfileSettings isUser={isUser} />
          <FollowUserButton
            isUser={isUser}
            user={profile}
            follow={this.props.onFollow}
            unfollow={this.props.onUnfollow}
          />
        </UserBanner>
        <PtContainer>
          <FlexContainer>
            <MainContent>
              {this.renderTabs()}

              <ArticleList
                pager={this.props.pager}
                articles={this.props.articles}
                articlesCount={this.props.articlesCount}
                state={this.props.currentPage}
              />
            </MainContent>
            <SideBar>
              <TagsCloud/>
            </SideBar>
          </FlexContainer>
        </PtContainer>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
export { Profile, mapStateToProps };

const UserBanner = styled( Container )`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 32px;
  padding-bottom: 32px;
`;

const UserAvatar = styled.img`
  margin-bottom: 8px;
`;

const UserName = styled.h4`
  ${textStyles.headline}

  margin-top: 0;
  margin-bottom: 16px;
`;

const UserBio = styled.p`
  max-width: 50%;
  margin: 0;
  margin-bottom: 16px;
  text-align: center;
`;

const UserFollowBtn = styled(FollowBtn)`
  align-self: flex-end;
`;

const ProfileEditLink = styled(EditLink)`
  align-self: flex-end;
`;

const PtContainer = styled(Container)`
  padding-top: 32px;
`;

const FlexContainer = styled.div`
  display: flex;
`;

const MainContent = styled.div`
  width: 75%;
  padding-right: 16px;
`;

const SideBar = styled.div`
  width: 25%;
  padding-left: 16px;
`;
