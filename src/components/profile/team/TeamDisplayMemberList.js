/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';

import { Col, Row } from 'reactstrap';
import { Query } from 'react-apollo';

import { GET_TEAM_MEMBERS } from '../../../gql/profile';
import { UserAvatar } from '../../core/UserAvatar';
import Loading from './Loading';

const MemberList = (props) => {
  const { p } = props;
  return (
    <Col sm="4" className="mb-3" >
      <a href={p ? p.gcID : ''} >
        <div className="d-flex">
          <UserAvatar
            avatar={p ? p.avatar : ''}
            name=""
          />
          <div className="ml-2 font-weight-bold">
            <div className="text-dark">
              {p ? p.name : 'None'}
            </div>
            {(localizer.lang === 'en_CA') ? (
              <small className="text-muted">
                {p ? p.titleEn : ''}
              </small>
            ) : (
                <small className="text-muted">
                  {p ? p.titleFr : ''}
                </small>
              )}
          </div>
        </div>
      </a>
    </Col>
  );
};
/*
TeamDisplayMemberList.propTypes = {
  userID: PropTypes.isRequired,
  members: PropTypes.arrayOf(PropTypes.shape({
    gcID: PropTypes.string,
    avatar: PropTypes.string,
    name: PropTypes.string,
    titleEn: PropTypes.string,
    titleFr: PropTypes.string,
  })).isRequired,
};
*/
const TeamDisplayMemberList = (props) => {
  const { userID } = props;
  return (
    <Query
      query={GET_TEAM_MEMBERS}
      variables={{ gcID: (String(userID)) }}
    >
      {({
        loading,
        error,
        data,
      }) => {
        if (loading) return <Loading />;
        if (error) return errorHandler(error);
        const members = (!data) ? '' : data.profiles[0].team.members;
        const list = (members) ?
          members.map(p => (
            userID != p.gcID ?
              <MemberList key={p.gcID} p={p} />
              : null
          )) : 'N/A';
        return (
          <Row className="mt-3">
            {list}
          </Row>
        );
      }}
    </Query>
  );
}

export default TeamDisplayMemberList;
