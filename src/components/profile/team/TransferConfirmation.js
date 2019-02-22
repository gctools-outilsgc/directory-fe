/* eslint-disable comma-dangle */
import React from 'react';

import PropTypes from 'prop-types';

import styled from 'styled-components';

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from 'reactstrap';

const Arrow = styled.div`
    position: relative;
    background: var(--primary);
    margin: 0 auto;
    height: 30px;
    width: 40%;
  :after {
    left: 100%;
    top: 50%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-color: rgba(136, 183, 213, 0);
    border-left-color: var(--primary);
    border-width: 30px;
    margin-top: -30px;
  }`;

const TransferConfirmation = (props) => {
  const {
    isOpen,
    title,
    bodyText,
    primaryButtonText,
    secondaryButtonText
  } = props;
  return (
    <div>
      <Modal isOpen={isOpen} centered>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          {bodyText}
          <Arrow />
        </ModalBody>
        <ModalFooter>
          <Button color="primary">{primaryButtonText}</Button>
          <Button color="secondary">{secondaryButtonText}</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

TransferConfirmation.defaultProps = {
  isOpen: false,
  title: 'You will transfer to a new Supervisor (& Team)',
  bodyText: `Explicit information about the transfer to include the Person
    being transffered, from what Team and Super, to what team and Supervisor.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu
    porttitor ex. Nam luctus tincidunt dui, sit amet semper mi consequat eu.`,
  primaryButtonText: 'Transfer',
  secondaryButtonText: 'Cancel',
};

TransferConfirmation.propTypes = {
  isOpen: PropTypes.bool,
  title: PropTypes.string,
  bodyText: PropTypes.string,
  primaryButtonText: PropTypes.string,
  secondaryButtonText: PropTypes.string,
};

export default TransferConfirmation;
