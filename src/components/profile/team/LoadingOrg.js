import React from 'react';

import { Card, CardBody, Row, Col } from 'reactstrap';

const style = {
  card: {
    width: '100%',
    border: 'none',
    boxShadow: 'none',
  },
  fakeBox: {
    height: '90px',
    width: '80%',
    marginBottom: '6px',
  },
  fakeLine: {
    height: '5px',
    width: '75%',
  },
};

export default () => (
  <Card style={style.card}>
    <CardBody className="m-4">
      <span className="sr-only">Loading ...</span>
      <Row>
        <Col />
        <Col>
          <div className="loading-state mx-auto" style={style.fakeBox} />
        </Col>
        <Col />
      </Row>
      <Row className="mt-5">
        <Col>
          <div className="loading-state mx-auto" style={style.fakeBox} />
        </Col>
        <Col>
          <div className="loading-state mx-auto" style={style.fakeBox} />
        </Col>
        <Col>
          <div className="loading-state mx-auto" style={style.fakeBox} />
        </Col>
      </Row>
    </CardBody>
  </Card>
);
