import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Input, Label, InputGroup, InputGroupAddon, Button } from 'reactstrap'; // eslint-disable-line
import { withRouter } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';

class ProfileSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      skip: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.searchDelay = false;
    this.handleClick = this.handleClick.bind(this);
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

  handleClick(resultsSearch) {
    if (resultsSearch.search.length !== 0) {
      if (resultsSearch.search.length === 1) {
        this.props.history.push('p/'+resultsSearch.search.map( result => result.gcID)); // eslint-disable-line
      } else {
        this.props.history.push({
          pathname: '/search',
          state: { detail: resultsSearch.search },
        });
      }
    }
  }

  render() {
    return (
      <Query
        query={gql`
          query profileSearchQuery($name: String!) {
            search(partialName: $name) {
              gcID
              name
              avatar
            }          }`}
        skip={this.state.skip}
        variables={{ name: this.state.value }}
      >
        {({ data }) => {
          const checkResult = (!data) ? [''] : data;
          const results = (checkResult.search)
            ? checkResult.search.map(a => (
              <li key={a.gcID}>
                <a href={`/p/${a.gcID}`}>
                  {a.name}
                </a>
              </li>
            )) : [];
          const styleClasses = (!data)
            ? 'search-results-none' : 'list-unstyled search-results';
          return (
            <div className="search-form search-round">
              <label htmlFor="search-input">
                <span className="sr-only">{__('Search')}</span>
                <InputGroup>
                  <Input
                    name="search-input"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.value}
                    placeholder={__('Search Profiles')}
                    className="search-round"
                    onKeyPress={(event) => {
                      if (event.key === 'Enter') {
                        this.handleClick(checkResult);
                      }
                    }}
                  />
                  <InputGroupAddon addonType="prepend">
                    <Button
                      className="search-button"
                      onClick={() => { this.handleClick(checkResult); }}
                    >
                      <FontAwesomeIcon icon={faSearch} />
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
              </label>
              <ul className={styleClasses}>{results}</ul>
            </div>
          );
        }}
      </Query>
    );
  }
}

ProfileSearch.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default withRouter(ProfileSearch);
