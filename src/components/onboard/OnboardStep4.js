import React, { Component } from 'react';

import { Button, Row } from 'reactstrap';
/* eslint react/prop-types: 0 */
/* eslint react/prefer-stateless-function: 0 */

class OnboardStep4 extends Component {
  render() {
    return (
      <div>
        <h1 className="h3 border-bottom mb-2 pb-2">
          Step4T1
        </h1>
        <Row>
          <p>Step4D1</p>
          <p>Step4D2</p>
        </Row>
        <Row className="m-2">
          <div className="ml-auto mt-3">
            <Button
              onClick={this.props.previousStep}
              color="primary"
            >
              Back
            </Button>
            <Button
              onClick={this.props.nextStep}
              color="primary"
              className="ml-3"
            >
              Next
            </Button>
          </div>
        </Row>
      </div>
    );
  }
}

export default OnboardStep4;