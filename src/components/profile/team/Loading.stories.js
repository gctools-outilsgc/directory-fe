import React from 'react';

import { storiesOf } from '@storybook/react';

import Loading from './Loading';

storiesOf('Loading', module)
  .addParameters({
    info: { header: true, inline: true, source: false },
  })
  .add('With default options', () => <Loading />);

