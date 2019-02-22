import React from 'react';

import { storiesOf } from '@storybook/react';

import TransferConfirmation from './TransferConfirmation';

storiesOf('TransferConfirmation', module)
  .add(
    'With default options',
    () => (
      <TransferConfirmation />
    ),
  )
  .add(
    'isOpen=true',
    () => (
      <TransferConfirmation isOpen />
    ),
  )

// eslint-disable-next-line semi-style
;
