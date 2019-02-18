import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LocalizedComponent
  from '@gctools-components/react-i18n-translation-webpack';

import { Mutation } from 'react-apollo';

import { Button, Form, Row, Col } from 'reactstrap';

import { EDIT, prepareEditProfile } from '../../gql/profile';

export class OnboardStep2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.userObject.name || '',
      email: this.props.userObject.email || '',
      titleEn: this.props.userObject.titleEn || '',
      titleFr: this.props.userObject.titleFr || '',
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
          <div className="basic-form-holder">
            <h1 className="sr-only">
                          Hidden Heading?
            </h1>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                const {
                  name,
                  email,
                  titleEn,
                  titleFr,
                } = this.state;
                modifyProfile(prepareEditProfile({
                  gcID: userObject.gcID,
                  name,
                  email,
                  titleEn,
                  titleFr,
                }));
                this.props.nextStep();
            }}
            >
              <Row className="pb-2 mb-3 mt-3">
                <Col sm="12">
                  <h2 className="h4 mb-2 pb-2 border-bottom text-primary">
                    {__('Step2T1')}
                  </h2>
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
                        });
                      }}
                    />
                  </label>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <label htmlFor="titleEn">
                    <span className="font-weight-bold">
                      {__('English job title')}
                    </span>
                    <input
                      id="titleEn"
                      type="text"
                      className="form-control"
                      value={this.state.titleEn || ''}
                      onChange={(e) => {
                        this.setState({
                          titleEn: e.target.value,
                        });
                      }}
                    />
                  </label>
                </Col>
                <Col md="6">
                  <label htmlFor="titleFr">
                    <span className="font-weight-bold">
                      {__('French job title')}
                    </span>
                    <input
                      id="titleFr"
                      type="text"
                      className="form-control"
                      value={this.state.titleFr || ''}
                      onChange={(e) => {
                        this.setState({
                          titleFr: e.target.value,
                        });
                      }}
                    />
                  </label>
                </Col>
              </Row>
              <Row className="m-2 border-top">
                <div className="ml-auto mt-3">
                  <Button
                    type="submit"
                    color="primary"
                  >
                    {__('Next')}
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
};

OnboardStep2.propTypes = {
  userObject: PropTypes.shape({
    gcID: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    titleEn: PropTypes.string,
    titleFr: PropTypes.string,
  }),
  nextStep: PropTypes.func,
};
export default LocalizedComponent(OnboardStep2);
