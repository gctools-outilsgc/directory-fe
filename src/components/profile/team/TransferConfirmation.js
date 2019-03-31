/* eslint-disable comma-dangle */
import React from 'react';

import PropTypes from 'prop-types';

import styled from 'styled-components';

import LocalizedComponent
  from '@gctools-components/react-i18n-translation-webpack';

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from 'reactstrap';

import TeamAvatar from './TeamAvatar';

import varTag from '../../../utils/cssVarTag';
import GenericAvatar from '../../profile/OrgChart/Card/img/user.gif';


const Arrow = styled.div`
    position: relative;
    background: ${varTag('--primary')};
    margin-top: 50px;
    margin-bottom: 50px;
    margin-left: 75px;
    height: 15px;
    width: 250px;
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
    border-left-color: ${varTag('--primary')};
    border-width: 15px;
    margin-top: -15px;
  }`;

const Avatars = styled.div`
  position: relative;
  margin-top: -95px;
  margin-bottom: 50px;
  img, .tcd-team-avatar {
    width: 75px;
    max-width: 75px;
    height: 75px;
    margin-left: 80px;
    display: inline-block;
  }
  img:first-child, .tcd-team-avatar:first-child {
    margin-left: 30px;
  }
  img {
    background-color: #cecece;
    border-radius: 50%;
    border: 3px solid ${varTag('--primary')};
  }
  .tcd-team-avatar + div.name + div.break + img {
    margin-top: -60px;
  }
  >div.name {
    position: absolute;
    display: inline-block;
    margin-top: 100px;
    margin-left: -105px;
    width: 150px;
    text-align: center;
  }
  h2 {
    font-size: 1.1em;
    font-weight: bold;
    margin: 0;
  }
  div.team {
    position: absolute;
    display: inline-block;
    margin-top: 55px;
    margin-left: -25px;
  }
  >div.break {
    margin-left: 25px;
    margin-right: -25px;
    margin-top: 20px;
    position: absolute;
    display: inline-block;
    ${({ delete: d }) => (!d && (`
      background-color: ${varTag('--primary')};
    `))}
    width: 30px;
    height: 35px;
  }
  >div.break>div {
    background-color: #fff;
    height: 50px;
    margin-left: 5px;
    margin-top: -5px;
    ${({ delete: d }) => (d && (`
      color: green;
      font-size: 30px;
      width: 30px;
      padding-left: 2px;
      `)) || `
      width: 18px;
      transform: rotate(20deg);
    `}
  }
`;

const getProfileDetails = (profile) => {
  const {
    name,
    avatar,
    team,
    titleEn,
    titleFr,
  } = profile || {};
  if (!name) {
    return {
      name: (localizer.lang === 'en_CA') ? profile.nameEn : profile.nameFr,
      isTeam: true,
    };
  }
  return {
    isTeam: false,
    name,
    avatar: avatar || GenericAvatar,
    title: (localizer.lang === 'en_CA') ? titleEn : titleFr,
    team: {
      id: team && team.id,
      name: team && ((localizer.lang === 'en_CA') ? team.nameEn : team.nameFr),
      avatar: team && team.avatar,
    }
  };
};

const TransferConfirmation = (props) => {
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
    source,
    transferredUser,
    destination,
    avatarAltText,
  } = props;
  const user1 = getProfileDetails(source);
  const user2 = getProfileDetails(transferredUser);
  const user3 = getProfileDetails(destination);
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
        <ModalBody style={{ marginBottom: '35px' }}>
          {bodyText}
          <Arrow />
          <Avatars delete={props.delete}>
            {user1.isTeam && (
              <React.Fragment>
                <TeamAvatar
                  className="tcd-team-avatar"
                  name={user1.name}
                />
                <div className="name">
                  <h2>{user1.name}</h2>
                </div>
              </React.Fragment>
            )}
            {!user1.isTeam && (
              <React.Fragment>
                <img
                  src={user1.avatar}
                  alt={`${avatarAltText} ${user1.name}`}
                />
                <div className="team">
                  <TeamAvatar name={user2.team.name} />
                </div>
                <div className="name">
                  <h2>{user1.name}</h2>
                  <span>{user2.team.name}</span>
                </div>
              </React.Fragment>
            )}
            <div className="break">
              <div>
                {props.delete && <i className="fas fa-trash-alt" />}
              </div>
            </div>
            <img
              src={user2.avatar}
              alt={`${avatarAltText} ${user2.name}`}
            />
            <div className="name">
              <h2>{user2.name}</h2>
              <span>{user2.title}</span>
            </div>
            {user3.isTeam && (
              <React.Fragment>
                <TeamAvatar className="tcd-team-avatar" name={user3.name} />
                <div className="name">
                  <h2>{user3.name}</h2>
                </div>
              </React.Fragment>
            )}
            {!user3.isTeam && (
              <React.Fragment>
                <img
                  src={user3.avatar}
                  alt={`${avatarAltText} ${user3.name}`}
                />
                <div className="team">
                  <TeamAvatar name={user3.team.name} />
                </div>
                <div className="name">
                  <h2>{user3.name}</h2>
                  <span>{user3.team.name}</span>
                </div>
              </React.Fragment>
            )}
          </Avatars>
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

TransferConfirmation.defaultProps = {
  isOpen: false,
  title: 'You will transfer to a new Supervisor (& Team)',
  bodyText: `Explicit information about the transfer to include the Person
    being transffered, from what Team and Super, to what team and Supervisor.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu
    porttitor ex. Nam luctus tincidunt dui, sit amet semper mi consequat eu.`,
  primaryButtonText: 'Primary',
  primaryButtonClick: () => {},
  secondaryButtonText: 'Secondary',
  secondaryButtonClick: () => {},
  closeButtonClick: () => {},
  onEnter: undefined,
  onExit: undefined,
  onOpened: undefined,
  onClosed: undefined,
  zIndex: 1000,
  avatarAltText: 'Avatar of ',
  delete: false,
};

TransferConfirmation.propTypes = {
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
  /** Text to use for avatar alt tag, suffixed by the user's name */
  avatarAltText: PropTypes.string,
  /** The profile or team the user is being transferred out of */
  source: PropTypes.oneOfType([
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string,
      team: PropTypes.shape({
        nameEn: PropTypes.string,
        nameFr: PropTypes.string,
      }).isRequired,
    }),
    PropTypes.shape({
      nameEn: PropTypes.string,
      nameFr: PropTypes.string,
    }),
  ]).isRequired,
  /** The profile of user being transferred */
  transferredUser: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    titleEn: PropTypes.string,
    titleFr: PropTypes.string,
  }).isRequired,
  /** The destination the user is being transferred to */
  destination: PropTypes.oneOfType([
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string,
      team: PropTypes.shape({
        nameEn: PropTypes.string,
        nameFr: PropTypes.string,
      }).isRequired,
    }),
    PropTypes.shape({
      nameEn: PropTypes.string,
      nameFr: PropTypes.string,
    }),
  ]).isRequired,
  /** Indicate the intention to delete "source" */
  delete: PropTypes.bool,
};

export default LocalizedComponent(TransferConfirmation);
