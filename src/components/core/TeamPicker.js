import React from 'react';
import PropTypes from 'prop-types';

import { Input } from 'reactstrap';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';


class TeamPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newTeamVal: props.selectedOrgTier,
    };
    this.handleTeamChange = this.handleTeamChange.bind(this);
  }

  handleTeamChange(e) {
    const team = e.target.value;
    this.props.onTeamChange(team);
    this.setState({
      newTeamVal: team,
    });
  }

  render() {
    const {
      supervisor,
    } = this.props;
    return (
      <div>
        {supervisor ? (
          <Query
            variables={{
          gcID: (supervisor) ? String(supervisor.gcID) : null,
        }}
            skip={!supervisor}
            query={gql`
          query organizationQuery($gcID: String!) {
            profiles(gcID: $gcID) {
              ownerOfTeams {
                id
                nameEn
                nameFr
                organization {
                  id
                  nameEn
                  nameFr
                }
              }
            }
          }`}
          >
            {({
          loading,
          error,
          data,
        }) => {
          if (error) return `Error...${error.message}`;

          let ownerOfTeams =
            (data.profiles && data.profiles.length === 1) ?
              data.profiles[0].ownerOfTeams.slice(0) : [];

          if (data.profiles && data.profiles.length === 1
            && data.profiles[0].org) {
              ownerOfTeams = []
                .concat([data.profiles[0].org], ownerOfTeams);
          }

          const tierOptions = [];
          tierOptions.push({
            key: 'orgtier-undefined',
            text: '',
            value: null,
            data: null,
          });
          ownerOfTeams
            .forEach(tier =>
              tierOptions.push({
                key: `orgtier-${tier.id}`,
                text: tier.nameEn, // Localize later
                value: tier.id,
                data: tier,
              }));

          return (
            <div>
              <Input
                type="select"
                onChange={this.handleTeamChange}
                disabled={!supervisor || loading}
                value={(this.state.newTeamVal) ? this.state.newTeamVal.id : ''}
              >
                {tierOptions.map(x => (
                  <option key={x.value} value={x.value}>{x.text}</option>
              ))}
              </Input>
            </div>
          );
        }}
          </Query>
        ) : (
          <div>Please pick a supervisor</div>
        )}
      </div>
    );
  }
}

TeamPicker.propTypes = {
  selectedOrgTier: PropTypes.number.isRequired,
  onTeamChange: PropTypes.func.isRequired,
  supervisor: PropTypes.shape({}).isRequired,
};

export default TeamPicker;
