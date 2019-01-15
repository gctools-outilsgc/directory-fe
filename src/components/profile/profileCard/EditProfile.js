import React, { Component } from 'react';

import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

//import { PROFILE_INFO_QUERY } from './GQLProfileCard';
import { Button, Modal, ModalBody, ModalHeader, Form } from 'reactstrap';

const MODIFY_PROFILE_MUTATION = gql`
mutation modifyPr($gcID: String!, $profileInfo: ModifyProfileInput!) {
  modifyProfile(gcId: $gcID, profileInfo: $profileInfo) {
    gcID
  }
}
`;


class EditProfile extends Component {
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
            <div>
                <Button color="primary" onClick={this.toggle}>
                    Edit
                </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
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
                                        //Do this nicer / on result return / hot load maybe?
                                        window.location.reload(false); 
                                    }}
                                >
                                    <div>
                                        <label htmlFor="nameTest">
                                            Full Name
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
                                    <div>
                                        <label htmlFor="emailTest">
                                            Work Email
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
                                    <div>
                                        <label htmlFor="titleEn">
                                            English Title
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
                                    </div>
                                    <div>
                                        <label htmlFor="titleFr">
                                            French Title
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
                                    </div>
                                    <div>
                                        <label htmlFor="officePhone">
                                            Office Phone
                                    <small className="text-muted ml-2">
                                                1234567890
                                    </small>
                                            <input
                                                id="officePhone"
                                                type="tel"
                                                className="form-control"
                                                value={this.state.officePhone || ''}
                                                pattern="^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$"
                                                onChange={(e) => {
                                                    this.setState({
                                                        officePhone: e.target.value
                                                    });
                                                }}
                                            />
                                        </label>
                                    </div>
                                    <div>
                                        <label htmlFor="mobilePhone">
                                            Mobile Phone
                                    <small className="text-muted ml-2">
                                                1234567890
                                    </small>
                                            <input
                                                id="mobilePhone"
                                                type="tel"
                                                className="form-control"
                                                value={this.state.mobilePhone || ''}
                                                pattern="^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$"
                                                onChange={(e) => {
                                                    this.setState({
                                                        mobilePhone: e.target.value
                                                    });
                                                }}
                                            />
                                        </label>
                                    </div>
                                    <div>
                                        <label htmlFor="streetAddress">
                                            Address
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
                                    </div>
                                    <div>
                                        <label htmlFor="city">
                                            City
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
                                    </div>
                                    <div>
                                        <label htmlFor="province">
                                            Province
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
                                    </div>
                                    <div>
                                        <label htmlFor="postalCode">
                                            Postal Code
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
                                    </div>
                                    <div>
                                        <label htmlFor="country">
                                            Country
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
                                    </div>
                                    <div>
                                        <Button
                                            type="submit"
                                            color="primary"
                                        >
                                            Save
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

export default EditProfile;