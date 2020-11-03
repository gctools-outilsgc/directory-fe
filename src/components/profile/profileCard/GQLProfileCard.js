import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import LocalizedComponent
  from '@gctools-components/react-i18n-translation-webpack';

import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import { Card, CardBody, CardTitle } from 'reactstrap';

import LocalizedProfileCardDisplay from './ProfileCardDisplay';
import LocalizedEditProfile from './EditProfile';
import LocalizedGEDSAudit from './GEDSAudit';
import Loading from './Loading';
import GQLYourInfoApprovalStatus from './GQLYourInfoApprovalStatus';

import isGovEmail from '../../../utils/isGovEmail';
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

  useEffect(() => {
    const cookies = decodeURIComponent(document.cookie).split(';');
    cookies
      .filter(c => c.trim().indexOf('lang=') === 0)
      .forEach((c) => {
        const lang = c.split('=', 2)[1];
        if (localizer.hasLanguage(lang) && localizer.lang !== lang) {
          localizer.setLanguage(lang);
        }
      });
  });

  return (
    <Query
      query={GET}
      variables={{ gcID: (String(id)) }}
    >
      {({ loading, error, data }) => {
        if (loading) return <Loading />;
        if (error) return `Error!: ${error}`;
        const userInfo = (!data) ? '' : data.profiles[0];
        // Check for a valid GC email
        const canAudit = isGovEmail(userInfo.email);
        return (
          <Card style={style.card}>
            {userInfo ? (
              <div>
                <Helmet>
                  <title>{userInfo.name} - {__('Directory')}</title>
                </Helmet>
                <h1 className="sr-only">{userInfo.name}</h1>
                <CardBody>
                  <CardTitle className="profile-card-title d-flex">
                    <h2 className="mr-auto">{__('Profile')}</h2>
                    {canEdit ?
                      <div className="d-flex">
                        {
                          canAudit &&
                            <LocalizedGEDSAudit
                              profile={userInfo}
                              gcID={userInfo.gcID}
                              email={userInfo.email}
                            />
                        }
                        <LocalizedEditProfile
                          profile={userInfo}
                          token={accessToken}
                        />
                      </div> : ''}
                  </CardTitle>
                  {canEdit && (
                    <GQLYourInfoApprovalStatus
                      gcID={id}
                    />
                  )}
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
