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
  Alert
} from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { GET_APPROVAL_BY_ID, MODIFY_APPROVALS } from '../../gql/profile';
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
  spinner: {
    width: '100%',
    maxWidth: '200px',
    margin: '0 auto',
    textAlign: 'center',
  },
  loginCard: {
    width: '100%',
    maxWidth: '350px',
    margin: '0 auto',
    padding: '0 15px 10px 15px',
  },
};

export const GQLApproveApproval = (props) => {
  const {
    id,
    accessToken,
    myGcID,
  } = props;

  const Processing = <Card style={style.card}><CardBody /></Card>;

  const myProfile = `/p/${myGcID}`;

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
                <h1 className="sr-only">{__('Processing Approval')}</h1>
                <Helmet>
                  <title>
                    {__('Processing Approval')} - {__('Directory')}
                  </title>
                </Helmet>
                <CardBody>
                  {(
                    approvalInfo && myGcID === approvalInfo.gcIDApprover.gcID
                  ) ?
                    <Fragment>
                      <Mutation
                        mutation={MODIFY_APPROVALS}
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
                            }, 2500);
                          }
                          return (
                            <Fragment>
                              <CardTitle className="profile-card-title d-flex">
                                <h2>
                                  {__('Processing changes to profile')}
                                </h2>
                              </CardTitle>
                              {
                                mutationSuccess ?
                                  <Alert color="success">
                                    {__('Approval has been proccessed.')}
                                    <br />
                                    <a href={myProfile}>
                                      {__('Return to my profile')}
                                    </a>
                                  </Alert>
                                  :
                                  <Fragment>
                                    {
                                      errorState.length === 0 ?
                                        <div style={style.spinner}>
                                          <p className="h4">
                                            {__('Loading')}
                                          </p>
                                          <FontAwesomeIcon
                                            icon={faSpinner}
                                            size="3x"
                                            pulse
                                          />
                                        </div>
                                        :
                                        <Alert color="danger">
                                          {__('An error has occured.')}
                                          <br />
                                          <a href={myProfile}>
                                            {__('Return to my profile')}
                                          </a>
                                        </Alert>
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
                        <h2>
                          {__('Approval Not Found')}
                        </h2>
                      </CardTitle>
                      <p>
                        {__('Was unable to find approval')}
                      </p>
                      <a href={myProfile}>
                        {__('Return to my profile')}
                      </a>
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
              <h1 className="sr-only">{__('Processing Approval')}</h1>
              <p>
                {__('Please login to continue')}
              </p>
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
                {__('Log-in')}
              </Button>
            </CardBody>
          </Card>
        </Fragment>
      }
    </Fragment >
  );
};

GQLApproveApproval.defaultProps = {
  id: undefined,
  accessToken: undefined,
  myGcID: undefined,
};

GQLApproveApproval.propTypes = {
  id: PropTypes.string,
  accessToken: PropTypes.string,
  myGcID: PropTypes.string,
};

export default connect(mapSToP)(LocalizedComponent(GQLApproveApproval));
