import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Mutation } from 'react-apollo';
import { Container, Card, CardBody } from 'reactstrap';
import { connect } from 'react-redux';

import fetchJsonp from 'fetch-jsonp';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { EDIT, prepareEditProfile } from '../gql/profile';

import ConnectedOnboardMod from '../components/onboard/GQLOnboard';

const mapSToP = ({ user }) => {
  const props = {};
  if (user) {
    props.accessToken = user.access_token;
    props.myGcID = user.profile.sub;
  }
  return props;
};

const Onboard = (props) => {
  const {
    accessToken,
    myGcID,
  } = props;
  const [loading, setLoading] = useState(true);
  const [mutationState, setMutationState] = useState(false);
  const [items, setItems] = useState([]);

  // Fetch example =
  // eslint-disable-next-line
  // https://gccollab.ca/services/api/rest/json/?method=get.profile.by.gcid&gcid=GCID

  // Fetch user's information from
  // eslint-disable-next-line
  const apiCall = `https://gccollab.ca/services/api/rest/jsonp/?method=get.profile.by.gcid&gcid=${myGcID}`
  useEffect(() => {
    // Set timeout to give users a chance
    // To see loading / information message
    setTimeout(() => {
      // Only fire if no items
      if (items.length < 1) {
        fetchJsonp(apiCall)
          .then((response => response.json()))
          .then((json) => {
            if (json.result) {
              // Create user object from result
              const userObject = {
                gcID: json.result.pleioID,
                titleEn: json.result.jobTitle || '',
                titleFr: json.result.jobTitleFr || '',
                officePhone: json.result.telephone || '',
                mobilePhone: json.result.mobile || '',
                streetAddress: json.result.streetAddress || '',
                city: json.result.city || '',
                province: json.result.province || '',
                postalCode: json.result.postalCode || '',
                country: json.result.country || '',
              };
              // set the items to the object
              setItems({
                gcID: userObject.gcID,
                titleEn: userObject.titleEn,
                titleFr: userObject.titleFr,
                officePhone: userObject.officePhone,
                mobilePhone: userObject.mobilePhone,
                streetAddress: userObject.streetAddress,
                city: userObject.city,
                province: userObject.province,
                postalCode: userObject.postalCode,
                country: userObject.country,
              });
              // If we have items fire the mutation
              setMutationState(true);
            } else {
              setTimeout(() => {
                setLoading(false);
              }, 2000);
            }
          }).catch((ex) => {
            console.log('parsing failed', ex);
            setLoading(false);
          });
      }
    }, 2000);
  }, [apiCall, items]);

  return (
    <Container className="mt-3">
      <Mutation
        mutation={EDIT}
        onCompleted={() => {
          setLoading(false);
          setMutationState(false);
        }}
        onError={(e) => {
          console.log(e);
          setMutationState(false);
        }}
        context={{
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        }}
      >
        {(modifyProfile, { mloading, merror, mdata }) => {
          if (mloading) return 'Loading populating data...';
          if (merror) return 'ERROR - also just continue';
          if (mutationState) {
            setTimeout(() => {
              modifyProfile(prepareEditProfile({
                gcID: items.gcID,
                titleEn: items.titleEn,
                titleFr: items.titleFr,
                officePhone: items.officePhone,
                mobilePhone: items.mobilePhone,
                streetAddress: items.streetAddress,
                city: items.city,
                province: items.province,
                postalCode: items.postalCode,
                country: items.country,
              }));
              setMutationState(false);
            }, 2500);
          }
          return (
            <div>
              {mdata}
            </div>
          );
        }}
      </Mutation>
      {loading ?
        <Card className="w-50 text-center mx-auto">
          <CardBody>
            <div className="h3 pt-3">
              {__('One moment')}
            </div>
            <div className="h4">
              {__('Grabbing profile data from GCcollab')}
            </div>
            <div className="mt-3 pb-3">
              <FontAwesomeIcon
                icon={faSpinner}
                size="3x"
                pulse
              />
            </div>
          </CardBody>
        </Card> :
        <div className="onboard-container m-auto">
          <ConnectedOnboardMod />
        </div>
      }
    </Container>
  );
};

Onboard.defaultProps = {
  accessToken: undefined,
  myGcID: undefined,
};

Onboard.propTypes = {
  accessToken: PropTypes.string,
  myGcID: PropTypes.string,
};

export default connect(mapSToP)(Onboard);
