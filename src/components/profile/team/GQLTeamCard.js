import React from 'react';
import PropTypes from 'prop-types';
import LocalizedComponent
  from '@gctools-components/react-i18n-translation-webpack';

import { connect } from 'react-redux';
import { Query } from 'react-apollo';

import {
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';

import Loading from './Loading';

import { GET_TEAM } from '../../../gql/profile';
import SupervisorPicker from '../../core/SupervisorPicker';
import TeamPicker from '../../core/TeamPicker';
import TransferConfirmation from './TransferConfirmation';

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
      editSup,
    } = this.state;
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
          const supTest = (!userInfo) ? '' : userInfo.supervisor;
          const teamTest = (!userInfo) ? '' : userInfo.team;
          return (
            <div style={style.card}>
              {userInfo ? (
                <div>
                  <div>
                    <Row>
                      <Col>
                        <div className="font-weight-bold">
                          {__('Supervisor')}
                        </div>
                        <div>
                          {supTest ? supTest.name : 'None'}
                        </div>
                        <small className="text-muted">
                          {supTest ? supTest.titleEn : 'None'}
                        </small>
                        {canEdit ?
                          <div>
                            <Button
                              color="light"
                              size="sm"
                              onClick={this.toggle}
                            >
                              Change supervisor
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
                                Edit Team
                              </ModalHeader>
                              <ModalBody>
                                <Row
                                  className="justify-content-md-center"
                                >
                                  <div className="text-center">
                                    <div>
                                      Avatar
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
                                          });
                                          this.toggleSup(editSup);
                                        }}
                                      /> :
                                      <div className="d-flex">
                                        <div className="mr-auto">
                                          <span className="mr-2">
                                            AVA
                                          </span>
                                          {supTest ? supTest.name : 'None'}
                                          {supTest ? supTest.titleEn : 'No'}
                                        </div>
                                        <div>
                                          <Button
                                            onClick={this.toggleSup}
                                          >
                                            S
                                          </Button>
                                        </div>
                                      </div>
                                    }
                                    {chosenSupervisor.name}
                                    {chosenSupervisor.gcID}
                                  </Col>
                                  <Col>
                                    <TeamPicker
                                      supervisor={chosenSupervisor.gcID}
                                    />
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
                                  Next
                                </Button>
                                <Button>
                                  Cancel
                                </Button>
                              </ModalFooter>
                            </Modal>
                            <TransferConfirmation
                              isOpen={this.state.confirmModal}
                              oldSupervisor={supTest}
                              transferredUser={userInfo}
                              newSupervisor={chosenSupervisor}
                            />
                          </div>
                          : ''}
                      </Col>
                      <Col>
                        <div className="font-weight-bold">
                          {__('Team')}
                        </div>
                        {teamTest ? teamTest.nameEn : 'None'}
                      </Col>
                    </Row>
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
