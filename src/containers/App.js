import React, { Component, Fragment } from 'react';
import {
  Container,
  Button,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { connect } from 'react-redux';
import Login from '@gctools-components/gc-login';
import { loginAction, logoutAction, clearErrorAction } from '../store';

import oidcConfig from '../oidcConfig.dev';

import Profile from './Profile';
import Home from './Home';
import Onboard from './Onboard';

import ProfileSearch from '../components/core/ProfileSearch';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { name: false, id: false };
  }

  render() {
    const {
      onLogin,
      onLogout,
    } = this.props;

    const doLogin = (user) => {
      this.setState({ name: user.profile.name, id: user.profile.sub });
      onLogin(user);
    };

    const doLogout = () => {
      this.setState({ name: false, id: false });
      onLogout();
    };
    return (
      <BrowserRouter>
        <div>
          <Navbar color="white" className="shadow-sm">
            <Container>
              <NavbarBrand href="/">
                <span>Directory</span>
              </NavbarBrand>
              <Nav className="ml-auto">
                <NavItem>
                  <ProfileSearch
                    defaultValue="22"
                  />
                </NavItem>
                <NavItem>
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
                        onClick={(e) => {
                          e.stopPropagation();
                          onClick(e);
                        }}
                      >
                        {this.state.name || "Login"}
                      </Button>
                    )}
                  </Login>
                </NavItem>
                <NavItem>
                  <Button>
                    Language
                  </Button>
                </NavItem>
              </Nav>
            </Container>
          </Navbar>
          <Container>
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
          </Container>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStToProps = ({ showError }) => ({ showError: showError || [] });

const mapDispToProps = dispatch => ({
  onLogin: profile => dispatch(loginAction(profile)),
  onLogout: () => dispatch(logoutAction()),
  onErrorClose: () => dispatch(clearErrorAction()),
});

export default connect(mapStToProps, mapDispToProps)(App);
