import React from 'react';
import { Container, Row } from 'reactstrap';

import GQLProfileCard from '../components/profile/profileCard/GQLProfileCard';
import GQLTeamCard from '../components/profile/team/GQLTeamCard';

const Profile = ({ match }) => (
    <Container>
      <Row>
        <GQLProfileCard id={match.params.id} />
      </Row>
      <Row className="mt-3">
        <GQLTeamCard id={match.params.id} />
      </Row>
    </Container>
  );

export default Profile;