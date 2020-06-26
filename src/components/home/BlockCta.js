import React from 'react';
import PropTypes from 'prop-types';

import { Container, Row, Col, Button } from 'reactstrap';

const BlockCta = (props) => {
  const {
    heading,
    body,
    actionText,
    actionLink,
  } = props;

  const pList = body.map(p => (
    <p key={p.text}>
      {p.text}
    </p>
  ));
  return (
    <div className="bg-gradient text-light p-5">
      <Container>
        <Row className="flex">
          <Col lg="6" className="align-self-center">
            <h2>{heading}</h2>
            <div>{pList}</div>
          </Col>
          <Col lg="6" className="align-self-center">
            <Button
              href={actionLink}
              color="light"
              block
              size="lg"
            >
              {actionText}
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

BlockCta.defaultProps = {
  heading: 'Dear Developers',
  body: [
    { // eslint-disable-next-line max-len
      text: 'Caramels pie gummies pie tart sweet.',
    },
  ],
  actionText: 'Help us out!',
  actionLink: '#',
};

BlockCta.propTypes = {
  heading: PropTypes.string,
  body: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
  })),
  actionLink: PropTypes.string,
  actionText: PropTypes.string,
};

export default BlockCta;
