import React from 'react';
import { Container, Row } from 'reactstrap';
import ReactRouterPropTypes from 'react-router-prop-types';

import ConnectedGQLProfileCard
  from '../components/profile/profileCard/GQLProfileCard';
import ConnectedTeamCardHolder
  from '../components/profile/team/TeamCardHolder';

const Profile = ({ match }) => (

  <Container className="mt-3">
    <Row>
      <ConnectedGQLProfileCard id={match.params.id} />
    </Row>
    <Row className="mt-3 mb-5">
      <ConnectedTeamCardHolder id={match.params.id} />
    </Row>
  </Container>
);

Profile.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

export default Profile;
