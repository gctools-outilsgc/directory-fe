import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import LocalizedComponent
  from '@gctools-components/react-i18n-translation-webpack';

import { Query, Mutation } from 'react-apollo';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import {
  Card,
  CardBody,
  CardTitle,
  Button,
  Form,
  FormGroup,
  Alert
} from 'reactstrap';

import { GET_APPROVAL_BY_ID, MODIFY_APPROVALS } from '../../gql/profile';
import InputCharacterCount from '../core/InputCharacterCount';
import ErrorModal, { err } from '../core/ErrorModal';

const mapSToP = ({ user }) => {
  const props = {};
  if (user) {
    props.accessToken = user.access_token;
    props.myGcID = user.profile.sub;
  }
  return props;
};

const style = {
  card: {
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '0 15px 10px 15px',
  },
  loginCard: {
    width: '100%',
    maxWidth: '250px',
    margin: '0 auto',
    padding: '0 15px 10px 15px',
  },
};

export const GQLDenyApproval = (props) => {
  const {
    id,
    accessToken,
    myGcID,
  } = props;

  const Processing = <Card style={style.card}><CardBody /></Card>;

  const myProfile = `/p/${myGcID}`;

  const variables = {
    id,
    data: {
      status: 'Approved',
    },
  };

  const [deny, setDeny] = useState(true);
  const [denyValue, setDenyValue] = useState('');
  const [errorState, setErrorState] = useState([]);
  const [mutationSuccess, setMutationSuccess] = useState(false);
  return (
    <Fragment>
      {accessToken ?
        <Query
          query={GET_APPROVAL_BY_ID}
          variables={{ id: (String(id)) }}
        >
          {({ loading, error, data }) => {
            if (loading) return Processing;
            if (error) return `Error!: ${error}`;

            const approvalInfo = (!data) ? '' : data.approvals[0];
            return (
              <Card style={style.card}>
                <h1 className="sr-only">Process Approval</h1>
                <Helmet>
                  <title>Process Approval - Directory</title>
                </Helmet>
                <CardBody>
                  {(
                    approvalInfo && myGcID === approvalInfo.gcIDApprover.gcID
                  ) ?
                    <Fragment>
                      <Mutation
                        mutation={MODIFY_APPROVALS}
                        variables={variables}
                        onCompleted={() => {
                          setMutationSuccess(true);
                        }}
                        onError={(muteError) => {
                          setErrorState(err(muteError));
                        }}
                        context={{
                          headers: {
                            authorization: `Bearer ${accessToken}`,
                          },
                        }}
                      >
                        {(modifyApproval, { mloading }) => {
                          if (mloading) return 'loading';
                          return (
                            <Fragment>
                              <CardTitle className="profile-card-title d-flex">
                                <h2>
                                  Deny-
                                  {approvalInfo.changeType}
                                  -
                                  {approvalInfo.gcIDSubmitter.name}
                                </h2>
                              </CardTitle>
                              {mutationSuccess ?
                                <Alert color="success">
                                  Approval has been proccessed.<br />
                                  <a href={myProfile}>Return to my profile</a>
                                </Alert>
                                :
                                <Form
                                  onSubmit={(e) => {
                                    e.preventDefault();
                                    modifyApproval({
                                      variables: {
                                        id,
                                        data: {
                                          deniedComment: denyValue,
                                          status: 'Denied',
                                        },
                                      },
                                    });
                                  }}
                                >
                                  <p>
                                    Please provide comments.
                                  </p>
                                  <FormGroup>
                                    <label htmlFor={`comments-${id}`}>
                                      Comments
                                    </label>
                                    <InputCharacterCount
                                      onChange={(e) => {
                                        setDenyValue(e.target.value);
                                        if (e.target.value !== '') {
                                          setDeny(false);
                                        } else {
                                          setDeny(true);
                                        }
                                      }}
                                      id={`comments-${id}`}
                                    />
                                  </FormGroup>
                                  <div className="float-right">
                                    <Button
                                      color="primary"
                                      disabled={deny}
                                      type="submit"
                                      name="deny"
                                      value="Denied"
                                    >
                                      Deny
                                    </Button>
                                  </div>
                                </Form>
                              }
                            </Fragment>
                          );
                        }}
                      </Mutation>
                      <ErrorModal error={errorState} />
                    </Fragment>
                    :
                    <Fragment>
                      <CardTitle className="profile-card-title d-flex">
                        <h2>No Approval</h2>
                      </CardTitle>
                      <p>Was unable to find approval</p>
                      <a href={myProfile}>Return to my profile</a>
                    </Fragment>
                  }
                </CardBody>
              </Card>
            );
          }}
        </Query>
        :
        <Fragment>
          <Card style={style.loginCard}>
            <CardBody>
              <h1 className="sr-only">Process Approval</h1>
              <CardTitle>
                <p>Please login to continue</p>
              </CardTitle>
              <Button
                block
                color="primary"
                type="submit"
                name="login"
                onClick={(e) => {
                  e.preventDefault();
                  if (document.getElementById('login-btn')) {
                    document.getElementById('login-btn').click();
                  }
                }}
              >
                Login
              </Button>
            </CardBody>
          </Card>
        </Fragment>
      }
    </Fragment >
  );
};

GQLDenyApproval.defaultProps = {
  id: undefined,
  accessToken: undefined,
  myGcID: undefined,
};

GQLDenyApproval.propTypes = {
  id: PropTypes.string,
  accessToken: PropTypes.string,
  myGcID: PropTypes.string,
};

export default connect(mapSToP)(LocalizedComponent(GQLDenyApproval));
