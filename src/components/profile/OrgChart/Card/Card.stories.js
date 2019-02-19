import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Card from './Card';
import sampleOrgChart from '../fixtures/sample.json';

const { avatar } = sampleOrgChart;
// eslint-disable-next-line import/no-dynamic-require
const UserAvatar = require(`../fixtures/${avatar}`);

const user = {
  name: sampleOrgChart.name,
  avatar: UserAvatar,
  title: sampleOrgChart.title.en_CA,
};

storiesOf('OrgChart/Card Component', module)
  .add(
    'Only required options',
    () => (
      <div style={{ margin: '20px', height: '100px' }}>
        <Card
          buttonTitle={`Test ${user.name}'s profile button`}
          avatar={user.avatar}
          avatarText={user.name}
          name={user.name}
          title={user.title}
        />
      </div>
    ),
  )
  .add(
    'with click handlers',
    () => (
      <div style={{ margin: '20px', height: '100px' }}>
        <Card
          buttonTitle={`Test ${user.name}'s profile button`}
          avatar={user.avatar}
          avatarText={user.name}
          name={user.name}
          title={user.title}
          onButtonClick={action('button click')}
          onCardClick={action('card click')}
        />
      </div>
    ),
  )
  .add(
    'with a card click url',
    () => (
      <div style={{ margin: '20px', height: '100px' }}>
        <Card
          buttonTitle={`Test ${user.name}'s profile button`}
          avatar={user.avatar}
          avatarText={user.name}
          name={user.name}
          title={user.title}
          cardClickUrl="http://example.com"
          onCardClick={(e) => {
            e.preventDefault();
            action('card click')(e);
          }}
        />
      </div>
    ),
  )
  .add(
    'blurred',
    () => (
      <div style={{ margin: '20px', height: '100px' }}>
        <Card
          buttonTitle={`Test ${user.name}'s profile button`}
          avatar={user.avatar}
          avatarText={user.name}
          name={user.name}
          title={user.title}
          blurred
        />
      </div>
    ),
  )
  .add(
    'active',
    () => (
      <div style={{ margin: '20px', height: '100px' }}>
        <Card
          buttonTitle={`Test ${user.name}'s profile button`}
          avatar={user.avatar}
          avatarText={user.name}
          name={user.name}
          title={user.title}
          active
        />
      </div>
    ),
  )
  .add(
    'dragging',
    () => (
      <div style={{ margin: '20px', height: '100px' }}>
        <Card
          buttonTitle={`Test ${user.name}'s profile button`}
          avatar={user.avatar}
          avatarText={user.name}
          name={user.name}
          title={user.title}
          dragging
        />
      </div>
    ),
  )
  .add(
    'blurred and active',
    () => (
      <div style={{ margin: '20px', height: '100px' }}>
        <Card
          buttonTitle={`Test ${user.name}'s profile button`}
          avatar={user.avatar}
          avatarText={user.name}
          name={user.name}
          title={user.title}
          blurred
          active
        />
      </div>
    ),
  )
  .add(
    'blurred and dragging',
    () => (
      <div style={{ margin: '20px', height: '100px' }}>
        <Card
          buttonTitle={`Test ${user.name}'s profile button`}
          avatar={user.avatar}
          avatarText={user.name}
          name={user.name}
          title={user.title}
          blurred
          dragging
        />
      </div>
    ),
  )
  .add(
    'dragging and active',
    () => (
      <div style={{ margin: '20px', height: '100px' }}>
        <Card
          buttonTitle={`Test ${user.name}'s profile button`}
          avatar={user.avatar}
          avatarText={user.name}
          name={user.name}
          title={user.title}
          dragging
          active
        />
      </div>
    ),
  )
  .add(
    'blurred, active and dragging',
    () => (
      <div style={{ margin: '20px', height: '100px' }}>
        <Card
          buttonTitle={`Test ${user.name}'s profile button`}
          avatar={user.avatar}
          avatarText={user.name}
          name={user.name}
          title={user.title}
          blurred
          active
          dragging
        />
      </div>
    ),
  )
  .add(
    'at position x=150, y=220',
    () => (
      <div style={{ margin: '20px', height: '100px' }}>
        <Card
          buttonTitle={`Test ${user.name}'s profile button`}
          avatar={user.avatar}
          avatarText={user.name}
          name={user.name}
          title={user.title}
          position={{ x: 150, y: 220 }}
        />
      </div>
    ),
  );
