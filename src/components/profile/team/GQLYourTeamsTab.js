import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styled from 'styled-components';
import { Query } from 'react-apollo';

import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  Button
} from 'reactstrap';

import { GET_YOUR_TEAM } from '../../../gql/profile';
import './css/youTeamStyle.css';
import YourTeamMemberList from './YourTeamMemberList';
import GQLCreateTeamDialog from './GQLCreateTeamDialog';

const RowContainer = styled.div`
background-color: #F4F8F9;
height: 430px;
overflow: hidden;
`;

class GQLYouTeamsTab extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
      createDialogOpen: false,
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
      <Query
        query={GET_YOUR_TEAM}
        variables={{ gcID: (String(this.props.id)) }}
      >
        {({
          loading,
          error,
          data,
          refetch,
        }) => {
          if (loading) return 'Loading...';
          if (error) return `Error!: ${error}`;
          const userInfo = (!data) ? '' : data.profiles[0];
          console.log(userInfo);
          const teamList = userInfo.ownerOfTeams.map(({
            id,
            nameEn,
            nameFr,
            descriptionEn,
          }) => (
            <NavItem key={id}>
              <NavLink
                href="#!"
                onClick={() => { this.toggle(id); }}
                className={
                  classnames({ active: this.state.activeTab === id })}
              >
                <div>
                  <div className="font-weight-bold">
                    {nameEn} / {nameFr}
                  </div>
                  <small>
                    {descriptionEn}
                  </small>
                  <small>
                    <ul className="list-inline text-primary">
                      <li className="list-inline-item">
                        <Button
                          color="link"
                          size="small"
                        >
                          Transfer
                        </Button>
                      </li>
                      <li className="list-inline-item">
                        <Button
                          color="link"
                          size="small"
                        >
                          Edit
                        </Button>
                      </li>
                      <li className="list-inline-item">
                        <Button
                          color="link"
                          size="small"
                        >
                          Delete
                        </Button>
                      </li>
                    </ul>
                  </small>
                </div>
              </NavLink>
            </NavItem>
          ));
          const tabPanel = userInfo.ownerOfTeams.map(({
            id,
            members,
          }) => (
            <TabPane tabId={id} key={id} className="w-100">
              <div className="border-bottom d-flex p-3 tab-head">
                <div className="mr-auto font-weight-bold">
                  People
                </div>
                <div>
                  <Button
                    size="small"
                  >
                    Add {id}
                  </Button>
                </div>
              </div>
              <div className="vh-100 p-3 member-holder">
                <YourTeamMemberList members={members} />
              </div>
            </TabPane>
          ));
          return (
            <RowContainer>
              <Row className="mt-3 your-teams-container">
                <Col className="pr-0">
                  <div className="border-bottom d-flex p-3">
                    <div className="mr-auto font-weight-bold">
                      Teams
                    </div>
                    <div>
                      <Button
                        size="small"
                        onClick={() => {
                          this.setState({ createDialogOpen: true });
                        }}
                      >
                        Add
                      </Button>
                      <GQLCreateTeamDialog
                        isOpen={this.state.createDialogOpen}
                        orgId={userInfo.team.organization.id}
                        gcID={userInfo.gcID}
                        onSave={() => {
                          this.setState({ createDialogOpen: false });
                          refetch();
                        }}
                        onCancel={() => {
                          this.setState({ createDialogOpen: false });
                        }}
                      />
                    </div>
                  </div>
                  <div className="member-holder">
                    <Nav vertical>
                      <NavItem>
                        <NavLink
                          href="#!"
                          onClick={() => { this.toggle('1'); }}
                          className={
                            classnames({
                              active: this.state.activeTab === '1',
                            })
                          }
                        >
                          <div className="font-weight-bold">
                            Default Team
                          </div>
                          <small>Your teamless people live here</small>
                        </NavLink>
                      </NavItem>
                      {teamList}
                    </Nav>
                  </div>
                </Col>
                <Col className="pl-0 d-flex">
                  <TabContent
                    activeTab={this.state.activeTab}
                    className="d-flex w-100"
                  >
                    <TabPane
                      tabId="1"
                      className="h-100 w-100"
                    >
                      <div className="border-bottom d-flex p-3 tab-head">
                        <div className="mr-auto font-weight-bold">
                          People
                        </div>
                        <div>
                          <Button
                            size="small"
                          >
                            Add
                          </Button>
                        </div>
                      </div>
                      <div className="p-3">
                        TODO: put the teamless people here!
                      </div>
                    </TabPane>
                    {tabPanel}
                  </TabContent>
                </Col>
              </Row>
            </RowContainer>
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
