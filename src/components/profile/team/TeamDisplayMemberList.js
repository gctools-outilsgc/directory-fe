import React from 'react';
import PropTypes from 'prop-types';

import { Col, Row } from 'reactstrap';

const TeamDisplayMemberList = (props) => {
  const { members } = props;
  const list = (members) ?
    members.map(p => (
      <Col sm="4" className="mb-3">
        <div className="d-flex">
          <img
            className="rounded-circle avatar"
            src={
              p ? p.avatar : ''
            }
            alt={
              p ? p.name : 'None'
            }
          />
          <div className="ml-2 font-weight-bold">
            <div>
              {p ? p.name : 'None'}
            </div>
            <small className="text-muted">
              {p ? p.titleEn : 'None'}
            </small>
          </div>
        </div>
      </Col>
    )) : 'No Team';
  return (
    <Row className="mt-3">
      {list}
    </Row>
  );
};

TeamDisplayMemberList.propTypes = {
  members: PropTypes.shape({
    avatar: PropTypes.string,
    name: PropTypes.string,
    titleEn: PropTypes.string,
  }).isRequired,
};

export default TeamDisplayMemberList;
