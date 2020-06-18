/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import ProfileSearch from "../components/core/ProfileSearch"
import { Container, Row, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Col, Form, FormGroup, Input, Label } from 'reactstrap';

// A simple component that shows the pathname of the current location
class search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResult: [],
    };
    this.handleAlphabetClick = this.handleAlphabetClick.bind(this);
  }

  componentDidMount() {
    const { match, location, history } = this.props;
    this.setState({ searchResult: location.state.detail });
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


  handleAlphabetClick(e){
    if(e.target.value == 'desc'){
      let data = this.sortDescAndRender(this.state.searchResult);
      this.setState({searchResult:data});
    }else{
      let data = this.sortAscAndRender(this.state.searchResult);
      this.setState({searchResult:data});
    }
  }

  render() {

    const results = (this.state.searchResult)
    ? this.state.searchResult.map(a => (
      <div>
        <ListGroupItem key={a.gcID}>
          <a href={`/p/${a.gcID}`} className="listsearch">
            <img className="imgsearch" src={a.avatar} alt="Card image cap" />
            <ListGroupItemHeading>{a.name}</ListGroupItemHeading>
            <ListGroupItemText>
              Depart name
            </ListGroupItemText>
          </a>
        </ListGroupItem>
      </div>
    )) : [];

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
                  <Input type="select" onChange={this.handleAlphabetClick.bind(this)} name="sort" id="sort">
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
            <ListGroup>{results}</ListGroup>
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
      </ Container>
    )
  }
}

export default withRouter(search);
