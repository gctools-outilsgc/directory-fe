import React from 'react';
import { render } from 'react-testing-library'
import { App } from './App';

import { MockedProvider } from 'react-apollo/test-utils';


describe('App', () => {
  it('renders App without crashing', () => {
    const { queryByText } = render(
      <MockedProvider>
        <App />
      </MockedProvider>
    );
    const welcomeText = queryByText('Directory');
    expect(welcomeText.innerHTML).toBe('Directory');
  });
});

/*
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
*/