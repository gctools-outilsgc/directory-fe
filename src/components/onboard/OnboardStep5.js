import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LocalizedComponent
  from '@gctools-components/react-i18n-translation-webpack';

import { Mutation } from 'react-apollo';

import { Button, Row, Col } from 'reactstrap';

import { EDIT, prepareEditProfile } from '../../gql/profile';
import SupervisorPicker from '../core/SupervisorPicker';
import TeamPicker from '../core/TeamPicker';

export class OnboardStep5 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenSupervisor: '',
      teamId: '',
      editSup: false,
      editTeam: false,
    };

    this.toggleSup = this.toggleSup.bind(this);
  }

  toggleSup() {
    this.setState(prevState => ({
      editSup: !prevState.editSup,
    }));
  }

  render() {
    const {
      userObject,
    } = this.props;
    const {
      chosenSupervisor,
      teamId,
      editSup,
      editTeam,
    } = this.state;
    const teamTest = (!userObject) ? '' : userObject.team;
    const supTest = (!teamTest) ? '' : userObject.team.owner;
    return (
      <div>
        <h1 className="h3 border-bottom mb-2 pb-2">
          {__('Step5T1')}
        </h1>
        <Row className="mb-2">
          <Col>
            <p>{__('Step5D1')}</p>
            <p>{__('Step5D2')}</p>
          </Col>
        </Row>
        <Row>
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
                      <img
                        className="avatar"
                        src={
                          supTest ? supTest.avatar : ''
                        }
                        alt={
                          supTest ? supTest.name : 'N'
                        }
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
                      <img
                        className="avatar"
                        src={
                          chosenSupervisor.avatar
                        }
                        alt={
                          chosenSupervisor.name
                        }
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
                    S
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
                gcID={userObject.gcID}
                selectedOrgTier={teamTest}
                onTeamChange={(t) => {
                  this.setState({
                    teamId: t.id,
                  });
                  console.log(teamId);
                }}
              /> :
              <div>
                {teamTest ? teamTest.nameEn : 'None'}
              </div>
            }
          </Col>
        </Row>
        <Row className="m-2 border-top">
          <div className="ml-auto mt-3">
            <Button
              onClick={this.props.previousStep}
              color="primary"
            >
              {__('Back')}
            </Button>
            <Mutation
              mutation={EDIT}
              onCompleted={() => {
                this.props.nextStep();
              }}
            >
              {modifyProfile => (
                <Button
                  onClick={() => {
                    modifyProfile(prepareEditProfile({
                      gcID: userObject.gcID,
                      teamId,
                    }));
                  }}
                  color="primary"
                  className="ml-3"
                >
                  {__('Next')}
                </Button>
              )}
            </Mutation>
          </div>
        </Row>
      </div>
    );
  }
}

OnboardStep5.defaultProps = {
  userObject: {},
  nextStep: undefined,
  previousStep: undefined,
};

OnboardStep5.propTypes = {
  userObject: PropTypes.shape({
    gcID: PropTypes.string,
  }),
  nextStep: PropTypes.func,
  previousStep: PropTypes.func,
};

export default LocalizedComponent(OnboardStep5);
