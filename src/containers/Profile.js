import React from 'react';
import { Container, Row } from 'reactstrap';

import GQLProfileCard from '../components/profile/profileCard/GQLProfileCard';
import TeamCardHolder from '../components/profile/team/TeamCardHolder';


const Profile = ({ match }) => (
    <Container>
      <Row>
        <GQLProfileCard id={match.params.id} />
      </Row>
      <Row className="mt-3">
        <TeamCardHolder id={match.params.id} />
      </Row>
    </Container>
  );

export default Profile;