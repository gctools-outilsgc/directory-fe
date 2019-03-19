import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Query } from 'react-apollo';

import LocalizedComponent
  from '@gctools-components/react-i18n-translation-webpack';

import {
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input,
  Alert
} from 'reactstrap';
import styled from 'styled-components';

import { SEARCH } from '../../gql/profile';

// Fallback for browsers who don't support CSS variables
const cssVariables = {
  '--primary': '#002D42',
  '--info': '#269abc',
};
const styles = getComputedStyle(document.body);

const varTag = (variable) => {
  if (!styles.getPropertyValue(variable)) {
    return cssVariables[variable];
  }
  return `var(${variable})`;
};

const ListGroup = styled.ul`
  height: 300px;
  overflow-y: scroll;
`;

const ListItemStyle = styled.li`
:hover {
  background-color: ${varTag('--info')};
  color: #fff;
  cursor: pointer;
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

export const ProfileListSearch = (props) => {
  const { onChange, initialSearch } = props;
  const [search, setSearch] = useState(initialSearch);
  const [selected, setSelected] = useState(false);
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
                placeholder={__('Search for a new supervisor')}
                aria-label={__('Search for a new supervisor')}
              />
              <InputGroupAddon addonType="append">
                <InputGroupText>SearchIcon</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            <ListGroup className="list-group">
              {error && (
                <Alert color="danger">{__('Unable to perform search')}</Alert>
              )}
              {loading && (
                <i
                  className="fa fa-spinner fa-spin"
                  style={{ fontSize: '24px' }}
                >
                  <span className="sr-only-delete-me">Loading...</span>
                </i>
              )}
              {!loading && !error && data && data.profiles && (
                data.profiles.map((profile) => {
                  const {
                    gcID,
                    name,
                    titleFr,
                    titleEn,
                    email,
                    avatar,
                  } = profile;
                  return (
                    <ListItemStyle
                      key={`pdd-profile-${gcID}`}
                      className={
                        `list-group-item ${(selected === gcID) && 'active'}`
                      }
                      onClick={(e) => {
                        setSelected(gcID);
                        onChange(e, profile);
                      }}
                    >
                      <div>
                        <img
                          className="avatar rounded-circle"
                          style={{ marginLeft: '10px' }}
                          src={avatar}
                          alt={___(__('%1$s avatar'), name)}
                        />
                      </div>
                      <div>
                        <h3>{name}</h3>
                        {(lang === 'en_CA') ?
                          titleEn : titleFr}<br />
                        {email}
                      </div>
                    </ListItemStyle>
                  );
                })
              )}
            </ListGroup>
          </div>
        );
      }}
    </Query>
  );
};

ProfileListSearch.defaultProps = {
  onChange: () => {},
  initialSearch: '',
};

ProfileListSearch.propTypes = {
  /** Event triggered when a user is chosen from the search */
  onChange: PropTypes.func,
  /** Perform a search immediately based on the provided text */
  initialSearch: PropTypes.string,
};

export default LocalizedComponent(ProfileListSearch);
