import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import classnames from 'classnames';
import {
  Card,
  CardBody,
  CardTitle,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from 'reactstrap';
import LocalizedComponent
  from '@gctools-components/react-i18n-translation-webpack';
import Loading from './Loading';
import { GET_TEAM } from '../../../gql/profile';
import LocalizedGQLTeamOrgChart from './GQLTeamOrgChart';
import LocalizedGQLTeamCard from './GQLTeamCard';
import LocalizedCreateTeam from './CreateTeam';

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
      <Query
        query={GET_TEAM}
        variables={{ gcID: (String(id)) }}
      >
        {({ loading, error, data }) => {
          if (loading) return <Loading />;
          if (error) return `Error!: ${error}`;
          const p = (!data) ? '' : data.profiles[0];
          const orgId = (!p.team || !p.team.organization)
            ? '' : p.team.organization.id;
          return (
            <Card style={style.card}>
              <CardBody>
                <CardTitle className="profile-card-title">
                  {__('Teams')}
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
                      {canEdit && (
                        <LocalizedCreateTeam
                          gcID={this.props.id}
                          orgId={orgId}
                        />
                      )}
                    </TabPane>
                    <TabPane tabId="3">
                      {p && p.team && (
                        <LocalizedGQLTeamOrgChart
                          visible={this.state.activeTab === '3'}
                          id={this.props.id}
                        />
                      )}
                    </TabPane>
                  </TabContent>
                </div>
              </CardBody>
            </Card>
          );
        }}
      </Query>
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
