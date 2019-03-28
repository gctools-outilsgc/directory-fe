import refetchMutation from './refetchMutated';
import client from '../apolloClient';

jest.mock('../apolloClient', () => ({
  __operations_cache__: [
    { variables: { gcID: '1' } },
    { variables: { id: '2' } },
    { variables: { gcID: '3' } },
    { variables: { id: '4' } },
    { variables: { other: 'test' } },
  ],
  query: jest.fn(),
}));

describe('refetchMutation', () => {
  it('executes refetch on modified data', () => {
    refetchMutation(null, { data: { testQuery: { gcID: '1' } } });
    expect(client.query).toBeCalledWith({ variables: { gcID: '1' } });
    client.query.mockClear();
    refetchMutation(null, { data: { testQuery: { gcID: '2' } } });
    expect(client.query).not.toBeCalled();
    refetchMutation(null, { data: { testQuery: { id: '2' } } });
    expect(client.query).toBeCalledWith({ variables: { id: '2' } });
    client.query.mockClear();
    refetchMutation(null, { data: { testQuery: { other: 'test' } } });
    expect(client.query).not.toBeCalled();
  });
});
