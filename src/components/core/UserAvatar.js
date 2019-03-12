import React from 'react';
import PropTypes from 'prop-types';

import { Mutation } from 'react-apollo';
import { Button } from 'reactstrap';

import styled from 'styled-components';

import { EDIT } from '../../gql/profile';
import GenericAvatar from '../profile/OrgChart/Card/img/user.gif';


const UploadContainer = styled.div`
  text-align: center;
  margin-top: 10px;
`;

export const UserAvatar = (props) => {
  const {
    myGcID,
    edit,
    name,
    avatar: profileAvatar,
    gcID,
  } = props;
  const canEdit = edit && (gcID === myGcID);
  const avatar = profileAvatar || GenericAvatar;

  return (
    <div>
      <div className="query">
        <div>
          <img
            className="avatar avatar-lg rounded-circle"
            src={avatar}
            alt={name}
          />
        </div>
        {canEdit && (
        <UploadContainer className="mutate">
          <Mutation
            mutation={EDIT}
          >
            {uploadAvatar => (
              <Button>
                <label htmlFor="avatarUploadTest">
                  Upload
                  <input
                    type="file"
                    id="avatarUploadTest"
                    style={{ display: 'none' }}
                    required
                    onChange={({ target }) => {
                      uploadAvatar({
                        variables: {
                          gcID: myGcID,
                          data: {
                            avatar: target.files[0],
                          },
                        },
                      });
                    }}
                  />
                </label>
              </Button>
            )}
          </Mutation>
        </UploadContainer>
        )}
      </div>
    </div>
  );
};

UserAvatar.defaultProps = {
  edit: false,
  name: 'No photo',
  gcID: '',
  myGcID: '',
  avatar: '',
};

UserAvatar.propTypes = {
  edit: PropTypes.bool,
  gcID: PropTypes.string,
  name: PropTypes.string,
  avatar: PropTypes.string,
  myGcID: PropTypes.string,
};

export default UserAvatar;

