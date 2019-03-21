import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import TransferConfirmation from './TransferConfirmation';

import avatar1 from './fixtures/1.jpg';
import avatar2 from './fixtures/2.jpg';
import avatar3 from './fixtures/3.jpg';

const user1 = {
  name: 'Mark Phillips',
  avatar: avatar1,
  team: {
    nameEn: 'Team: Global Affairs Advocacy',
    avatar: 'GA',
  },
};

const user2 = {
  name: 'Clara MacKinnon',
  avatar: avatar2,
  team: {
    nameEn: 'Team: Global Affairs Advocacy',
  },
};

const user3 = {
  name: 'Mia Jarrel',
  avatar: avatar3,
  team: {
    nameEn: 'Team: Default',
    avatar: 'DT',
  },
};

storiesOf('components/profile/team/TransferConfirmation', module)
  .addParameters({
    info: { header: true, inline: true, source: false },
  })
  .add(
    'isOpen=true',
    () => (
      <TransferConfirmation
        isOpen
        source={user1}
        transferredUser={user2}
        destination={user3}
      />
    )
  )
  .add(
    'isOpen=false',
    () => (
      <TransferConfirmation
        isOpen={false}
        source={user1}
        transferredUser={user2}
        destination={user3}
      />
    )
  )
  .add(
    'with click handlers',
    () => (
      <TransferConfirmation
        isOpen
        source={user1}
        transferredUser={user2}
        destination={user3}
        primaryButtonClick={action('primary')}
        secondaryButtonClick={action('secondary')}
        closeButtonClick={action('close')}
      />
    )
  )
  .add(
    'with custom text',
    () => (
      <TransferConfirmation
        isOpen
        source={user1}
        transferredUser={user2}
        destination={user3}
        title="Custom title"
        bodyText="Custom dialog body"
        primaryButtonText="Custom Primary"
        secondaryButtonText="Custom Secondary"
      />
    )
  );
