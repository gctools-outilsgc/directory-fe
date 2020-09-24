/* eslint-disable */
import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Container, Row, ListGroupItem, Col, Form, FormGroup,
  Input, Label } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faSlidersH } from '@fortawesome/free-solid-svg-icons';
import ProfileSearch from '../components/core/ProfileSearch';
import Filters from "../components/search/filters"
import Paginations from "../components/search/Pagination"
import DisplayResults from "../components/search/ListViewSearch"


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
      isChecked: props.isChecked || false,
      listview:"long",
    };
    this.handleAlphabetClick = this.handleAlphabetClick.bind(this);
    this.handleResultChange = this.handleResultChange.bind(this);
    this.filterssearch = this.filterssearch.bind(this);
    this.filtersCallback = this.filtersCallback.bind(this);
    this.paginationCallback = this.paginationCallback.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handlelistview = this.handlelistview.bind(this);       
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

  handlelistview(e){
    this.setState({listview: e.target.value})
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

  handleChange() {
    this.setState({ isChecked: !this.state.isChecked })
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
            <DisplayResults data={a} viewDisplay={this.state.listview}/> 
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
              <Row>     
                <Col sm="4" md="2" className="col-filter">
                  <FormGroup className="form-filter">
                    <Label for="sort">{__('Sort by')}</Label>
                    <Input type="select" onChange={(e) => this.handleAlphabetClick(e)} name="sort" id="sort">
                      <option>---</option>
                      <option value="desc">{__('Alphabetical')}</option>
                      <option value="asc">{__('Unalphabetical')}</option>                  
                    </Input>
                  </FormGroup> 
                  </Col>
                  <Col md="2" className="col-filter">
                   <FormGroup className="form-filter"> 
                      <Label for="resultsPerPage">{__('Results per page')}</Label>
                      <Input type="select" onChange={(e) => this.handleResultChange(e)} name="resultsPerPage" id="resultsPerPage">
                        <option value="6">6</option>
                        <option value="12">12</option>
                        <option value="18">18</option>
                      </Input>
                   </FormGroup>
                    </Col>
                    <Col md="2" className="col-filter">
                   <FormGroup className="form-filter"> 
                      <Label for="listview">list view</Label>
                      <Input type="select" onChange={(e) => this.handlelistview(e)} name="listview" id="listview">
                        <option value="long">full</option>
                        <option value="medium">medium</option>
                        <option value="short">short</option>
                      </Input>
                   </FormGroup>
                    </Col>
                    <Col md="2" className="col-filter">
                    <div id="ck-button">
                    <label class="menu-icon" for="menu-btn">
                    <input class="menu-btn" type="checkbox" value={this.state.isChecked} onChange={this.handleChange} id="menu-btn" />
                    <span><FontAwesomeIcon icon={faSlidersH}/> Filter</span>
                  </label></div>
                  </Col>
            </Row>
            <Row>
              <Col xl={{ size: 3, offset: 6 }} sm={{ size: 3, offset: 6 }}>
                <div className="pr-3 showing_results">{__('Showing')} {showingStart} {__('to')} {showingEnd} {__('of')} {numberResults} {__('results')}</div>
              </Col>
             </Row>
            <Row>
              <Col xs="12" xl="9">
                <ul style={{"padding-left":0}}>{results}</ul>
              </Col>
              <Col xs="3" sm="3" id="filter-content"  className={"menu " + this.state.isChecked }> 
              <a href="javascript:void(0)" class="closebtn" onClick={this.handleChange}>&times;</a>
              <Filters resultSearch={ checkResult.search } updateFilters = {this.filtersCallback}/>
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
