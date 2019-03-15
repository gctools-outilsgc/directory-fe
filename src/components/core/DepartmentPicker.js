import React from 'react';
import PropTypes from 'prop-types';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import { Input, Button } from 'reactstrap';

class DepartmentPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.currentDepart.nameEn || '',
      skip: true,
      wasChanged: false,
    };
    this.handleResultClick = this.handleResultClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.searchDelay = false;
  }

  handleResultClick(e) {
    this.setState({
      skip: true,
      value: e.nameEn,
      wasChanged: true,
    });
    setTimeout(() => this.props.onResultSelect(e, this.state.wasChanged), 0);
  }

  handleChange(e) {
    this.setState({
      value: e.target.value,
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
          query organizationSearch($nameEn: String!) {
            organizations(nameEn: $nameEn) {
              id
              nameEn
              teams {
                id
                nameEn
              }
            }
          }`}
        skip={this.state.skip}
        variables={{ nameEn: this.state.value }}
      >
        {({ data }) => {
          const checkResult = (!data) ? [''] : data;
          const results = (checkResult.organizations) ?
            checkResult.organizations.map(r => (
              <li key={r.id}>
                <Button
                  onClick={() => this.handleResultClick(r)}
                  color="light"
                >
                  {r.nameEn}
                </Button>
              </li>
            )) : [];
          const styleClasses = (!data) ?
            'search-results-none' : 'list-unstyled search-results';
          return (
            <div>
              <label>
                <span className="font-weight-bold">
                  Department
                </span>
                <Input
                  type="text"
                  onChange={this.handleChange}
                  value={(this.state.value) ? this.state.value : ''}
                />
              </label>
              <ul className={styleClasses}>
                {results}
              </ul>
            </div>
          );
        }}
      </Query>
    );
  }
}

DepartmentPicker.defaultProps = {
  currentDepart: undefined,
};

DepartmentPicker.propTypes = {
  onResultSelect: PropTypes.func.isRequired,
  currentDepart: PropTypes.shape({
    id: PropTypes.string,
    nameEn: PropTypes.string,
  }),
};

export default DepartmentPicker;
