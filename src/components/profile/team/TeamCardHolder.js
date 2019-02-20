import React from 'react';
import PropTypes from 'prop-types';

import {
  Card,
  CardBody,
  CardTitle,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import classnames from 'classnames';

import LocalizedGQLTeamCard from './GQLTeamCard';
import LocalizedGQLTeamOrgChart from './GQLTeamOrgChart';

const style = {
  card: {
    width: '100%',
    padding: '0 15px 10px 15px',
  },
};


class TeamCardHolder extends React.Component {
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
      <Card style={style.card}>
        <CardBody>
          <CardTitle className="profile-card-title">
              Teams
          </CardTitle>
          <div>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={
                    classnames({ active: this.state.activeTab === '1' })
                  }
                  onClick={() => { this.toggle('1'); }}
                >
                  You
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={
                    classnames({ active: this.state.activeTab === '2' })
                  }
                  onClick={() => { this.toggle('2'); }}
                >
                  Your Teams
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={
                    classnames({ active: this.state.activeTab === '3' })
                  }
                  onClick={() => { this.toggle('3'); }}
                >
                  Org Chart
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <LocalizedGQLTeamCard id={this.props.id} />
              </TabPane>
              <TabPane tabId="2">
                  Tab 2 Right Over here
              </TabPane>
              <TabPane tabId="3">
                <LocalizedGQLTeamOrgChart
                  visible={this.state.activeTab === '3'}
                  id={this.props.id}
                />
              </TabPane>
            </TabContent>
          </div>
        </CardBody>
      </Card>
    );
  }
}

TeamCardHolder.defaultProps = {
  id: undefined,
};

TeamCardHolder.propTypes = {
  id: PropTypes.string,
};

export default TeamCardHolder;
