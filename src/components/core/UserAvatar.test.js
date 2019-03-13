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
        data: {
          avatar: 'http://test.com/avatar',
        },
      },
    },
    result: {
      data: {
        avatar: 'http://test.com/avatar',
      },
    },
  },
];

describe('UserAvatar', () => {
  it('renders the component', () => {
    const component =
      render(<MockedProvider><UserAvatar {...mockProps} /></MockedProvider>);
    expect(component).toBeTruthy();
  });
  it('uploading photo sets the photo', () => {
    const { getByText, asFragment } =
      render((
        <MockedProvider mocks={mockProvider}>
          <UserAvatar {...mockProps} />
        </MockedProvider>
      ));
    const firstRender = asFragment();
    fireEvent.click(getByText(/Upload/));
    expect(firstRender).toMatchSnapshot(asFragment());
  });
});
