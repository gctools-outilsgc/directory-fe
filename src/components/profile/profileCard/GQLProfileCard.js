import React, { Component } from 'react';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import { Card, CardBody, CardTitle, CardFooter } from 'reactstrap';

import ProfileCardDisplay from './ProfileCardDisplay';
import EditProfile from './EditProfile';

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

const style = {
    card: {
        width: '100%',
    },
};

class GQLProfileCard extends Component {
    render() {
        return (
            <Query
                query={PROFILE_INFO_QUERY}
                variables={{ gcID: (String(this.props.id)) }}
            >
                {({ loading, error, data }) => {
                    if (loading) return 'Loading ...';
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
                                <EditProfile profile={userInfo} />
                            </CardFooter>
                        </Card>
                    )
                }}
            </Query>

        );
    }
}

export default GQLProfileCard;