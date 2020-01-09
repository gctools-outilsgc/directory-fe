import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';
import oidcClient from './oidcConfig.dev';

const cache = new InMemoryCache({
  dataIdFromObject: (object) => {
    if (!(object.gcID || object.id)) {
      // eslint-disable-next-line no-console
      console.warn(
        `%cCannot identify key in object type "${object.__typename}".` +
        '  This can lead to unexpected behavior.' +
        '\n\n%cDid you remember to return gcID or id in your query?\n',
        'font-size: 2em;',
        'color: red'
      );
      return null;
    }
    return object.__typename + (object.gcID || object.id);
  },
});


const authToken = () => {
  // get the authentication token from redux store if it exists

  const sessionInfo = JSON.parse(sessionStorage
    .getItem(`oidc.user:${oidcClient.authority}:${oidcClient.client_id}`));

  const token = () => {
    if (sessionInfo) {
      return sessionInfo.access_token ?
        `Bearer ${sessionInfo.access_token}` : '';
    }
    return '';
  };
  return token();
};


const client = new ApolloClient({
  link: createUploadLink({
    uri: 'https://paas.beta.gccollab.ca/graphql',
    headers: {
      authorization: authToken(),
    },
  }),
  cache,
});

export default client;
