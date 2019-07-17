import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Query } from 'react-apollo';
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import { GET_YOUR_TEAM_APPROVAL } from '../../../gql/profile';

const GQLYourTeamApprovalStatus = (props) => {
  const {
    gcID,
  } = props;
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <Query
      query={GET_YOUR_TEAM_APPROVAL}
      variables={
        { gcIDSubmitter: { gcID: (String(gcID)) } }
      }
    >
      {({ loading, error, data }) => {
        if (loading) return null;
        if (error) return `Error: ${error}`;
        const approvalData = (!data) ? '' : data.approvals;
        return (
          <React.Fragment>
            {approvalData && (
              <div className="alert-icon alert-info">
                <div className="icon">
                  <FontAwesomeIcon icon={faInfoCircle} />
                </div>
                <div className="message-custom d-flex">
                  <div>
                    <a href={`/p/${approvalData[0].gcIDApprover.gcID}`}>
                      {approvalData[0].gcIDApprover.name}
                    </a>
                    needs to approve your change request.
                  </div>
                  <div className="ml-auto">
                    <Button
                      color="link"
                      onClick={() => {
                        setModalOpen(true);
                      }}
                    >
                      REVOKE IT
                    </Button>
                    <Modal
                      isOpen={modalOpen}
                    >
                      <ModalHeader>Are you sure?</ModalHeader>
                      <ModalBody>
                        <div>
                          Do you want to revoke this request?
                        </div>
                        <Button onClick={() => { setModalOpen(false); }}>
                          YUP
                        </Button>
                        <Button onClick={() => { setModalOpen(false); }}>
                          NOPE
                        </Button>
                      </ModalBody>
                    </Modal>
                  </div>
                </div>
              </div>
            )}
          </React.Fragment>
        );
      }}
    </Query>
  );
};

GQLYourTeamApprovalStatus.defaultProps = {
  gcID: null,
};

GQLYourTeamApprovalStatus.propTypes = {
  gcID: PropTypes.string,
};

export default GQLYourTeamApprovalStatus;
