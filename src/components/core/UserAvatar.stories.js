import React from 'react';

import { storiesOf } from '@storybook/react';
import { MockedProvider } from 'react-apollo/test-utils';

import { UserAvatar } from './UserAvatar';

storiesOf('components/core/UserAvatar', module)
  .add('With default options', () => <UserAvatar />)
  .add('Not logged in not own profile', () => (
    <UserAvatar
      myGcID="2"
      gcID="1"
    />
  ))
  .add('Authenticated User with no avatar and no editing', () => (
    <UserAvatar
      myGcID="2"
      gcID="2"
    />
  ))
  .add('Authenticated User with avatar and editing', () => (
    <MockedProvider>
      <UserAvatar
        myGcID="2"
        gcID="2"
        avatar="https://avatars0.githubusercontent.com/u/7603237?s=460&v=4"
        edit
      />
    </MockedProvider>
  ))
  .add('Authenticated User with no avatar and editing', () => (
    <MockedProvider>
      <UserAvatar
        myGcID="2"
        gcID="2"
        edit
      />
    </MockedProvider>
  ));
