import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

class UserOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
    };

    this.ddtoggle = this.ddtoggle.bind(this);
  }

  ddtoggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  render() {
    const {
      id,
    } = this.props;

    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.ddtoggle}>
        <DropdownToggle
          color="light"
        >
          ...
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem
            onClick={this.toggle}
          >
            Make this person your supervisor {id}
          </DropdownItem>
          <DropdownItem>
            Placeholder Example
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default UserOptions;

UserOptions.defaultProps = {
  id: undefined,
};

UserOptions.propTypes = {
  id: PropTypes.string,
};
