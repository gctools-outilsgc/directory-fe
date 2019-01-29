import React, { Component } from 'react';

import OnboardMod from '../components/onboard/GQLOnboard';

class Onboard extends Component {
    render() {
        return (
            <div className="onboard-container m-auto">
                <OnboardMod />
            </div>
        );
    }
}

export default Onboard;