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
  fakeBodyTitle: {
    height: '18px',
    width: '65px',
    marginBottom: '3px',
  },
  fakeInfo: {
    height: '16px',
    width: '150px',
  },
};

export default () => (
  <Card style={style.card}>
    <CardBody>
      <CardTitle>
        <div className="loading-state fake-head mb-3" />
      </CardTitle>
      <span className="sr-only">Loading ...</span>
      <Row>
        <Col>
          <div className="loading-state mt-3" style={style.fakeBodyTitle} />
          <div className="loading-state" style={style.fakeInfo} />
        </Col>
        <Col>
          <div className="loading-state mt-3" style={style.fakeBodyTitle} />
          <div className="loading-state" style={style.fakeInfo} />
        </Col>
      </Row>
    </CardBody>
  </Card>
);
