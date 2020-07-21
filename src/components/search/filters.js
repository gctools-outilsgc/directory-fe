import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Input, Label, Badge, Button } from 'reactstrap';

// A simple component that shows the pathname of the current location
class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: { org: [], team: [] },
      limitTeams: 5,
      limitOrgs: 5,
    };
    this.sendDate = this.sendDate.bind(this);
    this.onChangeFilters = this.onChangeFilters.bind(this);
    this.filterssearch = this.filterssearch.bind(this);
    this.onLoadMore = this.onLoadMore.bind(this);
    this.onLoadLess = this.onLoadLess.bind(this);
    this.renderLoadButton = this.renderLoadButton.bind(this);
  }

  onChangeFilters(type, e) {
    const filtersArray = this.state.filters;
    let filtered = '';
    if (type === 'org') {
      if (filtersArray.org.includes(e.target.value)) {
        filtered = filtersArray.org.filter(value => value !== e.target.value);
        filtersArray.org = filtered;
        this.setState({ filters: filtersArray });
      } else {
        filtersArray.org.push(e.target.value);
        this.setState({ filters: filtersArray });
      }
    } else if (filtersArray.team.includes(e.target.value)) {
      filtered = filtersArray.team.filter(value => value !== e.target.value);
      filtersArray.team = filtered;
      this.setState({ filters: filtersArray });
    } else {
      filtersArray.team.push(e.target.value);
      this.setState({ filters: filtersArray });
    }
    this.sendDate();
  }

  onLoadMore(type) {
    if (type === 'team') {
      this.setState({
        limitTeams: this.state.limitTeams + 5,
      });
    } else {
      this.setState({
        limitOrgs: this.state.limitOrgs + 5,
      });
    }
  }

  onLoadLess(type) {
    if (type === 'team') {
      this.setState({
        limitTeams: 5,
      });
    } else {
      this.setState({
        limitOrgs: 5,
      });
    }
  }

  filterssearch(search) {
    const { filters } = this.state.filters;
    const filtersOrg = filters.org;
    const filtersTeam = filters.team;
    const searchResult = search.filter((profiles) => {
      if (Object.keys(filtersOrg).length > 0 &&
        Object.keys(filtersTeam).length > 0) {
        return profiles.team.organization.nameEn === filtersOrg &&
        profiles.team.nameEn === filtersTeam;
      } else if (Object.keys(filtersOrg).length === 0 &&
      Object.keys(filtersTeam).length > 0) {
        return profiles.team.nameEn === filtersTeam;
      } else if (Object.keys(filtersTeam).length === 0 &&
      Object.keys(filtersOrg).length > 0) {
        return profiles.team.organization.nameEn === filtersOrg;
      }
      return '';
    });
    return searchResult;
  }

  sendDate() {
    this.props.parentCallback(this.state.filters);
  }

  renderLoadButton(List, type) {
    const limit = type === 'org' ?
      this.state.limitOrgs : this.state.limitTeams;

    if (Object.keys(List).length <= 5) {
      return '';
    } else if (limit >= Object.keys(List).length) {
      return (
        <Button
          onClick={() => { this.onLoadLess(type); }}
          color="link"
        >
          Load Less
        </Button>);
    }
    return (
      <Button
        onClick={() => { this.onLoadMore(type); }}
        color="link"
      >
        Load more
      </Button>);
  }
  render() {
    let filtersListOrgs = '';
    let filtersListTeams = '';
    const teamsList = [];
    const orgsList = [];

    this.props.resultSearch.forEach((el) => {
      teamsList[el.team.nameEn] = (teamsList[el.team.nameEn] || 0) + 1;
      orgsList[el.team.organization.nameEn] =
      (orgsList[el.team.organization.nameEn] || 0) + 1;
    });

    // eslint-disable-next-line
    filtersListTeams = Object.keys(teamsList).slice(0,this.state.limitTeams).map(
      team => (
        <Label className="label-filters" check>
          <Input
            type="checkbox"
            className="filterCheckbox"
            checked={this.state.filters.team.includes(team)}
            value={team}
            name="team"
            onChange={e => this.onChangeFilters('team', e)}
          />
          {team}
          <Badge className="badges-filters" pill>
            {teamsList[team]}
          </Badge>
        </Label>
      ));

    // eslint-disable-next-line
    filtersListOrgs = Object.keys(orgsList).slice(0,this.state.limitOrgs).map(
      org => (
        <Label className="label-filters" check>
          <Input
            type="checkbox"
            className="filterCheckbox"
            checked={this.state.filters.org.includes(org)}
            name="org"
            value={org}
            onChange={e => this.onChangeFilters('org', e)}
          />
          {org}
          <Badge className="badges-filters" pill>
            {orgsList[org]}
          </Badge>
        </Label>
      ));

    return (
      <div className="filter-section">
        <h5>Filter</h5>
        <FormGroup>
          <Label for="exampleCheckbox">Organization</Label>
          <div>
            {filtersListOrgs}
            {this.renderLoadButton(orgsList, 'org')}
          </div>
        </FormGroup>
        <FormGroup>
          <Label for="exampleCheckbox">Team</Label>
          <div>
            {filtersListTeams}
            {this.renderLoadButton(teamsList, 'team')}
          </div>
        </FormGroup>
      </div>
    );
  }
}

Filters.propTypes = {
  parentCallback: PropTypes.func,
  resultSearch: PropTypes.shape,
};

Filters.defaultProps = {
  parentCallback: () => {},
  resultSearch: [],
};

export default Filters;
