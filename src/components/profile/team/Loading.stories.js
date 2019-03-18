import React from 'react';

import { storiesOf } from '@storybook/react';

import Loading from './Loading';

storiesOf('components/profile/team/Loading', module)
  .addParameters({
    info: { header: true, inline: true, source: false },
  })
  .add('With default options', () => <Loading />);

