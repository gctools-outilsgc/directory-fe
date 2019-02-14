import React from 'react';

import { render, cleanup, waitForElement } from 'react-testing-library';

import { MockedProvider } from 'react-apollo/test-utils';

import { GQLTeamCard, TEAM_INFO_QUERY } from './GQLTeamCard';

const mock = [
  {
    request: {
      query: TEAM_INFO_QUERY,
      variables: {
        gcID: (String(1)),
      },
    },
    result: {
      data: {
        profiles: [{
          name: 'Test Name',
          gcID: '1',
          Employees: [],
          supervisor: {
            gcID: '2',
            name: 'Test Supervisor',
            titleEn: 'Boss',
            titleFr: '',
          },
          org: {
            id: '3',
            nameEn: 'Test Team',
            nameFr: 'Test Team FR',
            organization: {
              id: '1',
              nameEn: 'Treasury Board Secretariat',
              nameFr: 'Secretariat du Conseil du Treso',
              acronymEn: 'TBS',
              acronymFr: 'SCT',
            },
          },
          OwnerOfOrgTier: [],
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
