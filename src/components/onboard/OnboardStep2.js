import React, { Component } from 'react';
//import PropTypes from 'prop-types';

import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import { Button, Form, Row, Col } from 'reactstrap';

const MODIFY_PROFILE_MUTATION = gql`
mutation modifyPr($gcID: String!, $profileInfo: ModifyProfileInput!) {
  modifyProfile(gcID: $gcID, profileInfo: $profileInfo) {
    gcID
  }
}
`;

class OnboardStep2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.userObject.name || '',
            email: this.props.userObject.email || '',
            titleEn: this.props.userObject.titleEn || '',
            titleFr: this.props.userObject.titleFr || '',
        };
        this.handleNext = this.handleNext.bind(this);
    }

    handleNext() {
        this.props.nextStep();
    }

    render() {
        const {
            userObject,
            token,
        } = this.props;
        return (
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
                    <div className="basic-form-holder">
                        <h1 className="sr-only">
                            Hidden Heading?
            </h1>
                        <Form
                            onSubmit={(e) => {
                                e.preventDefault();
                                modifyProfile({
                                    variables: {
                                        gcID: (String(userObject.gcID)),
                                        profileInfo: {
                                            name: this.state.name,
                                            email: this.state.email,
                                            titleEn: this.state.titleEn,
                                            titleFr: this.state.titleFr,
                                        },
                                    },
                                });
                                this.props.nextStep();
                            }}
                        >
                            <Row className="pb-2 mb-3 mt-3">
                                <Col sm="12">
                                    <h2 className="h4 mb-2 pb-2 border-bottom text-primary">
                                        Step2T1
                                    </h2>
                                    <p>Step2D1</p>
                                </Col>
                                <Col md="6">
                                    <label htmlFor="nameTest">
                                    <span className="font-weight-bold">Full name</span>
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
                                <Col md="6">
                                    <label htmlFor="emailTest">
                                    <span className="font-weight-bold">Work email</span>
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
                            <Row>
                                <Col md="6">
                                    <label htmlFor="titleEn">
                                    <span className="font-weight-bold">English Title</span>
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
                                <Col md="6">
                                    <label htmlFor="titleFr">
                                    <span className="font-weight-bold">French Title</span>
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
                            <Row className="m-2 border-top">
                                <div className="ml-auto mt-3">
                                    <Button
                                        type="submit"
                                        color="primary"
                                    >
                                        Next
                                    </Button>
                                </div>
                            </Row>
                        </Form>
                    </div>
                )}
            </Mutation>
        );
    }
}
/*
OnboardStep2.defaultProps = {
    userObject: {},
    nextStep: undefined,
};

OnboardStep2.propTypes = {
    userObject: PropTypes.shape({
        gcID: PropTypes.string,
        name: PropTypes.string,
        email: PropTypes.string,
        titleEn: PropTypes.string,
        titleFr: PropTypes.string,
    }),
    token: PropTypes.string.isRequired,
    nextStep: PropTypes.func,
};
*/
export default OnboardStep2;
