import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Query } from 'react-apollo';

import OrgChart from '../OrgChart/OrgChart/OrgChart';

import Loading from './Loading';

import { GET } from '../../../gql/orgchart';

const mapStateToProps = ({ user }) => {
  const props = {};
  if (user) {
    props.accessToken = user.access_token;
    props.myGcID = user.profile.sub;
  }
  return props;
};

const gcIDa = '2268'; // temporary

export class GQLTeamOrgChart extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }
  render() {
    const {
      id,
    } = this.props;

    return (
      <Query
        query={GET}
        variables={{ gcIDa, gcIDb: id }}
      >
        {({ loading, error, data }) => {
          if (loading) return <Loading />;
          if (error) return `Error!: ${error}`;
          const {
            orgchart: {
              boxes: cards,
              lines,
              miniboxes: minicards,
              minilines,
            },
          } = data;
          const activeCard = cards.filter(c => c.id === gcIDa)[0].node;
          const selectedCard = cards.filter(c => c.id === id)[0].node;
          const mSelectedCard = minicards.filter(c => c.id === id)[0].node;
          return (
            <OrgChart
              cards={cards}
              lines={lines}
              activeCard={activeCard}
              selectedCard={selectedCard}
              miniCards={minicards}
              miniLines={minilines}
              miniSelectedNode={mSelectedCard}
            />
          );
      }}
      </Query>
    );
  }
}

GQLTeamOrgChart.defaultProps = {
  id: undefined,
};

GQLTeamOrgChart.propTypes = {
  id: PropTypes.string,
};

export default connect(mapStateToProps)(GQLTeamOrgChart);
