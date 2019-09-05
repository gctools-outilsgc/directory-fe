import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LocalizedComponent
  from '@gctools-components/react-i18n-translation-webpack';

import { Mutation } from 'react-apollo';

import { Button, Form, Row, Col } from 'reactstrap';

import { EDIT, prepareEditProfile } from '../../gql/profile';

export class OnboardStep3 extends Component {
  constructor(props) {
    super(props);
    const { officePhone, mobilePhone, address } = props.userObject;
    this.state = {
      officePhone: officePhone || '',
      mobilePhone: mobilePhone || '',
      streetAddress: (address) ? address.streetAddress || '' : '',
      city: (address) ? address.city || '' : '',
      province: (address) ? address.province || '' : '',
      postalCode: (address) ? address.postalCode || '' : '',
      country: (address) ? address.country || '' : '',
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.previousStep();
  }

  render() {
    const {
      userObject,
    } = this.props;
    return (
      <Mutation mutation={EDIT}>
        {modifyProfile => (
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              const {
                officePhone,
                mobilePhone,
                streetAddress,
                city,
                province,
                postalCode,
                country,
              } = this.state;
              modifyProfile(prepareEditProfile({
                gcID: userObject.gcID,
                officePhone,
                mobilePhone,
                streetAddress,
                city,
                province,
                postalCode,
                country,
              }));
              this.props.nextStep();
            }}
            className="basic-form-holder"
          >
            <h1 className="mb-2 pb-2 h3 text-primary">
              {__('Step3T1')}
            </h1>
            <p>{__('Step3D1')}</p>
            <Row>
              <Col>
                <h2 className="border-bottom mb-4 pb-2 h4 text-primary">
                  {__('Step3SubT2')}
                </h2>
              </Col>
            </Row>
            <Row>
              <Col md="4">
                <label htmlFor="streetAddress">
                  <span className="font-weight-bold">{__('Address')}</span>
                  <input
                    id="streetAddress"
                    type="text"
                    className="form-control"
                    value={this.state.streetAddress || ''}
                    onChange={(e) => {
                      this.setState({
                        streetAddress: e.target.value,
                      });
                    }}
                  />
                </label>
              </Col>
              <Col md="4">
                <label htmlFor="city">
                  <span className="font-weight-bold">{__('City')}</span>
                  <input
                    id="city"
                    type="text"
                    className="form-control"
                    value={this.state.city || ''}
                    onChange={(e) => {
                      this.setState({
                        city: e.target.value,
                      });
                    }}
                  />
                </label>
              </Col>
              <Col md="4">
                <label htmlFor="province">
                  <span className="font-weight-bold">{__('Province')}</span>
                  <input
                    id="province"
                    type="text"
                    className="form-control"
                    value={this.state.province || ''}
                    onChange={(e) => {
                      this.setState({
                        province: e.target.value,
                      });
                    }}
                  />
                </label>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col md="3">
                <label htmlFor="postalCode">
                  <span className="font-weight-bold">{__('Postal Code')}</span>
                  <input
                    id="postalCode"
                    type="text"
                    className="form-control"
                    value={this.state.postalCode || ''}
                    onChange={(e) => {
                      this.setState({
                        postalCode: e.target.value,
                      });
                    }}
                  />
                </label>
              </Col>
              <Col md="3">
                <label htmlFor="country">
                  <span className="font-weight-bold">{__('Country')}</span>
                  <input
                    id="country"
                    type="text"
                    className="form-control"
                    value={this.state.country || ''}
                    onChange={(e) => {
                      this.setState({
                        country: e.target.value,
                      });
                    }}
                  />
                </label>
              </Col>
            </Row>
            <h2 className="border-bottom mb-4 pb-2 h4 text-primary">
              {__('Step3T2')}
            </h2>
            <Row>
              <Col md="3">
                <label htmlFor="officePhone">
                  <span className="font-weight-bold">
                    {__('Phone number')}
                  </span>
                  <input
                    id="officePhone"
                    type="tel"
                    className="form-control"
                    aria-describedby="officePhoneHelp"
                    value={this.state.officePhone || ''}
                    pattern="^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$"
                    onChange={(e) => {
                      this.setState({
                        officePhone: e.target.value,
                      });
                    }}
                  />
                  <small id="officePhoneHelp" className="text-muted">
                  1234567890
                  </small>
                </label>
              </Col>
              <Col md="3">
                <label htmlFor="mobilePhone">
                  <span className="font-weight-bold">
                    {__('Mobile phone number')}
                  </span>
                  <input
                    id="mobilePhone"
                    type="tel"
                    className="form-control"
                    aria-describedby="mobilePhoneHelp"
                    value={this.state.mobilePhone || ''}
                    pattern="^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$"
                    onChange={(e) => {
                      this.setState({
                        mobilePhone: e.target.value,
                      });
                      }}
                  />
                  <small id="mobilePhoneHelp" className="text-muted">
                  1234567890
                  </small>
                </label>
              </Col>
            </Row>
            <Row className="m-2 border-top">
              <div className="ml-auto mt-3">
                <Button
                  onClick={this.handleClick}
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
            </Row>
          </Form>
                )}

      </Mutation>
    );
  }
}

OnboardStep3.defaultProps = {
  userObject: { address: {} },
  nextStep: undefined,
  previousStep: undefined,
};

OnboardStep3.propTypes = {
  userObject: PropTypes.shape({
    gcID: PropTypes.string,
    mobilePhone: PropTypes.string,
    officePhone: PropTypes.string,
    address: PropTypes.shape({
      id: PropTypes.string,
      streetAddress: PropTypes.string,
      city: PropTypes.string,
      province: PropTypes.string,
      postalCode: PropTypes.string,
      country: PropTypes.string,
    }),
  }),
  nextStep: PropTypes.func,
  previousStep: PropTypes.func,
};

export default LocalizedComponent(OnboardStep3);
