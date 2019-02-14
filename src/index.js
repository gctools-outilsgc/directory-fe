import React from 'react';
import ReactDOM from 'react-dom';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import { Provider } from 'react-redux';

import ConnectedAndLocalizedApp from './containers/App';
import * as serviceWorker from './serviceWorker';
import store from './store';

import './assets/css/index.css';

const client = new ApolloClient({
  uri: 'https://graphql.gccollab.ca/graphqlcore',
});

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <ConnectedAndLocalizedApp />
    </ApolloProvider>
  </Provider>,
  document.getElementById('root') // eslint-disable-line comma-dangle
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
