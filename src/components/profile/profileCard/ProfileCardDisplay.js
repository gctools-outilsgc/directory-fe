import React, { Component } from 'react';

import { Row, Col } from 'reactstrap';

class ProfileCardDisplay extends Component {
    render() {
        return (
            <Row>
                <Col xs="2">
                    Avatar
                </Col>
                <Col xs="10">
                    <div>
                        {this.props.user.name}
                    </div>
                    <div>
                        {this.props.user.titleEn || ''}
                    </div>
                    <ul className="list-unstyled mt-3">
                        <li className="mb-2">
                            <div>
                                <div className="font-weight-bold">Email </div>
                                <span className="list-desc-ph">
                                    {this.props.user.email || ''}
                                </span>
                            </div>
                        </li>
                        <li className="float-left mr-4">
                            <div>
                                <div className="font-weight-bold">Work</div>
                                <span className="list-desc-ph">
                                    {this.props.user.officePhone || ''}
                                </span>
                            </div>
                        </li>
                        <li className="float-left mr-4">
                            <div>
                                <div className="font-weight-bold">Mobile</div>
                                <span className="list-desc-ph">
                                    {this.props.user.mobilePhone || ''}
                                </span>
                            </div>
                        </li>
                        <li className="float-left">
                            <div>
                                <div className="font-weight-bold">Address</div>
                                <span className="list-desc-ph">
                                    <span className="mr-1">
                                        {this.props.user.address.streetAddress || ''}
                                    </span>
                                    <span className="mr-1">
                                        {this.props.user.address.city || ''}
                                    </span>
                                    <span className="mr-1">
                                        {this.props.user.address.province || ''}
                                    </span>
                                    <span className="mr-1">
                                        {this.props.user.address.postalCode || ''}
                                    </span>
                                    <span className="mr-1">
                                        {this.props.user.address.country || ''}
                                    </span>
                                </span>
                            </div>
                        </li>
                    </ul>
                </Col>
            </Row>
        )
    }
}

export default ProfileCardDisplay;