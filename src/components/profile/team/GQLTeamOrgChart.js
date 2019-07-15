/* eslint-disable no-confusing-arrow */
import React from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';

import { connect } from 'react-redux';

import { Query } from 'react-apollo';

import styled from 'styled-components';

import OrgChart from '../OrgChart/OrgChart/OrgChart';
import { graphQLToNode, calculateOrgChart }
  from '../OrgChart/algorithm/nrc_orgchart_placement';

import LoadingOrg from './LoadingOrg';

import { ORGCHART } from '../../../gql/profile';


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
    this.setState({ selected: card.id });
  }
  navigateToProfile(card) {
    const { history } = this.props;
    if (card.id !== 'team') {
      history.push(`/p/${card.id}`);
      this.setState({ selected: card.id });
    }
  }
  moveToLoggedInUser() {
    this.setState({ selected: this.props.myGcID });
  }
  requireFullReload(data) {
    if (!data.profiles) return true;
    const { profiles: [profile] } = data;
    const { selected } = this.state;
    const { team } = profile;
    if (
      (profile.gcID === selected) ||
      (team && team.members &&
        team.members.reduce((p, c) => p + (c.gcID === selected) ? 1 : 0, 0) > 0
      ) ||
      (team && team.owner && team.owner.gcID === selected) ||
      (profile.ownerOfTeams
        .reduce((p, t) => p + t.members
          .reduce((mp, c) => mp + (c.gcID === selected) ? 1 : 0, 0), 0) > 0)
    ) return false;
    return true;
  }
  render() {
    const { selected } = this.state;
    return (
      <Query
        query={ORGCHART}
        variables={{
          gcID: selected,
        }}
      >
        {({ loading, error, data }) => {
          if (loading && this.requireFullReload(data)) return <LoadingOrg />;
          if (error) return `Error!: ${error}`;
          const { profiles: [profile] } = data;
          const {
            boxes: cards,
            lines,
            miniboxes: minicards,
            minilines,
          } = (profile) ? calculateOrgChart({
            root: graphQLToNode(profile),
            nodeA: { uuid: selected },
            leftGutter: 350,
          }) : {
            boxes: [], lines: [], miniboxes: [], minilines: [],
          };
          const selectedCard = cards.filter(c => c.id === selected)[0];
          const mSelectedCard = minicards.filter(c => c.id === selected)[0];
          return (
            <OrgChartLoading loading={loading}>
              <OrgChart
                ref={this.OrgChart}
                onCardClick={this.navigateToProfile}
                onButtonClick={this.changeSelectedCard}
                cards={cards}
                lines={lines}
                selectedCard={selectedCard && selectedCard.node}
                miniCards={minicards}
                miniLines={minilines}
                miniSelectedNode={mSelectedCard && mSelectedCard.node}
                style={{ height: '500px' }}
                onMoveToActiveClick={this.moveToLoggedInUser}
                hideMenuComponent
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
