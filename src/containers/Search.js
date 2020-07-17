/* eslint-disable */
import React from "react";
import gql from 'graphql-tag';
import { Query, withApollo } from 'react-apollo';
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import ProfileSearch from "../components/core/ProfileSearch"
import { Container, Row, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Col, Form, FormGroup, Input, Label, Pagination, PaginationItem, PaginationLink } from 'reactstrap';

// A simple component that shows the pathname of the current location
class search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResult: [],
      currentPage: 1,
      todosPerPage: 6,
      order:'',
      filters:{org:[],team:[]}
      
    };
    this.handleAlphabetClick = this.handleAlphabetClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.next_save = this.next_save.bind(this);
    this.onChangeFilters = this.onChangeFilters.bind(this);
    this.filterssearch = this.filterssearch.bind(this);
    
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

  render() {
    const { currentPage, todosPerPage } = this.state;
    let results, renderPageNumbers, pageNumbers = [];
    var filters = this.state.filters
    var filtersOrg = filters.org
    var filtersTeam = filters.team
    var filtersListOrgs, filtersListTeams = ''
    
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

          let teamsList = [];
          let orgsList = [];

          checkResult.search.forEach(el => {
            teamsList[el.team.nameEn] = (teamsList[el.team.nameEn] || 0) + 1;
            orgsList[el.team.organization.nameEn] = (orgsList[el.team.organization.nameEn] || 0) + 1;            
          })


        filtersListTeams = Object.keys(teamsList).map((team, number) => (
          <li className="" key={number}>
           <FormGroup>
        <Label>
          <Input type="checkbox" checked={this.state.filters.team.includes(team)} value={team} name='team' onChange={(e) =>this.onChangeFilters('team', e)}/>
          {team}: {teamsList[team]}
        </Label>
      </FormGroup>
          </li>
      ))

      filtersListOrgs = Object.keys(orgsList).map((org, number) => (
        <li className="" key={number}>
                   <FormGroup check>
        <Label check>
          <Input type="checkbox" checked={this.state.filters.org.includes(org)}  name="org" value={org} onChange={(e) =>this.onChangeFilters('org', e)}/>
          {org}: {orgsList[org]}
        </Label>
      </FormGroup>
        </li>
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
              <Col xs="2" sm="2">
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
              <Col xs="10" sm="10">
                <ul>{results}</ul>
              </Col>
              <Col xs="2" sm="2" className='filter-section'>
              
              <ul>{filtersListTeams}</ul>
              <ul>{filtersListOrgs}</ul>
                <h5>Filter</h5>
                <Form>
                  <FormGroup>
                    <Label check>
                      <Input type="checkbox" /> Internal
                    </Label>
                  </FormGroup>
                  <FormGroup>
                    <Label check>
                      <Input type="checkbox" /> External
                    </Label>
                  </FormGroup>
                  <FormGroup>
                    <Label check>
                      <Input type="checkbox" /> Department name
                    </Label>
                  </FormGroup>
                </Form>
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
