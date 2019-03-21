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
          __typename: 'Profile',
          gcID: '1',
          name: 'supervisor name',
          avatar: '',
          titleEn: 'Manager',
          titleFr: 'Gestionnaire',
          team: {
            __typeName: 'Team',
            id: '32324',
            nameEn: 'team 32324',
            nameFr: 'equipe 32324',
            organization: {
              id: '1213232',
              __typename: 'Organization',
            },
          },
          ownerOfTeams: [{
            __typename: 'Team',
            id: 'default team',
            nameEn: '',
            nameFr: '',
            descriptionEn: 'Default team',
            descriptionFr: 'Default team',
            members: [{
              __typename: 'Profile',
              gcID: '3',
              name: 'default team member',
              avatar: '',
              titleEn: '',
              titleFr: '',
              team: {
                __typename: 'Team',
                id: 'default team',
                nameEn: '',
                nameFr: '',
                organization: {
                  id: '1213232',
                  __typename: 'Organization',
                },
              },
            }],
            organization: {
              id: '123',
              nameEn: 'Org Name',
              nameFr: 'Org Name FR',
              __typename: 'Organization',
            },
          }, {
            __typename: 'Team',
            id: '10',
            nameEn: 'Example Team',
            nameFr: 'Teams Team FR',
            descriptionEn: 'Test Description',
            descriptionFr: 'Test Descript FR',
            members: [{
              __typename: 'Profile',
              gcID: '2',
              name: 'Team Member',
              avatar: '',
              titleEn: '',
              titleFr: '',
              team: {
                __typename: 'Team',
                id: '32324',
                nameEn: 'team 32324',
                nameFr: 'equipe 32324',
                organization: {
                  id: '1213232',
                  __typename: 'Organization',
                },
              },
            }],
            organization: {
              id: '123',
              nameEn: 'Org Name',
              nameFr: 'Org Name FR',
              __typename: 'Organization',
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
