import React, { useState } from 'react';
import PropTypes from 'prop-types';

import LocalizedComponent
  from '@gctools-components/react-i18n-translation-webpack';

import styled from 'styled-components';

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from 'reactstrap';

// import I18NProfileListSearch from '../../core/ProfileListSearch';
import SupervisorPicker from '../../core/SupervisorPicker';

const ProfileDisplay = styled.div`
text-align: center;
h1 {
  font-size: 1em;
  font-weight: bold;
}
`;

const ProfileName = styled.div`
font-weight: bold;
margin: 0 auto;
`;

const ChosenHolder = styled.div`
height: 150px;
`;

export const TransferToSupervisorDialog = (props) => {
  const {
    isOpen,
    primaryButtonClick,
    secondaryButtonClick,
    closeButtonClick,
    onEnter,
    onExit,
    onOpened,
    onClosed,
    zIndex,
  } = props;

  const {
    profile: {
      avatar,
      name,
      titleEn,
      titleFr,
    },
    team: {
      nameEn,
      nameFr,
    },
  } = props;

  const [supervisor, setSupervisor] = useState(undefined);

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
          {__('Transfer a team member to a new Supervisor')}
        </ModalHeader>
        <ModalBody className="mb-5">
          {nameEn ? (
            <ProfileDisplay>
              <ProfileName>
                {(localizer.lang === 'en_CA') ?
                  nameEn : nameFr}
              </ProfileName>
            </ProfileDisplay>
          ) : (
            <ProfileDisplay>
              <h1>{__('Choose a new Supervisor for this team member')}</h1>
              <img
                className="avatar rounded-circle avatar-lg"
                style={{ marginLeft: '10px' }}
                src={avatar}
                alt={___(__('%1$s avatar'), name)}
              />
              <ProfileName>{name}</ProfileName>
              {(localizer.lang === 'en_CA') ? titleEn : titleFr}
            </ProfileDisplay>
          )}
          <div>
            <SupervisorPicker
              onResultSelect={(e) => {
                setSupervisor(e);
              }}
            />
            <ChosenHolder>
              {supervisor && (
                <div className="pt-4">
                  <div>
                    Chosen Supervisor
                  </div>
                  <div className="d-flex">
                    <img
                      className="avatar rounded-circle"
                      src={
                        supervisor.avatar
                      }
                      alt={
                        supervisor.name
                      }
                    />
                    <div className="ml-2">
                      <div
                        className="font-weight-bold"
                      >
                        {supervisor.name}
                      </div>
                      <small className="text-muted">
                        {supervisor.titleEn}
                      </small>
                    </div>
                  </div>
                </div>
              )}
            </ChosenHolder>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={(e) => { primaryButtonClick(e, supervisor); }}
            disabled={!supervisor}
          >
            {__('Transfer')}
          </Button>
          <Button
            color="secondary"
            onClick={secondaryButtonClick}
          >
            {__('Cancel')}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
TransferToSupervisorDialog.defaultProps = {
  isOpen: false,
  primaryButtonClick: () => {},
  secondaryButtonClick: () => {},
  closeButtonClick: () => {},
  onEnter: undefined,
  onExit: undefined,
  onOpened: undefined,
  onClosed: undefined,
  zIndex: 1000,
  profile: {
    name: 'Jonald',
    avatar: '',
    titleEn: '',
    titleFr: '',
  },
  team: {
    nameEn: '',
    nameFr: '',
  },
};

TransferToSupervisorDialog.propTypes = {
  /** Boolean to control the state of the modal */
  isOpen: PropTypes.bool,
  /** Handler fired when primary button is clicked */
  primaryButtonClick: PropTypes.func,
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
  /** The profile of the user being transferred */
  profile: PropTypes.shape({
    name: PropTypes,
    avatar: PropTypes.string,
    titleEn: PropTypes.string,
    titleFr: PropTypes.string,
  }),
  team: PropTypes.shape({
    nameEn: PropTypes.string,
    nameFr: PropTypes.string,
  }),
};

export default LocalizedComponent(TransferToSupervisorDialog);
