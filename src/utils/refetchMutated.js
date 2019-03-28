import client from '../apolloClient';

/**
 * Generic cache refetch function.
 * Looks for returned fields 'id' or 'gcID', then looks at previously executed
 * queries using the same parameters.  If found, those queries are refetched.
 *
 */

const extractIdentifiers = (data) => {
  let identifiers = [];
  Object.keys(data).forEach((k) => {
    if ((k === 'gcID') || (k === 'id')) {
      identifiers.push({ [k]: data[k] });
    }
    if (data[k] && typeof data[k] === 'object') {
      identifiers = identifiers.concat(extractIdentifiers(data[k]));
    }
  });
  return identifiers;
};

const refetchMutated = (_, b) => {
  const mods = extractIdentifiers(b);
  client.__operations_cache__.forEach((query) => {
    const vars = Object.keys(query.variables);
    if (mods.some(m => vars.some(v => query.variables[v] === m[v]))) {
      // If the data returned a previously queried ID, refetch it.
      client.query(Object.assign({}, query, { fetchPolicy: 'network-only' }));
    }
  });
};

export default refetchMutated;
