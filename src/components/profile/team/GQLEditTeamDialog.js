import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

import LocalizedEditTeam from './EditTeamDialog';
import { EDIT_A_TEAM } from '../../../gql/team';

import refetchMutated from '../../../utils/refetchMutated';
import ErrorModal from '../../core/ErrorModal';

const GQLEditTeamDialog = (props) => {
  const {
    isOpen,
    onSave,
    onCancel,
    team,
    gcID,
  } = props;
  return (
    <Mutation
      mutation={EDIT_A_TEAM}
      update={refetchMutated}
      onCompleted={(e) => {
        onSave(e);
      }}
      onError={error => (
        <ErrorModal error={error} />
      )}
    >
      {modifyTeam => (
        <LocalizedEditTeam
          onCancel={onCancel}
          onSave={(data) => {
            modifyTeam({
              variables: {
                id: team.id,
                data: {
                  nameEn: data.nameEn,
                  nameFr: data.nameFr,
                  descriptionEn: data.descriptionEn,
                  descriptionFr: data.descriptionFr,
                  owner: { gcID },
                },
              },
            });
          }}
          isOpen={isOpen}
          team={team}
          gcIDforLater={gcID}
        />
      )}
    </Mutation>
  );
};

GQLEditTeamDialog.defaultProps = {
  isOpen: false,
  onSave: () => {},
  onCancel: () => {},
};

GQLEditTeamDialog.propTypes = {
  isOpen: PropTypes.bool,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  team: PropTypes.shape({
    id: PropTypes.string,
    nameEn: PropTypes.string,
    nameFr: PropTypes.string,
    descriptionEn: PropTypes.string,
    descriptionFr: PropTypes.string,
  }).isRequired,
  gcID: PropTypes.string.isRequired,
};

export default GQLEditTeamDialog;
