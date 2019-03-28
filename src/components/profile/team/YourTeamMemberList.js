import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Mutation } from 'react-apollo';

import LocalizedComponent
  from '@gctools-components/react-i18n-translation-webpack';

import I18nTransferToSupervisorDialog from './TransferToSupervisorDialog';
import I18nTransferToNewTeamDialog from './TransferToTeamDialog';
import TransferConfirmation from './TransferConfirmation';
import ErrorModal, { err } from '../../core/ErrorModal';

import { EDIT_TEAM, GET_TEAM, GET_YOUR_TEAM } from '../../../gql/profile';

const getDefaultTeam = (profile) => {
  const [defaultTeam] =
    profile.ownerOfTeams.filter(({ nameEn }) => nameEn === 'Default Team');
  return defaultTeam;
};

const TransferToSupervisorAction = (props) => {
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
      <a
        href="#!"
        onClick={(e) => { setShowDialog(true); e.preventDefault(); }}
      >
        {__('transfer to new Supervisor')}
      </a>
      <ErrorModal error={error} />
      <Mutation
        mutation={EDIT_TEAM}
        refetchQueries={[{
          query: GET_TEAM,
          variables: { gcID: profile.gcID },
        }, {
          query: GET_YOUR_TEAM,
          variables: { gcID: supervisor.gcID },
        }]}
      >
        {mutate => (
          <React.Fragment>
            <I18nTransferToSupervisorDialog
              isOpen={showDialog}
              profile={profile}
              secondaryButtonClick={() => { setShowDialog(false); }}
              closeButtonClick={() => { setShowDialog(false); }}
              primaryButtonClick={(_, destination) => {
                if (destination.gcID === supervisor.gcID) {
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
              title={__('Transfer a team member to a new Supervisor')}
              bodyText={__('Explicit information about the transfer')}
              primaryButtonText={__('Accept')}
              secondaryButtonText={__('Back')}
              secondaryButtonClick={() => { setConfirm(undefined); }}
              closeButtonClick={closeAll}
              primaryButtonClick={() => {
                const defaultTeam = getDefaultTeam(confirm);
                mutate({
                  variables: {
                    gcID: profile.gcID,
                    data: { team: { id: defaultTeam.id } },
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
TransferToSupervisorAction.propTypes = {
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
    gcID: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    titleEn: PropTypes.string,
    titleFr: PropTypes.string,
  }).isRequired,
};

const TransferToNewTeamAction = (props) => {
  const { profile, supervisor } = props;
  const [showDialog, setShowDialog] = useState(false);
  const [confirm, setConfirm] = useState(undefined);
  const closeAll = () => {
    setConfirm(undefined);
    setShowDialog(false);
  };
  return (
    <React.Fragment>
      <a
        href="#!"
        onClick={(e) => { setShowDialog(true); e.preventDefault(); }}
      >
        {__('transfer to new Team')}
      </a>
      <Mutation
        mutation={EDIT_TEAM}
        refetchQueries={[{
          query: GET_TEAM,
          variables: { gcID: profile.gcID },
        }, {
          query: GET_TEAM,
          variables: { gcID: supervisor.gcID },
        }, {
          query: GET_YOUR_TEAM,
          variables: { gcID: supervisor.gcID },
        }]}
      >
        {mutate => (
          <React.Fragment>
            <I18nTransferToNewTeamDialog
              user={profile.gcID}
              supervisor={supervisor.gcID}
              isOpen={showDialog}
              secondaryButtonClick={() => { setShowDialog(false); }}
              closeButtonClick={() => { setShowDialog(false); }}
              primaryButtonClick={(_, newTeam) => {
                setConfirm(newTeam);
                return true;
              }}
            />
            {confirm && (<TransferConfirmation
              source={profile.team}
              transferredUser={profile}
              destination={confirm}
              isOpen={!!confirm}
              title={__('Transfer a team member to a new Supervisor')}
              bodyText={__('Explicit information about the transfer')}
              primaryButtonText={__('Accept')}
              secondaryButtonText={__('Back')}
              secondaryButtonClick={() => { setConfirm(undefined); }}
              closeButtonClick={closeAll}
              primaryButtonClick={() => {
                mutate({
                  variables: {
                    gcID: profile.gcID,
                    data: { team: { id: confirm.id } },
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
TransferToNewTeamAction.propTypes = {
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
    gcID: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    titleEn: PropTypes.string,
    titleFr: PropTypes.string,
  }).isRequired,
};


export const YourTeamMemberList = (props) => {
  const { members, profile } = props;
  const list = (members.length > 0) ?
    members.map(p => (
      <li key={p.name} className="mb-3">
        <div className="d-flex">
          <img
            className="rounded-circle avatar"
            src={
              p ? p.avatar : ''
            }
            alt={
              p ? p.name : 'None'
            }
          />
          <div className="ml-3">
            <div className="font-weight-bold member-name">
              {p ? p.name : 'None'}
            </div>
            <small className="text-muted">
              {p ? p.titleEn : 'None'}
            </small>
            <small>
              <ul className="list-inline">
                <li className="list-inline-item border-right pr-2">
                  <TransferToSupervisorAction
                    profile={p}
                    supervisor={profile}
                  />
                </li>
                <li className="list-inline-item">
                  <TransferToNewTeamAction
                    profile={p}
                    supervisor={profile}
                  />
                </li>
              </ul>
            </small>
          </div>
        </div>
      </li>
    )) : (
      <li>
        There are no members in this team
      </li>
    );
  return (
    <ul className="list-unstyled">
      {list}
    </ul>
  );
};

YourTeamMemberList.propTypes = {
  /** profile of team owner */
  profile: PropTypes.shape({
    gcID: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    titleEn: PropTypes.string,
    titleFr: PropTypes.string,
  }).isRequired,
  /** List of team members */
  members: PropTypes.arrayOf(PropTypes.shape({
    avatar: PropTypes.string,
    name: PropTypes.string,
    titleEn: PropTypes.string,
  })).isRequired,
};

export default LocalizedComponent(YourTeamMemberList);
