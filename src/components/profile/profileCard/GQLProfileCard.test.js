/*
This doesn't work

import React from 'react';
import { render } from 'react-testing-library'

import MockedProvider from 'react-apollo/test-utils';

import { profileInfoQuery, GQLProfileCard } from './GQLProfileCard'

const mocks = [
    {
        request: {
            query: profileInfoQuery,
            variables: {
                gcID: '1',
            },
        },
        result: {
            data: {
                profiles: {
                    gcID: '1',
                    name: 'Test',
                    email: 'test@test.test',
                    avatar: '',
                    mobilePhone: '',
                    officePhone: '',
                    address: {
                        id: '',
                        streetAddress: '',
                        city: '',
                        province: '',
                        postalCode: '',
                        country: '',
                    },
                    titleEn: '',
                    titleFr: '',
                },
            },
      },
    },
  ];

describe('GQLProfileCard', () => {
    it('renders GQLProfileCard without crashing', () => {
        const { queryByText } = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <GQLProfileCard id={"1"} />
            </MockedProvider>
        );
        const welcomeText = queryByText('Profile');
        expect(welcomeText.innerHTML).toBe('Profile');
    });
});
*/