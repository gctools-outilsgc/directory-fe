import React from 'react';
import PropTypes from 'prop-types';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import { Input, Button } from 'reactstrap';

import LocalizedComponent
  from '@gctools-components/react-i18n-translation-webpack';

import GenericAvatar from '../profile/OrgChart/Card/img/user.gif';

class SupervisorPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      skip: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleResultClick = this.handleResultClick.bind(this);
    this.searchDelay = false;
  }

  handleResultClick(e) {
    this.setState({
      skip: true,
      value: '',
    });
    setTimeout(() => this.props.onResultSelect(e), 0);
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
            search(partialName: $name) {
              gcID
              name
              titleEn
              titleFr
              avatar
              ownerOfTeams {
                id
                nameEn
              }
            }
          }`}
        skip={this.state.skip}
        variables={{ name: this.state.value }}
      >
        {({ data }) => {
          const checkResult = (!data) ? [''] : data;
          const results = (checkResult.search) ?
            checkResult.search.map(a => (
              <li key={a.gcID}>
                <Button
                  onClick={() => this.handleResultClick(a)}
                  color="light"
                  block
                  className="user-btn"
                >
                  <div className="d-flex">
                    <img
                      className="avatar rounded-circle"
                      src={
                        a.avatar ? a.avatar : GenericAvatar
                      }
                      alt=""
                    />
                    <div className="ml-2">
                      <div
                        className="font-weight-bold"
                      >
                        {a.name}
                      </div>
                      <small className="text-muted">
                        {a.titleEn}
                      </small>
                    </div>
                  </div>
                </Button>
              </li>
            )) : [];
          const styleClasses = (!data) ?
            'search-results-none' : 'list-unstyled search-results';
          return (
            <div className="search-form search-form-round">
              <label className="w-100">
                <span className="font-weight-bold">
                  {__('Search')}
                </span>
                <Input
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.value}
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

SupervisorPicker.propTypes = {
  onResultSelect: PropTypes.func.isRequired,
};

export default LocalizedComponent(SupervisorPicker);
