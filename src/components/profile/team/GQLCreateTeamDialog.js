import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

import LocalizedCreateTeam from './CreateTeamDialog';
import { CREATE_TEAM } from '../../../gql/team';

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
      onCompleted={(e) => {
        onSave(e);
      }}
      onError={() => {
        alert('ERROR - Replace with error UX');
      }}
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
