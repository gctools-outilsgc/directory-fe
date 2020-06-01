/*eslint-disable */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LocalizedComponent
  from '@gctools-components/react-i18n-translation-webpack';

import { connect } from 'react-redux';
import { Query, Mutation } from 'react-apollo';

import {
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import ErrorModal, { err } from '../../core/ErrorModal';

import Loading from './Loading';

import { GET_TEAM_NAME, EDIT_TEAM } from '../../../gql/profile';
import SupervisorPicker from '../../core/SupervisorPicker';
// import TeamPicker from '../../core/TeamPicker';
import { UserAvatar } from '../../core/UserAvatar';
import LocalizedTransferConfirmation from './TransferConfirmation';
import TeamDisplayMemberList from './TeamDisplayMemberList';
import DirectReportMemberList from './DirectReportMemberList';
import GQLYourTeamApprovalStatus from './GQLYourTeamApprovalStatus';

const mapStateToProps = ({ user }) => {
  const props = {};
  if (user) {
    props.accessToken = user.access_token;
    props.myGcID = user.profile.sub;
  }
  return props;
};

const style = {
  card: {
    width: '100%',
    padding: '10px 0 10px 0',
  },
};

function GQLTeamCard(props) {

  const [modal, setModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [chosenSupervisor, setChosenSupervisor] = useState('');
  const [chosenTeam, setChosenTeam] = useState('');
  const [editSup, setEditSup] = useState(true);
  const [errors, setErrors] = useState([])

  const toggle = () => {
    setModal(!modal);
  }

  const toggleSup = () => {
    setEditSup(!editSup);
  }

  const toggleConfirm = () => {
    setModal(!modal);
    setConfirmModal(!confirmModal);
    setErrors([]);
  }

  const errorHandler = (e) => {
    setErrors(err(e));
  }

  const {
    id,
    accessToken,
    myGcID,
  } = props;

  const ChangeSup = __('Changesup/team');
  const canEdit = (accessToken !== '') && (id === myGcID);
  return (
    <Query
      query={GET_TEAM_NAME}
      variables={{ gcID: (String(id)) }}
    >
      {({
        loading,
        error,
        data,
      }) => {
        if (loading) return <Loading />;
        if (error) return errorHandler(error);
        const userInfo = (!data) ? '' : data.profiles[0];
        const teamTest = (!userInfo) ? '' : userInfo.team;
        const supTest = (!teamTest) ? '' : userInfo.team.owner;
        // const memberTest = (!teamTest) ? '' : userInfo.team.members;
        return (
          <div style={style.card}>
            {userInfo ? (
              <div>
                <div>
                  <Row>
                    <Col>
                      {canEdit && (
                        <GQLYourTeamApprovalStatus
                          gcID={id}
                        />
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="font-weight-bold mb-2">
                        {__('Supervisor')}
                      </div>
                      <a href={supTest ? supTest.gcID : ''} >
                        <div className="d-flex">
                          <UserAvatar
                            avatar={supTest ? supTest.avatar : ''}
                            name=""
                          />
                          <div className="ml-2">
                            <div className="text-dark font-weight-bold">
                              {supTest ? supTest.name : 'N/A'}
                            </div>
                            <small className="text-muted">
                              {supTest ? supTest.titleEn : 'N/A'}
                            </small>
                          </div>
                        </div>
                      </a>
                      {canEdit ?
                        <div className="ml-5">
                          <Button
                            color="link"
                            size="sm"
                            onClick={toggle}
                          >
                            {ChangeSup}
                          </Button>
                          <Modal
                            isOpen={modal}
                            toggle={toggle}
                            centered
                            autoFocus
                          >
                            <ModalHeader
                              toggle={toggle}
                              className="border-bottom"
                            >
                              {__('edit_team')}
                            </ModalHeader>
                            <ModalBody className="pb-5">
                              <Row
                                className="justify-content-md-center"
                              >
                                <div className="text-center">
                                  <div>
                                    <UserAvatar
                                      avatar={userInfo.avatar}
                                      name={userInfo.name}
                                      size="lg"
                                    />
                                  </div>
                                  <div>
                                    <span className="font-weight-bold">
                                      {userInfo.name}
                                    </span>
                                  </div>
                                  <div>
                                    {(localizer.lang === 'en_CA') ?
                                      userInfo.titleEn : userInfo.titleFr
                                    }
                                  </div>
                                </div>
                              </Row>
                              <Row className="mt-3 mb-5">
                                <Col>
                                  {editSup ?
                                    <SupervisorPicker
                                      onResultSelect={(s) => {
                                        setChosenSupervisor(s);
                                        setChosenTeam(s.ownerOfTeams[0]);
                                        setErrors([]);
                                        toggleSup(editSup);
                                      }}
                                    /> :
                                    <div className="d-flex">
                                      {!chosenSupervisor ?
                                        <div className="mr-auto d-flex">
                                          <div className="mr-2">
                                            <UserAvatar
                                              avatar={supTest ?
                                                supTest.avatar : ''}
                                              name={supTest ?
                                                supTest.name : ''}
                                            />
                                          </div>
                                          <div>
                                            <div
                                              className="font-weight-bold"
                                            >
                                              {supTest
                                                ? supTest.name : 'None'}
                                            </div>
                                            <small className="text-muted">
                                              {supTest ?
                                                supTest.titleEn : 'No'}
                                            </small>
                                          </div>
                                        </div> :
                                        <div className="mr-auto d-flex">
                                          <div className="mr-2">
                                            <UserAvatar
                                              avatar={chosenSupervisor ?
                                                chosenSupervisor.avatar : ''}
                                              name={chosenSupervisor ?
                                                chosenSupervisor.name : ''}
                                            />
                                          </div>
                                          <div>
                                            <div
                                              className="font-weight-bold"
                                            >
                                              {chosenSupervisor.name}
                                            </div>
                                            <small className="text-muted">
                                              {chosenSupervisor.titleEn}
                                            </small>
                                          </div>
                                        </div>
                                      }
                                      <div>
                                        <Button
                                          onClick={toggleSup}
                                          color="light"
                                        >
                                          <FontAwesomeIcon
                                            icon={faSearch}
                                          />
                                          <span className="sr-only">
                                            {__('search')}
                                          </span>
                                        </Button>
                                      </div>
                                    </div>
                                  }
                                </Col>
                              </Row>
                            </ModalBody>
                            <ModalFooter>
                              <Button
                                color="primary"
                                onClick={() => {
                                  if (chosenSupervisor.gcID !== props.id) {
                                    toggle();
                                    toggleConfirm();
                                  } else {
                                    errorHandler(__('You cannot be your own supervisor. Please pick someone else.'));
                                  }
                                }}
                              >
                                {__('next')}
                              </Button>
                              <Button
                                onClick={() => {
                                  setChosenTeam('');
                                  setChosenTeam('');
                                  setModal(false);
                                }}
                              >
                                {__('cancel')}
                              </Button>
                            </ModalFooter>
                          </Modal>
                          {/** TODO: Create an approval */}
                          <Mutation
                            mutation={EDIT_TEAM}
                            refetchQueries={[{
                              query: GET_TEAM_NAME,
                              variables: { gcID: String(userInfo.gcID) },
                            }]}
                            onError={(e) => {
                              errorHandler(e);
                            }}
                            onCompleted={() => {
                              setConfirmModal(false);
                              document.getElementById('refetchAprvlSts').click();
                            }}
                          >
                            {(modifyProfile, { loading }) =>
                              confirmModal && (
                                <LocalizedTransferConfirmation
                                  loading={loading}
                                  isOpen={confirmModal}
                                  source={
                                    (supTest !== null) ? supTest :
                                      {
                                        name: __('None'),
                                        team: {
                                          nameEn: teamTest ? teamTest.nameEn : 'N/A',
                                          nameFr: teamTest ? teamTest.nameFr : 'N/A',
                                        },
                                      }}
                                  transferredUser={userInfo}
                                  title={__('Confirm supervisor transfer')}
                                  secondaryButtonText={__('cancel')}
                                  primaryButtonText={__('Confirm')}
                                  bodyText={`${___(__('You are transferring %1$s %2$s %3$s %4$s.'), // eslint-disable-line
                                    (supTest !== null) ? supTest.name : __('None'),
                                    chosenSupervisor.name,
                                    (localizer.lang == 'en_CA') ? (teamTest) ? teamTest.nameEn : 'N/A' : (teamTest) ? teamTest.nameFr : 'N/A',
                                    (localizer.lang == 'en_CA') ? chosenTeam.nameEn : chosenTeam.nameFr
                                  )}`}
                                  destination={
                                    {
                                      name: chosenSupervisor.name,
                                      avatar: chosenSupervisor.avatar,
                                      team: {
                                        nameEn: chosenTeam.nameEn,
                                        nameFr: chosenTeam.nameFr,
                                        avatar: chosenTeam.avatar,
                                      },
                                    }
                                  }
                                  primaryButtonClick={() => {
                                    // TODO Send this to notifications
                                    modifyProfile({
                                      variables: {
                                        gcID: String(userInfo.gcID),
                                        data: {
                                          team: {
                                            id: chosenTeam.id,
                                          },
                                        },
                                      },
                                    });
                                  }}
                                  secondaryButtonClick={() => {
                                    toggleConfirm();
                                  }}
                                />
                              )}
                          </Mutation>
                          <ErrorModal error={errors} />
                        </div>
                        : ''}
                    </Col>
                    <Col>
                      <div className="font-weight-bold mb-2">
                        {__('Team')}
                      </div>
                      {(localizer.lang == 'en_CA') ? (teamTest) ? teamTest.nameEn : 'N/A' : (teamTest) ? teamTest.nameFr : 'N/A'}
                    </Col>
                  </Row>
                  <hr />
                  <div className="font-weight-bold">
                    {__('people')}
                  </div>
                  {teamTest.nameEn == 'Global Team' ? (
                    <div>{__('No Team')}</div>
                  ) : (
                      <TeamDisplayMemberList
                        userID={(String(id))}
                      />
                    )}
                  <DirectReportMemberList
                    userID={(String(id))}
                  />
                </div>
              </div>
            ) : (
                <div>{__('Cannot find GCID')}</div>
              )}
          </div>
        );
      }}
    </Query>
  );

}

GQLTeamCard.defaultProps = {
  id: undefined,
  accessToken: undefined,
  myGcID: undefined,
};

GQLTeamCard.propTypes = {
  id: PropTypes.string,
  accessToken: PropTypes.string,
  myGcID: PropTypes.string,
};

export default connect(mapStateToProps)(LocalizedComponent(GQLTeamCard));
