import React from 'react';
import PropTypes from 'prop-types';

import { Mutation } from 'react-apollo';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';

import { EDIT } from '../../gql/profile';

const mapStateToProps = ({ user }) => {
  const props = {};
  if (user) {
    props.accessToken = user.access_token;
    props.myGcID = user.profile.sub;
  }
  return props;
};

export const UserAvatar = (props) => {
  const {
    myGcID,
    accessToken,
    edit,
    name,
    avatar,
    gcID,
  } = props;
  const canEdit = (accessToken !== '') && edit && (gcID === myGcID);

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
            {(uploadAvatar, { data }) => (
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
                      }).then((result) => {
                        console.log(result);
                        console.log(data);
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
  accessToken: '',
  myGcID: '',
  avatar: 'https://avatars0.githubusercontent.com/u/7603237?s=460&v=4',
};

UserAvatar.propTypes = {
  edit: PropTypes.bool,
  gcID: PropTypes.string,
  name: PropTypes.string,
  avatar: PropTypes.string,
  accessToken: PropTypes.string,
  myGcID: PropTypes.string,
};

export default connect(mapStateToProps)(UserAvatar);

