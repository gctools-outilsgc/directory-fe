import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LocalizedComponent
  from '@gctools-components/react-i18n-translation-webpack';

// import classnames from 'classnames';
import styled from 'styled-components';

import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import {
  TabPane,
  UncontrolledCollapse,
  Button
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faUser } from '@fortawesome/free-solid-svg-icons';

import {
  GET_YOUR_TEAM,
  EDIT_TEAM,
  FullTeamFragment
} from '../../../gql/profile';
import { EDIT_A_TEAM } from '../../../gql/team';
import './css/youTeamStyle.css';
import I18nYourTeamMemberList from './YourTeamMemberList';
import GQLCreateTeamDialog from './GQLCreateTeamDialog';
import GQLEditTeamDialog from './GQLEditTeamDialog';
import MultiUserPicker from '../../core/MultiUserPicker';
import TransferConfirmation from './TransferConfirmation';
import I18nTransferToSupervisorDialog from './TransferToSupervisorDialog';
// import TeamAvatar from './TeamAvatar';
import refetchMutated from '../../../utils/refetchMutated';
import ErrorModal, { err } from '../../core/ErrorModal';

const RowContainer = styled.div`
background-color: #FFFFFF;
`;

const AccordionHeader = styled.div`
background-color: #FAFAFA;
padding: 10px 0;
`;

const TeamList = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    teamId,
    teamName,
    members,
    otherMembers,
    profile,
  } = props;
  return (
    <TabPane tabId={teamId} key={teamId} className="w-100">
      <div className="d-flex pl-3 pr-3 tab-head">
        <div className="mr-auto font-weight-bold">
          {__('people')}
        </div>
        <div>
          <Button
            size="small"
            onClick={() => { setIsOpen(!isOpen); }}
          >
            <FontAwesomeIcon icon={faPlus} />
            <span className="sr-only">{__('Add member')}</span>
          </Button>
          <Mutation
            mutation={EDIT_TEAM}
            update={refetchMutated}
          >
            {updateTeam => (
              <MultiUserPicker
                isOpen={isOpen}
                teamName={teamName}
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
      <div className="p-3">
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
  teamName: PropTypes.string.isRequired,
};

// eslint-disable-next-line max-len
const peopleAvatar = 'data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJ1c2VycyIgcm9sZT0iaW1nIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NDAgNTEyIiBjbGFzcz0ic3ZnLWlubGluZS0tZmEgZmEtdXNlcnMgZmEtdy0yMCBmYS03eCI+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNOTYgMjI0YzM1LjMgMCA2NC0yOC43IDY0LTY0cy0yOC43LTY0LTY0LTY0LTY0IDI4LjctNjQgNjQgMjguNyA2NCA2NCA2NHptNDQ4IDBjMzUuMyAwIDY0LTI4LjcgNjQtNjRzLTI4LjctNjQtNjQtNjQtNjQgMjguNy02NCA2NCAyOC43IDY0IDY0IDY0em0zMiAzMmgtNjRjLTE3LjYgMC0zMy41IDcuMS00NS4xIDE4LjYgNDAuMyAyMi4xIDY4LjkgNjIgNzUuMSAxMDkuNGg2NmMxNy43IDAgMzItMTQuMyAzMi0zMnYtMzJjMC0zNS4zLTI4LjctNjQtNjQtNjR6bS0yNTYgMGM2MS45IDAgMTEyLTUwLjEgMTEyLTExMlMzODEuOSAzMiAzMjAgMzIgMjA4IDgyLjEgMjA4IDE0NHM1MC4xIDExMiAxMTIgMTEyem03Ni44IDMyaC04LjNjLTIwLjggMTAtNDMuOSAxNi02OC41IDE2cy00Ny42LTYtNjguNS0xNmgtOC4zQzE3OS42IDI4OCAxMjggMzM5LjYgMTI4IDQwMy4yVjQzMmMwIDI2LjUgMjEuNSA0OCA0OCA0OGgyODhjMjYuNSAwIDQ4LTIxLjUgNDgtNDh2LTI4LjhjMC02My42LTUxLjYtMTE1LjItMTE1LjItMTE1LjJ6bS0yMjMuNy0xMy40QzE2MS41IDI2My4xIDE0NS42IDI1NiAxMjggMjU2SDY0Yy0zNS4zIDAtNjQgMjguNy02NCA2NHYzMmMwIDE3LjcgMTQuMyAzMiAzMiAzMmg2NS45YzYuMy00Ny40IDM0LjktODcuMyA3NS4yLTEwOS40eiIgY2xhc3M9IiI+PC9wYXRoPjwvc3ZnPg==';

const getDefaultTeam = (profile) => {
  const [defaultTeam] =
  // eslint-disable-next-line max-len
    profile.ownerOfTeams.filter(({ nameEn }) => nameEn === 'Default Team');
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
              ${___(
                __('You are about to disband this team.'),
                team.nameEn
              )}
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

const TransferTeamToSupervisorAction = (props) => {
  const { profile, supervisor } = props;
  const [showDialog, setShowDialog] = useState(false);
  const [error, setError] = useState([]);
  const [confirm, setConfirm] = useState(undefined);
  const closeAll = () => {
    setConfirm(undefined);
    setShowDialog(false);
  };
  return (
    <React.Fragment>
      <button
        className="btn btn-link"
        color="link"
        onClick={(e) => { setShowDialog(true); e.preventDefault(); }}
      >
        {__('Transfer Team')}
      </button>
      <ErrorModal error={error} />
      <Mutation
        mutation={EDIT_A_TEAM}
        refetchQueries={[{
          query: GET_YOUR_TEAM,
          variables: { gcID: supervisor.gcID },
        }]}
      >
        {mutate => (
          <React.Fragment>
            <I18nTransferToSupervisorDialog
              isOpen={showDialog}
              team={profile}
              secondaryButtonClick={() => { setShowDialog(false); }}
              closeButtonClick={() => { setShowDialog(false); }}
              primaryButtonClick={(_, destination) => {
                if (destination.id === supervisor.gcID) {
                  setError(err(__('already supervisor')));
                  return false;
                }
                const defaultTeam = getDefaultTeam(destination);
                if (!defaultTeam) {
                  setError(err(__('no default team')));
                  return false;
                }
                setConfirm(Object.assign(
                  {},
                  destination,
                  { team: defaultTeam }
                ));
                return true;
              }}
            />
            {confirm && (<TransferConfirmation
              source={supervisor}
              transferredUser={profile}
              destination={confirm}
              isOpen={!!confirm}
              title={__('Transfer this team to a new Supervisor')}
              bodyText={___(
                __('Explicit information about the transfer'),
                profile.name,
                confirm.name
              )}
              primaryButtonText={__('Accept')}
              secondaryButtonText={__('Back')}
              secondaryButtonClick={() => { setConfirm(undefined); }}
              closeButtonClick={closeAll}
              primaryButtonClick={() => {
                mutate({
                  variables: {
                    id: profile.id,
                    data: { owner: { gcID: confirm.gcID } },
                  },
                });
              }}
            />)}
          </React.Fragment>
        )}
      </Mutation>
    </React.Fragment>
  );
};
TransferTeamToSupervisorAction.propTypes = {
  /** Profile of current supervisor */
  supervisor: PropTypes.shape({
    gcID: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    titleEn: PropTypes.string,
    titleFr: PropTypes.string,
  }).isRequired,
  /** Profile of user being transferred */
  profile: PropTypes.shape({
    id: PropTypes.string.isRequired,
    nameEn: PropTypes.string,
    nameFr: PropTypes.string,
  }).isRequired,
};

class GQLYouTeamsTab extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: undefined,
      createDialogOpen: false,
      editDialogOpen: false,
      editTeam: {},
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
    // const { activeTab } = this.state;
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

          // const currentTab = activeTab || defaultId;
          const accordionTeam = sortedTeams.map(({
            id,
            nameEn,
            nameFr,
            descriptionEn,
            descriptionFr,
            members,
          }) => (
            <div className="card" key={id}>
              <AccordionHeader>
                <Button
                  id={`test-${id}`}
                  data-toggle="collapse"
                  color="link"
                  block
                  className="text-left"
                >
                  {(nameEn === '') && 'Default Team'}
                  {(nameEn !== '') &&
                    (localizer.lang === 'en_CA') ?
                    nameEn : nameFr
                  }
                  <span className="pl-3">
                    <span className="sr-only"> Members: </span>
                    <FontAwesomeIcon icon={faUser} />
                    <span className="pl-1">{members.length}</span>
                  </span>
                </Button>
              </AccordionHeader>
              <UncontrolledCollapse
                toggler={`#test-${id}`}
                data-parent="#teamAccordion"
                className="border-top"
              >
                <small>
                  {(id !== defaultId) && (
                    // eslint-disable-next-line max-len
                    <ul className="list-inline text-primary ml-n2 mb-1 mt-2">
                      <li className="list-inline-item">
                        <TransferTeamToSupervisorAction
                          profile={
                            {
                              id,
                              nameEn,
                              nameFr,
                            }
                          }
                          supervisor={
                            {
                              gcID: userInfo.gcID,
                              name: userInfo.name,
                            }
                          }
                        />
                      </li>
                      <li className="list-inline-item">
                        <Button
                          color="link"
                          size="small"
                          onClick={() => {
                            this.setState({
                              editDialogOpen: true,
                              editTeam: {
                                id,
                                nameEn,
                                nameFr,
                                descriptionEn,
                                descriptionFr,
                              },
                            });
                          }}
                        >
                          {__('edit')}
                        </Button>
                      </li>
                      {nameEn !== '' && (
                      <li className="list-inline-item">
                        <DeleteTeamAction
                          profile={userInfo}
                          team={
                            {
                              id,
                              nameEn,
                              nameFr,
                              descriptionEn,
                              descriptionFr,
                              members,
                            }
                          }
                        />
                      </li>
                      )}
                    </ul>
                  )}
                </small>
                <small className="pl-3 pb-2">
                  {(localizer.lang === 'en_CA') ?
                    descriptionEn : descriptionFr
                  }
                </small>
                <TeamList
                  profile={userInfo}
                  teamId={id}
                  teamName={nameEn}
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
              </UncontrolledCollapse>
            </div>
          ));
          return (
            <RowContainer>
              <div className="mt-3">
                {(userInfo.team) ?
                  <React.Fragment>
                    <div className="pr-0">
                      <div className="d-flex pb-3">
                        <div>
                          <Button
                            color="primary"
                            onClick={() => {
                              this.setState({ createDialogOpen: true });
                            }}
                          >
                            <FontAwesomeIcon icon={faPlus} />
                            <span className="pl-2">{__('Add team')}</span>
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
                    </div>
                    <GQLEditTeamDialog
                      isOpen={this.state.editDialogOpen}
                      onSave={() => {
                        this.setState({ editDialogOpen: false });
                      }}
                      onCancel={() => {
                        this.setState({ editDialogOpen: false });
                      }}
                      team={this.state.editTeam}
                      gcID={userInfo.gcID}
                    />
                    <div>
                      <div className="accordion" id="teamAccordion">
                        {accordionTeam}
                      </div>
                    </div>
                  </React.Fragment>
                :
                  <div>
                    You have No Org. Please pick an Org.
                  </div>
                }
              </div>
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

export default LocalizedComponent(GQLYouTeamsTab);
