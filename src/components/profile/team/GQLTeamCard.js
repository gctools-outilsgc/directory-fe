import React from 'react';

import { connect } from 'react-redux';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

import { Button, Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap';

import SupervisorPicker from '../../core/SupervisorPicker';
import TeamPicker from '../../core/TeamPicker';
import Loading from './Loading';

export const TEAM_INFO_QUERY = gql`
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
        padding: '15px 0px 0px 0px',
    },
};

export class GQLTeamCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

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
                    if (loading) return <Loading />;
                    if (error) return `Error!: ${error}`;
                    const userInfo = (!data) ? '' : data.profiles[0];
                    const supTest = (!userInfo) ? '' : userInfo.supervisor;
                    const teamTest = (!userInfo) ? '' : userInfo.org;
                    return (
                        <div style={style.card}>
                        {userInfo ? (
                            <div>
                                <Row>
                                    <Col>
                                        <div className="font-weight-bold">
                                            Supervisor
                                        </div>
                                        <div>
                                            {supTest ? supTest.name : 'None'}  
                                        </div>
                                        <small className="text-muted">
                                            {supTest ? supTest.titleEn : ''} 
                                        </small>
                                    </Col>
                                    <Col>
                                        <div className="font-weight-bold">
                                            Team
                                        </div>
                                        {teamTest ? teamTest.nameEn : 'None'}
                                    </Col>
                                </Row>
                            <div>
                                {canEdit ?
                                    <div className="profile-card-footer">
                                        <Button className="float-right" size="sm" color="primary" onClick={this.toggle}>Edit</Button>
                                        <Modal isOpen={this.state.modal} toggle={this.toggle}>
                                            <ModalHeader toggle={this.toggle}>Edit Team</ModalHeader>
                                            <ModalBody>
                                                <Mutation
                                                    mutation={modifyProfileMutation}
                                                    refetchQueries={[{
                                                        query: TEAM_INFO_QUERY,
                                                        variables: { gcID: String(id) },
                                                    }]}
                                                    context={{
                                                        headers: {
                                                            Authorization:
                                                                `Bearer ${accessToken}`,
                                                        },
                                                    }
                                                    }
                                                >
                                                    {modifyProfile => (

                                                        <div>
                                                            {supTest ? supTest.name : 'None'}
                                                            <SupervisorPicker
                                                                onResultSelect={(s) => {
                                                                    modifyProfile({
                                                                        variables: {
                                                                            gcID: String(id),
                                                                            profileInfo: {
                                                                                supervisor: {
                                                                                    gcId: s,
                                                                                },
                                                                            },
                                                                        },
                                                                    });
                                                                }}
                                                            />
                                                        </div>

                                                    )}
                                                </Mutation>
                                                <br />
                                                <Mutation
                                                    mutation={modifyProfileMutation}
                                                    refetchQueries={[{
                                                        query: TEAM_INFO_QUERY,
                                                        variables: { gcID: String(id) },
                                                    }]}
                                                    context={{
                                                        headers: {
                                                            Authorization:
                                                                `Bearer ${accessToken}`,
                                                        },
                                                    }
                                                    }
                                                >
                                                    {modifyProfile => (
                                                        <TeamPicker
                                                            id="idTest"
                                                            editMode
                                                            selectedOrgTier={teamTest}
                                                            supervisor={supTest}
                                                            gcID={id}
                                                            onTeamChange={(t) => {
                                                                modifyProfile({
                                                                    variables: {
                                                                        gcID: String(id),
                                                                        profileInfo: {
                                                                            org: {
                                                                                orgTierId: t,
                                                                            },
                                                                        },
                                                                    },
                                                                });
                                                            }}
                                                        />
                                                    )}
                                                </Mutation>
                                                <Button color="primary" onClick={this.toggle}>Close this</Button>{' '}
                                            </ModalBody>

                                        </Modal>
                                    </div> :
                                    ''
                                }
                            </div>
                            </div>
                        ) : (
                            <div>
                                Cannot find GCID
                            </div>
                        )}
                            
                        </div>
                    )
                }}

            </Query>
        );
    }
}

export default connect(mapStateToProps)(GQLTeamCard);
