import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const colours = [
  undefined,
  ['137991', 'FFFFFF'],
  ['6DD2DA', '000000'],
  ['15A3A6', '000000'],
  ['92CC6F', '000000'],
  ['333000', 'FFFFFF'],
  ['26374A', 'FFFFFF'],
  ['AF3C43', 'FFFFFF'],
  ['4D5D6C', 'FFFFFF'],
  ['96A8B2', '000000'],
  ['FEC04F', '000000'],
  ['0D467D', 'FFFFFF'],
  ['FF9F40', '000000'],
  ['7E0C33', 'FFFFFF'],
  ['024571', 'FFFFFF'],
  ['C1D699', '000000'],
];

const chooseColor = (str) => {
  if (!str) return 1;
  const trimmed = str.trim();
  const sum =
    [...trimmed].map(c => c.charCodeAt(0)).reduce((a, s) => a + s, 0);
  let idx = 0;
  for (let i = colours.length - 1; i >= 0; i -= 1) {
    if (sum % i === 0) { idx = i; break; }
  }
  return idx;
};

const border = (idx) => {
  if (idx === colours.length - 1) return 1;
  return idx + 1;
};

const TeamAvatarStyle = styled.div`
  position: relative;
  border-radius: 5px;
  width: 40px;
  height: 40px;
  border: 2px solid #${({ colorIndex }) => colours[border(colorIndex)][0]};
  background-color: #${({ colorIndex }) => colours[colorIndex][0]};
  span {
    position: absolute;
    color: #${({ colorIndex }) => colours[colorIndex][1]};
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
  }
`;

/** Abreviate strings down to 2 letters */
const abbreviate = (str) => {
  if (!str) return 'N/A';
  const trimmed = str.trim();
  let li = trimmed.lastIndexOf(' ');
  if (li < 0) li = trimmed.length - 2;
  return (
    trimmed.substring(0, 1) +
    trimmed.substring(li + 1, li + 2)
  ).toUpperCase();
};

/** Temporary avatar until backend has proper support */
const TeamAvatar = props => (
  <TeamAvatarStyle colorIndex={chooseColor(props.name)}>
    <span>{abbreviate(props.name)}</span>
  </TeamAvatarStyle>
);

TeamAvatar.propTypes = {
  /** Name of team to generate temporary avatar for */
  name: PropTypes.string.isRequired,
};

export default TeamAvatar;
