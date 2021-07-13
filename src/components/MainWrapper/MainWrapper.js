import React from 'react';
import { connect } from 'react-redux';

import Header from '../Header/Header';
import Container from '../../ui/Container/Container';

const mapStateToProps = (state) => {
  return {
    appLoaded: state.common.appLoaded,
    currentUser: state.common.currentUser
  };
};

const MainWrapper = ({appLoaded, currentUser, children}) => {
  return (
    <>
      {
        appLoaded &&
        <Header currentUser={ currentUser } />
      }

      <Container>
        { children }
      </Container>
    </>
  )
}

export default connect(mapStateToProps)(MainWrapper);
