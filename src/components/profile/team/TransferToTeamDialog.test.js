/* eslint-disable no-console */
import React from 'react';

import { render, cleanup, waitForElement, wait } from 'react-testing-library';

import { MockedProvider } from 'react-apollo/test-utils';

import I18nTransferToTeamDialog from './TransferToTeamDialog';

import mocks from './TransferToTeamDialog.stories';

const [
  { request: { variables: { gcID: supervisor } } },
  {
    request: { variables: { gcID: user } },
    result: { data: { profiles: [{ avatar }] } },
  },
] = mocks;


describe('TransferToTeamDialog', () => {
  const err = console.error;
  beforeAll(() => {
    console.error = () => {};
  });
  afterAll(() => {
    console.error = err;
  });
  afterEach(cleanup);
  it('displays all teams returned by query', async () => {
    const { queryByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <I18nTransferToTeamDialog
          isOpen
          user={user}
          supervisor={supervisor}
        />
      </MockedProvider>
      , { container: document.body }
    );
    await waitForElement(() => queryByText('External Communications Team'));
    await waitForElement(() => queryByText('Outreach team'));
    await waitForElement(() => queryByText('en_CA: Default Team'));
  });
  it('displays the user\'s name, title and avatar', async () => {
    const { queryByText, container, getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <I18nTransferToTeamDialog
          isOpen
          user={user}
          supervisor={supervisor}
        />
      </MockedProvider>
      , { container: document.body }
    );
    await wait(() => {
      expect(getByText('Al Geer')).toBeInstanceOf(HTMLElement);
    });
    await waitForElement(() => queryByText('Al Geer'));
    await waitForElement(() => queryByText('Job Title Here'));
    const img = container.querySelector('img');
    expect(img.src).toBe(`${window.location.href}${avatar}`);
  });
  it('doesn\'t render when isOpen is not set', async () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <I18nTransferToTeamDialog
          user={user}
          supervisor={supervisor}
        />
      </MockedProvider>
      , { container: document.body }
    );
    expect(container.firstChild).toBeNull();
  });
});

export default mocks;
