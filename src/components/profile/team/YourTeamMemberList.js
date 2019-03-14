import React from 'react';
import PropTypes from 'prop-types';

const YourTeamMemberList = (props) => {
  const { members } = props;
  const list = (members) ?
    members.map(p => (
      <div className="d-flex" key={p.name}>
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
        <div>
          <ul>
            <li>action</li>
          </ul>
        </div>
      </div>
    )) : 'No Members';
  return (
    <div>
      {list}
    </div>
  );
};

YourTeamMemberList.propTypes = {
  members: PropTypes.shape({
    avatar: PropTypes.string,
    name: PropTypes.string,
    titleEn: PropTypes.string,
  }).isRequired,
};

export default YourTeamMemberList;
