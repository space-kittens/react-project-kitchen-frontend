import React from 'react';
import { connect } from 'react-redux';
import { CHANGE_TAB } from '../../../../constants/actionTypes';

import agent from '../../../../agent';

import styled from 'styled-components';
import { listReset, btnReset } from '../../../../scss/mixins';
import { colorText, colorBase } from '../../../../scss/styles';

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

const TagFilterTab = ({tag}) => {
  if (!tag) {
    return null;
  }

  return (
    <li>
      <Tab type="button" isActive={true}>
        {`#${tag}`}
      </Tab>
    </li>
  );
};

const mapDispatchToProps = (dispatch) => ({
  onTabClick: (tab, pager, payload) => dispatch({ type: CHANGE_TAB, tab, pager, payload }),
} );

const mapStateToProps = (state) => ({
  tab: state.articleList.tab,
  tag: state.articleList.tag,
  token: state.common.token,
});

const TabList = ({ token, tab, tag, onTabClick }) => (
  <List>
    <YourFeedTab token={token} tab={tab} onTabClick={onTabClick} />

    <GlobalFeedTab tab={tab} onTabClick={onTabClick} />

    <TagFilterTab tag={tag} />
  </List>
);

export default connect(mapStateToProps, mapDispatchToProps)(TabList);

const List = styled.ul`
  ${listReset}

  display: flex;
  box-shadow: inset 0 -1px 0 #2F2F37;
`;

const Tab = styled.button`
  ${btnReset}

  padding: 16px 24px;
  color: ${({isActive}) => isActive ? colorText.primary : colorText.secondary};
  box-shadow: inset 0 -2px 0 ${( { isActive } ) => isActive ? colorBase.accent : 'transparent'};

  &:hover,
  &:focus {
    outline: 1px solid ${colorBase.accent};
  }
`;
