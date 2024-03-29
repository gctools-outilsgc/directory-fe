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
  FormGroup,
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  Label
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

import { EDIT, prepareEditProfile, EDIT_TEAM } from '../../../gql/profile';
import DepartmentPicker from '../../core/DepartmentPicker';
import TransferConfirmation from '../team/TransferConfirmation';
import { UserAvatar } from '../../core/UserAvatar';
import ErrorModal, { err } from '../../core/ErrorModal';

import GenericAvatar from '../OrgChart/Card/img/user.gif';

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
      team,
    } = props.profile;
    this.state = {
      modal: false,
      depChange: false,
      confirmModal: false,
      stateError: '',
      newTeamId: '',
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
      organization: (team) ? team.organization || '' : '',
      supervisor: (team) ? team.owner || '' : '',
    };
    this.toggle = this.toggle.bind(this);
    this.toggleConfirm = this.toggleConfirm.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  toggleConfirm() {
    this.setState({
      modal: !this.state.modal,
      confirmModal: !this.state.confirmModal,
    });
  }

  render() {
    const {
      profile,
    } = this.props;
    return (
      <div className="">
        <Button
          onClick={this.toggle}
          color="light"
        >
          <FontAwesomeIcon icon={faPen} />
          <span className="sr-only">{__('Edit Profile')}</span>
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className="modal-lg edit-profile-modal"
        >
          <ModalHeader toggle={this.toggle}>{__('Edit Profile')}</ModalHeader>
          <ModalBody>
            <Mutation
              mutation={EDIT}
              onError={(error) => {
                this.setState({
                  stateError: error,
                });
              }}
              onCompleted={() => {
                this.setState({ modal: false });
                // Do this nicer / hot load maybe?
                // window.location.reload(false);
                document.getElementById('refetchInfoSts').click();
              }}
            >
              {(modifyProfile, { loading }) => (
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (this.state.depChange) {
                      this.toggleConfirm();
                    }
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
                    <Col sm="9">
                      <div>
                        <div className="w-100">
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
                        </div>
                        <div className="w-100">
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
                        </div>
                      </div>
                    </Col>
                    <Col sm="3">
                      <UserAvatar
                        gcID={profile.gcID}
                        myGcID={profile.gcID}
                        avatar={profile.avatar}
                        edit
                        size="lg"
                      />
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col>
                      <DepartmentPicker
                        currentDepart={this.state.organization}
                        onResultSelect={(d, change) => {
                          if (change) {
                            this.setState({
                              depChange: true,
                              newTeamId: d.teams[0],
                            });
                          }
                        }}
                      />
                      {this.state.depChange}
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col>
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
                              });
                            }}
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    <Col>
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
                              });
                            }}
                          />
                        </InputGroup>
                      </FormGroup>
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
                          placeholder={__('123 Workplace St.')}
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
                          aria-describedby="postalCodeHelp"
                          placeholder="A1B 2C3"
                          // eslint-disable-next-line
                          pattern="[ABCEGHJKLMNPRSTVXY][0-9][ABCEGHJKLMNPRSTVWXYZ] ?[0-9][ABCEGHJKLMNPRSTVWXYZ][0-9]"
                          value={this.state.postalCode || ''}
                          onChange={(e) => {
                            this.setState({
                              postalCode: e.target.value,
                            });
                          }}
                        />
                        <small id="postalCodeHelp" className="text-muted">
                          A1B 2C3
                        </small>
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
                        <span className="shell">
                          <input
                            id="mobilePhone"
                            type="tel"
                            className="form-control"
                            aria-describedby="mobilePhoneHelp"
                            value={this.state.mobilePhone || ''}
                            // eslint-disable-next-line
                            pattern="^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$"
                            onChange={(e) => {
                              this.setState({
                                mobilePhone: e.target.value,
                              });
                            }}
                          />
                        </span>
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
                      disabled={loading}
                    >
                      {__('Save')}
                    </Button>
                  </div>
                </Form>
              )}
            </Mutation>
          </ModalBody>
        </Modal>
        <Mutation
          mutation={EDIT_TEAM}
          onCompleted={() => {
            this.setState({ confirmModal: false });
          }}
        >
          {modifyProfile =>
            this.state.confirmModal && (<TransferConfirmation
              isOpen={this.state.confirmModal}
              transferredUser={this.props.profile}
              title={__('Update department title')}
              bodyText={`
                ${___(
                  __('department changing'),
                this.state.organization.nameEn,
                this.state.newTeamId.nameEn,
                this.state.supervisor.name,
                this.state.organization.nameEn
              )}
              `}
              primaryButtonText={__('Comfirm')}
              secondaryButtonText={__('Back')}
              destination={
                {
                  name: 'Choose a new Supervisor',
                  avatar: GenericAvatar,
                  team: {
                    name: 'No Team',
                    avatar: 'placeholder',
                  },
                }
              }
              source={this.state.supervisor}
              primaryButtonClick={() => {
                // TODO hotload / apollo cache
                // TODO remove user's supervisor as well
                modifyProfile({
                  variables: {
                    gcID: profile.gcID,
                    data: {
                      team: {
                        id: String(this.state.newTeamId.id),
                      },
                    },
                  },
                });
              }}
            />
          )}
        </Mutation>
        {this.state.stateError &&
          <ErrorModal
            error={err(this.state.stateError)}
            onOkClick={() => {
              this.setState({
                stateError: '',
              });
            }}
          />}
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
    team: PropTypes.shape({
      organization: PropTypes.shape({
        id: PropTypes.string,
        nameEn: PropTypes.string,
        nameFr: PropTypes.string,
      }),
    }),
    supervisor: PropTypes.shape({
      gcID: PropTypes.string,
      name: PropTypes.string,
      titleEn: PropTypes.string,
      titleFr: PropTypes.string,
    }),
  }),
};

export default LocalizedComponent(EditProfile);
