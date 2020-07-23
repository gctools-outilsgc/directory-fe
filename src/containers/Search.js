/* eslint-disable */
import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Container, Row, ListGroupItem, Col, Form, FormGroup,
  Input, Label, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import ProfileSearch from '../components/core/ProfileSearch';

// A simple component that shows the pathname of the current location
class search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResult: [],
      currentPage: 1,
      todosPerPage: 6,
      order: '',
    };
    this.handleAlphabetClick = this.handleAlphabetClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.next_save = this.next_save.bind(this);
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

  next_save(prev_next, pageNumbers) {
    if (prev_next >= 1 && prev_next <= pageNumbers[pageNumbers.length - 1]) {
      this.setState({
        currentPage: Number(prev_next),
      });
    }
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id),
    });
  }

  handleAlphabetClick(e) {
    this.setState({ order:e.target.value });
  }

  render() {
    const { currentPage, todosPerPage } = this.state;
    const pageNumbers = [];
    let numberResults = '';
    let results, renderPageNumbers = [];
    let showingStart = '';
    let showingEnd = '';
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
       
          numberResults = Object.keys(checkResult.search).length;
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

          showingStart = currentPage * todosPerPage - todosPerPage +1;
          showingEnd = (currentPage * todosPerPage > numberResults ? numberResults : currentPage * todosPerPage);

        } else {
          results = __('No result found');
        }

        const styleClasses = (!data)
          ? 'search-results-none' : 'list-unstyled search-results';

        return (
          <Container>
            <div className="search-bar">
              <ProfileSearch />
            </div>
            <Row style={{ position: 'relative' }}>
              <Col xs="2" sm="2" className="sort_align">
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
              <Col xs={{ size: 3, offset: 5 }} sm={{ size: 3, offset: 5 }}>
                <span className="showing_results">{__('Showing')} {showingStart} {__('to')} {showingEnd} {__('of')} {numberResults} {__('results')}</span>
              </Col>
            </Row>
            <Row>
              <Col xs="12" sm="10">
                <ul>{results}</ul>
              </Col>
              <Col className="filter-section">
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
                <Pagination style={{ display: 'flex', justifyContent: 'center' }} aria-label="Page navigation" id="page-numbers">
                  <PaginationItem disabled={currentPage <= 1}>
                    <PaginationLink onClick={() => { this.next_save(currentPage - 1, pageNumbers); }} > {__('Previous')} </PaginationLink>
                  </PaginationItem>
                  {renderPageNumbers}
                  <PaginationItem disabled={currentPage >= pageNumbers[pageNumbers.length - 1]}>
                    <PaginationLink onClick={() => { this.next_save(currentPage + 1, pageNumbers); }} >{__('Next')} </PaginationLink>
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

export default search;
