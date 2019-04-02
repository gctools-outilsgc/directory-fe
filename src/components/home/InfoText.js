import React from 'react';
import PropTypes from 'prop-types';

import LocalizedComponent
  from '@gctools-components/react-i18n-translation-webpack';

const InfoText = (props) => {
  const { heading, body } = props;

  const pList = body.map(p => (
    <p key={p.text}>
      {p.text}
    </p>
  ));
  return (
    <div className="m-2 mb-4">
      <div className="text-center m-4">
        <h2>{heading}</h2>
      </div>
      <div className="d-flex justify-content-center">
        <div className="w-75">
          {pList}
        </div>
      </div>
    </div>
  );
};

InfoText.defaultProps = {
  heading: 'What is the OADW?',
  // eslint-disable-next-line max-len
  body: [
    { // eslint-disable-next-line max-len
      text: 'Caramels pie gummies pie tart sweet. Candy halvah toffee cake liquorice. Chocolate cake gummi bears jujubes donut marzipan soufflé liquorice chocolate cake gingerbread. Bear claw cheesecake ice cream icing. Sesame snaps toffee pie chocolate bar tart macaroon topping donut. Cotton candy jelly-o muffin.',
    },
  ],
};

InfoText.propTypes = {
  heading: PropTypes.string,
  body: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
  })),
};

export default LocalizedComponent(InfoText);
