import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import LocalizedCreateTeamDialog from './CreateTeamDialog';

storiesOf('CreateTeam', module)
  .addParameters({
    info: { header: true, inline: true, source: false },
  })
  .add(
    'with defaults',
    () => (
      <LocalizedCreateTeamDialog />
    )
  )
  .add(
    'isOpen',
    () => <LocalizedCreateTeamDialog isOpen />
  )
  .add(
    'onSave',
    () => (
      <LocalizedCreateTeamDialog
        isOpen
        onSave={action('save')}
      />
    )
  )
  .add(
    'onCancel',
    () => (
      <LocalizedCreateTeamDialog
        isOpen
        onCancel={action('cancel')}
      />
    )
  );
