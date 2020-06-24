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

  let translatedError = '';
  switch(newError) {
    case "E1ProfileNotExist":
      translatedError = (localizer.lang === 'en_CA') ?
      "Profile not found" : "Profil n'existe pas"
      break;
    case "E2TeamNotExist":
      translatedError = (localizer.lang === 'en_CA') ?
      "Team does not exist" : "Équipe n'existe pas"
      break;
    case "E3OrgNotExist":
      translatedError = (localizer.lang === 'en_CA') ?
      "Organization does not exist" : "Organisation n'existe pas"
      break;
    case "E4ApprovalNotExist":
      translatedError = (localizer.lang === 'en_CA') ?
      "Approval does not exist" : "Approbation n'existe pas"
      break;
    case "E6NotAuthorized":
      translatedError = (localizer.lang === 'en_CA') ?
      "Not Authorized" : "Non authorisé(e)"
      break;
    case "E7CircularRelationship":
      translatedError = (localizer.lang === 'en_CA') ?
        "Selected supervisor would create a circular reporting relationship" : "Sélecionner le superviseur créerait une relation hiérarchique circulaire"
      break;
    case "E8TokenProfileNotExist":
      translatedError = (localizer.lang === 'en_CA') ?
        "Profile does not exist" : "Profil n'existe pas"
      break;
    case "E9MustBeAuthenticated":
      translatedError = (localizer.lang === 'en_CA') ?
        "Must be authenticaticated" : "Doit être authentifié"
      break;
    case "E10MustBeOwnerOrSupervisor":
      translatedError = (localizer.lang === 'en_CA') ?
        "Must be owner or supervisor of profile to modify" : "Doit être propriétaire ou superviseur du profil pour mofidier"
      break;
    case "E11MustBeTeamOwner":
      translatedError = (localizer.lang === 'en_CA') ?
      "Must be owner of team to modify" : "Doit être propriétaire de l'équipe pour modifier"
      break;
    case "E12ApprovalOnlyRevokedBySubmitter":
      translatedError = (localizer.lang === 'en_CA') ?
      "Approvals can only be revoked by the submitter" : "L'approbation peut être révoquée par le demandeur"
      break;
    case "E13MustBeSupervisorInfo":
      translatedError = (localizer.lang === 'en_CA') ?
      "Must be supervisor of user to modify Informational Approval" : "Doit être le superviseur de l'utilisateur pour modifier l'information de l'approbation"
      break;
    case "E14MustBeSupervisorTransfer":
      translatedError = (localizer.lang === 'en_CA') ?
      "Must be supervisor of the team to accept transfer request" : "Doit être le superviseur de l'équipe pour accecpter la demande de transfert"
      break;
    case "E15MustBeApprover":
      translatedError = (localizer.lang === 'en_CA') ?
      "Must be Approver on Approval to modify" : "Doit être l'approbateur de l'approbation pour pouvoir modifier."
      break;
    case "E16AddressFieldMissing":
      translatedError = (localizer.lang === 'en_CA') ?
      "All address fields are required" : "Tous les champs de l'adresse sont obligatoires"
      break;
    default:
      translatedError = newError
  }
  return translatedError;
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
