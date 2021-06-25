import agent from '../../agent';
import Header from '../Header/Header';
import React from 'react';
import { connect } from 'react-redux';
import { APP_LOAD, REDIRECT } from '../../constants/actionTypes';
import { Route, Switch } from 'react-router-dom';
import Article from '../Article';
import Editor from '../Editor/Editor';
import Home from '../Home';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import ProfileFavorites from '../ProfileFavorites/ProfileFavorites';
import Register from '../Register/Register';
import Settings from '../Settings/Settings';
import { store } from '../../store';
import { push } from 'react-router-redux';

const mapStateToProps = (state) => {
  return {
    appLoaded: state.common.appLoaded,
    currentUser: state.common.currentUser,
    redirectTo: state.common.redirectTo,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onLoad: (payload, token) => dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
  onRedirect: () => dispatch({ type: REDIRECT }),
});

class App extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      // this.context.router.replace(nextProps.redirectTo);
      store.dispatch(push(nextProps.redirectTo));
      this.props.onRedirect();
    }
  }

  componentWillMount() {
    const token = window.localStorage.getItem('jwt');
    if (token) {
      agent.setToken(token);
    }

    this.props.onLoad(token ? agent.Auth.current() : null, token);
  }

  render() {
    if (this.props.appLoaded) {
      return (
        <>
          <Header currentUser={this.props.currentUser} />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/editor/:slug' component={Editor} />
            <Route path='/editor' component={Editor} />
            <Route path='/article/:id' component={Article} />
            <Route path='/settings' component={Settings} />
            <Route path='/@:username/favorites' component={ProfileFavorites} />
            <Route path='/@:username' component={Profile} />
          </Switch>
        </>
      );
    }
    return (
      <>
        <Header currentUser={this.props.currentUser} />
      </>
    );
  }
}

// App.contextTypes = {
//   router: PropTypes.object.isRequired
// };

export default connect(mapStateToProps, mapDispatchToProps)(App);
