import React, { useState } from 'react';
import PropTypes from 'prop-types';

import gql from 'graphql-tag';

import LocalizedComponent
  from '@gctools-components/react-i18n-translation-webpack';

import styled from 'styled-components';

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  ListGroup
} from 'reactstrap';

import QueryLoader from '../../core/QueryLoader';
import varTag from '../../../utils/cssVarTag';

import TeamAvatar from './TeamAvatar';

export const GET_TEAM_LIST = gql`
query getTeamList($gcID: ID!) {
  profiles(gcID: $gcID) {
    gcID
    ownerOfTeams {
      id
      nameEn
      nameFr
    }
  }
}
`;

export const GET_BASICS = gql`
query getNameTitle($gcID: ID!) {
  profiles(gcID: $gcID) {
    gcID
    name
    avatar
    titleEn
    titleFr
  }
}
`;

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

const TeamListItem = styled.li`
:hover {
  background-color: ${varTag('--info')};
  color: #fff;
  cursor: pointer;
}
div {
  display: inline-block;
  margin-right: 10px;
  vertical-align: middle;
}
`;

export const TransferToTeamDialog = (props) => {
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

  const { user, supervisor } = props;

  const [team, setTeam] = useState(undefined);

  return (
    <QueryLoader query={GET_BASICS} variables={{ gcID: user }}>
      {({
        data: {
          profiles: [{
            name,
            titleEn,
            titleFr,
            avatar,
          }],
        },
      }) => (
        <QueryLoader query={GET_TEAM_LIST} variables={{ gcID: supervisor }}>
          {({
            data: {
              profiles: [{
                ownerOfTeams: teams,
              }],
            },
          }) => (
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
                {__('Transfer a team member to a new Team')}
              </ModalHeader>
              <ModalBody>
                <ProfileDisplay>
                  <img
                    className="avatar rounded-circle avatar-lg"
                    style={{ marginLeft: '10px' }}
                    src={avatar}
                    alt={___(__('%1$s avatar'), name)}
                  />
                  <ProfileName>{name}</ProfileName>
                  {(localizer.lang === 'en_CA') ? titleEn : titleFr}
                </ProfileDisplay>
                <ListGroup>
                  {teams.map((t) => {
                    const teamName = ((localizer.lang === 'en_CA') ?
                      t.nameEn : t.nameFr) || __('Default Team');
                    return (
                      <TeamListItem
                        key={`trans-team-dlg-${t.id}`}
                        className={
                          `list-group-item ${(team === t) && 'active'}`
                        }
                        onClick={() => { setTeam(t); }}
                      >
                        <TeamAvatar name={teamName} />
                        {teamName}
                      </TeamListItem>
                    );
                  })}
                </ListGroup>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onClick={(e) => { primaryButtonClick(e, team); }}
                  disabled={!team}
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
          )}
        </QueryLoader>
      )}
    </QueryLoader>
  );
};

TransferToTeamDialog.defaultProps = {
  isOpen: false,
  primaryButtonClick: () => {},
  secondaryButtonClick: () => {},
  closeButtonClick: () => {},
  onEnter: undefined,
  onExit: undefined,
  onOpened: undefined,
  onClosed: undefined,
  zIndex: 1000,
};

TransferToTeamDialog.propTypes = {
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
  /** The gcID of the user being transferred */
  user: PropTypes.string.isRequired,
  /** The gcID who owns the teams the user will be transferred to */
  supervisor: PropTypes.string.isRequired,
};

export default LocalizedComponent(TransferToTeamDialog);
