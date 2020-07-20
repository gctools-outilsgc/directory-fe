import React from 'react';
import { Redirect } from 'react-router-dom';
import { Container, Row } from 'reactstrap';
import ReactRouterPropTypes from 'react-router-prop-types';

import ConnectedGQLApproveApproval
  from '../components/process/GQLApproveApproval';

import ConnectedGQLDenyApproval
  from '../components/process/GQLDenyApproval';

const ProcessApproval = ({ match }) => {
  const getAction = (action) => {
    switch (action) {
      case 'a':
        return <ConnectedGQLApproveApproval id={match.params.id} />;
      case 'd':
        return <ConnectedGQLDenyApproval id={match.params.id} />;
      default:
        return <Redirect to="/" />;
    }
  };

  return (
    <Container className="mt-3">
      <Row>
        {getAction(match.params.action)}
      </Row>
    </Container>
  );
};

ProcessApproval.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

export default ProcessApproval;
