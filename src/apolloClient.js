import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';

const cache = new InMemoryCache({
  dataIdFromObject: object => object.__typename +
    (object.gcID || object.id || null),
});

const client = new ApolloClient({
  link: createUploadLink({
    uri: 'https://paas.beta.gccollab.ca/graphql',
  }),
  cache,
});

export default client;
