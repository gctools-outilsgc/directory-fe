import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import LocalizedComponent
  from '@gctools-components/react-i18n-translation-webpack';

import { Row, Col, Card, CardBody } from 'reactstrap';

import fillOut from '../../assets/imgs/home/fill-out.png';
import takeToProfile from '../../assets/imgs/home/take-to-profile.png';

const mapStateToProps = ({ user }) => {
  const props = {};
  if (user) {
    props.myGcID = user.profile.sub;
  }
  return props;
};

const CallToActionLinks = (props) => {
  const {
    myGcID,
  } = props;

  return (
    <div>
      {myGcID && (
        <Row>
          <Col className="mb-2">
            <a href="/onboard" className="stretched-link">
              <Card>
                <CardBody className="d-flex align-items-center">
                  <img
                    src={fillOut}
                    alt=""
                    style={{ width: '140px', height: '140px' }}
                  />
                  <div className="mx-auto h5">
                    {__('Fill out your profile.')}
                  </div>
                </CardBody>
              </Card>
            </a>
          </Col>
          <Col className="mb-2">
            <a
              href={`/p/${myGcID}`}
              className="stretched-link"
            >
              <Card>
                <CardBody className="d-flex align-items-center">
                  <img
                    src={takeToProfile}
                    alt=""
                    style={{ width: '140px', height: '140px' }}
                  />
                  <div className="mx-auto h5">
                    {__('View your new profile')}
                  </div>
                </CardBody>
              </Card>
            </a>
          </Col>
        </Row>
      )}
    </div>
  );
};

CallToActionLinks.defaultProps = {
  myGcID: undefined,
};

CallToActionLinks.propTypes = {
  myGcID: PropTypes.string,
};

export default connect(mapStateToProps)(LocalizedComponent(CallToActionLinks));
