import agent from '../../agent';
import React from 'react';
import { connect } from 'react-redux';
import { APP_LOAD } from '../../constants/actionTypes';
import { Route, Switch } from 'react-router-dom';
import Article from '../Article';
import Editor from '../Editor/Editor';
import Home from '../../pages/home';
import Login from '../Login/Login';
import Profile from '../../pages/profile';
import Register from '../Register/Register';
import Settings from '../Settings/Settings';

import MainWrapper from '../MainWrapper/MainWrapper';

const mapDispatchToProps = (dispatch) => ({
  onLoad: (payload, token) => dispatch({ type: APP_LOAD, payload, token, skipTracking: true })
});

class App extends React.Component {
  componentDidMount() {
    const token = window.localStorage.getItem('jwt');
    if (token) {
      agent.setToken(token);
    }

    this.props.onLoad(token ? agent.Auth.current() : null, token);
  }

  render() {
    return (
      <MainWrapper>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/@:username/favorites' component={Profile} />
          <Route path='/@:username' component={Profile} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/editor/:slug' component={Editor} />
          <Route path='/editor' component={Editor} />
          <Route path='/article/:id' component={Article} />
          <Route path='/settings' component={Settings} />
        </Switch>
      </MainWrapper>
    );
  }
}

export default connect(null, mapDispatchToProps)(App);
