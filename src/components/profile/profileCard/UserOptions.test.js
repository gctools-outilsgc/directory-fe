import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { MockedProvider } from 'react-apollo/test-utils';

import UserOptions from './UserOptions';

afterEach(cleanup);

describe('UserOptions', () => {
  it('renders the UserOptions component', () => {
    const { queryByText } = render((
      <MockedProvider mocks={[]}>
        <UserOptions />
      </MockedProvider>
    ));
    const userOptionText = queryByText('Make this person your supervisor');
    expect(userOptionText.innerHTML).toBe('Make this person your supervisor');
  });
  /*
  TODO: Make pass
  it('should mutate the supervisor and say Confirm', async () => {
    const { queryByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <UserOptions />
      </MockedProvider>
    );
    fireEvent.click(queryByText("..."));
    fireEvent.click(queryByText("Make this person your supervisor"));
    await waitForElement(() => {queryByText('Confirm')});
  });
  */
});
