import React from 'react';
import { render, cleanup, waitForElement } from 'react-testing-library';

import { MockedProvider } from 'react-apollo/test-utils';

import { GQLProfileCard } from './GQLProfileCard';
import { GET } from '../../../gql/profile';

const mock = [
  {
    request: {
      query: GET,
      variables: {
        gcID: (String(1)),
      },
    },
    result: {
      data: {
        profiles: [{
          __typename: 'Profile',
          gcID: '1',
          name: 'Test Name',
          email: 'test@test.test',
          avatar: '',
          mobilePhone: '',
          officePhone: '',
          team: {
            __typename: 'Team',
            id: '',
            organization: {
              __typename: 'Organization',
              id: '',
              nameEn: '',
              nameFr: '',
            },
            owner: {
              __typename: 'Profile',
              gcID: '',
              name: '',
              avatar: '',
              titleEn: '',
              titleFr: '',
            },
          },
          address: {
            __typename: 'Address',
            id: '',
            streetAddress: '',
            city: '',
            province: '',
            postalCode: '',
            country: '',
          },
          titleEn: '',
          titleFr: '',
        }],
      },
    },
  },
];

afterEach(cleanup);

describe('GQLProfileCard', () => {
  it('renders GQLProfileCard loading state without crashing', () => {
    const { queryByText } = render((
      <MockedProvider mocks={[]}>
        <GQLProfileCard />
      </MockedProvider>
    ));
    const loadingText = queryByText('Loading ...');
    expect(loadingText.innerHTML).toBe('Loading ...');
  });

  it('should render a profile card with data', async () => {
    const { queryByText } = render((
      <MockedProvider mocks={mock}>
        <GQLProfileCard id="1" />
      </MockedProvider>
    ));
    await waitForElement(() => queryByText('test@test.test'));
  });
});
