import React, { useState } from 'react';
// import PropTypes from 'prop-types';

import { Query } from 'react-apollo';

import {
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input,
  ListGroup,
  Alert,
  Spinner
} from 'reactstrap';
import styled from 'styled-components';

import { SEARCH } from '../../gql/profile';

// Fallback for browsers who don't support CSS variables
const cssVariables = {
  '--primary': '#002D42',
};
const styles = getComputedStyle(document.body);

const varTag = (variable) => {
  if (!styles.getPropertyValue(variable)) {
    return cssVariables[variable];
  }
  return `var(${variable})`;
};

const ListItemStyle = styled.li`
:hover {
  background-color: ${varTag('--primary')};
  color: #fff;
}
font-size: 1.2em;
div {
  float: left;
  margin-right: 10px;
}
h3 {
  font-size: 1.1em;
  font-weight: bold;
  margin: 0;
  padding: 0;
}
`;

const ProfileDropdown = () => {
  const [search, setSearch] = useState('tes');
  return (
    <Query
      query={SEARCH}
      variables={{ name: search }}
      skip={search.length < 2}
    >
      {({ loading, error, data }) => {
        const { lang } = localizer;
        return (
          <div>
            <InputGroup>
              <Input
                value={search}
                onChange={({ target: { value } }) => { setSearch(value); }}
              />
              <InputGroupAddon addonType="append">
                <InputGroupText>SearchIcon</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            <ListGroup>
              {error && (
                <Alert color="danger">{__('Unable to perform search')}</Alert>
              )}
              {loading && (
                <Spinner color="primary" />
              )}
              {!loading && !error && data && data.profiles && (
                data.profiles.map(profile => (
                  <ListItemStyle
                    key={`pdd-profile-${profile.gcID}`}
                    className="list-group-item"
                  >
                    <div>
                      <img
                        className="avatar rounded-circle"
                        style={{ marginLeft: '10px' }}
                        src={profile.avatar}
                        alt={
                          (profile.avatarAltText || '%s')
                            .replace(/%s/g, profile.name)
                        }
                      />
                    </div>
                    <div>
                      <h3>{profile.name}</h3>
                      {(lang === 'en_CA') ?
                        profile.titleEn : profile.titleFr}<br />
                      {profile.email}
                    </div>
                  </ListItemStyle>
                ))
              )}
            </ListGroup>
          </div>
        );
      }}
    </Query>
  );
};

export default ProfileDropdown;
