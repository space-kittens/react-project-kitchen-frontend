import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import AllienAvatar from '../../ui/UserAvatar/UserAvatar';
import Container from '../../ui/Container/Container';
import { FollowBtn, EditLink } from '../../components/Buttons/Buttons';

import agent from '../../agent';
import {
  FOLLOW_USER,
  UNFOLLOW_USER,
} from '../../constants/actionTypes';

import { textStyles } from '../../scss/mixins'

const mapDispatchToProps = (dispatch) => ({
  onFollow: (username) =>
    dispatch({
      type: FOLLOW_USER,
      payload: agent.Profile.follow(username),
    }),
  onUnfollow: (username) =>
    dispatch({
      type: UNFOLLOW_USER,
      payload: agent.Profile.unfollow(username),
    }),
} );

const mapStateToProps = (state) => ({
  currentUser: state.common.currentUser,
  userProfile: state.profile,
});

const UserBanner = ({ userProfile, currentUser, onFollow, onUnfollow }) => {
  const username = userProfile.username;
  const isUser = currentUser && username === currentUser.username;

  return (
    <Wrapper>
      <AllienAvatar
        width='120'
        height='120'
        alt={ username }
      />
      <UserName>{ username }</UserName>
      <UserBio>{ userProfile.bio }</UserBio>

      <EditProfileSettings isUser={ isUser } />
      <FollowUserButton
        isUser={ isUser }
        user={ userProfile }
        follow={ onFollow }
        unfollow={ onUnfollow }
      />
    </Wrapper>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(UserBanner);

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

const Wrapper = styled( Container )`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 32px;
  padding-bottom: 32px;

  & ${AllienAvatar} {
    margin-bottom: 8px;
  }
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
