/*eslint-disable */
import React from 'react';
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


import Loading from './Loading';

import { GET_TEAM, EDIT_TEAM } from '../../../gql/profile';
import SupervisorPicker from '../../core/SupervisorPicker';
import TeamPicker from '../../core/TeamPicker';
import { UserAvatar } from '../../core/UserAvatar';
import LocalizedTransferConfirmation from './TransferConfirmation';
import TeamDisplayMemberList from './TeamDisplayMemberList';

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

export class GQLTeamCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      confirmModal: false,
      chosenSupervisor: '',
      chosenTeam: '',
      editSup: false,
      editTeam: false,
    };
    this.toggle = this.toggle.bind(this);
    this.toggleSup = this.toggleSup.bind(this);
    this.toggleTeam = this.toggleTeam.bind(this);
    this.toggleConfirm = this.toggleConfirm.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  toggleSup() {
    this.setState(prevState => ({
      editSup: !prevState.editSup,
    }));
  }

  toggleTeam() {
    this.setState(prevState => ({
      editTeam: !prevState.editTeam,
    }));
  }

  toggleConfirm() {
    this.setState({
      modal: !this.state.modal,
      confirmModal: !this.state.confirmModal,
    });
  }

  render() {
    const {
      id,
      accessToken,
      myGcID,
    } = this.props;
    const {
      chosenSupervisor,
      chosenTeam,
      editSup,
      editTeam,
    } = this.state;

    const ChangeSup = __('Changesup/team');
    const canEdit = (accessToken !== '') && (id === myGcID);
    return (
      <Query
        query={GET_TEAM}
        variables={{ gcID: (String(id)) }}
      >
        {({ loading, error, data }) => {
          if (loading) return <Loading />;
          if (error) return `Error!: ${error}`;
          const userInfo = (!data) ? '' : data.profiles[0];
          const teamTest = (!userInfo) ? '' : userInfo.team;
          const supTest = (!teamTest) ? '' : userInfo.team.owner;
          const memberTest = (!teamTest) ? '' : userInfo.team.members;
          return (
            <div style={style.card}>
              {userInfo ? (
                <div>
                  <div>
                    <Row>
                      <Col>
                        <div className="font-weight-bold mb-2">
                          {__('Supervisor')}
                        </div>
                        <div className="d-flex">
                          <UserAvatar
                            avatar={supTest ? supTest.avatar : ''}
                            name={supTest ? supTest.name : ''}
                          />
                          <div className="ml-2">
                            <div>
                              <a
                                href={supTest ?
                                  supTest.gcID : ''}
                                className="text-dark font-weight-bold"
                              >
                                {supTest ? supTest.name : 'None'}
                              </a>
                            </div>
                            <small className="text-muted">
                              {supTest ? supTest.titleEn : 'None'}
                            </small>
                          </div>
                        </div>
                        {canEdit ?
                          <div className="ml-5">
                            <Button
                              color="link"
                              size="sm"
                              onClick={this.toggle}
                            >
                              {ChangeSup}
                            </Button>
                            <Modal
                              isOpen={this.state.modal}
                              toggle={this.toggle}
                              size="lg"
                            >
                              <ModalHeader
                                toggle={this.toggle}
                                className="border-bottom"
                              >
                                {__('edit_team')}
                              </ModalHeader>
                              <ModalBody>
                                <Row
                                  className="justify-content-md-center"
                                >
                                  <div className="text-center">
                                    <div>
                                      <UserAvatar
                                        avatar={userInfo.avatar}
                                        name={userInfo.name}
                                      />
                                    </div>
                                    <div>
                                      <span className="font-weight-bold">
                                        {userInfo.name}
                                      </span>
                                    </div>
                                    <div>
                                      {userInfo.titleEn}
                                    </div>
                                  </div>
                                </Row>
                                <Row className="mt-3">
                                  <Col>
                                    {editSup ?
                                      <SupervisorPicker
                                        onResultSelect={(s) => {
                                          this.setState({
                                            chosenSupervisor: s,
                                            editTeam: true,
                                          });
                                          this.toggleSup(editSup);
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
                                            onClick={this.toggleSup}
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
                                  <Col>
                                    {editTeam ?
                                      <TeamPicker
                                        editMode
                                        supervisor={chosenSupervisor}
                                        gcID={id}
                                        selectedOrgTier={teamTest}
                                        onTeamChange={(t) => {
                                          this.setState({
                                            chosenTeam: t,
                                          });
                                        }}
                                      /> :
                                      <div>
                                        {teamTest ? teamTest.nameEn : 'None'}
                                      </div>
                                    }
                                  </Col>
                                </Row>
                              </ModalBody>
                              <ModalFooter>
                                <Button
                                  color="primary"
                                  onClick={() => {
                                    this.toggle();
                                    this.toggleConfirm();
                                  }}
                                >
                                  {__('next')}
                                </Button>
                                <Button
                                  onClick={() => {
                                    this.setState({
                                      chosenSupervisor: '',
                                      chosenTeam: '',
                                      modal: false,
                                    });
                                  }}
                                >
                                  {__('cancel')}
                                </Button>
                              </ModalFooter>
                            </Modal>
                            <Mutation
                              mutation={EDIT_TEAM}
                              refetchQueries={[{
                                query: GET_TEAM,
                                variables: { gcID: String(userInfo.gcID) },
                              }]}
                              onCompleted={() => {
                                this.setState({
                                  confirmModal: false,
                                });
                              }}
                            >
                              {modifyProfile => this.state.confirmModal && (
                                <LocalizedTransferConfirmation
                                  isOpen={this.state.confirmModal}
                                  source={
                                    (supTest !== null) ? supTest :
                                    {
                                       name: __('None'),
                                       team: {
                                         nameEn: teamTest.nameEn,
                                         nameFr: teamTest.nameFr,
                                       },
                                    }}
                                  transferredUser={userInfo}
                                  title={__('Confirm supervisor transfer')}
                                  secondaryButtonText={__('cancel')}
                                  primaryButtonText={__('Confirm')}
                                  bodyText={`${___(__('You are transferring %1$s %2$s %3$s %4$s.'), // eslint-disable-line
                                            (supTest !== null) ? supTest.name : __('None'),
                                            chosenSupervisor.name,
                                            (localizer.lang == 'en_CA') ? teamTest.nameEn : teamTest.nameFr,
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
                                    this.toggleConfirm();
                                  }}
                                />
                              )}
                            </Mutation>
                          </div>
                          : ''}
                      </Col>
                      <Col>
                        <div className="font-weight-bold mb-2">
                          {__('Team')}
                        </div>
                        {teamTest ? teamTest.nameEn : 'None'}
                      </Col>
                    </Row>
                    <hr />
                    <div className="font-weight-bold">
                      {__('people')}
                    </div>
                    <TeamDisplayMemberList
                      members={memberTest}
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
