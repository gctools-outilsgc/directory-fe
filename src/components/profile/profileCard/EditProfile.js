import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LocalizedComponent
  from '@gctools-components/react-i18n-translation-webpack';

import { Mutation } from 'react-apollo';

import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  Row,
  Col
} from 'reactstrap';

import { EDIT, prepareEditProfile } from '../../../gql/profile';

export class EditProfile extends Component {
  constructor(props) {
    super(props);
    const {
      name,
      email,
      titleEn,
      titleFr,
      officePhone,
      mobilePhone,
      address,
    } = props.profile;
    this.state = {
      modal: false,
      name: name || '',
      email: email || '',
      titleEn: titleEn || '',
      titleFr: titleFr || '',
      officePhone: officePhone || '',
      mobilePhone: mobilePhone || '',
      streetAddress: (address) ? address.streetAddress || '' : '',
      city: (address) ? address.city || '' : '',
      province: (address) ? address.province || '' : '',
      postalCode: (address) ? address.postalCode || '' : '',
      country: (address) ? address.country || '' : '',
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  render() {
    const {
      profile,
    } = this.props;
    return (
      <div className="profile-card-footer">
        <Button
          className="float-right"
          size="sm"
          color="primary"
          onClick={this.toggle}
        >
          Edit Profile
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className="modal-lg edit-profile-modal"
        >
          <ModalHeader toggle={this.toggle}>Edit Profile</ModalHeader>
          <ModalBody>
            <Mutation
              mutation={EDIT}
              onCompleted={() => {
                this.setState({ modal: false });
                // Do this nicer / hot load maybe?
                // window.location.reload(false);
              }}
              onError={() => {
                alert('ERROR - Replace with error UX');
               }}
            >
              {modifyProfile => (
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const {
                      name, email, titleEn, titleFr, officePhone, mobilePhone,
                      streetAddress, city, province, postalCode, country,
                    } = this.state;
                    modifyProfile(prepareEditProfile({
                      gcID: profile.gcID,
                      name,
                      email,
                      titleEn,
                      titleFr,
                      officePhone,
                      mobilePhone,
                      streetAddress,
                      city,
                      province,
                      postalCode,
                      country,
                    }));
                }}
                >
                  <Row>
                    <Col sm="12">
                      <label htmlFor="nameTest">
                        <span className="font-weight-bold">
                          {__('Full name')}
                        </span>
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
                    <Col sm="12">
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
                  <hr />
                  <Row>
                    <Col>
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
                    <Col>
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
                  <hr />
                  <Row>
                    <Col sm="6">
                      <label htmlFor="streetAddress">
                        <span className="font-weight-bold">
                          {__('Address')}
                        </span>
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
                    <Col sm="6">
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
                    <Col sm="4">
                      <label htmlFor="province">
                        <span className="font-weight-bold">
                          {__('Province')}
                        </span>
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
                    <Col sm="2">
                      <label htmlFor="postalCode">
                        <span className="font-weight-bold">
                          {__('Postal Code')}
                        </span>
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
                    <Col sm="6">
                      <label htmlFor="country">
                        <span className="font-weight-bold">
                          {__('Country')}
                        </span>
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
                  <hr />
                  <Row>
                    <Col sm="3">
                      <label htmlFor="officePhone">
                        <span className="font-weight-bold">
                          {__('Office Phone Number')}
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
                    <Col sm="3">
                      <label htmlFor="mobilePhone">
                        <span className="font-weight-bold">
                          {__('Mobile Phone Number')}
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


                  <div className="profile-card-footer">
                    <Button
                      size="sm"
                      className="float-right"
                      type="submit"
                      color="primary"
                    >
                      {__('Save')}
                    </Button>
                  </div>
                </Form>
              )}
            </Mutation>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

EditProfile.defaultProps = {
  profile: undefined,
};

EditProfile.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    titleEn: PropTypes.string,
    titleFr: PropTypes.string,
    officePhone: PropTypes.string,
    mobilePhone: PropTypes.string,
    address: PropTypes.shape({
      streetAddress: PropTypes.string,
      city: PropTypes.string,
      province: PropTypes.string,
      postalCode: PropTypes.string,
      country: PropTypes.string,
    }),
  }),
};

export default LocalizedComponent(EditProfile);
