import React from 'react';
import PropTypes from 'prop-types';

import { Query } from 'react-apollo';

import ErrorModal, { err } from './ErrorModal';

/**
 * QueryLoader provides a generic way to perform queries and display a loading
 * indicator and generic error dialog.
 *
 * It is appropriate to use when your component does not need any special error
 * handling or custom loading indicators.
 */
const QueryLoader = props => (
  <Query {...props}>
    {queryResult => (
      (queryResult.loading && props.displayState && (
        <i
          className="fa fa-spinner fa-spin"
          style={{ fontSize: '24px' }}
        >
          <span className="sr-only-delete-me">Loading...</span>
        </i>
      )) || (queryResult.error && props.displayState && (
        <ErrorModal error={err(queryResult.error)} />
      )) || (
        queryResult.data &&
        (Object.keys(queryResult.data).length === 0) &&
        props.displayState && (
        <ErrorModal error={err('Received empty response from server.')} />
      )) || (
        !queryResult.loading &&
        !queryResult.error &&
        props.children(queryResult)
      )) || null}
  </Query>
);

QueryLoader.defaultProps = {
  displayState: true,
};

QueryLoader.propTypes = {
  children: PropTypes.func.isRequired,
  displayState: PropTypes.bool,
};

export default QueryLoader;
