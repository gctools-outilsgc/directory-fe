import React, { useState } from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import styled from 'styled-components';

import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import {
  GET_YOUR_TEAM,
  EDIT_TEAM,
  FullTeamFragment
} from '../../../gql/profile';
import './css/youTeamStyle.css';
import I18nYourTeamMemberList from './YourTeamMemberList';
import GQLCreateTeamDialog from './GQLCreateTeamDialog';
import MultiUserPicker from '../../core/MultiUserPicker';
import TransferConfirmation from './TransferConfirmation';

import refetchMutated from '../../../utils/refetchMutated';

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
    profile,
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
            <FontAwesomeIcon icon={faPlus} />
            <span className="sr-only">Add</span>
          </Button>
          <Mutation
            mutation={EDIT_TEAM}
            update={refetchMutated}
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
                    avatarAltText: `${m.name}'s avatar`,
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
        <I18nYourTeamMemberList members={members} profile={profile} />
      </div>
    </TabPane>
  );
};

TeamList.propTypes = {
  profile: PropTypes.shape({
    gcID: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    titleEn: PropTypes.string,
    titleFr: PropTypes.string,
  }).isRequired,
  members: PropTypes.arrayOf(PropTypes.shape({
    gcID: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
  otherMembers: PropTypes.arrayOf(PropTypes.shape({
    gcID: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
  teamId: PropTypes.string.isRequired,
};

// eslint-disable-next-line max-len
const peopleAvatar = 'data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJ1c2VycyIgcm9sZT0iaW1nIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NDAgNTEyIiBjbGFzcz0ic3ZnLWlubGluZS0tZmEgZmEtdXNlcnMgZmEtdy0yMCBmYS03eCI+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNOTYgMjI0YzM1LjMgMCA2NC0yOC43IDY0LTY0cy0yOC43LTY0LTY0LTY0LTY0IDI4LjctNjQgNjQgMjguNyA2NCA2NCA2NHptNDQ4IDBjMzUuMyAwIDY0LTI4LjcgNjQtNjRzLTI4LjctNjQtNjQtNjQtNjQgMjguNy02NCA2NCAyOC43IDY0IDY0IDY0em0zMiAzMmgtNjRjLTE3LjYgMC0zMy41IDcuMS00NS4xIDE4LjYgNDAuMyAyMi4xIDY4LjkgNjIgNzUuMSAxMDkuNGg2NmMxNy43IDAgMzItMTQuMyAzMi0zMnYtMzJjMC0zNS4zLTI4LjctNjQtNjQtNjR6bS0yNTYgMGM2MS45IDAgMTEyLTUwLjEgMTEyLTExMlMzODEuOSAzMiAzMjAgMzIgMjA4IDgyLjEgMjA4IDE0NHM1MC4xIDExMiAxMTIgMTEyem03Ni44IDMyaC04LjNjLTIwLjggMTAtNDMuOSAxNi02OC41IDE2cy00Ny42LTYtNjguNS0xNmgtOC4zQzE3OS42IDI4OCAxMjggMzM5LjYgMTI4IDQwMy4yVjQzMmMwIDI2LjUgMjEuNSA0OCA0OCA0OGgyODhjMjYuNSAwIDQ4LTIxLjUgNDgtNDh2LTI4LjhjMC02My42LTUxLjYtMTE1LjItMTE1LjItMTE1LjJ6bS0yMjMuNy0xMy40QzE2MS41IDI2My4xIDE0NS42IDI1NiAxMjggMjU2SDY0Yy0zNS4zIDAtNjQgMjguNy02NCA2NHYzMmMwIDE3LjcgMTQuMyAzMiAzMiAzMmg2NS45YzYuMy00Ny40IDM0LjktODcuMyA3NS4yLTEwOS40eiIgY2xhc3M9IiI+PC9wYXRoPjwvc3ZnPg==';

const getDefaultTeam = (profile) => {
  const [defaultTeam] =
    profile.ownerOfTeams.filter(({ nameEn }) => nameEn === '');
  return defaultTeam;
};

const DeleteTeamAction = (props) => {
  const { profile, team } = props;
  const [showDialog, setShowDialog] = useState(false);
  const names = team.members.map(t => t.name);
  const mList = (names && [
    names.slice(0, -1).join(', '),
    names.slice(-1)[0],
  ].join(names.length < 2 ? '' : ` ${__('and')} `)) || '';
  const defaultTeam = getDefaultTeam(profile);

  // TODO: Backend should do this in a single call, when it does remove this
  const variables = {
    t: team.id,
  };
  if (team.members.length) variables.default = defaultTeam.id;
  const vars = Array.concat(
    ['$t: ID!'],
    (team.members.length && ['$default: ID!']) || [],
    team.members.map((t, i) => `$m${i}: ID!`)
  ).join(',');
  team.members.forEach((t, i) => { variables[`m${i}`] = t.gcID; });
  const DELETE_TEAM = gql`
    mutation deleteTeam(${vars}) {
      ${team.members.map((t, i) => `
      mu${i}: modifyProfile(gcID: $m${i}, data: { team: { id: $default} }){
        ...FullTeam
      }
      `)}
      deleteTeam(id: $t)
    }
    ${(team.members.length && FullTeamFragment) || ''}
  `;
  return (
    <React.Fragment>
      <Button
        color="link"
        size="small"
        onClick={(e) => { setShowDialog(true); e.preventDefault(); }}
      >
        {__('Delete Team')}
      </Button>
      <Mutation
        mutation={DELETE_TEAM}
        refetchQueries={[{
          query: GET_YOUR_TEAM,
          variables: { gcID: profile.gcID },
        }]}
      >
        {mutate => (
          <TransferConfirmation
            source={team}
            transferredUser={{
              team: {},
              name: '',
              avatar: peopleAvatar,
            }}
            destination={defaultTeam}
            isOpen={showDialog}
            title={__('Delete/Disband (?) a team')}
            bodyText={`
              ${__('You are about to disband this team.')}
              ${mList && __('These team members will be moved.')}
              ${mList && ___(
                __('%1$s will be moved from %2$s to %3$s'),
                mList,
                (localizer.lang === 'en_CA') ? team.nameEn : team.nameFr,
                __('Default team')
              )}
            `}
            primaryButtonText={__('Are you sure?')}
            secondaryButtonText={__('Cancel')}
            secondaryButtonClick={() => { setShowDialog(false); }}
            closeButtonClick={() => { setShowDialog(false); }}
            primaryButtonClick={() => {
              mutate({ variables });
            }}
          />
        )}
      </Mutation>
    </React.Fragment>
  );
};
DeleteTeamAction.propTypes = {
  /** Profile of current supervisor */
  profile: PropTypes.shape({
    gcID: PropTypes.string.isRequired,
    ownerOfTeams: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      nameEn: PropTypes.string.isRequired,
      nameFr: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
  /** Team being deleted */
  team: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
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
        variables={{ gcID: this.props.id }}
      >
        {({
          loading,
          error,
          data,
          refetch,
        }) => {
          if (loading) return 'Loading...';
          if (error) return `Error!: ${error}`;
          if (!data || !data.profiles || data.profiles.length === 0) {
            return 'Loading...';
          }
          const [userInfo] = data.profiles;
          const sortedTeams = userInfo.ownerOfTeams
            .sort(t => t.nameEn === '' && -1);
          const defaultId = (sortedTeams.length > 0) ? sortedTeams[0].id : 0;
          const defaultMembers = (sortedTeams.length > 0) ?
            sortedTeams[0].members : [];

          const currentTab = activeTab || defaultId;

          const teamList = sortedTeams.map((team) => {
            const {
              id,
              nameEn,
              nameFr,
              descriptionEn,
            } = team;
            return (
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
                        {nameEn !== '' && (
                        <li className="list-inline-item">
                          <DeleteTeamAction
                            profile={userInfo}
                            team={team}
                          />
                        </li>
                        )}
                      </ul>
                    </small>
                  </div>
                </NavLink>
              </NavItem>
            );
          });
          const tabPanel = sortedTeams.map(({
            id,
            members,
          }) => (
            <TeamList
              profile={userInfo}
              teamId={id}
              key={`teamlist_${id}`}
              members={members.map(m => Object.assign(
                {},
                m,
                {
                  title: (localizer.lang === 'en_CA') ?
                    m.titleEn : m.titleFr,
                  avatarAltText: `${m.name}'s avatar`,
                }
              ))}
              otherMembers={defaultMembers.map(m => Object.assign(
                {},
                m,
                {
                  title: (localizer.lang === 'en_CA') ?
                    m.titleEn : m.titleFr,
                  avatarAltText: `${m.name}'s avatar`,
                }
              ))}
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
                        <FontAwesomeIcon icon={faPlus} />
                        <span className="sr-only">Add</span>
                      </Button>
                      <GQLCreateTeamDialog
                        isOpen={this.state.createDialogOpen}
                        orgId={userInfo.team.organization.id}
                        gcID={userInfo.gcID}
                        onSave={() => {
                          this.setState({ createDialogOpen: false });
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
