/* eslint-disable */
import React from "react";
import gql from 'graphql-tag';
import { Query, withApollo } from 'react-apollo';
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import ProfileSearch from "../components/core/ProfileSearch"
import { Container, Row, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Col, Form, FormGroup, Input, Label, Pagination, PaginationItem, PaginationLink, Badge, CustomInput, Button } from 'reactstrap';

// A simple component that shows the pathname of the current location
class search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResult: [],
      currentPage: 1,
      todosPerPage: 6,
      order:'',
      filters:{org:[],team:[]},
      limitTeams:5,
      limitOrgs:5
      
    };
    this.handleAlphabetClick = this.handleAlphabetClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.next_save = this.next_save.bind(this);
    this.onChangeFilters = this.onChangeFilters.bind(this);
    this.filterssearch = this.filterssearch.bind(this);
    this.onLoadMore = this.onLoadMore.bind(this); 
    this.onLoadLess = this.onLoadLess.bind(this);
    this.renderLoadButton = this.renderLoadButton.bind(this);       
  }

  componentDidMount() {
    const { match, location, history } = this.props;
    this.setState({ searchResult: location.state ? location.state.detail:'' });
 }

 componentWillReceiveProps(nextProps){
  const { match, location, history } = this.props;
  if(nextProps.location.state){
    this.setState({ searchResult: nextProps.location.state.detail });
   }
}

 sortDescAndRender(event) {
    let searchArr = Object.values(event);
    searchArr.sort(function(a, b) {
      var textA = a.name.toUpperCase();
      var textB = b.name.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
    return searchArr;
  }

  sortAscAndRender(event) {
    let searchArr = Object.values(event);
    searchArr.sort(function(a, b) {
      var textA = a.name.toUpperCase();
      var textB = b.name.toUpperCase();
      return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
    });
    return searchArr;
  }

  next_save(prev_next, pageNumbers) {
    if(prev_next >= 1 && prev_next <= pageNumbers[pageNumbers.length-1]){
      this.setState({
        currentPage: Number(prev_next)
      });
    }
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  handleAlphabetClick(e){
    this.setState({order:e.target.value});
  }

  onChangeFilters(type,e){
    var filtersArray = this.state.filters
    if(type =='org'){
      if(filtersArray.org.includes(e.target.value)){
        var filtered = filtersArray.org.filter(function(value, index, arr){ return value !== e.target.value;});
        filtersArray.org = filtered
        this.setState({filters:filtersArray});
      }else{
        filtersArray.org.push(e.target.value)
        this.setState({filters:filtersArray})
      }
    }else{
      if(filtersArray.team.includes(e.target.value)){
        var filtered = filtersArray.team.filter(function(value, index, arr){ return value !== e.target.value;});
        filtersArray.team = filtered
        this.setState({ filters: filtersArray });  
      }else{
        filtersArray.team.push(e.target.value)
        this.setState({filters:filtersArray})
      }
    }
  }

  filterssearch(search){
    var filters = this.state.filters
    var filtersOrg = filters.org
    var filtersTeam = filters.team
    var searchResult = search.filter(function(profiles) {
      if(Object.keys(filtersOrg).length >0 && Object.keys(filtersTeam).length >0 ){
        return profiles.team.organization.nameEn == filtersOrg && profiles.team.nameEn == filtersTeam;
      }else if(Object.keys(filtersOrg).length == 0 && Object.keys(filtersTeam).length >0){ 
        return profiles.team.nameEn == filtersTeam;       
      }else if(Object.keys(filtersTeam).length ==0 && Object.keys(filtersOrg).length >0){      
        return profiles.team.organization.nameEn == filtersOrg;       
      }else{
        return search
      }
    });

    return searchResult
  }

  onLoadMore(type) {
    if (type == 'team'){
      this.setState({
        limitTeams: this.state.limitTeams + 5
      });
    }else{
      this.setState({
        limitOrgs: this.state.limitOrgs + 5
      });
    }
  }

  onLoadLess(type) {
    if (type == 'team'){
      this.setState({
        limitTeams: 5
      });
    }else{
      this.setState({
        limitOrgs: 5
      });
    }
  }

  renderLoadButton(List, type) {
  var limit = type == 'org' ? this.state.limitOrgs : this.state.limitTeams
  
    if(Object.keys(List).length <= 5){
     return ''
    }else if(limit >= Object.keys(List).length){
       return <Button onClick={() =>{this.onLoadLess(type)}} color="link">Load Less</Button>
    }else{
      return <Button onClick={() =>{this.onLoadMore(type)}} color="link">Load more</Button>
    }
  }

  render() {
    const { currentPage, todosPerPage } = this.state;
    let results, renderPageNumbers, pageNumbers = [];
    var filters = this.state.filters
    var filtersOrg = filters.org
    var filtersTeam = filters.team
    var filtersListOrgs, filtersListTeams = ''
    let teamsList = [];
    let orgsList = [];
    
    return (
      <Query 
        query={gql`
          query profileSearchQuery($name: String!, $number: Int) {
            search(partialName: $name, number: $number) {
              gcID
              name
              avatar
              email
              mobilePhone
              officePhone
              address{id streetAddress city }
              team{id nameEn nameFr organization{id nameEn nameFr}}
            }          }`}
        skip={this.state.skip}
        variables={{
          name: this.state.searchResult,
          number: 100,
        }}
      >
      
      {({ loading, error, data }) => {
        const checkResult = (!data) ? [''] : data;
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        if (loading)
        return <div>Fetching</div>
        if (error)
        return <div>Error</div>

        if( Object.keys(checkResult).length >0) {
          if(Object.keys(filtersOrg).length >0 || Object.keys(filtersTeam).length >0 ){
            checkResult.search = this.filterssearch(checkResult.search)   
          }
          if(this.state.order == 'desc'){
            checkResult.search = this.sortDescAndRender(checkResult.search)
          }else if(this.state.order == 'asc'){
            checkResult.search = this.sortAscAndRender(checkResult.search)
          }
          const currentTodos = checkResult.search.slice(indexOfFirstTodo, indexOfLastTodo);
          results = currentTodos.map(a => ( 
            <ListGroupItem key={a.gcID}>
          <Row>
            <Col xs="auto">
              <a href={`/p/${a.gcID}`} >
                <img className="imgsearch" src={a.avatar} alt="Card image cap" />
              </a>
            </Col>
            <Col xs="auto">
              <Row>         
                <Col xs="auto">
                  <span className="profile-name"> {a.name}</span>
                </Col>
                <Col xs="auto">
                  <span className="search-email">{a.email}</span>
                </Col>
              </Row>
              <Row>
                <Col xs="auto">
                  <span className="font-weight-bold"> {__('Teams')} </span>{a.team.nameEn}
                </Col>
                <Col xs="auto">
                  <span className="font-weight-bold">{__('Organization')}: </span>{a.team.organization.nameEn}
                </Col>
              </Row>
              <Row>
                <Col xs="auto">
                  {a.mobilePhone !== null ? <div><span className="font-weight-bold">{__('Mobile')}: </span>{a.mobilePhone}</div>: ""}
                </Col>
                <Col xs="auto">
                  {a.officePhone !== null ? <div><span className="font-weight-bold">{__('Office')}: </span>{a.officePhone}</div> : ""}
                </Col>
              </Row>
              <Row>
                <div className="search-address">{a.address !== null ? <div><span className="font-weight-bold">{__('Address')}: </span>{a.address.streetAddress+ ', ' +a.address.city}</div> : ""}   </div>          
              </Row>  
            </Col>
          </Row>
        </ListGroupItem>
          ))
       
          const numberResults = Object.keys(checkResult.search).length;
          for (let i = 1; i <= Math.ceil(numberResults / todosPerPage); i++) {
            pageNumbers.push(i);
          }

          renderPageNumbers = pageNumbers.map(number => {
            return (
              <PaginationItem key={number} className={(this.state.currentPage === number ? 'active ' : '')}>
                <PaginationLink id={number} onClick={this.handleClick}>
                  {number}
                </PaginationLink>  
              </PaginationItem>
            );
          });



          checkResult.search.forEach(el => {
            teamsList[el.team.nameEn] = (teamsList[el.team.nameEn] || 0) + 1;
            orgsList[el.team.organization.nameEn] = (orgsList[el.team.organization.nameEn] || 0) + 1;            
          })


        filtersListTeams = Object.keys(teamsList).slice(0,this.state.limitTeams).map((team, number) => (
          <Label style={{margin: 1 + '%'}} check>       
            <Input type="checkbox" className="filterCheckbox" checked={this.state.filters.team.includes(team)} value={team} name='team' onChange={(e) =>this.onChangeFilters('team', e)}/>
            {team}<Badge style={{marginLeft: 5 + 'px'}}  pill>{teamsList[team]}</Badge>
          </Label>
        ))

      filtersListOrgs = Object.keys(orgsList).slice(0,this.state.limitOrgs).map((org, number) => (
        <Label style={{margin: 1 + '%'}} check>       
          <Input type="checkbox" className="filterCheckbox" checked={this.state.filters.org.includes(org)}  name="org" value={org} onChange={(e) =>this.onChangeFilters('org', e)}/>
          {org}<Badge style={{marginLeft: 5 + 'px'}} pill>{orgsList[org]}</Badge>
        </Label>
      ))
        }else{
          results =  __('No result found');
        } 
            
        const styleClasses = (!data)
          ? 'search-results-none' : 'list-unstyled search-results';

        return (
          <Container>
            <div className="search-bar">
              <ProfileSearch />
            </div>
            <Row>
              <Col xs="3" sm="2">
                <Form>
                  <FormGroup>
                    <Label for="sort">{__('Sort by')}</Label>
                    <Input type="select" onChange={(e) => this.handleAlphabetClick(e)} name="sort" id="sort">
                      <option>---</option>
                      <option value="desc">{__('Alphabetical')}</option>
                      <option value="asc">{__('Unalphabetical')}</option>                  
                    </Input>
                  </FormGroup>
                </Form>
              </Col> 
            </Row>
            <Row>
              <Col xs="9" sm="9">
                <ul>{results}</ul>
              </Col>
              <Col xs="3" sm="3">
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
              </Col>
            </Row>
            <Row>
              <Col xs="12" sm="10">
                <Pagination style={{display: 'flex', justifyContent: 'center'}} aria-label="Page navigation" id="page-numbers">
                  <PaginationItem>
                    <PaginationLink onClick={() =>{this.next_save(currentPage-1,pageNumbers)}} > {"<"} </PaginationLink>
                  </PaginationItem>
                  {renderPageNumbers}
                  <PaginationItem>
                    <PaginationLink onClick={() =>{this.next_save(currentPage+1,pageNumbers)}} >{">"} </PaginationLink>
                  </PaginationItem>
                </Pagination>
              </Col>
            </Row>
          </ Container>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(search);
