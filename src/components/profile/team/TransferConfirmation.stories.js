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
    nameFr: 'Equipe: Plaidoyer d\'affaires mondiales',
  },
};

const user2 = {
  name: 'Clara MacKinnon',
  titleEn: 'Job Title Here',
  titleFr: 'Titre du poste ici',
  avatar: avatar2,
  team: {
    nameEn: 'Team: Global Affairs Advocacy',
    nameFr: 'Equipe: Plaidoyer d\'affaires mondiales',
  },
};

const user3 = {
  name: 'Mia Jarrel',
  avatar: avatar3,
  team: {
    nameEn: 'Team: Default',
    nameFr: 'Equipe: default',
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
  )
  .add(
    'using teams instead of profiles',
    () => (
      <TransferConfirmation
        isOpen
        source={user1.team}
        transferredUser={user2}
        destination={user3.team}
        primaryButtonText="Custom Primary"
        secondaryButtonText="Custom Secondary"
      />
    )
  )
  .add(
    'delete=true',
    () => (
      <TransferConfirmation
        isOpen
        source={user1.team}
        transferredUser={user2}
        destination={user3.team}
        delete
        primaryButtonText="Custom Primary"
        secondaryButtonText="Custom Secondary"
      />
    )
  );
