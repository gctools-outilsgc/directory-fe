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
  ModalBody
} from 'reactstrap';

import Loading from './Loading';

import { GET_TEAM } from '../../../gql/profile';
import SupervisorPicker from '../../core/SupervisorPicker';
import TeamPicker from '../../core/TeamPicker';

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
      chosenSupervisor: '',
      editSup: false,
      editTeam: false,
    };
    this.toggle = this.toggle.bind(this);
    this.toggleSup = this.toggleSup.bind(this);
    this.toggleTeam = this.toggleTeam.bind(this);
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
                          {supTest ? supTest.titleEn : ''}
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
                                      {userInfo.name}
                                    </div>
                                    <div>
                                      {userInfo.titleEn}
                                    </div>
                                  </div>
                                </Row>
                                <Row className="mt-3">
                                  <Col>
                                    Supervisor
                                    {editSup ?
                                      <SupervisorPicker
                                        onResultSelect={(s) => {
                                          this.setState({
                                            chosenSupervisor: s,
                                          });
                                          this.toggleSup(editSup);
                                        }}
                                      /> :
                                      <div>
                                        {supTest ? supTest.name : 'None'}
                                        <Button
                                          onClick={this.toggleSup}
                                        >
                                          Search
                                        </Button>
                                      </div>
                                    }
                                    {chosenSupervisor.name}
                                    {chosenSupervisor.gcID}
                                  </Col>
                                  <Col>
                                    Team Picker here
                                    <TeamPicker
                                      supervisor={chosenSupervisor.gcID}
                                    />
                                  </Col>
                                </Row>
                              </ModalBody>
                            </Modal>
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
