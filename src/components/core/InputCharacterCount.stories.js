import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import InputCharacterCount from './InputCharacterCount';

storiesOf('components/core/InputCharacterCount', module)
  .addParameters({
    info: { header: true, inline: true, source: false },
  })
  .add('With default options', () => <InputCharacterCount />)
  .add(
    'with placeholder',
    () => <InputCharacterCount placeholder="test placeholder" />
  )
  .add(
    'with maxLength',
    () => <InputCharacterCount maxLength={5} />
  )
  .add(
    'with showCounter=false',
    () => <InputCharacterCount showCounter={false} />
  )
  .add(
    'with showCounter=true',
    () => <InputCharacterCount showCounter />
  )
  .add(
    'with id',
    () => <InputCharacterCount id="custom_id" />
  )
  .add(
    'with onChange',
    () => (
      <InputCharacterCount
        onChange={e => action(e.target.value)()}
      />
    )
  );

