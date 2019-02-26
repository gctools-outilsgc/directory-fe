import React from 'react';
import PropTypes from 'prop-types';
import LocalizedComponent
  from '@gctools-components/react-i18n-translation-webpack';

import { connect } from 'react-redux';
import { Query } from 'react-apollo';

import {
  Row,
  Col,
  Button
} from 'reactstrap';

import Loading from './Loading';

import { GET_TEAM } from '../../../gql/profile';

const mapStateToProps = ({ user }) => {
  const props = {};
  if (user) {
    props.accessToken = user.access_token;
    props.myGcID = user.profile.sub;
  }
  return props;
};

const style = {
  card: {
    width: '100%',
    padding: '10px 0 10px 0',
  },
};

export class GQLTeamCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  render() {
    const {
      id,
      accessToken,
      myGcID,
    } = this.props;
    const canEdit = (accessToken !== '') && (id === myGcID);
    return (
      <Query
        query={GET_TEAM}
        variables={{ gcID: (String(id)) }}
      >
        {({ loading, error, data }) => {
          if (loading) return <Loading />;
          if (error) return `Error!: ${error}`;
          const userInfo = (!data) ? '' : data.profiles[0];
          const supTest = (!userInfo) ? '' : userInfo.supervisor;
          const teamTest = (!userInfo) ? '' : userInfo.team;
          return (
            <div style={style.card}>
              {userInfo ? (
                <div>
                  <div>
                    <Row>
                      <Col>
                        <div className="font-weight-bold">
                          {__('Supervisor')}
                        </div>
                        <div>
                          {supTest ? supTest.name : 'None'}
                        </div>
                        <small className="text-muted">
                          {supTest ? supTest.titleEn : ''}
                        </small>
                        {canEdit ?
                          <Button
                            color="light"
                          >
                            Change supervisor
                          </Button>
                          : ''}
                      </Col>
                      <Col>
                        <div className="font-weight-bold">
                          {__('Team')}
                        </div>
                        {teamTest ? teamTest.nameEn : 'None'}
                      </Col>
                    </Row>
                  </div>
                </div>
              ) : (
                <div>{__('Cannot find GCID')}</div>
              )}
            </div>
          );
      }}
      </Query>
    );
  }
}

GQLTeamCard.defaultProps = {
  id: undefined,
  accessToken: undefined,
  myGcID: undefined,
};

GQLTeamCard.propTypes = {
  id: PropTypes.string,
  accessToken: PropTypes.string,
  myGcID: PropTypes.string,
};

export default connect(mapStateToProps)(LocalizedComponent(GQLTeamCard));
