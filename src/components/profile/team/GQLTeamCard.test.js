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
          __typename: 'Profile',
          gcID: '1',
          name: 'Test User',
          avatar: '',
          titleEn: '',
          titleFr: '',
          team: {
            __typename: 'Team',
            id: '10',
            nameEn: 'Test Team',
            nameFr: 'Test Team FR',
            organization: {
              __typename: 'Organization',
              id: '1',
              nameEn: 'Org Name EN',
              nameFr: 'Org Name FR',
            },
            owner: {
              __typename: 'Profile',
              gcID: '2',
              name: 'Test Supervisor',
              avatar: '',
              titleEn: 'Boss',
              titleFr: '',
            },
            members: [{
              __typename: 'Profile',
              name: '',
              titleEn: '',
              avatar: '',
            }],
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
      <MockedProvider mocks={mock}>
        <GQLTeamCard id="1" />
      </MockedProvider>
    ));
    await waitForElement(() => queryByText('Test Team'));
  });
});
