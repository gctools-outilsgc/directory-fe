import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Mutation } from 'react-apollo';

import LocalizedComponent
  from '@gctools-components/react-i18n-translation-webpack';

import I18nTransferToSupervisorDialog from './TransferToSupervisorDialog';
import ErrorModal, { err } from '../../core/ErrorModal';

import { EDIT_TEAM, GET_TEAM, GET_YOUR_TEAM } from '../../../gql/profile';

const TransferToSupervisorAction = (props) => {
  const { profile, gcID } = props;
  const [showDialog, setShowDialog] = useState(false);
  const [error, setError] = useState([]);
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
          variables: { gcID },
        }]}
        onCompleted={() => {
          setShowDialog(false);
        }}
      >
        {mutate => (
          <I18nTransferToSupervisorDialog
            isOpen={showDialog}
            profile={profile}
            secondaryButtonClick={() => { setShowDialog(false); }}
            closeButtonClick={() => { setShowDialog(false); }}
            primaryButtonClick={(_, supervisor) => {
              if (supervisor.gcID === gcID) {
                setError(err(__('already supervisor')));
                return false;
              }
              const [defaultTeam] = supervisor.ownerOfTeams
                .filter(({ nameEn }) => nameEn === '');
              if (!defaultTeam) {
                setError(err(__('no default team')));
                return false;
              }
              mutate({
                variables: {
                  gcID: profile.gcID,
                  data: { team: { id: defaultTeam.id } },
                },
              });
              return true;
            }}
          />
        )}
      </Mutation>
    </React.Fragment>
  );
};
TransferToSupervisorAction.propTypes = {
  /** gcID of current supervisor */
  gcID: PropTypes.string.isRequired,
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
  const { members, gcID } = props;
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
                    gcID={gcID}
                  />
                </li>
                <li className="list-inline-item">
                  <a href="#!">action</a>
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
  /** gcID of team owner */
  gcID: PropTypes.string.isRequired,
  /** List of team members */
  members: PropTypes.arrayOf(PropTypes.shape({
    avatar: PropTypes.string,
    name: PropTypes.string,
    titleEn: PropTypes.string,
  })).isRequired,
};

export default LocalizedComponent(YourTeamMemberList);
