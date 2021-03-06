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
  Label
} from 'reactstrap';

import varTag from '../../utils/cssVarTag';


const PersonDetails = styled.div`
  display: inline-block;
  vertical-align: middle;
  padding-left: 10px;
  label {
    font-weight: bold;
  }
`;

const PersonCard = styled.div`
  ${props => props.checked && `
  li {
    color: #fff;
    background-color: ${varTag('--primary')};
  }`}
  padding: 10px;
`;

const PersonCardContainer = (props) => {
  const [checked, setChecked] = useState(false);
  const {
    user,
    setCheckCount,
    checkCount,
    onChange
  } = props;
  const checkboxId = `muser-chk-select-${user.gcID}`;
  return (
    <PersonCard checked={checked}>
      <ListGroupItem
        onClick={() => {
          setChecked(!checked);
          setCheckCount(checkCount + ((!checked) ? 1 : -1));
          if (onChange) onChange(!checked);
        }}
      >
        <div>
          <Input
            addon
            type="checkbox"
            checked={checked}
            onChange={() => { setChecked(!checked); }}
            id={checkboxId}
          />
          <img
            className="avatar rounded-circle"
            style={{ marginLeft: '10px' }}
            src={user.avatar}
            alt={(user.avatarAltText || '%s').replace(/%s/g, user.name)}
          />
          <PersonDetails>
            <Label for={checkboxId}>{user.name}</Label><br />
            {user.title}
          </PersonDetails>
        </div>
      </ListGroupItem>
    </PersonCard>
  );
};
PersonCardContainer.propTypes = {
  user: PropTypes.shape({
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
  }).isRequired,
  /** How many items are checked (state from parent) */
  checkCount: PropTypes.number.isRequired,
  /** State function that can alter the checkCount */
  setCheckCount: PropTypes.func.isRequired,
  /** Triggered when the selected state changes */
  onChange: PropTypes.func.isRequired,
};

const MultiUserPicker = (props) => {
  const [checkCount, setCheckCount] = useState(0);
  const [selectedIds, setSelectedIds] = useState([]);
  const {
    isOpen,
    teamName,
    // title,
    // bodyText,
    // primaryButtonText,
    primaryButtonClick,
    // secondaryButtonText,
    secondaryButtonClick,
    closeButtonClick,
    onEnter,
    onExit,
    onOpened,
    onClosed,
    zIndex,
    users,
  } = props;
  const resetState = () => {
    setCheckCount(0);
    setSelectedIds([]);
  };
  const onPrimaryClick = (e) => {
    if (primaryButtonClick(e, selectedIds) !== false) {
      resetState();
    }
  };
  const onSecondaryClick = (e) => {
    if (secondaryButtonClick(e) !== false) {
      resetState();
    }
  };
  const onCloseClick = (e) => {
    if (closeButtonClick(e) !== false) {
      resetState();
    }
  };
  const title = props.title || __('title');
  const bodyText = props.bodyText || ___(__('bodyText'), teamName);
  const primaryButtonText = props.primaryButtonText || __('primaryButtonText');
  const secondaryButtonText = props.secondaryButtonText
    || __('secondaryButtonText');

  return (
    <div>
      <Modal
        isOpen={isOpen}
        toggle={closeButtonClick}
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
            <button className="close" onClick={onCloseClick}>
              &times;
            </button>
          )}
        >
          {title}
        </ModalHeader>
        <ModalBody>
          {bodyText}
          <ListGroup>
            {users.map(u => (
              <PersonCardContainer
                user={u}
                key={`multi-user-picker-gcid-${u.gcID}`}
                setCheckCount={setCheckCount}
                checkCount={checkCount}
                onChange={(sel) => {
                  if (sel && !selectedIds.includes(u.gcID)) {
                    selectedIds.push(u.gcID);
                  } else if (!sel && selectedIds.includes(u.gcID)) {
                    selectedIds.splice(selectedIds.indexOf(u.gcID), 1);
                  }
                  setSelectedIds(selectedIds);
                }}
              />
            ))}
          </ListGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={onPrimaryClick}
            disabled={(checkCount === 0)}
          >
            {primaryButtonText}
          </Button>
          <Button
            color="secondary"
            onClick={onSecondaryClick}
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
  teamName: '',
  title: '',
  bodyText: '',
  primaryButtonText: '',
  primaryButtonClick: () => {},
  secondaryButtonText: '',
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
  teamName: PropTypes.string,
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
