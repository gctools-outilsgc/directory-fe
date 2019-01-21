import React from 'react';

import { connect } from 'react-redux';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

import { Card, CardBody, CardTitle, CardFooter, Button } from 'reactstrap';

import SupervisorPicker from '../../core/SupervisorPicker';

const TEAM_INFO_QUERY = gql`
query organizationTierQuery($gcID: String!) {
  profiles(gcID: $gcID) {
    name
    gcID
    Employees {
      name
      gcID
    }
    supervisor {
      gcID
      name
      titleEn
      titleFr
    }
    org {
      id
      nameEn
      nameFr
      organization {
        id
        nameEn
        nameFr
        acronymEn
        acronymFr
      }
    }
    OwnerOfOrgTier {
      id
      nameEn
      nameFr
      OrgMembers {
        name
        gcID
      }
    }
  }
}`;


const modifyProfileMutation = gql`
mutation changeTeam($gcID: String!, $profileInfo: ModifyProfileInput!) {
  modifyProfile(gcId: $gcID, profileInfo: $profileInfo) {
    gcID
  }
}
`;

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

class GQLTeamCard extends React.Component {
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
                query={TEAM_INFO_QUERY}
                variables={{ gcID: (String(id)) }}
            >
                {({ loading, error, data }) => {
                    if (loading) return 'Loading ...';
                    if (error) return `Error!: ${error}`;
                    const supTest = data.profiles[0].supervisor;
                    const teamTest = data.profiles[0].org;
                    return (
                        <Card style={style.card}>
                            <CardBody>
                                <CardTitle>
                                    Teams
                            </CardTitle>
                                <div>
                                    <div className="font-weight-bold">
                                        Supervisor
                                </div>
                                    {supTest ? supTest.name : 'None'}
                                    {supTest ? supTest.titleEn : ''}
                                    <div>
                                        <SupervisorPicker
                                            onResultSelect={(s) => {
                                                console.log('I have ' + s);
                                            }}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="font-weight-bold">
                                        Team
                              </div>
                                    {teamTest ? teamTest.nameEn : 'None'}
                                </div>
                            </CardBody>
                            <CardFooter>
                                {canEdit ?
                                    <Button>Edit</Button> :
                                    'You cannot'
                                }
                            </CardFooter>
                        </Card>
                    )
                }}

            </Query>
        );
    }
}

export default connect(mapStateToProps)(GQLTeamCard);
