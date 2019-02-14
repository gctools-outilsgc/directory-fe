import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

import {
  Card,
  CardBody,
  CardTitle,
  CardFooter,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col
} from 'reactstrap';

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
    padding: '0 15px 10px 15px',
  },
};

export class GQLTeamCard extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    accessToken: PropTypes.string.isRequired,
    myGcID: PropTypes.number.isRequired,
    modifyProfile: PropTypes.bool.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  render() {
    const {
      id,
      accessToken,
      myGcID,
      modifyProfile: canModify,
    } = this.props;
    const canEdit = (accessToken !== '') && canModify && (id === myGcID);
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
            <Card style={style.card}>
              {userInfo ? (
                <div>
                  <CardBody>
                    <CardTitle className="profile-card-title">
                          Teams
                    </CardTitle>
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
                  </CardBody>
                  <CardFooter>
                    {canEdit ?
                      <div className="profile-card-footer">
                        <Button
                          className="float-right"
                          size="sm"
                          color="primary"
                          onClick={this.toggle}
                        >
                          Edit
                        </Button>
                        <Modal isOpen={this.state.modal} toggle={this.toggle}>
                          <ModalHeader toggle={this.toggle}>
                            Edit Team
                          </ModalHeader>
                          <ModalBody>
                            <Mutation
                              mutation={modifyProfileMutation}
                              refetchQueries={[{
                                query: TEAM_INFO_QUERY,
                                variables: { gcID: String(id) },
                              }]}
                              context={{
                                headers: {
                                  Authorization: `Bearer ${accessToken}`,
                                },
                              }}
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
                                  Authorization: `Bearer ${accessToken}`,
                                },
                              }}
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
                            <Button color="primary" onClick={this.toggle}>
                              Close this
                            </Button>
                          </ModalBody>

                        </Modal>
                      </div> :
                          ''
                      }
                  </CardFooter>
                </div>
              ) : (
                <CardBody>Cannot find GCID</CardBody>
              )}
            </Card>
          );
      }}
      </Query>
    );
  }
}

export default connect(mapStateToProps)(GQLTeamCard);
