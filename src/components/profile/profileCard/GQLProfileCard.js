import React, { Component } from 'react';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import { Card, CardBody, CardTitle, CardFooter, Button } from 'reactstrap';

import ProfileCardDisplay from './ProfileCardDisplay';

const profileInfoQuery = gql`
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
                query={profileInfoQuery}
                variables={{ gcID: (String(this.props.id)) }}
            >
                {({ loading, error, data }) => {
                    if (loading) return 'Loading (Replace me with a component)...';
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
                                <Button>
                                    Edit Component?
                                </Button>
                            </CardFooter>
                        </Card>
                    )
                }}
            </Query>

        );
    }
}

export default GQLProfileCard;