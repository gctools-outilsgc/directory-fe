import React from 'react';
import PropTypes from 'prop-types';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';

import { Card, CardBody, CardTitle, CardFooter } from 'reactstrap';

import ProfileCardDisplay from './ProfileCardDisplay';
import LocalizedEditProfile from './EditProfile';
import Loading from './Loading';

export const PROFILE_INFO_QUERY = gql`
query profileInfoQuery($gcID: String!) {
  profiles(gcID: $gcID) {
    gcID
    name
    email
    avatar
    mobilePhone
    officePhone
    address {
      id
      streetAddress
      city
      province
      postalCode
      country
    }
    titleEn
    titleFr
  }
}`;

const mapStateToProps = ({ user }) => {
  const props = {};
  if (user) {
    props.accessToken = user.access_token;
    props.myGcID = user.profile.sub;
    props.modifyProfile = user.profile.modify_profile === 'True';
  }
  return props;
};

const style = {
  card: {
    width: '100%',
    padding: '0 15px 10px 15px',
  },
};

const GQLProfileCard = (props) => {
  const {
    id,
    accessToken,
    myGcID,
    modifyProfile,
  } = props;

  const canEdit = (accessToken !== '') && modifyProfile && (id === myGcID);

  return (
    <Query
      query={PROFILE_INFO_QUERY}
      variables={{ gcID: (String(id)) }}
    >
      {({ loading, error, data }) => {
        if (loading) return <Loading />;
        if (error) return `Error!: ${error}`;
        const userInfo = (!data) ? '' : data.profiles[0];
        return (
          <Card style={style.card}>
            {userInfo ? (
              <div>
                <CardBody>
                  <CardTitle className="profile-card-title">
                    <div>Profile</div>
                  </CardTitle>
                  <ProfileCardDisplay
                    user={userInfo}
                  />
                </CardBody>
                <CardFooter>
                  {canEdit ?
                    <LocalizedEditProfile
                      profile={userInfo}
                      token={accessToken}
                    /> : ''}
                </CardFooter>
              </div>
            ) : (<CardBody>Cannot find GCID</CardBody>)}
          </Card>
        );
    }}
    </Query>
  );
};

GQLProfileCard.propTypes = {
  id: PropTypes.number.isRequired,
  accessToken: PropTypes.string.isRequired,
  myGcID: PropTypes.number.isRequired,
  modifyProfile: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(GQLProfileCard);
