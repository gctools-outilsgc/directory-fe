import React, { Component } from 'react';
//import PropTypes from 'prop-types';

import { Button, Row } from 'reactstrap';
/* eslint react/prefer-stateless-function: 0 */

class OnboardStep6 extends Component {
  render() {
    const {
      forwardID,
    } = this.props;
    return (
      <div>
        <h1 className="h3 border-bottom mb-2 pb-2">
          Step6T1
        </h1>
        <p>Step6D1</p>
        <p>Step6D2</p>
        <p>Step6D3</p>
        <p>Step6D4</p>
        <Row className="m-2 border-top">
          <div className="ml-auto mt-3">
            <Button
              href={`/p/${forwardID}`}
              color="primary"
            >
              View my Profile
            </Button>
          </div>
        </Row>
      </div>
    );
  }
}
/*
OnboardStep6.propTypes = {
  forwardID: PropTypes.string.isRequired,
};
*/
export default OnboardStep6;