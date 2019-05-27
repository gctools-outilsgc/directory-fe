import React from 'react';
import PropTypes from 'prop-types';
import LocalizedComponent
  from '@gctools-components/react-i18n-translation-webpack';

import classnames from 'classnames';
import styled from 'styled-components';

import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col
} from 'reactstrap';

const RowContainer = styled.div`
background-color: #F4F8F9;
height: 345px;
overflow: hidden;
`;

// TODO: Add an approval object query to this component then map the approvals
class GQLYourApprovals extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  render() {
    return (
      <RowContainer>
        <Row className="mt-3 your-teams-container">
          <Col sm="4" className="pr-0">
            <div className="member-holder">
              <Nav vertical>
                <NavItem>
                  <NavLink
                    className={
                      classnames({
                        active: this.state.activeTab === '1',
                      })
                    }
                    onClick={() => { this.toggle('1'); }}
                  >
                    I am approval 1 Map later
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={
                      classnames({
                        active: this.state.activeTab === '2',
                      })
                    }
                    onClick={() => { this.toggle('2'); }}
                  >
                      I am approval 2 oh yeah!
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
          </Col>
          <Col sm="8" className="pl-0">
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <div className="vh-100 p-3 member-holder">
                  Wow I am tab pane 1 id = {this.props.gcID}
                </div>
              </TabPane>
              <TabPane tabId="2">
                <div className="vh-100 p-3 member-holder">
                  Wow I will map this later as well
                </div>
              </TabPane>
            </TabContent>
          </Col>
        </Row>
      </RowContainer>
    );
  }
}

GQLYourApprovals.propTypes = {
  gcID: PropTypes.string.isRequired,
};

export default LocalizedComponent(GQLYourApprovals);
