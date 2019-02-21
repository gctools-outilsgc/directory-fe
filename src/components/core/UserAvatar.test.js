import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import { MockedProvider } from 'react-apollo/test-utils';

import { UserAvatar } from './UserAvatar';
import { EDIT } from '../../gql/profile';

const mockProps = {
  edit: true,
  gcID: '2',
  name: 'First Last',
  avatar: '',
  myGcID: '2',
};

const mockProvider = [
  {
    request: {
      query: EDIT,
      variables: {
        gcID: mockProps.gcID,
        data: {},
      },
    },
    result: {
      data: {},
    },
  },
];

describe('UserAvatar', () => {
  it('renders the component', () => {
    const component =
      render(<MockedProvider><UserAvatar {...mockProps} /></MockedProvider>);
    expect(component).toBeTruthy();
  });
  it('renders the component', () => {
    const { getByText } =
      render((
        <MockedProvider mocks={mockProvider}>
          <UserAvatar {...mockProps} />
        </MockedProvider>
      ));
    fireEvent.click(getByText(/Upload/));
  });
});
