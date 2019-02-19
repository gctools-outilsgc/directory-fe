import React from 'react';

import { render, cleanup, waitForElement } from 'react-testing-library';

import { MockedProvider } from 'react-apollo/test-utils';

import { GQLTeamCard } from './GQLTeamCard';
import { GET_TEAM } from '../../../gql/profile';

const mock = [
  {
    request: {
      query: GET_TEAM,
      variables: {
        gcID: (String(1)),
      },
    },
    result: {
      data: {
        profiles: [{
          gcID: '1',
          supervisor: {
            gcID: '2',
            name: 'Test Supervisor',
            titleEn: 'Boss',
            titleFr: '',
          },
          team: {
            nameEn: 'Test Team',
            nameFr: 'Test Team FR',
          },
        }],
      },
    },
  },
];

afterEach(cleanup);

describe('GQLTeamCard', () => {
  it('renders GQLTeamCard loading state without crashing', () => {
    const { queryByText } = render((
      <MockedProvider mocks={[]}>
        <GQLTeamCard />
      </MockedProvider>
    ));
    const loadingText = queryByText('Loading ...');
    expect(loadingText.innerHTML).toBe('Loading ...');
  });

  it('renders GQLTeamCard with data', async () => {
    const { queryByText } = render((
      <MockedProvider mocks={mock} addTypename={false}>
        <GQLTeamCard id="1" />
      </MockedProvider>
    ));
    await waitForElement(() => queryByText('Test Team'));
  });
});
