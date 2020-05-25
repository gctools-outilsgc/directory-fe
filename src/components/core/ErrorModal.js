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
