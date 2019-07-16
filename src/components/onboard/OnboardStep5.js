import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LocalizedComponent
  from '@gctools-components/react-i18n-translation-webpack';

import { Mutation } from 'react-apollo';

import { Button, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { EDIT, prepareEditProfile } from '../../gql/profile';
import SupervisorPicker from '../core/SupervisorPicker';
// import TeamPicker from '../core/TeamPicker';
import { UserAvatar } from '../core/UserAvatar';

export class OnboardStep5 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenSupervisor: '',
      teamId: '',
      editSup: true,
      errors: '',
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
            <div className="font-weight-bold mb-2">
              Supervisor
            </div>
            {editSup ?
              <SupervisorPicker
                onResultSelect={(s) => {
                  this.setState({
                    chosenSupervisor: s,
                    teamId: s.ownerOfTeams[0],
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
                    color="link"
                  >
                    <FontAwesomeIcon
                      icon={faSearch}
                    />
                    <span className="sr-only">
                      Search
                    </span>
                  </Button>
                </div>
              </div>
            }
            <span className="text-danger">{this.state.errors}</span>
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
            {/** TODO: Send approval */}
            <Mutation
              mutation={EDIT}
              onCompleted={() => {
                this.props.nextStep();
              }}
            >
              {modifyProfile => (
                <Button
                  onClick={() => {
                    if (chosenSupervisor.gcID !== userObject.gcID) {
                      modifyProfile(prepareEditProfile({
                        gcID: userObject.gcID,
                        teamId,
                      }));
                    } else {
                      this.setState({
                        // eslint-disable-next-line
                        errors: 'You cannot be your own supervisor. Please pick someone else.',
                      });
                    }
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
