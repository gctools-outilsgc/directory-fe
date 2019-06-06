import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { connect } from 'react-redux';
import GlobalNav from '@gctools-components/global-nav';
import Login from '@gctools-components/gc-login';
import LocalizedComponent
  from '@gctools-components/react-i18n-translation-webpack';

import { loginAction, logoutAction, clearErrorAction } from '../store';

import oidcConfig from '../oidcConfig.dev';

import Profile from './Profile';
import Home from './Home';
import Onboard from './Onboard';

// import ProfileSearch from '../components/core/ProfileSearch';
import ProgressBanner from '../components/core/ProgressBanner';

export class App extends Component {
  static toggleLanguage(e) {
    if (e) e.preventDefault();
    const lang = (localizer.lang === 'en_CA') ? 'fr_CA' : 'en_CA';
    localizer.setLanguage(lang);
    document.cookie = `lang=${lang};path=/`;
  }
  constructor(props) {
    super(props);
    this.state = { name: false, user: null, sidebar: false };
  }

  componentWillMount() {
    const cookies = decodeURIComponent(document.cookie).split(';');
    cookies
      .filter(c => c.trim().indexOf('lang=') === 0)
      .forEach((c) => {
        const lang = c.split('=', 2)[1];
        if (localizer.hasLanguage(lang)) {
          localizer.setLanguage(lang);
        }
      });
    if (cookies.filter(item => item.includes('oadw-gn-min=false')).length) {
      this.setState({
        sidebar: true,
      });
    }
    console.log(document.cookie);
  }

  render() {
    const {
      onLogin,
      onLogout,
    } = this.props;

    const doLogin = (user) => {
      this.setState({ name: user.profile.name });
      this.setState({ user: user.profile });
      onLogin(user);
    };

    const doLogout = () => {
      this.setState({ name: false });
      onLogout();
    };

    const gnSetLanguage = (e) => {
      localizer.setLanguage(e);
      document.cookie = `lang=${e};path=/`;
    };

    return (
      <BrowserRouter>
        <div>
          <Login
            oidcConfig={oidcConfig}
            onUserLoaded={doLogin}
            onUserFetched={doLogin}
            onLogoutClick={(e, oidc) => {
              oidc.logout();
              doLogout();
            }}
          >
            {({ onClick }) => (
              <Button
                id="login-btn"
                className="sr-only"
                tabIndex="-1"
                onClick={(e) => {
                  e.stopPropagation();
                  onClick(e);
                }}
              >
                {this.state.name || 'Login'}
              </Button>
            )}
          </Login>
          <GlobalNav
            minimized={this.state.sidebar}
            currentLang={localizer.lang}
            currentUser={this.state.user}
            onLanguageResultClick={e => gnSetLanguage(e)}
            onToggleResultClick={() => {
              this.setState({ sidebar: !this.state.sidebar });
              document.cookie = `oadw-gn-min=${this.state.sidebar};`;
            }}
            currentApp={
              {
                id: '3',
                name: 'GCprofile',
                home: '/',
              }
            }
          />
          <div className={(this.state.sidebar) ?
            'directory-container-min' : 'directory-container'
            }
          >
            <ProgressBanner />
            <Switch>
              <Fragment>
                <Route
                  exact
                  path="/"
                  component={Home}
                />
                <Route path="/p/:id" component={Profile} />
                <Route path="/onboard" component={Onboard} />
              </Fragment>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

App.defaultProps = {
  onLogin: () => {},
  onLogout: () => {},
};

App.propTypes = {
  /** Login event callback  */
  onLogin: PropTypes.func,
  /** Logout event callback */
  onLogout: PropTypes.func,
};

const mapStToProps = ({ showError }) => ({ showError: showError || [] });

const mapDispToProps = dispatch => ({
  onLogin: profile => dispatch(loginAction(profile)),
  onLogout: () => dispatch(logoutAction()),
  onErrorClose: () => dispatch(clearErrorAction()),
});

export default connect(mapStToProps, mapDispToProps)(LocalizedComponent(App));
