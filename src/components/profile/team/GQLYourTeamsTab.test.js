import React from 'react';

import { render, cleanup } from 'react-testing-library';

import { MockedProvider } from 'react-apollo/test-utils';

import GQLYourTeamsTab from './GQLYourTeamsTab';
// import { GET_YOUR_TEAM } from '../../../gql/profile';

/*
const mock = [
  {
    request: {
      query: GET_YOUR_TEAM,
      variables: {
        gcID: (String(1)),
      },
    },
    result: {
      data: {
        profiles: [{
          gcID: '1',
          ownerOfTeams: [{
            id: '10',
            nameEn: 'Test Team',
            nameFr: 'Teams Team FR',
          }],
      }],
      },
    },
  }
]
*/

afterEach(cleanup);

describe('GQLYourTeamsTab', () => {
  it('renders the loading state without crashing', () => {
    const { queryByText } = render((
      <MockedProvider mocks={[]}>
        <GQLYourTeamsTab id="1" />
      </MockedProvider>
    ));
    const loadingText = queryByText('Loading...');
    expect(loadingText.innerHTML).toBe('Loading...');
  });
});