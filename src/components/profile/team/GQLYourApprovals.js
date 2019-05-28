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

import { UserAvatar } from '../../core/UserAvatar';

const RowContainer = styled.div`
background-color: #F4F8F9;
height: 345px;
overflow: hidden;
`;

// TODO: Add an approval object query to this component then map the approvals

const ApprovalList = (props) => {
  const {
    user,
  } = props;

  return (
    <NavItem>
      <NavLink>
        <div className="d-flex">
          <UserAvatar
            avatar={user ? user.avatar : ''}
            name={user ? user.name : ''}
          />
          <div className="ml-3">
            <div className="font-weight-bold member-name">
              {user.name}
            </div>
            <small className="text-muted">
              {user.title}
            </small>
          </div>
        </div>
      </NavLink>
    </NavItem>
  );
};

ApprovalList.propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.string,
    name: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};

const ApprovalPane = (props) => {
  const {
    approval,
  } = props;

  return (
    <TabPane>
      I am the approval content.
      {approval.id}
      <div>
        There will be a form in here.
      </div>
    </TabPane>
  );
};

ApprovalPane.propTypes = {
  approval: PropTypes.shape({
    id: PropTypes.string,
    user: PropTypes.shape({
      gcID: PropTypes.string,
      name: PropTypes.string,
    }),
  }).isRequired,
};

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
                {/* TODO Map this */}
                <ApprovalList
                  user={
                    {
                      name: 'Jonald',
                      title: 'Just testing',
                    }
                  }
                />
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
              {/* TODO Map this */}
              <ApprovalPane
                approval={
                  {
                    id: '3',
                    user: {
                      gcID: '21',
                      name: 'Jonald',
                    },
                  }
                }
              />
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
