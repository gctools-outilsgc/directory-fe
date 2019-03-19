import React from 'react';
import PropTypes from 'prop-types';

import { Query } from 'react-apollo';

import { connect } from 'react-redux';

import StepWizard from 'react-step-wizard';
import LocalizedOnboardNav from './OnboardNav';
import LocalizedOnboardStep1 from './OnboardStep1';
import LocalizedOnboardStep2 from './OnboardStep2';
import LocalizedOnboardStep3 from './OnboardStep3';
import LocalizedOnboardStep4 from './OnboardStep4';
import LocalizedOnboardStep5 from './OnboardStep5';
import LocalizedOnboardStep6 from './OnboardStep6';

import { GET } from '../../gql/profile';

const mapStateToProps = ({ user }) => {
  const props = {};
  if (user) {
    props.accessToken = user.access_token;
    props.myGcID = user.profile.sub;
  }
  return props;
};

const customTransitions = {
  enterRight: 'fadeIn animated',
  enterLeft: 'fadeIn animated',
  exitRight: 'fadeIn animated',
  exitLeft: 'fadeIn animated',
};

export const OnboardMod = (props) => {
  const {
    myGcID,
    accessToken,
  } = props;
  const canSkip = !myGcID;

  return (
    <Query
      variables={{ gcID: (String(myGcID)) }}
      skip={canSkip}
      query={GET}
    >
      {({ loading, error, data }) => {
        if (loading) return 'loading ...';
        if (error) return `Error!: ${error}`;
        const userInfo = (!data) ? '' : data.profiles[0];
        return (
          <div>
            {canSkip ? (
              "I can't find your logged in ID :("
            ) : (
              <StepWizard
                transitions={customTransitions}
                nav={<LocalizedOnboardNav />}
              >
                <LocalizedOnboardStep1 />
                <LocalizedOnboardStep2
                  userObject={userInfo}
                  token={accessToken}
                />
                <LocalizedOnboardStep3
                  userObject={userInfo}
                  token={accessToken}
                />
                <LocalizedOnboardStep4
                  userObject={userInfo}
                />
                <LocalizedOnboardStep5
                  userObject={userInfo}
                  token={accessToken}
                />
                <LocalizedOnboardStep6
                  forwardID={myGcID}
                />
              </StepWizard>
            )}
          </div>
        );
      }}
    </Query>
  );
};

OnboardMod.defaultProps = {
  myGcID: undefined,
  accessToken: undefined,
};

OnboardMod.propTypes = {
  myGcID: PropTypes.string,
  accessToken: PropTypes.string,
};

export default connect(mapStateToProps)(OnboardMod);
