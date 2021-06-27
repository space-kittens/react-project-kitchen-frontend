import Banner from './Banner/Banner';
import MainView from './MainView/MainView';
import React from 'react';
import TagsCloud from './TagsCloud/TagsCloud';
import Container from '../Container/Container';
import agent from '../../agent';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { HOME_PAGE_LOADED, HOME_PAGE_UNLOADED } from '../../constants/actionTypes';

const Promise = global.Promise;

const mapStateToProps = (state) => ({
  ...state.home,
  token: state.common.token,
} );

const mapDispatchToProps = (dispatch) => ({
  onLoad: (tab, pager, payload) => dispatch({ type: HOME_PAGE_LOADED, tab, pager, payload }),
  onUnload: () => dispatch({ type: HOME_PAGE_UNLOADED }),
});

class Home extends React.Component {
  UNSAFE_componentWillMount() {
    const tab = this.props.token ? 'feed' : 'all';
    const articlesPromise = this.props.token ? agent.Articles.feed : agent.Articles.all;

    this.props.onLoad(tab, articlesPromise, Promise.all([agent.Tags.getAll(), articlesPromise()]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <>
        <Banner token={ this.props.token } />
        <PtContainer>
          <FlexContainer>
            <MainContent>
              <MainView />
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);

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
