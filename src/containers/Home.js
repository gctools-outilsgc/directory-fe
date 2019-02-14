import React, { Component } from 'react';

class Home extends Component {
  componentDidMount() {
    document.title = 'Home Page';
  }

  render() {
    return (
      <div>
        <h1>Welcome</h1>
        <ul>
          <li>
            <a href="/onboard">Onboard</a>
          </li>
          <li>
            <a href="/p/22">A Profile</a>
          </li>
        </ul>

      </div>
    );
  }
}

export default Home;
