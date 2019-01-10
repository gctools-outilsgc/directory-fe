import React from 'react';
import { render } from 'react-testing-library'
import App from './App';

describe('App', () => {
  it('renders App without crashing', () => {
    const { queryByText } = render(<App />);
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