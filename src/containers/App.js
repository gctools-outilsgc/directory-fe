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

import Profile from './Profile';
import Home from './Home';
import Onboard from './Onboard';

class App extends Component {
  render() {
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
                  <Button>
                    Login
                  </Button>
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

export default App;
