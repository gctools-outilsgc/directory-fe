import React from 'react';

// import { Button } from 'reactstrap';
/* eslint react/prop-types: 0 */

const OnboardNav = (props) => {
  const dots = [];
  const words = [
    '',
    'personal info',
    'personal',
    'contact',
    'avatar',
    'team',
  ];
  for (let i = 1; i <= props.totalSteps; i += 1) {
    const isActive = props.currentStep === i;
    const displayNum = i - 1;
    switch (i) {
      case 1:
      case 6:
        dots.push('');
        break;
      default:
        dots.push((
          <li
            key={`step-${i}`}
            className={`${isActive ? 'active' : ''}`}
          >
            <div>
              <div>
                {displayNum}
              </div>
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

export default OnboardNav;
