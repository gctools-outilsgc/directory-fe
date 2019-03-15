import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styled from 'styled-components';
import { Query, Mutation } from 'react-apollo';

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

import { GET_YOUR_TEAM, EDIT_TEAM } from '../../../gql/profile';
import './css/youTeamStyle.css';
import YourTeamMemberList from './YourTeamMemberList';
import GQLCreateTeamDialog from './GQLCreateTeamDialog';
import MultiUserPicker from '../../core/MultiUserPicker';

const RowContainer = styled.div`
background-color: #F4F8F9;
height: 430px;
overflow: hidden;
`;

const TeamList = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    teamId,
    members,
    otherMembers,
    refetch,
  } = props;
  return (
    <TabPane tabId={teamId} key={teamId} className="w-100">
      <div className="border-bottom d-flex p-3 tab-head">
        <div className="mr-auto font-weight-bold">
          People
        </div>
        <div>
          <Button
            size="small"
            onClick={() => { setIsOpen(!isOpen); }}
          >
            Add {teamId}
          </Button>
          <Mutation
            mutation={EDIT_TEAM}
            onCompleted={refetch}
          >
            {updateTeam => (
              <MultiUserPicker
                isOpen={isOpen}
                users={otherMembers.map(m => Object.assign(
                  {},
                  m,
                  {
                    title: (localizer.lang === 'en_CA') ?
                      m.titleEn : m.titleFr,
                  }
                ))}
                closeButtonClick={() => { setIsOpen(false); }}
                secondaryButtonClick={() => { setIsOpen(false); }}
                primaryButtonClick={(e, selected) => {
                  selected.forEach((gcID) => {
                    updateTeam({
                      variables: {
                        gcID,
                        data: { team: { id: teamId } },
                      },
                    });
                  });
                  setIsOpen(false);
                }}
              />
            )}
          </Mutation>
        </div>
      </div>
      <div className="vh-100 p-3 member-holder">
        <YourTeamMemberList members={members} />
      </div>
    </TabPane>
  );
};

TeamList.propTypes = {
  members: PropTypes.arrayOf(PropTypes.shape({
    gcID: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    avatarAltText: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
  otherMembers: PropTypes.arrayOf(PropTypes.shape({
    gcID: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    avatarAltText: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
  teamId: PropTypes.string.isRequired,
  refetch: PropTypes.func.isRequired,
};

class GQLYouTeamsTab extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: undefined,
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
    const { activeTab } = this.state;
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
          console.log(data);
          if (!data || !data.profiles || data.profiles.length === 0) {
            return 'Invalid object';
          }
          const [userInfo] = data.profiles;
          const sortedTeams = userInfo.ownerOfTeams
            .sort(t => t.nameEn === '' && -1);
          const defaultId = (sortedTeams.length > 0) ? sortedTeams[0].id : 0;
          const defaultMembers = (sortedTeams.length > 0) ?
            sortedTeams[0].members : [];

          const currentTab = activeTab || defaultId;

          const teamList = sortedTeams.map(({
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
                  classnames({ active: currentTab === id })}
              >
                <div>
                  <div className="font-weight-bold">
                    {(nameEn === '') && 'Default Team'}
                    {(nameEn !== '') && `${nameEn} / ${nameFr}`}
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
          const tabPanel = sortedTeams.map(({
            id,
            members,
          }) => (
            <TeamList
              teamId={id}
              members={members}
              otherMembers={defaultMembers}
              refetch={refetch}
            />
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
                      {teamList}
                    </Nav>
                  </div>
                </Col>
                <Col className="pl-0 d-flex">
                  <TabContent
                    activeTab={currentTab}
                    className="d-flex w-100"
                  >
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
