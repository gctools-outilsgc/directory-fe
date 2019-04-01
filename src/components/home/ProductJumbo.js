import React from 'react';
import PropTypes from 'prop-types';

import LocalizedComponent
  from '@gctools-components/react-i18n-translation-webpack';

import { Jumbotron, Row, Col } from 'reactstrap';
import ProfileSearch from '../core/ProfileSearch';

const ProductJumbo = (props) => {
  const {
    appName,
    appDescription,
  } = props;
  const style = {
    padding: '6rem 2rem',
  };
  return (
    <Jumbotron fluid style={style}>
      <Row>
        <Col />
        <Col className="text-center">
          <div>
            <h1>{appName}</h1>
          </div>
          <p>
            {appDescription}
          </p>
          <div>
            <ProfileSearch />
          </div>
        </Col>
        <Col />
      </Row>
    </Jumbotron>
  );
};

ProductJumbo.defaultProps = {
  appName: 'Open Accessible Digital Workspace',
  // eslint-disable-next-line max-len
  appDescription: 'Ice cream candy canes candy canes jelly beans jelly-o oat cake dragée. Wafer oat cake pastry marzipan. Tiramisu chupa chups lollipop croissant halvah bear claw jelly-o.',
};

ProductJumbo.propTypes = {
  appName: PropTypes.string,
  appDescription: PropTypes.string,
};

export default LocalizedComponent(ProductJumbo);
