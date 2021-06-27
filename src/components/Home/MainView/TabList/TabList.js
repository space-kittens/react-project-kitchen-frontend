import React from 'react';
import { connect } from 'react-redux';
import { CHANGE_TAB } from '../../../../constants/actionTypes';

import agent from '../../../../agent';

import TabList from '../../../../ui/Tablist/Tablist';
import Tab from '../../../../ui/Tab/Tab';

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

const HomePageTabList = ({ token, tab, tag, onTabClick }) => (
  <TabList>
    <YourFeedTab token={token} tab={tab} onTabClick={onTabClick} />

    <GlobalFeedTab tab={tab} onTabClick={onTabClick} />

    <TagFilterTab tag={tag} />
  </TabList>
);

export default connect(mapStateToProps, mapDispatchToProps)(HomePageTabList);
