import React from 'react';
import PropTypes from 'prop-types';

import { Input } from 'reactstrap';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import LocalizedComponent
  from '@gctools-components/react-i18n-translation-webpack';


class TeamPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newTeamVal: props.selectedOrgTier,
    };
    this.handleTeamChange = this.handleTeamChange.bind(this);
  }

  handleTeamChange(e, teams) {
    const teamObj = teams.find(team => team.id === e.target.value);
    this.props.onTeamChange(teamObj);
    this.setState({
      newTeamVal: teamObj.id,
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
          query organizationQuery($gcID: ID!) {
            profiles(gcID: $gcID) {
              gcID
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
          ownerOfTeams
            .forEach(tier =>
              tierOptions.push({
                key: `orgtier-${tier.id}`,
                nameEn: tier.nameEn,
                nameFr: tier.nameFr,
                value: tier.id,
                data: tier,
              }));

          return (
            <div>
              <label htmlFor="teamPicker" className="font-weight-bold">
                {__('Choose a Team')}
              </label>
              <Input
                id="teamPicker"
                type="select"
                onChange={evt => this.handleTeamChange(evt, ownerOfTeams)}
                disabled={!supervisor || loading}
                value={(this.state.newTeamVal) ? this.state.newTeamVal.id : ''}
              >
                {tierOptions.map(x => (
                  <option key={x.value} value={x.value}>
                    {(localizer.lang === 'en_CA') ? x.nameEn : x.nameFr}
                  </option>
              ))}
              </Input>
            </div>
          );
        }}
          </Query>
        ) : (
          <div>{__('Please pick a supervisor')}</div>
        )}
      </div>
    );
  }
}

TeamPicker.propTypes = {
  selectedOrgTier: PropTypes.shape({
    id: PropTypes.string.isRequired,
    organization: PropTypes.shape({
      id: PropTypes.string.isRequired,
      nameEn: PropTypes.string,
      nameFr: PropTypes.string,
    }),
    owner: PropTypes.shape({
      gcID: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string,
      titleEn: PropTypes.string,
      titleFr: PropTypes.string,
    }),
  }).isRequired,
  onTeamChange: PropTypes.func.isRequired,
  supervisor: PropTypes.shape({}).isRequired,
};

export default LocalizedComponent(TeamPicker);
