import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import MultiUserPicker from './MultiUserPicker';

import avatar1 from './fixtures/1.jpg';
import avatar2 from './fixtures/2.jpg';
import avatar3 from './fixtures/3.jpg';

const user1 = {
  gcID: '1',
  name: 'Mark Phillips',
  avatar: avatar1,
  title: 'Lawyer',
};

const user2 = {
  gcID: '2',
  name: 'Clara MacKinnon',
  avatar: avatar2,
  title: 'Analyst',
};

const user3 = {
  gcID: '3',
  name: 'Mia Jarrel',
  avatar: avatar3,
  title: 'Director',
};

storiesOf('components/core/MultiUserPicker', module)
  .addParameters({
    info: { header: true, inline: true, source: false },
  })
  .add(
    'isOpen=true',
    () => (
      <MultiUserPicker
        isOpen
        users={[user1, user2, user3]}
      />
    )
  )
  .add(
    'isOpen=false',
    () => (
      <MultiUserPicker
        isOpen={false}
        users={[user1, user2, user3]}
      />
    )
  )
  .add(
    'with click handlers',
    () => (
      <MultiUserPicker
        isOpen
        users={[user1, user2, user3]}
        primaryButtonClick={action('primary')}
        secondaryButtonClick={action('secondary')}
        closeButtonClick={action('close')}
      />
    )
  )
  .add(
    'with custom text',
    () => (
      <MultiUserPicker
        isOpen
        users={[user1, user2, user3]}
        title="Custom title"
        bodyText="Custom dialog body"
        primaryButtonText="Custom Primary"
        secondaryButtonText="Custom Secondary"
      />
    )
  );
