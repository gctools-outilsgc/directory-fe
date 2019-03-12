/* eslint-disable comma-dangle */
import React, { useState } from 'react';

import PropTypes from 'prop-types';

import styled from 'styled-components';

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  ListGroup,
  ListGroupItem,
  Input,
} from 'reactstrap';

// Fallback for browsers who don't support CSS variables
const cssVariables = {
  '--primary': '#002D42',
};
const styles = getComputedStyle(document.body);

const varTag = (variable) => {
  if (!styles.getPropertyValue(variable)) {
    return cssVariables[variable];
  }
  return `var(${variable})`;
};

const PersonDetails = styled.div`
  display: inline-block;
  vertical-align: middle;
  padding-left: 10px;
`;

const PersonCard = styled.div`
  ${props => props.checked && `
  li {
    color: #fff;
    background-color: ${varTag('--primary')};
  }`}
  padding: 10px;
`;

const MultiUserPicker = (props) => {
  const {
    isOpen,
    title,
    bodyText,
    primaryButtonText,
    primaryButtonClick,
    secondaryButtonText,
    secondaryButtonClick,
    closeButtonClick,
    onEnter,
    onExit,
    onOpened,
    onClosed,
    zIndex,
    users,
  } = props;
  return (
    <div>
      <Modal
        isOpen={isOpen}
        centered
        autoFocus
        onEnter={onEnter}
        onExit={onExit}
        onOpened={onOpened}
        onClosed={onClosed}
        zIndex={zIndex}
      >
        <ModalHeader
          close={(
            <button className="close" onClick={closeButtonClick}>
              &times;
            </button>
          )}
        >
          {title}
        </ModalHeader>
        <ModalBody>
          {bodyText}
          <ListGroup>
            {users.map((u) => {
              const [checked, setChecked] = useState(false);
              return (
                <PersonCard checked={checked}>
                <ListGroupItem
                  key={`multi-user-picker-gcid-${u.gcID}`}
                  onClick={() => { setChecked(!checked); }}
                >
                  {(() => {
                    return (
                      <div>
                        <Input
                          addon
                          type="checkbox"
                          checked={checked}
                          onChange={() => { setChecked(!checked); }}
                          aria-label={`Checkbox for ${u.name}`}
                        />
                        <img
                          className="avatar rounded-circle"
                          style={{ marginLeft: '10px' }}
                          src={u.avatar}
                          alt={(u.avatarAltText || '%s').replace(/%s/g, u.name)}
                        />
                        <PersonDetails>
                          <strong>{u.name}</strong><br />
                          {u.title}
                        </PersonDetails>
                      </div>
                    );
                  })()}
                </ListGroupItem>
                </PersonCard>
            )})}
          </ListGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={primaryButtonClick}
          >
            {primaryButtonText}
          </Button>
          <Button
            color="secondary"
            onClick={secondaryButtonClick}
          >
            {secondaryButtonText}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

MultiUserPicker.defaultProps = {
  isOpen: false,
  title: '1. Title',
  bodyText: `2. Paragraph text.  Lorem ipsum dolor sit amet, consectetur
    adipiscing elit. Aenean eu porttitor ex. Nam luctus tincidunt dui, sit
    amet semper mi consequat eu.`,
  primaryButtonText: '4. Primary action',
  primaryButtonClick: () => {},
  secondaryButtonText: 'Cancel',
  secondaryButtonClick: () => {},
  closeButtonClick: () => {},
  onEnter: undefined,
  onExit: undefined,
  onOpened: undefined,
  onClosed: undefined,
  zIndex: 1000,
};

MultiUserPicker.propTypes = {
  /** Boolean to control the state of the modal */
  isOpen: PropTypes.bool,
  /** Title of dialog */
  title: PropTypes.string,
  /** Body text of dialog */
  bodyText: PropTypes.string,
  /** Text to display on primary button */
  primaryButtonText: PropTypes.string,
  /** Handler fired when primary button is clicked */
  primaryButtonClick: PropTypes.func,
  /** Text to display on secondary button */
  secondaryButtonText: PropTypes.string,
  /** Handler fired when secondary button is clicked */
  secondaryButtonClick: PropTypes.func,
  /** Handler fired when close button is clicked */
  closeButtonClick: PropTypes.func,
  /** called on componentDidMount */
  onEnter: PropTypes.func,
  /** called on componentWillUnmount */
  onExit: PropTypes.func,
  /** called when done transitioning in */
  onOpened: PropTypes.func,
  /** called when done transitioning out */
  onClosed: PropTypes.func,
  /** zIndex of modal */
  zIndex: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  /** The profile of the old supervisor */
  users: PropTypes.arrayOf(PropTypes.shape({
    /** gcID of the user */
    gcID: PropTypes.string.isRequired,
    /** Name of the person */
    name: PropTypes.string.isRequired,
    /** URL of the avatar */
    avatar: PropTypes.string,
    /** Text to use for avatar alt tag, `%s` replaced by user's name */
    avatarAltText: PropTypes.string,
    /** User's title (language unaware) */
    title: PropTypes.string,
  }).isRequired).isRequired,
};

export default MultiUserPicker;
