import React from 'react';
import PropTypes from 'prop-types';

import { Col, Row } from 'reactstrap';

import { UserAvatar } from '../../core/UserAvatar';

const TeamDisplayMemberList = (props) => {
  const { members } = props;
  const list = (members) ?
    members.map(p => (
      <Col sm="4" className="mb-3" key={p.gcID}>
        <a href={p ? p.gcID : ''} >
          <div className="d-flex">
            <UserAvatar
              avatar={p ? p.avatar : ''}
              name={p ? p.name : ''}
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
    )) : 'No Team';
  return (
    <Row className="mt-3">
      {list}
    </Row>
  );
};

TeamDisplayMemberList.propTypes = {
  members: PropTypes.arrayOf(PropTypes.shape({
    gcID: PropTypes.string,
    avatar: PropTypes.string,
    name: PropTypes.string,
    titleEn: PropTypes.string,
    titleFr: PropTypes.string,
  })).isRequired,
};

export default TeamDisplayMemberList;
