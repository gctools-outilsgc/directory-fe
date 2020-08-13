import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Mutation } from 'react-apollo';
import { Container, Button } from 'reactstrap';
import { connect } from 'react-redux';

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
    fakeProp,
    accessToken,
    myGcID,
  } = props;
  const [loading, setLoading] = useState(true);
  const [mutationState, setMutationState] = useState(false);
  // const [fetchError, setFetchError] = useState(null);
  // const [items, setItems] = useState([]);

  // Fetch example =
  // eslint-disable-next-line
  // https://gccollab.ca/services/api/rest/json/?method=get.profile.by.gcid&gcid=GCID

  useEffect(() => {
    // eslint-disable-next-line
    fetch(`https://gccollab.ca/services/api/rest/json/?method=get.profile.by.gcid&gcid=${myGcID}`)
      .then(res => res.json())
      .then(
        (result) => {
          // setItems(result.items);
          console.log(result);
          // Create user object from result
          /*
          const testObject = {
            gcID: myGcID,
            titleEn: result.jobTitle,
            titleFr: result.jobTitleFr,
            officePhone: result.telephone,
            mobilePhone: result.mobile,
            streetAddress: result.streetAddress,
            city: result.city,
            province: result.province,
            postalCode: result.postalCode,
            country: result.country,
          };
          */
          // Set a state to mutate
          // stop loading on mutation complete
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          // setFetchError(error);
          console.log(error);
          setLoading(false);
        }
      );
  }, []);

  /*
  if (fetchError) {
    return <div>Error: {fetchError.message}</div>;
  }
  */
  return (
    <Container className="mt-3">
      <Mutation
        mutation={EDIT}
        onCompleted={() => {
          setLoading(false);
        }}
        onError={(e) => {
          console.log(e);
        }}
        context={{
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        }}
      >
        {(modifyProfile, { mloading, merror, mdata }) => {
          if (mloading) return 'Loading...';
          if (merror) return 'ERROR';
          if (!mutationState) {
            setMutationState(true);
            setTimeout(() => {
              modifyProfile({
                variables: {
                  id,
                  data: {
                    // TODO,
                  },
                },
              });
            }, 2500);
          }
          <div>
            {mdata}
          </div>
        }}
      </Mutation>
      {loading ?
        <div>
          Loading -
          Populating data
          <Button
            onClick={() => (
              setLoading(false)
            )}
          >
            Set Loading {fakeProp}
          </Button>
          {accessToken}
          <div>{myGcID}</div>
        </div> :
        <div className="onboard-container m-auto">
          <ConnectedOnboardMod />
        </div>
      }
    </Container>
  );
};

Onboard.defaultProps = {
  fakeProp: 'FakeProp',
  accessToken: undefined,
  myGcID: undefined,
};

Onboard.propTypes = {
  fakeProp: PropTypes.string,
  accessToken: PropTypes.string,
  myGcID: PropTypes.string,
};

export default connect(mapSToP)(Onboard);
