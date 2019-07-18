import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Query } from 'react-apollo';
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter
} from 'reactstrap';
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
      {({
        loading,
        error,
        data,
        refetch,
      }) => {
        if (loading) return null;
        if (error) return `Error: ${error}`;
        const approvalData = (data.approvals.length < 1) ? '' : data.approvals;
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
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          onClick={() => { setModalOpen(false); }}
                          color="primary"
                        >
                          YUP
                        </Button>
                        <Button onClick={() => { setModalOpen(false); }}>
                          NOPE
                        </Button>
                      </ModalFooter>
                    </Modal>
                  </div>
                </div>
              </div>
            )}
            {/**
              Hidden button gets clicked in parent mutation onComplete
              TODO: Find a more elegant way to refetch this component
            */}
            <Button
              id="refetchAprvlSts"
              className="sr-only"
              tabIndex="-1"
              aria-hidden="true"
              onClick={() => refetch()}
            >
              Refetch (im invisible)
            </Button>
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
