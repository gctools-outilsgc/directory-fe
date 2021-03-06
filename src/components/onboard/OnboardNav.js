import React from 'react';

import LocalizedComponent
  from '@gctools-components/react-i18n-translation-webpack';
// import { Button } from 'reactstrap';
/* eslint react/prop-types: 0 */

const OnboardNav = (props) => {
  const dots = [];
  const words = [
    '',
    __('personnal_info'),
    __('step1'),
    __('step2'),
    __('step3'),
    __('step4'),
  ];
  for (let i = 1; i <= props.totalSteps; i += 1) {
    const isActive = props.currentStep === i;
    let isComplete = '';
    if (i < props.currentStep) {
      isComplete = 'complete';
    }
    switch (i) {
      case 1:
      case 6:
        dots.push('');
        break;
      default:
        dots.push((
          <li
            key={`step-${i}`}
            className={`${isActive ? 'active' : isComplete}`}
          >
            <div>
              <div>
                {words[i]}
              </div>
            </div>
          </li>
        ));
    }
  }

  return (
    <div aria-label="progress" className="step-indicator">
      <ul className="steps">
        {dots}
      </ul>
    </div>
  );
};

export default LocalizedComponent(OnboardNav);
