import React, { Component } from 'react';
import LocalizedComponent
  from '@gctools-components/react-i18n-translation-webpack';

import { Button, Row, Col } from 'reactstrap';

import { UserAvatar } from '../core/UserAvatar';
/* eslint react/prop-types: 0 */
/* eslint react/prefer-stateless-function: 0 */

export class OnboardStep4 extends Component {
  render() {
    const {
      userObject,
    } = this.props;
    return (
      <div className={this.props.isActive ? '' : 'd-none'}>
        <h1 className="h3 border-bottom mb-2 pb-2">
          {__('Step4T1')}
        </h1>
        <Row>
          <Col xs="2">
            <UserAvatar
              gcID={userObject.gcID}
              myGcID={userObject.gcID}
              avatar={userObject.avatar}
              edit
              size="lg"
            />
          </Col>
          <Col xs="10">
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
