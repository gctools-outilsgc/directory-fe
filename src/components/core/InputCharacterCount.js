import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Input } from 'reactstrap';

import styled from 'styled-components';

const InputContainer = styled.div`
div {
  text-align: right;
}
`;

/** Display a text input box with a character count and maximum */
const InputCharacterCount = (props) => {
  const [value, setValue] = useState(props.value);
  const {
    placeholder,
    onChange,
    id,
    maxLength,
    showCounter,
  } = props;
  return (
    <InputContainer>
      <Input
        placeholder={placeholder}
        id={id}
        type="textarea"
        value={value}
        maxLength={maxLength}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e);
        }}
      />
      {(showCounter &&
      <div>
        {value.length} / {maxLength}
      </div>
      )}
    </InputContainer>
  );
};

InputCharacterCount.defaultProps = {
  maxLength: 255,
  showCounter: true,
  placeholder: undefined,
  onChange: () => {},
  id: undefined,
  value: '',
};

InputCharacterCount.propTypes = {
  /** Maximum length of text box */
  maxLength: PropTypes.number,
  /** Show the character counter or not */
  showCounter: PropTypes.bool,
  /** Text to use as input's placeholder */
  placeholder: PropTypes.string,
  /** Fired when text changes */
  onChange: PropTypes.func,
  /** Id to use for input */
  id: PropTypes.string,
  /** Existing value of the input for edit */
  value: PropTypes.string,
};

export default InputCharacterCount;
