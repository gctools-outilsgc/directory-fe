import React, { Component } from 'react';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import { connect } from 'react-redux';

import StepWizard from 'react-step-wizard';
import OnboardNav from './OnboardNav';
import OnboardStep1 from './OnboardStep1';
import OnboardStep2 from './OnboardStep2';
import OnboardStep3 from './OnboardStep3';
//import OnboardStep4 from './OnboardStep4';
//import OnboardStep5 from './OnboardStep5';
//import OnboardStep6 from './OnboardStep6';

const PROFILE_INFO_QUERY = gql`
query profileInfoQuery($gcID: String!) {
  profiles(gcID: $gcID) {
    gcID
    name
    email
    avatar
    mobilePhone
    officePhone
    supervisor {
      gcID
      name
    }
    address {
      id
      streetAddress
      city
      province
      postalCode
      country
    }
    titleEn
    titleFr
    org {
      id
      nameEn
      nameFr
      organization {
        id
        nameEn
        nameFr
        acronymEn
        acronymFr
      }
    }
  }
}`;

const mapStateToProps = ({ user }) => {
    const props = {};
    if (user) {
        props.accessToken = user.access_token;
        props.myGcID = user.profile.sub;
        props.modifyProfile = user.profile.modify_profile === 'True';
    }
    return props;
};

class OnboardMod extends Component {
    render() {
        const {
            myGcID,
            accessToken,
        } = this.props;
        const customTransitions = {
            enterRight: 'fadeIn animated',
            enterLeft: 'fadeIn animated',
            exitRight: 'fadeIn animated',
            exitLeft: 'fadeIn animated',
        };
        return (
            <Query
                variables={{ gcID: (String(myGcID)) }}
                query={PROFILE_INFO_QUERY}
            >
                {({ loading, error, data }) => {
                    if (loading) return 'loading ...';
                    if (error) return `Error!: ${error}`;
                    const userInfo = data.profiles[0];
                    return (
                        <div>
                            <StepWizard
                                transitions={customTransitions}
                                nav={<OnboardNav />}
                            >
                                <OnboardStep1 />
                                <OnboardStep2
                                    userObject={userInfo}
                                    token={accessToken}
                                />
                                <OnboardStep3
                                    userObject={userInfo}
                                    token={accessToken}
                                />
                            </StepWizard>
                        </div>
                    );
                }}
            </Query>
        );
    }
}

export default connect(mapStateToProps)(OnboardMod);