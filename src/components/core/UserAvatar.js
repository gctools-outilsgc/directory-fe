import React from 'react';
import PropTypes from 'prop-types';

import { Mutation } from 'react-apollo';
import { Button } from 'reactstrap';

import { EDIT } from '../../gql/profile';

export const UserAvatar = (props) => {
  const {
    myGcID,
    edit,
    name,
    avatar,
    gcID,
  } = props;
  const canEdit = edit && (gcID === myGcID);

  const avatarComp = (canEdit) ? (
    <div>
      <div className="query">
        {(() => {
          if (avatar) {
            return (
              <div>
                <img
                  src={avatar}
                  alt={name}
                />
              </div>
            );
          }
          return (
            <div>
              No AVATAR
            </div>
          );
          })()}

        <div className="mutate">
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
        </div>
      </div>
    </div>
  ) : (
    <div>{(() => {
      if (avatar) {
        return (
          <div>
            <img
              src={avatar}
              alt={name}
            />
          </div>
        );
      }
      return (
        <div>
          No AVATAR
        </div>
      );
      })()}
    </div>
  );
  return (
    <div>
      {avatarComp}
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

