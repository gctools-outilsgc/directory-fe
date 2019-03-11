import React from 'react';
import { render, cleanup } from 'react-testing-library';

import { MockedProvider } from 'react-apollo/test-utils';

import { EditProfile } from './EditProfile';

afterEach(cleanup);

const mockProps = {
  gcID: '1',
  name: 'Test Name',
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
  team: {
    organization: {
      id: '',
      nameEn: '',
      nameFr: '',
    },
  },
  supervisor: {
    gcID: '',
    name: '',
    titleEn: '',
    titleFr: '',
  },
};

describe('EditProfile', () => {
  it('renders the component', () => {
    const { queryByText } = render(
    <MockedProvider mocks={[]}>
      <EditProfile profile={mockProps} />
    </MockedProvider>
    );
    const editText = queryByText('Edit Profile');
    expect(editText.innerHTML).toBe('Edit Profile');
  });
});
