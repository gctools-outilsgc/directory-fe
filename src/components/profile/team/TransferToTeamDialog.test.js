import React from 'react';

import { render, cleanup, waitForElement } from 'react-testing-library';

import { MockedProvider } from 'react-apollo/test-utils';

import I18nTransferToTeamDialog from './TransferToTeamDialog';

import mocks from './TransferToTeamDialog.stories';

const [
  { request: { variables: { gcID: supervisor } } },
  { request: { variables: { gcID: user } } },
] = mocks;


describe('TransferToTeamDialog', () => {
  it('renders without error', (done) => {
    const err = console.error;
    console.error = () => {};
    const { queryByText, unmount, container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <I18nTransferToTeamDialog user={user} supervisor={supervisor} />
      </MockedProvider>
      , { container: document.body }
    );
    setTimeout(() => {
      unmount();
      console.error = err;
      expect(true).toBe(false);
      done();
    }, 0);
  });
});

export default mocks;
