import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';

import EditProfile from './EditProfile';

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
};

describe('EditProfile', () => {
  it('renders the component', () => {
    const { queryByText } = render(<EditProfile profile={mockProps} />);
    const editText = queryByText('Edit Profile');
    expect(editText.innerHTML).toBe('Edit Profile');
  });
});
