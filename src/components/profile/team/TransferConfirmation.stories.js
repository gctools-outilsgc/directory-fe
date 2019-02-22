import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import TransferConfirmation from './TransferConfirmation';

const user1 = {
  name: 'Mark Phillips',
  team: {
    name: 'Team: Global Affairs Advocacy',
    avatar: 'GA',
  },
};

const user2 = {
  name: 'Clara MacKinnon',
  team: {
    name: 'Team: Global Affairs Advocacy',
  },
};

const user3 = {
  name: 'Mia Jarrel',
  team: {
    name: 'Team: Default',
    avatar: 'DT',
  },
};

storiesOf('TransferConfirmation', module)
  .add(
    'isOpen=true',
    () => (
      <TransferConfirmation
        isOpen
        oldSupervisor={user1}
        transferredUser={user2}
        newSupervisor={user3}
      />
    ),
  )
  .add(
    'isOpen=false',
    () => (
      <TransferConfirmation
        isOpen={false}
        oldSupervisor={user1}
        transferredUser={user2}
        newSupervisor={user3}
      />
    ),
  )
  .add(
    'with click handlers',
    () => (
      <TransferConfirmation
        isOpen
        oldSupervisor={user1}
        transferredUser={user2}
        newSupervisor={user3}
        primaryButtonClick={action('primary')}
        secondaryButtonClick={action('secondary')}
        closeButtonClick={action('close')}
      />
    ),
  )
  .add(
    'with custom text',
    () => (
      <TransferConfirmation
        isOpen
        oldSupervisor={user1}
        transferredUser={user2}
        newSupervisor={user3}
        title="Custom title"
        bodyText="Custom dialog body"
        primaryButtonText="Custom Primary"
        secondaryButtonText="Custom Secondary"
      />
    ),
  )

// eslint-disable-next-line semi-style
;
