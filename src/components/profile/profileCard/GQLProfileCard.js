import React, { Component } from 'react';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';

import { Card, CardBody, CardTitle, CardFooter } from 'reactstrap';

import ProfileCardDisplay from './ProfileCardDisplay';
import EditProfile from './EditProfile';
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
    },
};

export class GQLProfileCard extends Component {
    render() {
        const {
            id,
            accessToken,
            myGcID,
            modifyProfile,
        } = this.props

        const canEdit = (accessToken !== '') && modifyProfile && (id === myGcID);
        return (
            <Query
                query={PROFILE_INFO_QUERY}
                variables={{ gcID: (String(id)) }}
            >
                {({ loading, error, data }) => {
                    if (loading) return <Loading />;
                    if (error) return `Error!: ${error}`;
                    const userInfo = data.profiles[0];
                    return (
                        <Card style={style.card}>
                            <CardBody>
                                <CardTitle>
                                    Profile
                                </CardTitle>
                                <ProfileCardDisplay
                                    user={userInfo}
                                />
                            </CardBody>
                            <CardFooter>
                                {canEdit ? 
                                    <EditProfile profile={userInfo} token={accessToken} /> : 
                                    'You cannot edit this'
                                }
                            </CardFooter>
                        </Card>
                    )
                }}
            </Query>

        );
    }
}

export default connect(mapStateToProps)(GQLProfileCard);