import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LocalizedComponent
  from '@gctools-components/react-i18n-translation-webpack';

import classnames from 'classnames';
import styled from 'styled-components';

import { Query } from 'react-apollo';

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

import { GET_APPROVALS } from '../../../gql/profile';
import { UserAvatar } from '../../core/UserAvatar';
import InputCharacterCount from '../../core/InputCharacterCount';

const RowContainer = styled.div`
background-color: #F4F8F9;
height: 345px;
overflow: hidden;
`;

// TODO: Add an approval object query to this component then map the approvals

const ApprovalList = (props) => {
  const {
    user,
    approvalID,
    toggle,
    activeTab,
  } = props;

  return (
    <NavItem>
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
};

// TODO: Make this form nicer and make it work.
const ApprovalPane = (props) => {
  const {
    approval,
  } = props;

  const [deny, setDeny] = useState(true);
  const [formValue, setFormValue] = useState(null);
  return (
    <TabPane tabId={approval.id}>
      <div
        className="vh-100 p-3 member-holder d-flex flex-column"
      >
        <div className="mb-auto">
          <strong>{approval.user.name} </strong>
          wants to do a thing.
        </div>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            console.log(formValue);
            if (e.target[0].value) {
              console.log(e.target[0].value);
            }
          }}
        >
          <FormGroup>
            <label htmlFor={`comments-${approval.id}`}>
              Comments
            </label>
            <InputCharacterCount
              onChange={() => {
                setDeny(false);
              }}
              id={`comments-${approval.id}`}
            />
          </FormGroup>
          <div className="float-right">
            <Button
              color="primary"
              className="mr-2"
              type="submit"
              name="approve"
              value="approve"
              onClick={(e) => {
                setFormValue(e.target.value);
              }}
            >
              Approve
            </Button>
            <Button
              disabled={deny}
              type="submit"
              name="deny"
              value="deny"
              onClick={(e) => {
                setFormValue(e.target.value);
              }}
            >
              Deny
            </Button>
          </div>
        </Form>
      </div>
    </TabPane>
  );
};

ApprovalPane.propTypes = {
  approval: PropTypes.shape({
    id: PropTypes.string,
    user: PropTypes.shape({
      gcID: PropTypes.string,
      name: PropTypes.string,
    }),
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
          const Testing = (data.length > 0) ? 'GREATER' : 'LESS';
          const aList = approvalData.map(apprvl => (
            <ApprovalList
              user={apprvl.gcIDSubmitter}
              approvalID={apprvl.id}
              toggle={(e) => { this.toggle(e); }}
              activeTab={this.state.activeTab}
            />
          ));

          const aPane = approvalData.map(apprvl => (
            <ApprovalPane
              approval={
                {
                  id: apprvl.id,
                  user: {
                    gcID: apprvl.gcIDSubmitter.gcID,
                    name: apprvl.gcIDSubmitter.name,
                  },
                }
              }
            />
          ));
          return (
            <RowContainer>
              <Row className="mt-3 your-teams-container">
                <Col sm="4" className="pr-0">
                  ALSO: {approvalData} + {Testing}
                  <div className="member-holder">
                    <Nav vertical>
                      {/* TODO Map these / props may change based on schema */}
                      {aList}
                    </Nav>
                  </div>
                </Col>
                <Col sm="8" className="pl-0">
                  <TabContent activeTab={this.state.activeTab}>
                    {/* TODO Map these */}
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
