import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LocalizedComponent
  from '@gctools-components/react-i18n-translation-webpack';

import styled from 'styled-components';

import { Query, Mutation } from 'react-apollo';

import {
  Row,
  Col,
  Button,
  Form,
  FormGroup
} from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInbox } from '@fortawesome/free-solid-svg-icons';

import { GET_APPROVALS, MODIFY_APPROVALS } from '../../../gql/profile';
import refetchMutated from '../../../utils/refetchMutated';
import { UserAvatar } from '../../core/UserAvatar';
import InputCharacterCount from '../../core/InputCharacterCount';
import ErrorModal, { err } from '../../core/ErrorModal';

const RowContainer = styled.div`
background-color: #FFFFFF;
border: 1px solid rgba(0,0,0,0.125);
margin-top: 10px;
border-radius: 4px;
`;

const HeaderContainer = styled.div`
background-color: #FAFAFA;
padding: 10px 6px;
`;
const ApprovalList = (props) => {
  const {
    user,
    status,
  } = props;

  return (
    <HeaderContainer>
      <div>
        <div className="d-flex">
          <UserAvatar
            avatar={user ? user.avatar : ''}
            name={user ? user.name : ''}
          />
          <div className="ml-3">
            <div className="font-weight-bold member-name">
              {user.name}
            </div>
            <small className="text-muted">
              {user.titleEn}
            </small>
            <div>{status}</div>
          </div>
        </div>
      </div>
    </HeaderContainer>
  );
};

ApprovalList.propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.string,
    name: PropTypes.string,
    titleEn: PropTypes.string,
  }).isRequired,
  status: PropTypes.string.isRequired,
};

const ApprovalPane = (props) => {
  const {
    approval,
    changeType,
    requestedChange,
  } = props;

  const [deny, setDeny] = useState(true);
  const [formValue, setFormValue] = useState(null);
  const [denyValue, setDenyValue] = useState('');
  const [errorState, setErrorState] = useState([]);
  return (
    <Row>
      <Col
        className="m-3"
        md="6"
        sm="12"
      >
        <div>
          <div className="mb-2">
            <strong>{approval.user.name} </strong>
            {(changeType === 'Membership') ?
              __('wants to make you their supervisor.') :
              <span>{__('is trying to change the following:')}</span>
            }
          </div>
          {
            Object.keys(requestedChange).map((c) => {
              if (requestedChange[c] && c !== 'id' && c !== '__typename') {
                let displayName = '';
                switch (c) {
                  case 'titleEn':
                    displayName = __('Title EN');
                    break;
                  case 'titleFr':
                    displayName = __('Title FR');
                    break;
                  default:
                    displayName = '';
                }
                return (
                  <div key={`${approval.id}-${c}`}>
                    {`${displayName} = ${requestedChange[c]}`}
                  </div>
                );
              }
              return '';
            })
          }
        </div>
        <Mutation
          mutation={MODIFY_APPROVALS}
          update={refetchMutated}
          onError={(error) => {
            setErrorState(err(error));
          }}
        >
          {(modifyApproval, { loading }) => (
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                modifyApproval({
                  variables: {
                    id: approval.id,
                    data: {
                      deniedComment: denyValue,
                      status: formValue,
                    },
                  },
                });
              }}
            >
              <FormGroup>
                <label htmlFor={`comments-${approval.id}`}>
                  {__('Comments')}
                </label>
                <InputCharacterCount
                  onChange={(e) => {
                    setDeny(false);
                    setDenyValue(e.target.value);
                  }}
                  id={`comments-${approval.id}`}
                />
              </FormGroup>
              <div>
                <Button
                  disabled={loading}
                  color="primary"
                  className="mr-2"
                  type="submit"
                  name="approve"
                  value="Approved"
                  onClick={(e) => {
                    setFormValue(e.target.value);
                  }}
                >
                  {__('Approve')}
                </Button>
                <Button
                  disabled={deny}
                  type="submit"
                  name="deny"
                  value="Denied"
                  onClick={(e) => {
                    setFormValue(e.target.value);
                  }}
                >
                  {__('Deny')}
                </Button>
                <ErrorModal error={errorState} />
              </div>
            </Form>
          )}
        </Mutation>
      </Col>
    </Row>
  );
};

ApprovalPane.propTypes = {
  changeType: PropTypes.string.isRequired,
  approval: PropTypes.shape({
    id: PropTypes.string,
    user: PropTypes.shape({
      gcID: PropTypes.string,
      name: PropTypes.string,
    }),
  }).isRequired,
  requestedChange: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    titleEn: PropTypes.string,
    titleFr: PropTypes.string,
  }).isRequired,
};

class GQLYourApprovals extends React.Component {
  render() {
    return (
      <Query
        query={GET_APPROVALS}
        variables={
          { gcIDApprover: { gcID: (String(this.props.gcID)) } }
        }
      >
        {({
          loading,
          error,
          data,
        }) => {
          if (loading) return 'Loading...';
          if (error) return `Error!: ${error}`;
          const approvalData = (!data) ? '' : data.approvals;
          const aPane = (approvalData.length > 0)
            ? approvalData.map(apprvl => (
              <div key={apprvl.id}>
                <ApprovalList
                  user={apprvl.gcIDSubmitter}
                  status={apprvl.status}
                />
                <ApprovalPane
                  changeType={apprvl.changeType}
                  approval={
                    {
                      id: apprvl.id,
                      user: {
                        gcID: apprvl.gcIDSubmitter.gcID,
                        name: apprvl.gcIDSubmitter.name,
                      },
                    }
                  }
                  requestedChange={apprvl.requestedChange}
                />
              </div>
            )) : (
              <div>
                <div className="p-5 text-center h4 text-muted">
                  <div>
                    <FontAwesomeIcon
                      icon={faInbox}
                      size="3x"
                    />
                  </div>
                  <div>
                    {__('No pending approvals')}
                  </div>
                </div>
              </div>
            );
          return (
            <RowContainer>
              <div>
                <div>
                  <div>
                    {aPane}
                  </div>
                </div>
              </div>
            </RowContainer>
          );
        }}
      </Query>
    );
  }
}

GQLYourApprovals.propTypes = {
  gcID: PropTypes.string.isRequired,
};

export default LocalizedComponent(GQLYourApprovals);
