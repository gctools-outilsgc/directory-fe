import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { Card, CardBody } from 'reactstrap';

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
    <div className="d-flex justify-content-center">
      {myGcID && (
        <ul className="list-unstyled w-50">
          <li className="mb-3">
            <a href="/onboard" className="stretched-link">
              <Card>
                <CardBody>
                  Go To Onboarding
                </CardBody>
              </Card>
            </a>
          </li>
          <li>
            <a
              href={`/p/${myGcID}`}
              className="stretched-link"
            >
              <Card>
                <CardBody>
                  Visit your profile
                </CardBody>
              </Card>
            </a>
          </li>
        </ul>
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

export default connect(mapStateToProps)(CallToActionLinks);
