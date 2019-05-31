import React from 'react';

import { Container } from 'reactstrap';

import ConnectedOnboardMod from '../components/onboard/GQLOnboard';

export default () => (
  <Container className="mt-3">
    <div className="onboard-container m-auto">
      <ConnectedOnboardMod />
    </div>
  </Container>
);
