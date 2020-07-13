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
      order:''
    };
    this.handleAlphabetClick = this.handleAlphabetClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.next_save = this.next_save.bind(this);    
        
  }

  componentDidMount() {
    const { match, location, history } = this.props;
    this.setState({ searchResult: location.state.detail });
 }

 componentWillReceiveProps(nextProps){
  const { match, location, history } = this.props;
    
  if(nextProps.location.state.detail){
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
    console.log(pageNumbers)
    if(prev_next >= 1 && prev_next <= pageNumbers[pageNumbers.length-1]){
      console.log(prev_next)
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

  render() {
    const { currentPage, todosPerPage } = this.state;
    const pageNumbers = [];
    let results, renderPageNumbers = [];
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
          if(this.state.order == 'desc'){
            checkResult.search = this.sortDescAndRender(checkResult.search)
          }else if(this.state.order == 'asc'){
            checkResult.search = this.sortAscAndRender(checkResult.search)
          }
          const currentTodos = checkResult.search.slice(indexOfFirstTodo, indexOfLastTodo);
          results = currentTodos.map(a => ( 
            <ListGroupItem key={a.gcID}>
              <a href={`/p/${a.gcID}`} className="listsearch">
                <img className="imgsearch" src={a.avatar} alt="Card image cap" />
                <ListGroupItemHeading>{a.name}  {a.email} </ListGroupItemHeading>
                <ListGroupItemText>
                  {a.mobilePhone !== null ? 'mobile: '+ a.mobilePhone : ""} 
                  {a.officePhone !== null ? 'office: '+ a.officePhone : ""} 
                </ListGroupItemText>
                <ListGroupItemText>
                  {a.address !== null ? a.address.streetAddress+ '' +a.address.city : ""}             
                </ListGroupItemText>
                <ListGroupItemText>
                  Team: {a.team.nameEn}   Organization: {a.team.organization.nameEn}
                </ListGroupItemText>
              </a>
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
            
        }else{
          results = [];
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
                    <Label for="sort">Sort by</Label>
                    <Input type="select" onChange={(e) => this.handleAlphabetClick(e)} name="sort" id="sort">
                      <option>---</option>
                      <option value="desc">Alphabetical</option>
                      <option value="asc">Unalphabetical</option>                  
                    </Input>
                  </FormGroup>
                </Form>
              </Col> 
            </Row>
            <Row>
              <Col xs="12" sm="10">
                <ul>{results}</ul>
              </Col>
              <Col className='filter-section'>
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
