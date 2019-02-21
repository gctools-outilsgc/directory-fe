import React from 'react';
import { render } from 'react-testing-library';
import { MockedProvider } from 'react-apollo/test-utils';

import { UserAvatar } from './UserAvatar';

const mockProps = {
  edit: true,
  gcID: '2',
  name: 'First Last',
  avatar: '',
  myGcID: '2',
};

describe('UserAvatar', () => {
  it('renders the component', () => {
    const component =
      render(<MockedProvider><UserAvatar {...mockProps} /></MockedProvider>);
    expect(component).toBeTruthy();
  });
});
