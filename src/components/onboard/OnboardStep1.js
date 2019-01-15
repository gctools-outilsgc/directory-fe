import React, { Component } from 'react';

import { Button, Row } from 'reactstrap';
/* eslint react/prop-types: 0 */
/* eslint react/prefer-stateless-function: 0 */

class OnboardStep1 extends Component {
  render() {
    return (
      <div>
        <h1 className="h3 mb-2 pb-1">
          Welcome
        </h1>
        <h2 className="h4 mb-2 pb-1 border-bottom">
          Step1Sub1
        </h2>
        <p>welcome body</p>
        <ul>
          <li>Step1List1</li>
          <li>Step1List2</li>
          <li>Step1List3</li>
          <li>Step1List4</li>
        </ul>
        <h2 className="h4 mb-2 pb-1 border-bottom">
          Step1Sub2
        </h2>
        <p>Step1Sub2Desc</p>
        <p>Step1Sub2Desc2</p>
        <Row className="m-1 border-top">
          <div className="ml-auto mt-3">
            <Button
              onClick={this.props.nextStep}
              color="primary"
            >
              Get Started
            </Button>
          </div>
        </Row>
      </div>
    );
  }
}

export default OnboardStep1;