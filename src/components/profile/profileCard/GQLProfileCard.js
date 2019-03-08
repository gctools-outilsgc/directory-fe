import React from 'react';
import PropTypes from 'prop-types';
import LocalizedComponent
  from '@gctools-components/react-i18n-translation-webpack';

import { Query } from 'react-apollo';
import { connect } from 'react-redux';

import { Card, CardBody, CardTitle } from 'reactstrap';

import LocalizedProfileCardDisplay from './ProfileCardDisplay';
import LocalizedEditProfile from './EditProfile';
import Loading from './Loading';

import { GET } from '../../../gql/profile';

const mapStateToProps = ({ user }) => {
  const props = {};
  if (user) {
    props.accessToken = user.access_token;
    props.myGcID = user.profile.sub;
  }
  return props;
};

const style = {
  card: {
    width: '100%',
    padding: '0 15px 10px 15px',
  },
};

export const GQLProfileCard = (props) => {
  const {
    id,
    accessToken,
    myGcID,
  } = props;

  const canEdit = (accessToken !== '') && (id === myGcID);

  return (
    <Query
      query={GET}
      variables={{ gcID: (String(id)) }}
    >
      {({ loading, error, data }) => {
        if (loading) return <Loading />;
        if (error) return `Error!: ${error}`;
        const userInfo = (!data) ? '' : data.profiles[0];
        return (
          <Card style={style.card}>
            {userInfo ? (
              <div>
                <CardBody>
                  <CardTitle className="profile-card-title d-flex">
                    <div className="mr-auto">{__('Profile')}</div>
                    {canEdit ?
                      <LocalizedEditProfile
                        profile={userInfo}
                        token={accessToken}
                      /> : ''}
                  </CardTitle>
                  <LocalizedProfileCardDisplay
                    user={userInfo}
                  />
                </CardBody>
              </div>
            ) : (<CardBody>{__('Cannot find GCID')}</CardBody>)}
          </Card>
        );
    }}
    </Query>
  );
};

GQLProfileCard.defaultProps = {
  id: undefined,
  accessToken: undefined,
  myGcID: undefined,
};

GQLProfileCard.propTypes = {
  id: PropTypes.string,
  accessToken: PropTypes.string,
  myGcID: PropTypes.string,
};

export default connect(mapStateToProps)(LocalizedComponent(GQLProfileCard));
