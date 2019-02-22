import React from 'react';
import PropTypes from 'prop-types';

import './css/MiniCard.css';

export default function MiniCard(props) {
  const cssPrefix = 'react-gc-orgchart-minichart-minicard';
  const classes = [
    `${cssPrefix}-card`,
  ];
  if (props.active) classes.push(`${cssPrefix}-active`);
  if (props.blurred) classes.push(`${cssPrefix}-blur`);
  const left = (props.position) ? props.position.x : 0;
  const top = (props.position) ? props.position.y : 0;
  return (
    <div
      className={classes.join(' ')}
      style={{
        position: 'absolute',
        left,
        top,
        width: `${props.width}px`,
        height: `${props.height}px`,
      }}
    />
  );
}

MiniCard.defaultProps = {
  // avatar: '',
  // avatarText: '',
  // name: '',
  // title: '',
  blurred: false,
  active: false,
  width: 10,
  height: 10,
  position: { },
};

MiniCard.propTypes = {
  // avatar: PropTypes.string,
  // avatarText: PropTypes.string,
  // name: PropTypes.string,
  // title: PropTypes.string,
  blurred: PropTypes.bool,
  active: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
};
