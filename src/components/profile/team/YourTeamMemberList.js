import React from 'react';
import PropTypes from 'prop-types';

import LocalizedComponent
  from '@gctools-components/react-i18n-translation-webpack';


export const YourTeamMemberList = (props) => {
  const { members } = props;
  const list = (members.length > 0) ?
    members.map(p => (
      <li key={p.name} className="mb-3">
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
          <div className="ml-3">
            <div className="font-weight-bold member-name">
              {p ? p.name : 'None'}
            </div>
            <small className="text-muted">
              {p ? p.titleEn : 'None'}
            </small>
            <small>
              <ul className="list-inline">
                <li className="list-inline-item border-right pr-2">
                  <a href="#!">{__('transfer to new Supervisor')}</a>
                </li>
                <li className="list-inline-item">
                  <a href="#!">action</a>
                </li>
              </ul>
            </small>
          </div>
        </div>
      </li>
    )) : (
      <li>
        There are no members in this team
      </li>
    );
  return (
    <ul className="list-unstyled">
      {list}
    </ul>
  );
};

YourTeamMemberList.propTypes = {
  members: PropTypes.arrayOf(PropTypes.shape({
    avatar: PropTypes.string,
    name: PropTypes.string,
    titleEn: PropTypes.string,
  })).isRequired,
};

export default LocalizedComponent(YourTeamMemberList);
