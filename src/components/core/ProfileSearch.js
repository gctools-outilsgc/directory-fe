import React from 'react';
// import PropTypes from 'prop-types';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import { Input } from 'reactstrap';

class ProfileSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      skip: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.searchDelay = false;
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
      skip: true,
    });
    this.searchDelay = setTimeout(() => {
      this.setState({ skip: false });
      this.searchDelay = false;
      if (!this.state.value) {
        this.setState({ skip: true });
      }
    }, 200);
  }

  render() {
    return (
      <Query
        query={gql`
          query profileSearchQuery($name: String!) {
            profiles(name: $name) {
              gcID
              name
              avatar
            }
          }`}
        skip={this.state.skip}
        variables={{ name: this.state.value }}
      >
        {({
          loading,
          data,
        }) => {
          const checkResult = (!data) ? [''] : data;
          const results = (checkResult.profiles) ? checkResult.profiles.map(a =>
            (<li key={a.gcID}>
              <a href={`/p/${a.gcID}`}>
                {a.name}
              </a>

             </li>)) : [];
          const styleClasses = (!data) ? 'search-results-none' : 'list-unstyled search-results';
          return (
            <div className="search-form search-form-round">
              <label>
                <span className="sr-only">Search</span>
                <Input
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.value}
                  placeholder="Search Profiles"
                />
              </label>
              <ul className={styleClasses}>{results}</ul>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default ProfileSearch;
