import React from 'react';

import { storiesOf } from '@storybook/react';

import LocalizedCreateTeam from './CreateTeam';

// TODO: refactor modal after merge with team tabs

storiesOf('CreateTeam', module)
  .addParameters({
    info: { header: true, inline: true, source: false },
  })
  .add(
    'with defaults',
    () => (
      <LocalizedCreateTeam />
    )
  );
