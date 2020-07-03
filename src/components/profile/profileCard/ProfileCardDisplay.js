import React from 'react';
import PropTypes from 'prop-types';
import LocalizedComponent
  from '@gctools-components/react-i18n-translation-webpack';

import { Row, Col } from 'reactstrap';

import { UserAvatar } from '../../core/UserAvatar';

export const ProfileCardDisplay = (props) => {
  const { user } = props;
  const { address: userAddress } = user;
  return (
    <Row className="mb-3">
      <Col xs="3" sm="2">
        <UserAvatar
          gcID={user.gcID}
          myGcID={user.gcID}
          avatar={user.avatar}
          size="lg"
        />
      </Col>
      <Col xs="9" sm="10">
        <div className="profile-name">
          {user.name ? user.name : ''}
        </div>
        {(localizer.lang === 'en_CA') ? (
          <div className="profile-title">
            {user.titleEn ? user.titleEn : ''}
          </div>
        ) : (
          <div className="profile-title">
            {user.titleFr ? user.titleFr : ''}
          </div>
        )}
        {(localizer.lang === 'en_CA') ? (
          <div className="profile-title">
            {user.team ?
            user.team.organization.nameEn : ''}
          </div>
        ) : (
          <div className="profile-title">
            {user.team ?
            user.team.organization.nameFr : ''}
          </div>
        )}
        <ul className="list-unstyled mt-3">
          <li className="mb-2">
            <div>
              <div className="font-weight-bold">{__('Email')}</div>
              <span className="list-desc-ph">
                {user.email ?
                  <a href={`mailto:${user.email}`}>{user.email}</a> : ''}
              </span>
            </div>
          </li>
          <li className="float-left mr-4">
            <div>
              <div className="font-weight-bold">{__('Work')}</div>
              <span className="list-desc-ph">
                {/* eslint-disable-next-line */}
                {user.officePhone ? <a href={`tel:${user.officePhone}`}>{user.officePhone}</a> : ''}
              </span>
            </div>
          </li>
          <li className="float-left mr-4">
            <div>
              <div className="font-weight-bold">{__('Mobile')}</div>
              <span className="list-desc-ph">
                {/* eslint-disable-next-line */}
                {user.mobilePhone ? <a href={`tel:${user.mobilePhone}`}>{user.mobilePhone}</a> : ''}
              </span>
            </div>
          </li>
          <li className="float-left">
            <div>
              <div className="font-weight-bold">{__('Address')}</div>
              <span className="list-desc-ph">
                <span className="mr-1">
                  {/* Create the googlemaps link with the address */}
                  {userAddress ?
                    <a href={`https://maps.google.com/?q=${userAddress.streetAddress}${userAddress.city}${userAddress.province}${userAddress.postalCode}${userAddress.country}`}> {/* eslint-disable-line */}
                      {userAddress.streetAddress+' '+userAddress.city+' '+userAddress.province+' '+userAddress.postalCode+' '+userAddress.country} {/* eslint-disable-line */}
                    </a> : ''
                  }
                </span>
              </span>
            </div>
          </li>
        </ul>
      </Col>
    </Row>
  );
};

ProfileCardDisplay.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    titleEn: PropTypes.string,
    email: PropTypes.string,
    officePhone: PropTypes.string,
    mobilePhone: PropTypes.string,
    address: PropTypes.shape({
      streetAddress: PropTypes.string,
      city: PropTypes.string,
      province: PropTypes.string,
      postalCode: PropTypes.string,
      country: PropTypes.string,
    }),
  }).isRequired,
};

export default LocalizedComponent(ProfileCardDisplay);
