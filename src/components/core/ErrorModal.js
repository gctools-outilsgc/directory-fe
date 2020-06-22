/*eslint-disable */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Alert
} from 'reactstrap';

export const err = msg => [
  new Error(msg),
  new Date(),
];

const formatError = (error) => {
  const textToRemove = [
    new RegExp('Error: GraphQL error:', 'g'),
  ];

  let newError = error;

  textToRemove.forEach((text) => {
    newError = newError.replace(text, '');
  });

  switch(newError) {
    case "E1ProfileNotExist":
      newError = __('Profile not found')
      break;
    case "E2TeamNotExist":
      newError = __('Team does not exist')
      break;
    case "E3OrgNotExist":
      newError = __('Organization does not Exist')
      break;
    case "E4ApprovalNotExist":
      newError = __('Approval does not Exist')
      break;
    case "E6NotAuthorized":
      newError = __('Not Authorized')
      break;
    case "E7CircularRelationship":
      newError = __('Selected supervisor would create a circular reporting relationship')
      break;
    case "E8TokenProfileNotExist":
      newError = __('Profile does not exist')
      break;
    case "E9MustBeAuthenticated":
      newError = __('Must be authenticaticated')
      break;
    case "E10MustBeOwnerOrSupervisor":
      newError = __('Must be owner or supervisor of profile to Modify')
      break;
    case "E11MustBeTeamOwner":
      newError = __('Must be owner of team to modify')
      break;
    case "E12ApprovalOnlyRevokedBySubmitter":
      newError = __('Approvals can only be revoked by the submitter')
      break;
    case "E13MustBeSupervisorInfo":
      newError = __('Must be supervisor of user to modify Informational Approval')
      break;
    case "E14MustBeSupervisorTransfer":
      newError = __('Must be supervisor of the team to accept transfer request')
      break;
    case "E15MustBeApprover":
      newError = __('Must be Approver on Approval to modify')
      break;
    case "E16AddressFieldMissing":
      newError = __('All address fields are required')
      break;
    default:
      newError
  }
  return newError;
};

const ErrorModal = ({
  title,
  alertColour,
  onOkClick,
  error: [error, date],
}) => {
  const [open, setOpen] = useState(!!error);
  const toggle = () => { setOpen(!open); };

  useEffect(() => {
    setOpen(!!error);
  }, [error, date]);
  const message = (error) ? formatError(error.message) : '';
  return (
    <Modal isOpen={open} toggle={toggle}>
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>
        <Alert color={alertColour}>{message}</Alert>
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          onClick={() => {
            toggle();
            onOkClick();
          }}
        >
          Ok
        </Button>
      </ModalFooter>
    </Modal>
  );
};

ErrorModal.defaultProps = {
  error: [],
  title: 'Error',
  alertColour: 'danger',
  onOkClick: () => {},
};

ErrorModal.propTypes = {
  /** tuple of Error object and current date */
  error: PropTypes.arrayOf(PropTypes.object),
  /** Modal's title */
  title: PropTypes.string,
  /** Color to use in the embedded Alert */
  alertColour: PropTypes.string,
  onOkClick: PropTypes.func,
};

export default ErrorModal;
