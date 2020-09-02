/* eslint-disable */
import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Container, Row, ListGroupItem, Col, Form, FormGroup,
  Input, Label } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import ProfileSearch from '../components/core/ProfileSearch';
import Filters from "../components/search/filters"
import Paginations from "../components/search/Pagination"

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
    };
    this.handleAlphabetClick = this.handleAlphabetClick.bind(this);
    this.handleResultChange = this.handleResultChange.bind(this);
    this.filterssearch = this.filterssearch.bind(this);
    this.filtersCallback = this.filtersCallback.bind(this);
    this.paginationCallback = this.paginationCallback.bind(this);        
  }

  componentDidMount() {
    const { location } = this.props;
    // eslint-disable-next-line
    this.setState({
      searchResult: location.state ? location.state.detail : '',
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.state) {
      this.setState({ searchResult: nextProps.location.state.detail });
    }
  }

  sortDescAndRender(event) {
    const searchArr = Object.values(event);
    searchArr.sort(function(a, b) {
      const textA = a.name.toUpperCase();
      const textB = b.name.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
    return searchArr;
  }

  sortAscAndRender(event) {
    const searchArr = Object.values(event);
    searchArr.sort(function(a, b) {
      const textA = a.name.toUpperCase();
      const textB = b.name.toUpperCase();
      return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
    });
    return searchArr;
  }

  handleAlphabetClick(e){
    this.setState({order:e.target.value});
  }

  handleResultChange(e) {
    this.setState({todosPerPage: e.target.value});
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

    const updateCurrentPage = Math.ceil(Object.keys(searchResult).length/ this.state.todosPerPage);
    if(updateCurrentPage < this.state.currentPage){
        this.setState({currentPage:updateCurrentPage});
      }
    return searchResult
  }

  filtersCallback(childData) {
    this.setState({filters: childData})
  }
  paginationCallback(childData) {
    this.setState({currentPage: childData})
  }

  render() {
    const { currentPage, todosPerPage } = this.state;
    let results = [];
    var filters = this.state.filters
    var filtersOrg = filters.org
    var filtersTeam = filters.team
    let showingStart = '';
    let showingEnd = '';
    let numberResults = '';
    
    return (
      <Container>
      <div className="search-bar">
        <ProfileSearch />
      </div>
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
        return <Container><div class="d-flex justify-content-center"><FontAwesomeIcon icon={faSpinner} size="3x" spin/></div></Container>
        if (error) 
            if (error == "SearchError") {
              return <Container><div class="d-flex justify-content-center">{(localizer.lang === 'en_CA') ? "Oops, the search encountered a temporary error and could not complete your request. Please try again or contact our helpdesk." : "Oups, la fonction de recherche à rencontrer une erreur temporaire et ne peut completer la requête. S'il vous plaît, veuillez réessayer plus tard ou contacter notre bureau d'aide." }</div></Container>      
            } else {
              return <Container><div class="d-flex justify-content-center">{(localizer.lang === 'en_CA') ? "Oops, something went wrong. Please try again or contact our helpdesk." : "Oups, une erreur s'est produite. S'il vous plaît, veuillez réessayer plus tard ou contacter notre bureau d'aide." }</div></Container>
            }
        
        if( Object.keys(checkResult.search).length >0) {
        console.log('resulkt?')
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
                  <span className="search-email">
                    <a href={`mailto:${a.email}`}>{a.email}</a>
                  </span>
                </Col>
              </Row>
              <Row>
              <Col xs="12" md="6">
              <span className="font-weight-bold"> {__('Teams')} </span>
              {(localizer.lang === 'en_CA') ? (
                  a.team ?
                  a.team.nameEn : ''
              ) : (
                  a.team ?
                  a.team.nameFr : ''
              )}
            </Col>
            <Col xs="12" md="6">
              <span className="font-weight-bold">{__('Organization')}: </span>
              {(localizer.lang === 'en_CA') ? (
                  a.team ?
                  a.team.organization.nameEn : ''
              ) : (
                  a.team ?
                  a.team.organization.nameFr : ''
              )}
            </Col>
              </Row>
              <Row>
                <Col xs="auto">
                  {a.mobilePhone !== null ? <div><span className="font-weight-bold">{__('Mobile')}: </span><a href={`tel:${a.mobilePhone}`}>{a.mobilePhone}</a></div>: ""}
                </Col>
                <Col xs="auto">
                  {a.officePhone !== null ? <div><span className="font-weight-bold">{__('Office')}: </span><a href={`tel:${a.officePhone}`}>{a.officePhone}</a></div> : ""}
                </Col>
              </Row>
              <Row>
                <div className="search-address">{a.address !== null ? <div><span className="font-weight-bold">{__('Address')}: </span><a href={`https://maps.google.com/?q=${a.address.streetAddress}${a.address.city}`} target="_blank" rel="noopener noreferrer">{a.address.streetAddress+ ', ' +a.address.city}</a></div> : ""}   </div>          
              </Row>  
            </Col>
          </Row>
        </ListGroupItem>
          ))
       
          numberResults = Object.keys(checkResult.search).length;

          showingStart = currentPage * todosPerPage - todosPerPage +1;
          showingEnd = (currentPage * todosPerPage > numberResults ? numberResults : currentPage * todosPerPage);

        } else {
          results = <div className="noResult">{__('No result found')}</div>
        }

        const styleClasses = (!data)
          ? 'search-results-none' : 'list-unstyled search-results';

        return (
          <div>
            <Row style={{ position: 'relative' }}>
              <Col xs="4" sm="4" className="sort_align">
                <Form className="d-flex">
                  <FormGroup className="mr-2">
                    <Label for="sort">{__('Sort by')}</Label>
                    <Input type="select" onChange={(e) => this.handleAlphabetClick(e)} name="sort" id="sort">
                      <option>---</option>
                      <option value="desc">{__('Alphabetical')}</option>
                      <option value="asc">{__('Unalphabetical')}</option>                  
                    </Input>
                  </FormGroup>
                  <FormGroup>
                      <Label for="resultsPerPage">{__('Results per page')}</Label>
                      <Input type="select" onChange={(e) => this.handleResultChange(e)} name="resultsPerPage" id="resultsPerPage">
                        <option value="6">6</option>
                        <option value="12">12</option>
                        <option value="18">18</option>
                      </Input>
                    </FormGroup>
                </Form>
              </Col> 
              <Col xs={{ size: 4, offset: 4 }} sm={{ size: 4, offset: 4 }}>
                <div className="pr-3 showing_results">{__('Showing')} {showingStart} {__('to')} {showingEnd} {__('of')} {numberResults} {__('results')}</div>
              </Col>
            </Row>
            <Row>
              <Col xs="9" sm="9">
                <ul>{results}</ul>
              </Col>
              <Col xs="3" sm="3">  
              <Filters  resultSearch={ checkResult.search } updateFilters = {this.filtersCallback}/>
              </Col>
            </Row>
            <Row>
              <Col xs="12" sm="10">
              <Paginations  resultSearch={ checkResult.search } page={this.state.currentPage} paginationCurrentpage = {this.paginationCallback} perPage={this.state.todosPerPage} />
              </Col>
            </Row>
          </div>
          );
        }}
      </Query>
      </ Container>
    );
  }
}

export default search;
