import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Query, Mutation } from 'react-apollo';
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import {
  GET_YOUR_INFO_APPROVAL,
  MODIFY_APPROVALS
} from '../../../gql/profile';
import refetchMutated from '../../../utils/refetchMutated';

const GQLYourTeamApprovalStatus = (props) => {
  const {
    gcID,
  } = props;
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <Query
      query={GET_YOUR_INFO_APPROVAL}
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
                <div className="message-custom d-flex align-items-center">
                  <div>
                    <a href={`/p/${approvalData[0].gcIDApprover.gcID}`}>
                      {approvalData[0].gcIDApprover.name}
                    </a>
                    {__(' needs to approve your information change')}
                  </div>
                  <div className="ml-auto">
                    <Button
                      color="link"
                      onClick={() => {
                        setModalOpen(true);
                      }}
                    >
                      {__('Cancel request')}
                    </Button>
                    <Modal
                      isOpen={modalOpen}
                    >
                      <ModalHeader>{__('Are you sure?')}</ModalHeader>
                      <ModalBody>
                        <div>
                          {__('Do you want to cancel this change request to')}
                          {approvalData[0].gcIDApprover.name}?
                        </div>
                      </ModalBody>
                      <ModalFooter>
                        <Mutation
                          mutation={MODIFY_APPROVALS}
                          update={refetchMutated}
                          onCompleted={() => {
                            setModalOpen(false);
                            refetch();
                          }}
                        >
                          {modifyApproval => (
                            <Button
                              onClick={() => {
                                modifyApproval({
                                  variables: {
                                    id: approvalData[0].id,
                                    data: {
                                      status: 'Revoked',
                                    },
                                  },
                                });
                              }}
                              color="primary"
                            >
                              {__('Cancel request')}
                            </Button>
                          )}
                        </Mutation>
                        <Button onClick={() => { setModalOpen(false); }}>
                          {__('Back')}
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
              id="refetchInfoSts"
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
