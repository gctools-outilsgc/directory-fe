import React from 'react';

import { render, cleanup, waitForElement } from 'react-testing-library';

import { MockedProvider } from 'react-apollo/test-utils';

import GQLYourTeamsTab from './GQLYourTeamsTab';
import { GET_YOUR_TEAM } from '../../../gql/profile';


const mock = [
  {
    request: {
      query: GET_YOUR_TEAM,
      variables: {
        gcID: '1',
      },
    },
    result: {
      data: {
        profiles: [{
          gcID: '1',
          team: {
            id: '32324',
            organization: {
              id: '1213232',
            },
          },
          ownerOfTeams: [{
            id: '10',
            nameEn: 'Example Team',
            nameFr: 'Teams Team FR',
            descriptionEn: 'Test Description',
            descriptionFr: 'Test Descript FR',
            members: [{
              gcID: '2',
              name: 'Team Member',
              avatar: '',
              titleEn: '',
              titleFr: '',
            }],
            organization: {
              id: '123',
              nameEn: 'Org Name',
              nameFr: 'Org Name FR',
            },
          }],
        }],
      },
    },
  },
];

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

  it('renders with data', async () => {
    const { queryByText } = render((
      <MockedProvider mocks={mock} addTypename={false}>
        <GQLYourTeamsTab id="1" />
      </MockedProvider>
    ));
    await waitForElement(() => queryByText('Test Description'));
  });
});
