import React from 'react';
//import PropTypes from 'prop-types';

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

    this.handleChange = this.handleChange.bind(this);;
    this.searchDelay = false;
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
      skip: true
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
          const results = (checkResult.profiles) ? checkResult.profiles.map((a) =>
            <li key={a.gcID}>
              <a href={"/p/" + a.gcID}>
                {a.name}
              </a>

            </li>
          ) : [];
          return (
            <div>
              <label>
                Search
                  <Input
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.value}
                  />
              </label>
              <ul>{results}</ul>
            </div>
          );
        }}
      </Query>
    );
  }
}

/*
class ProfileSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue || '',
      isDefault: true,
    };
    this.handleResultSelect = this.handleResultSelect.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.searchDelay = false;
  }

  componentWillReceiveProps(next) {
    const { isDefault } = this.state;
    if (isDefault && (next.defaultValue !== this.state.value)) {
      this.setState({ value: next.defaultValue });
    }
  }

  handleResultSelect(e, { result }) {
    this.setState({
      value: this.props.defaultValue || '',
      skip: true,
      isDefault: true,
    });
    setTimeout(() => this.props.onResultSelect(result), 0);
  }

  handleSearchChange(e) {
    this.setState({ value: e.target.value, skip: true, isDefault: false });
    if (this.searchDelay) {
      clearTimeout(this.searchDelay);
    }
    this.searchDelay = setTimeout(() => {
      this.setState({ skip: false });
      this.searchDelay = false;
    }, 200);
  }

  render() {
      /*
    const capitalize = function capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };
 
    //const title = `title${capitalize(localizer.lang.split('_', 1)[0])}`;
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
        skip={this.state.skip || !this.state.value}
        variables={{ name: this.state.value }}
      >
        {({
          loading,
          data,
        }) => {
          const { value, isDefault } = this.state;
          const results = (data.profiles) ? data.profiles.map(a =>
            ({
              title: a.name,
              image: a.avatar,
              id: a.gcID,
            })) : [];
          //this.props.results;

          return (
              <div>
                  <label>
                      Search
                      <input 
                        type="text"
                        value={value}
                        onChange={this.handleSearchChange}

                      />
                  </label>
                  <span>{results}</span>
            </div>
          );
        }}
      </Query>
    );
  }
}

ProfileSearch.defaultProps = {
  onResultSelect: () => {},
  defaultValue: undefined,
  onBlur: () => {},
  resultPreProcessor: () => {},
};

ProfileSearch.propTypes = {
  onResultSelect: PropTypes.func,
  defaultValue: PropTypes.string,
  onBlur: PropTypes.func,
  resultPreProcessor: PropTypes.func,
};
*/


export default ProfileSearch;
