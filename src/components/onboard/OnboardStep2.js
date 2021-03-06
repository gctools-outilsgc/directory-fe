import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LocalizedComponent
  from '@gctools-components/react-i18n-translation-webpack';

import { Mutation } from 'react-apollo';

import {
  Button,
  Form,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  Label,
  Row,
  Col
} from 'reactstrap';

import { EDIT, prepareEditProfile } from '../../gql/profile';
import DepartmentPicker from '../core/DepartmentPicker';

export class OnboardStep2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.userObject.name || '',
      email: this.props.userObject.email || '',
      titleEn: this.props.userObject.titleEn || '',
      titleFr: this.props.userObject.titleFr || '',
      team: this.props.userObject.team || '',
      teamId: '',
      change: false,
    };
    this.handleNext = this.handleNext.bind(this);
  }

  handleNext() {
    this.props.nextStep();
  }

  render() {
    const {
      userObject,
    } = this.props;
    return (
      <Mutation
        mutation={EDIT}
      >
        {modifyProfile => (
          <div
            className={this.props.isActive ? 'basic-form-holder' : 'd-none'}
          >
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                const {
                  name,
                  email,
                  titleEn,
                  titleFr,
                  teamId,
                } = this.state;
                modifyProfile(prepareEditProfile({
                  gcID: userObject.gcID,
                  name,
                  email,
                  titleEn,
                  titleFr,
                  teamId,
                }));
                this.props.nextStep();
            }}
            >
              <Row className="pb-2 mb-3 mt-3">
                <Col sm="12">
                  <h1 className="h4 mb-2 pb-2 border-bottom text-primary">
                    {__('Step2T1')}
                  </h1>
                  <p>{__('Step2D1')}</p>
                </Col>
                <Col md="6">
                  <label htmlFor="nameTest">
                    <span className="font-weight-bold">{__('Full name')}</span>
                    <input
                      required
                      type="text"
                      id="nameTest"
                      className="form-control"
                      value={this.state.name || ''}
                      onChange={(e) => {
                        this.setState({
                          name: e.target.value,
                          change: true,
                        });
                      }}
                    />
                  </label>
                </Col>
                <Col md="6">
                  <label htmlFor="emailTest">
                    <span className="font-weight-bold">
                      {__('Work email')}
                    </span>
                    <input
                      id="emailTest"
                      type="email"
                      required
                      className="form-control"
                      value={this.state.email || ''}
                      onChange={(e) => {
                        this.setState({
                          email: e.target.value,
                          change: true,
                        });
                      }}
                    />
                  </label>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <InputGroup>
                      <Label for="titleEn" className="font-weight-bold">
                        {__('English job title')}
                      </Label>
                      <InputGroupAddon addonType="prepend">
                        EN
                      </InputGroupAddon>
                      <input
                        id="titleEn"
                        type="text"
                        className="form-control"
                        value={this.state.titleEn || ''}
                        onChange={(e) => {
                          this.setState({
                            titleEn: e.target.value,
                            change: true,
                          });
                        }}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <InputGroup>
                      <Label for="titleFr" className="font-weight-bold">
                        {__('French job title')}
                      </Label>
                      <InputGroupAddon addonType="prepend">
                        FR
                      </InputGroupAddon>
                      <input
                        id="titleFr"
                        type="text"
                        className="form-control"
                        value={this.state.titleFr || ''}
                        onChange={(e) => {
                          this.setState({
                            titleFr: e.target.value,
                            change: true,
                          });
                        }}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col>
                  <DepartmentPicker
                    currentDepart={this.state.team.organization}
                    onResultSelect={(d) => {
                      this.setState({
                        teamId: d.teams[0].id,
                        change: true,
                      });
                    }}
                  />
                </Col>
              </Row>
              <Row className="m-2 border-top">
                <div className="ml-auto mt-3">
                  <Button
                    type="submit"
                    color="primary"
                  >
                    {this.state.change ?
                      __('Save')
                      :
                      __('Next')
                    }
                  </Button>
                </div>
              </Row>
            </Form>
          </div>
                )}
      </Mutation>
    );
  }
}

OnboardStep2.defaultProps = {
  userObject: {},
  nextStep: undefined,
  isActive: undefined,
};

OnboardStep2.propTypes = {
  userObject: PropTypes.shape({
    gcID: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    titleEn: PropTypes.string,
    titleFr: PropTypes.string,
    team: PropTypes.shape({
      organization: PropTypes.shape({
        id: PropTypes.string,
        nameEn: PropTypes.string,
        nameFr: PropTypes.string,
      }),
    }),
  }),
  nextStep: PropTypes.func,
  isActive: PropTypes.bool,
};
export default LocalizedComponent(OnboardStep2);
