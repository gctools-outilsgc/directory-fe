import React from 'react';

import { storiesOf } from '@storybook/react';

import TeamAvatar from './TeamAvatar';

storiesOf('components/profile/team/TeamAvatar', module)
  .addParameters({
    info: { header: true, inline: true, source: false },
  })
  .add('Default Team', () => <TeamAvatar name="Default Team" />)
  .add('lower case', () => <TeamAvatar name="lower case" />)
  .add(
    'The very long team name',
    () => <TeamAvatar name="The very long team name" />
  )
  .add('Word', () => <TeamAvatar name="Word" />)
  .add('undefined', () => <TeamAvatar />)
  .add('Letter', () => <TeamAvatar name="L" />);

