import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import LocalizedComponent
  from '@gctools-components/react-i18n-translation-webpack';

import { Query, Mutation } from 'react-apollo';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import { Card, CardBody, CardTitle, Button } from 'reactstrap';

import { GET_APPROVAL_BY_ID, MODIFY_APPROVALS } from '../../gql/profile';
import ErrorModal, { err } from '../core/ErrorModal';

const mapSToP = ({ user }) => {
  const props = {};
  if (user) {
    props.accessToken = user.access_token;
    // props.myGcID = user.profile.sub;
  }
  return props;
};

const style = {
  card: {
    width: '100%',
    padding: '0 15px 10px 15px',
  },
};

export const GQLApproveApproval = (props) => {
  const {
    id,
    accessToken,
    // myGcID,
  } = props;

  const Processing = <Card style={style.card}><CardBody /></Card>;

  const [errorState, setErrorState] = useState([]);
  const [mutationState, setMutationState] = useState(false);
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
                  {approvalInfo ?
                    <Fragment>
                      <Mutation
                        mutation={MODIFY_APPROVALS}
                        onCompleted={() => {
                          setMutationSuccess(true);
                        }}
                        onError={(muteError) => {
                          setErrorState(err(muteError));
                        }}
                      >
                        {(modifyApprovals, { mloading, merror, mdata }) => {
                          if (mloading) return 'Loading...';
                          if (merror) return 'ERROR';
                          if (!mutationState) {
                            setMutationState(true);
                            setTimeout(() => {
                              modifyApprovals({
                                variables: {
                                  id,
                                  data: {
                                    status: 'Approved',
                                  },
                                },
                              });
                            }, 1500);
                          }
                          return (
                            <Fragment>
                              <CardTitle className="profile-card-title d-flex">
                                <h2>
                                  Approve-
                                  {approvalInfo.changeType}
                                  -
                                  {approvalInfo.gcIDSubmitter.name}
                                </h2>
                              </CardTitle>
                              {
                                mutationSuccess ?
                                  'Success' :
                                  <Fragment>
                                    {
                                      errorState.length === 0 ?
                                        <p>Loading</p> : 'Error'
                                    }
                                  </Fragment>
                              }
                              <p> {mdata}</p>
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
                      <a href="/p/">Return to my profile</a>
                    </Fragment>
                  }
                </CardBody>
              </Card>
            );
          }}
        </Query>
        :
        <Fragment>
          <h1 className="sr-only">Process Approval</h1>
          <p>Please login to continue</p>
          <Button
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
        </Fragment>
      }
    </Fragment >
  );
};

GQLApproveApproval.defaultProps = {
  id: undefined,
  accessToken: undefined,
  // myGcID: undefined,
};

GQLApproveApproval.propTypes = {
  id: PropTypes.string,
  accessToken: PropTypes.string,
  // myGcID: PropTypes.string,
};

export default connect(mapSToP)(LocalizedComponent(GQLApproveApproval));
