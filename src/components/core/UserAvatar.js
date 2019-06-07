import React from 'react';
import PropTypes from 'prop-types';
import LocalizedComponent
  from '@gctools-components/react-i18n-translation-webpack';
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
    size,
  } = props;
  const canEdit = edit && (gcID === myGcID);
  const avatar = profileAvatar || GenericAvatar;

  return (
    <div>
      <div className="query">
        <div className="d-flex justify-content-center">
          <img
            className={`avatar rounded-circle avatar-${size}`}
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
              <Button
                onClick={e => e.stopPropagation()}
              >
                <label htmlFor="avatarUploadTest" className="mb-0">
                  {__('Upload')}
                  <input
                    type="file"
                    id="avatarUploadTest"
                    style={{ display: 'none' }}
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
  size: '',
};

UserAvatar.propTypes = {
  edit: PropTypes.bool,
  gcID: PropTypes.string,
  name: PropTypes.string,
  avatar: PropTypes.string,
  myGcID: PropTypes.string,
  size: PropTypes.string,
};

export default LocalizedComponent(UserAvatar);
