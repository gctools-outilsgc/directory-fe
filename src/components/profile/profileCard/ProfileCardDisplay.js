import React, { Component } from 'react';

import { Row, Col } from 'reactstrap';

class ProfileCardDisplay extends Component {
    render() {
        const {
            user,
        } = this.props
        const userAddress = user.address;
        return (
            <Row>
                <Col xs="2">
                    Avatar
                </Col>
                <Col xs="10">
                    <div>
                        {user.name ? user.name : ''}
                    </div>
                    <div>
                        {user.titleEn ? user.titleEn : 'No Title'}
                    </div>
                    <ul className="list-unstyled mt-3">
                        <li className="mb-2">
                            <div>
                                <div className="font-weight-bold">Email </div>
                                <span className="list-desc-ph">
                                    {user.email ? user.email : 'No Email'}
                                </span>
                            </div>
                        </li>
                        <li className="float-left mr-4">
                            <div>
                                <div className="font-weight-bold">Work</div>
                                <span className="list-desc-ph">
                                    {user.officePhone ? user.officePhone : 'No Offce Phone'}
                                </span>
                            </div>
                        </li>
                        <li className="float-left mr-4">
                            <div>
                                <div className="font-weight-bold">Mobile</div>
                                <span className="list-desc-ph">
                                    {user.mobilePhone ? user.mobilePhone : 'No Mobile Phone'}
                                </span>
                            </div>
                        </li>
                        <li className="float-left">
                            <div>
                                <div className="font-weight-bold">Address</div>
                                <span className="list-desc-ph">
                                    <span className="mr-1">
                                        {userAddress ? user.address.streetAddress : ''}
                                    </span>
                                    <span className="mr-1">
                                        {userAddress ? user.address.city: ''}
                                    </span>
                                    <span className="mr-1">
                                        {userAddress ? user.address.province: ''}
                                    </span>
                                    <span className="mr-1">
                                        {userAddress ? user.address.postalCode : ''}
                                    </span>
                                    <span className="mr-1">
                                        {userAddress ? user.address.country: ''}
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