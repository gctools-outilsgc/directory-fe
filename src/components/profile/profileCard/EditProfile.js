import React, { Component } from 'react';
import LocalizedComponent
  from '@gctools-components/react-i18n-translation-webpack';

import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

//import { PROFILE_INFO_QUERY } from './GQLProfileCard';
import { Button, Modal, ModalBody, ModalHeader, Form, Row, Col } from 'reactstrap';

const MODIFY_PROFILE_MUTATION = gql`
mutation modifyPr($gcID: String!, $profileInfo: ModifyProfileInput!) {
  modifyProfile(gcId: $gcID, profileInfo: $profileInfo) {
    gcID
  }
}
`;


export class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            name: this.props.profile.name || '',
            email: this.props.profile.email || '',
            titleEn: this.props.profile.titleEn || '',
            titleFr: this.props.profile.titleFr || '',
            officePhone: this.props.profile.officePhone || '',
            mobilePhone: this.props.profile.mobilePhone || '',
            streetAddress: this.props.profile.address.streetAddress || '',
            city: this.props.profile.address.city || '',
            province: this.props.profile.address.province || '',
            postalCode: this.props.profile.address.postalCode || '',
            country: this.props.profile.address.country || '',
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        const {
            profile,
            token,
        } = this.props;
        return (
            <div className="profile-card-footer">
                <Button className="float-right" size="sm" color="primary" onClick={this.toggle}>
                    Edit Profile
                </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-lg edit-profile-modal">
                    <ModalHeader toggle={this.toggle}>Edit Profile</ModalHeader>
                    <ModalBody>
                        <Mutation
                            mutation={MODIFY_PROFILE_MUTATION}
                            context={{
                                headers: {
                                    Authorization:
                                        `Bearer ${token}`,
                                },
                            }
                            }
                            onCompleted={() => {
                                //Do this nicer / hot load maybe?
                                window.location.reload(false);
                            }}
                        >
                            {modifyProfile => (
                                <Form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        modifyProfile({
                                            variables: {
                                                gcID: (String(profile.gcID)),
                                                profileInfo: {
                                                    name: this.state.name,
                                                    email: this.state.email,
                                                    titleEn: this.state.titleEn,
                                                    titleFr: this.state.titleFr,
                                                    officePhone: this.state.officePhone,
                                                    mobilePhone: this.state.mobilePhone,
                                                    address: {
                                                        streetAddress: this.state.streetAddress,
                                                        city: this.state.city,
                                                        province: this.state.province,
                                                        postalCode: this.state.postalCode,
                                                        country: this.state.country,
                                                    },
                                                },
                                            },
                                        });
                                    }}
                                >
                                    <Row>
                                        <Col sm="12">
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
                                        <Col sm="12">
                                            <label htmlFor="emailTest">
                                            <span className="font-weight-bold">{__('Work email')}</span>
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
                                            <span className="font-weight-bold">{__('English job title')}</span>
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
                                            <span className="font-weight-bold">{__('French job title')}</span>
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
                                        <Col sm="2">
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
                                        <Col sm="6">
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
                                    <hr />
                                    <Row>
                                        <Col sm="3">
                                            <label htmlFor="officePhone">
                                                <span className="font-weight-bold">{__('Office Phone Number')}</span>
                                                <input
                                                    id="officePhone"
                                                    type="tel"
                                                    className="form-control"
                                                    aria-describedby="officePhoneHelp"
                                                    value={this.state.officePhone || ''}
                                                    pattern="^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$"
                                                    onChange={(e) => {
                                                        this.setState({
                                                            officePhone: e.target.value
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
                                            <span className="font-weight-bold">{__('Mobile Phone Number')}</span>
                                                <input
                                                    id="mobilePhone"
                                                    type="tel"
                                                    className="form-control"
                                                    aria-describedby="mobilePhoneHelp"
                                                    value={this.state.mobilePhone || ''}
                                                    pattern="^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$"
                                                    onChange={(e) => {
                                                        this.setState({
                                                            mobilePhone: e.target.value
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

export default LocalizedComponent(EditProfile);