import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

import LocalizedCreateTeam from './CreateTeamDialog';
import { CREATE_TEAM } from '../../../gql/team';

import refetchMutated from '../../../utils/refetchMutated';
import ErrorModal from '../../core/ErrorModal';

const GQLCreateTeamDialog = (props) => {
  const {
    isOpen,
    onSave,
    onCancel,
    orgId,
    gcID,
  } = props;
  return (
    <Mutation
      mutation={CREATE_TEAM}
      update={refetchMutated}
      onCompleted={(e) => {
        onSave(e);
      }}
      onError={error => (
        <ErrorModal error={error} />
      )}
    >
      {createTeam => (
        <LocalizedCreateTeam
          onCancel={onCancel}
          onSave={(data) => {
            createTeam({
              variables: Object.assign({}, data, {
                organization: {
                  id: orgId,
                },
                owner: { gcID },
              }),
            });
          }}
          isOpen={isOpen}
        />
      )}
    </Mutation>
  );
};

GQLCreateTeamDialog.defaultProps = {
  isOpen: false,
  onSave: () => {},
  onCancel: () => {},
};

GQLCreateTeamDialog.propTypes = {
  isOpen: PropTypes.bool,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  orgId: PropTypes.string.isRequired,
  gcID: PropTypes.string.isRequired,
};

export default GQLCreateTeamDialog;
