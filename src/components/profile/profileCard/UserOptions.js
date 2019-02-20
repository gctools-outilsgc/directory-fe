import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Mutation } from 'react-apollo';

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

import { EDIT } from '../../../gql/profile';

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
      loggedUser,
    } = this.props;

    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.ddtoggle}>
        <DropdownToggle
          color="light"
        >
          ...
        </DropdownToggle>
        <DropdownMenu right>
          <Mutation
            mutation={EDIT}
          >
            {modifyProfile => (
              <DropdownItem
                onClick={() => {
                  modifyProfile({
                    variables: {
                      gcID: String(loggedUser),
                      data: {
                        supervisor: {
                          gcID: id,
                        },
                      },
                    },
                  });
                }}
              >
                Make this person your supervisor {id}
              </DropdownItem>
            )}
          </Mutation>
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
  loggedUser: undefined,
};

UserOptions.propTypes = {
  id: PropTypes.string,
  loggedUser: PropTypes.string,
};
