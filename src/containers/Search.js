/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import ProfileSearch from "../components/core/ProfileSearch"
import { Container, Row, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';

// A simple component that shows the pathname of the current location
class search extends React.Component {

  render() {
    const { match, location, history } = this.props;
    const results = (location.state.detail)
    // console.log(results)
    ? location.state.detail.map(a => (
      <div>
        <ListGroupItem key={a.gcID}>
          <a href={`/p/${a.gcID}`} className="listsearch">
            {/* <Media object src={a.avatar} alt="Generic placeholder image" /> */}
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
        <ListGroup>{results}</ListGroup>
      </ Container>
    )
  }
}

export default withRouter(search);
