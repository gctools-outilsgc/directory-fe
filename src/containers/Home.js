import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

const mapStateToProps = ({ user }) => {
  const props = {};
  if (user) {
    props.myGcID = user.profile.sub;
  }
  return props;
};

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
            <a href={`/p/${this.props.myGcID}`}>A Profile</a>
          </li>
        </ul>

      </div>
    );
  }
}

Home.propTypes = {
  myGcID: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Home);
