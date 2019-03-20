import React from 'react';
import LocalizedComponent
  from '@gctools-components/react-i18n-translation-webpack';

import { Container, Row, Col } from 'reactstrap';

function ProgressBanner() {
  return (
    <div className="alert alert-info mb-0 rounded-0">
      <Container>
        <Row>
          <Col xs="12">
            <span>{__('mvpBanner')}</span>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default LocalizedComponent(ProgressBanner);
