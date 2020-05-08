import React from 'react';
import PropTypes from 'prop-types';
import LocalizedComponent
  from '@gctools-components/react-i18n-translation-webpack';

import { connect } from 'react-redux';

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
import GQLYourTeamsTab from './GQLYourTeamsTab';
import GQLYourApprovals from './GQLYourApprovals';

const mapStateToProps = ({ user }) => {
  const props = {};
  if (user) {
    props.accessToken = user.access_token;
    props.myGcID = user.profile.sub;
  }
  return props;
};


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
    const {
      id,
      accessToken,
      myGcID,
    } = this.props;
    const canEdit = (accessToken !== '') && (id === myGcID);
    return (
      <Card style={style.card}>
        <CardBody>
          <CardTitle className="profile-card-title">
            <h2>{__('Teams')}</h2>
          </CardTitle>
          <div>
            <Nav tabs>
              <NavItem>
                <NavLink
                  href="#!"
                  className={
                    classnames({ active: this.state.activeTab === '1' })
                  }
                  onClick={() => { this.toggle('1'); }}
                >
                  {__('imin')}
                </NavLink>
              </NavItem>
              {canEdit ?
                <NavItem>
                  <NavLink
                    href="#!"
                    className={
                      classnames({ active: this.state.activeTab === '2' })
                    }
                    onClick={() => { this.toggle('2'); }}
                  >
                    {__('your_teams')}
                  </NavLink>
                </NavItem>
                :
                ''
              }
              {canEdit ?
                <NavItem>
                  <NavLink
                    href="#!"
                    className={
                      classnames({ active: this.state.activeTab === '4' })
                    }
                    onClick={() => { this.toggle('4'); }}
                  >
                    {__('Approvals')}
                  </NavLink>
                </NavItem>
                :
                ''
              }
              <NavItem>
                <NavLink
                  href="#!"
                  className={
                    classnames({ active: this.state.activeTab === '3' })
                  }
                  onClick={() => { this.toggle('3'); }}
                >
                  {__('Org Chart')}
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <LocalizedGQLTeamCard id={id} />
              </TabPane>
              {canEdit ?
                <TabPane tabId="2">
                  <GQLYourTeamsTab id={id} />
                </TabPane> :
                ''
              }
              <TabPane tabId="3">
                {(this.state.activeTab === '3' &&
                  <LocalizedGQLTeamOrgChart
                    visible={this.state.activeTab === '3'}
                    id={id}
                  />
                )}
              </TabPane>
              {canEdit ?
                <TabPane tabId="4">
                  <GQLYourApprovals gcID={id} />
                </TabPane> :
                ''
              }
            </TabContent>
          </div>
        </CardBody>
      </Card>
    );
  }
}

TeamCardHolder.defaultProps = {
  id: undefined,
  accessToken: undefined,
  myGcID: undefined,
};

TeamCardHolder.propTypes = {
  id: PropTypes.string,
  accessToken: PropTypes.string,
  myGcID: PropTypes.string,
};

export default connect(mapStateToProps)(LocalizedComponent(TeamCardHolder));
