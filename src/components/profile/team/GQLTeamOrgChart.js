/* eslint-disable no-confusing-arrow */
import React from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';

import { connect } from 'react-redux';

import { Query } from 'react-apollo';

import styled from 'styled-components';

import OrgChart from '../OrgChart/OrgChart/OrgChart';

import Loading from './Loading';

import { GET } from '../../../gql/orgchart';


const OrgChartLoading = styled.div`
  * {
    ${props => props.loading ? 'cursor: wait !important' : ''}
  }
`;

const mapStateToProps = ({ user }) => {
  const props = {};
  if (user) {
    props.accessToken = user.access_token;
    props.myGcID = user.profile.sub;
  }
  return props;
};

export class GQLTeamOrgChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.id,
    };
    this.centered = false;
    this.OrgChart = React.createRef();
    this.changeSelectedCard = this.changeSelectedCard.bind(this);
    this.navigateToProfile = this.navigateToProfile.bind(this);
    this.moveToLoggedInUser = this.moveToLoggedInUser.bind(this);
  }
  componentWillReceiveProps(next) {
    const { visible } = this.props;
    const { current } = this.OrgChart;
    if (next.visible && !visible && current && !this.centered) {
      current.center();
      this.centered = true;
    }
  }
  changeSelectedCard(card) {
    if (!card.node.root) {
      this.setState({ selected: card.id });
    }
  }
  navigateToProfile(card) {
    const { history } = this.props;
    history.push(`/p/${card.id}`);
  }
  moveToLoggedInUser(_, container) {
    if (this.profileCard) container.scrollToCard(this.profileCard.node);
  }
  render() {
    const { selected } = this.state;
    return (
      <Query
        query={GET}
        variables={{
          gcIDa: selected,
          gcIDb: this.props.myGcID,
          leftGutter: 310,
        }}
      >
        {({ loading, error, data }) => {
          if (loading && !data.orgchart) return <Loading />;
          if (error) return `Error!: ${error}`;
          const {
            orgchart: {
              boxes: cards,
              lines,
              miniboxes: minicards,
              minilines,
            },
          } = data;
          [this.profileCard] = cards.filter(c => c.id === this.props.myGcID);
          const selectedCard = cards.filter(c => c.id === selected)[0];
          const mSelectedCard = minicards.filter(c => c.id === selected)[0];
          return (
            <OrgChartLoading loading={loading}>
              <OrgChart
                ref={this.OrgChart}
                onCardClick={this.changeSelectedCard}
                onButtonClick={this.navigateToProfile}
                cards={cards}
                lines={lines}
                selectedCard={selectedCard && selectedCard.node}
                miniCards={minicards}
                miniLines={minilines}
                miniSelectedNode={mSelectedCard && mSelectedCard.node}
                style={{ height: '500px' }}
                onMoveToActiveClick={this.moveToLoggedInUser}
              />
            </OrgChartLoading>
          );
      }}
      </Query>
    );
  }
}

GQLTeamOrgChart.defaultProps = {
  id: undefined,
  myGcID: undefined,
};

GQLTeamOrgChart.propTypes = {
  id: PropTypes.string,
  history: ReactRouterPropTypes.history.isRequired,
  visible: PropTypes.bool.isRequired,
  myGcID: PropTypes.string,
};

export default connect(mapStateToProps)(withRouter(GQLTeamOrgChart));
