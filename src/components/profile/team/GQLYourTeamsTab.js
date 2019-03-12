import React from 'react';
import PropTypes from 'prop-types';

import { Query } from 'react-apollo';

import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col
} from 'reactstrap';

import { GET_YOUR_TEAM } from '../../../gql/profile';

class GQLYouTeamsTab extends React.Component {
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
    const {
      id,
    } = this.props;
    return (
      <Query
        query={GET_YOUR_TEAM}
        variables={{ gcID: (String(id)) }}
      >
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error!: ${error}`;
          const userInfo = (!data) ? '' : data.profiles[0];
          return (
            <Row className="mt-3">
              <Col>
                <div className="border-bottom">
                  <span>Teams! {userInfo.gcID}</span>
                </div>
                <Nav vertical>
                  <NavItem>
                    <NavLink
                      onClick={() => { this.toggle('1'); }}
                    >
                      This is a test
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      onClick={() => { this.toggle('2'); }}
                    >
                      I am a second Group!
                    </NavLink>
                  </NavItem>
                </Nav>
              </Col>
              <Col>
                <div className="border-bottom">
                  <span>People!</span>
                </div>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="1">
                    I am tab 1
                  </TabPane>
                  <TabPane tabId="2">
                    I am tab 2
                  </TabPane>
                </TabContent>
              </Col>
            </Row>
          );
        }}
      </Query>
    );
  }
}

GQLYouTeamsTab.propTypes = {
  id: PropTypes.string.isRequired,
};

export default GQLYouTeamsTab;
