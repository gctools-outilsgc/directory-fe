import React, { Component } from 'react';
import LocalizedComponent
  from '@gctools-components/react-i18n-translation-webpack';

import { Mutation } from 'react-apollo';

import { Button, Row, Col, Form } from 'reactstrap';

import { EDIT } from '../../gql/profile';
import { UserAvatar } from '../core/UserAvatar';
/* eslint react/prop-types: 0 */
/* eslint react/prefer-stateless-function: 0 */

export class OnboardStep4 extends Component {
  render() {
    const {
      userObject,
      avatarParams,
    } = this.props;

    let elggAvatar;

    if (avatarParams.iconURL) {
      elggAvatar = avatarParams.iconURL.includes('_graphics/icons/user');
    }

    if (avatarParams.iconURL && userObject.avatar == null && !elggAvatar) {
      return (
        <div>
          <h1 className="h3 border-bottom mb-2 pb-2">
            {__('Step4T1')}
          </h1>
          <Row>
            <Col xs="4">
              <UserAvatar
                gcID={userObject.gcID}
                myGcID={userObject.gcID}
                avatar={avatarParams.iconURL}
                edit
                size="lg"
              />
            </Col>
            <Col xs="8">
              <p>{__('Step4D1')}</p>
              <p>{__('Step4D2')}</p>
              <p>
                {__('Step4D3')}
                <a
                  href="https://gccollab.ca/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GCcollab
                </a>.
              </p>
            </Col>
          </Row>
          <Row className="m-2 float-right">
            <Mutation mutation={EDIT}>
              {modifyProfile => (
                <Form
                  onSubmit={(e) => {
                  e.preventDefault();
                  modifyProfile({
                    variables: {
                      gcID: userObject.gcID,
                      data: {
                        avatar: avatarParams.iconURL,
                      },
                    },
                  });
                  this.props.nextStep();
                  }}
                  className="basic-form-holder"
                >
                  <div className="ml-auto mt-3">
                    <Button
                      onClick={this.props.previousStep}
                      color="secondary"
                    >
                      {__('Back')}
                    </Button>
                    <Button
                      type="submit"
                      color="primary"
                      className="ml-3"
                    >
                      {__('Next')}
                    </Button>
                  </div>
                </Form>
            )}
            </Mutation>
          </Row>
        </div>
      );
    }

    return (
      <div>
        <h1 className="h3 border-bottom mb-2 pb-2">
          {__('Step4T1')}
        </h1>
        <Row>
          <Col xs="4">
            <UserAvatar
              gcID={userObject.gcID}
              myGcID={userObject.gcID}
              avatar={userObject.avatar}
              edit
              size="lg"
            />
          </Col>
          <Col xs="8">
            <p>{__('Step4D1')}</p>
            <p>{__('Step4D2')}</p>
          </Col>
        </Row>
        <Row className="m-2">
          <div className="ml-auto mt-3">
            <Button
              onClick={this.props.previousStep}
              color="secondary"
            >
              {__('Back')}
            </Button>
            <Button
              onClick={this.props.nextStep}
              color="primary"
              className="ml-3"
            >
              {__('Next')}
            </Button>
          </div>
        </Row>
      </div>
    );
  }
}

export default LocalizedComponent(OnboardStep4);
