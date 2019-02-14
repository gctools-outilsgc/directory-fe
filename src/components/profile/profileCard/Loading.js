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
  },
};

const ls = 'loading-state';

export default () => (
  <Card style={style.card}>
    <CardBody>
      <CardTitle>
        <div className={`${ls} fake-head mb-3`} />
      </CardTitle>
      <span className="sr-only">Loading ...</span>
      <Row>
        <Col xs="2">
          <div className={ls} style={style.fakeAvatar} />
        </Col>
        <Col xs="10">
          <div className={ls} style={style.fakeName} />
          <div className={ls} style={style.fakeJobTitle} />
          <div className={`${ls} mt-3`} style={style.fakeBodyTitle} />
          <div className={`${ls} fake-body`} />
          <Row>
            <Col xs="2">
              <div className={`${ls} mt-3`} style={style.fakeBodyTitle} />
              <div className={ls} style={style.fakeInfo} />
            </Col>
            <Col xs="2">
              <div className={`${ls} mt-3`} style={style.fakeBodyTitle} />
              <div className={ls} style={style.fakeInfo} />
            </Col>
            <Col>
              <div className={`${ls} mt-3`} style={style.fakeBodyTitle} />
              <div className={ls} style={style.fakeInfo} />
            </Col>
          </Row>
        </Col>
      </Row>
    </CardBody>
  </Card>
);
