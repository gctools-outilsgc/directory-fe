import React from 'react';

import { Card, CardTitle, CardBody, Row, Col } from 'reactstrap';

const style = {
    card: {
        width: '100%',
        border: 'none',
        boxShadow: 'none',
    },
    fakeAvatar: {
        height: '100px',
        width: '100px',
        margin: 'auto',
    },
    fakeName: {
        height: '22px',
        width: '300px',
        marginBottom: '5px',
    },
    fakeJobTitle: {
        height: '18px',
        width: '400px',
    },
    fakeBodyTitle: {
        height: '18px',
        width: '55px',
        marginBottom: '3px',
    },
    fakeInfo: {
        height: '16px',
        width: '150px',
    }
};


class Loading extends React.Component {
    render() {
        return (
            <Card style={style.card}>
                <CardBody>
                    <CardTitle>
                        <div className="loading-state fake-head mb-3"></div>
                    </CardTitle>
                    <span className="sr-only">Loading ...</span>
                    <Row>
                        <Col xs="2">
                            <div className="loading-state" style={style.fakeAvatar}></div>
                        </Col>
                        <Col xs="10">
                            <div className="loading-state" style={style.fakeName}></div>
                            <div className="loading-state" style={style.fakeJobTitle}></div>
                            <div className="loading-state mt-3" style={style.fakeBodyTitle}></div>
                            <div className="loading-state fake-body"></div>
                            <Row>
                                <Col xs="2">
                                    <div className="loading-state mt-3" style={style.fakeBodyTitle}></div>
                                    <div className="loading-state" style={style.fakeInfo}></div>
                                </Col>
                                <Col xs="2">
                                    <div className="loading-state mt-3" style={style.fakeBodyTitle}></div>
                                    <div className="loading-state" style={style.fakeInfo}></div>
                                </Col>
                                <Col>
                                    <div className="loading-state mt-3" style={style.fakeBodyTitle}></div>
                                    <div className="loading-state" style={style.fakeInfo}></div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                </CardBody>
            </Card>
        );
    }
}

export default Loading;