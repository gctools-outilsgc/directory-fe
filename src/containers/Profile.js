import React from 'react';
import { Container, Row } from 'reactstrap';

import GQLProfileCard from '../components/profile/profileCard/GQLProfileCard';

const Profile = ({ match }) => (
    <Container>
      <Row>
        <GQLProfileCard id={match.params.id} />
      </Row>
      <Row className="mt-3">
        {match.params.id}
      </Row>
    </Container>
  );

export default Profile;