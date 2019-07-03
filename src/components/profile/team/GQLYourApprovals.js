import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LocalizedComponent
  from '@gctools-components/react-i18n-translation-webpack';

import classnames from 'classnames';
import styled from 'styled-components';

import { Query, Mutation } from 'react-apollo';

import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  Button,
  Form,
  FormGroup
} from 'reactstrap';

import { GET_APPROVALS, MODIFY_APPROVALS } from '../../../gql/profile';
import refetchMutated from '../../../utils/refetchMutated';
import { UserAvatar } from '../../core/UserAvatar';
import InputCharacterCount from '../../core/InputCharacterCount';
import ErrorModal, { err } from '../../core/ErrorModal';

const RowContainer = styled.div`
background-color: #F4F8F9;
height: 360px;
overflow: hidden;
`;

const ApprovalList = (props) => {
  const {
    user,
    approvalID,
    toggle,
    activeTab,
    status,
  } = props;

  return (
    <NavItem className="border-bottom">
      <NavLink
        href="#!"
        className={
          classnames({
            active: activeTab === approvalID,
          })
        }
        onClick={() => { toggle(approvalID); }}
      >
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
      </NavLink>
    </NavItem>
  );
};

ApprovalList.propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.string,
    name: PropTypes.string,
    titleEn: PropTypes.string,
  }).isRequired,
  approvalID: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
  activeTab: PropTypes.string.isRequired,
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
    <TabPane tabId={approval.id}>
      <div
        className="vh-100 p-3 member-holder d-flex flex-column"
      >
        <div className="mb-auto">
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
              <div className="float-right">
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
      </div>
    </TabPane>
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
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

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
          const aList = (approvalData.length > 0)
            ? approvalData.map(apprvl => (
              <ApprovalList
                key={apprvl.id}
                user={apprvl.gcIDSubmitter}
                approvalID={apprvl.id}
                toggle={(e) => { this.toggle(e); }}
                activeTab={this.state.activeTab}
                status={apprvl.status}
              />
            )) : 'NO APPROVALS';

          const aPane = (approvalData.length > 0)
            ? approvalData.map(apprvl => (
              <ApprovalPane
                key={apprvl.id}
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
            )) : '';
          return (
            <RowContainer>
              <Row className="mt-3 your-teams-container">
                <Col sm="4" className="pr-0">
                  <div className="member-holder">
                    <Nav vertical>
                      {aList}
                    </Nav>
                  </div>
                </Col>
                <Col sm="8" className="pl-0">
                  <TabContent activeTab={this.state.activeTab}>
                    {aPane}
                  </TabContent>
                </Col>
              </Row>
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
