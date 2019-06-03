import React from 'react';
import PropTypes from 'prop-types';

import LocalizedComponent
  from '@gctools-components/react-i18n-translation-webpack';

import { Jumbotron, Row, Col } from 'reactstrap';
import ProfileSearch from '../core/ProfileSearch';

import bannerLeft from '../../assets/imgs/home/directory_banner_left.png';
import bannerRight from '../../assets/imgs/home/directory_banner_right.png';

const ProductJumbo = (props) => {
  const {
    appName,
    appDescription,
  } = props;
  const style = {
    jumbo: {
      padding: '0',
      marginBottom: '0px',
      backgroundColor: '#DFEBEF',
    },
    bannerImg: {
      width: '100%',
      height: '300px',
      objectFit: 'cover',
    },
  };
  return (
    <Jumbotron fluid style={style.jumbo}>
      <Row className="m-0">
        <Col className=".d-none .d-sm-block p-0">
          <img
            alt=""
            src={bannerLeft}
            style={style.bannerImg}
          />
        </Col>
        <Col className="text-center pt-5 pb-5">
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
        <Col className=".d-none .d-sm-block p-0">
          <img
            alt=""
            src={bannerRight}
            style={style.bannerImg}
          />
        </Col>
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
