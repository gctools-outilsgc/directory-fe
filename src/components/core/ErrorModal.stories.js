import React from 'react';

import { storiesOf } from '@storybook/react';

import ErrorModal, { err } from './ErrorModal';

storiesOf('components/core/ErrorModal', module)
  .addParameters({
    info: {
      header: true,
      inline: true,
      source: false,
      text:
        `ErrorModal is a special self-dismissing modal that can be used to show
        errors to the user.  By passing an array containing an Error object and
        a date object, the modal can determine on its own if it should be
        displayed or not and handles its own dismissal state internally.
        A helper function can be imported to create generic errors.


        import { err } from './ErrorModal';

        <ErrorModal error={err('This is an error')} />
        `,
    },
  })
  .add('No error', () => (
    <ErrorModal />
  ))
  .add('with error', () => (
    <ErrorModal error={err('some error text')} isOpen />
  ))
  .add('custom title', () => (
    <ErrorModal title="custom title" error={err('some error text')} isOpen />
  ))
  .add('error text', () => (
    <ErrorModal error={err('some error text')} isOpen />
  ));
