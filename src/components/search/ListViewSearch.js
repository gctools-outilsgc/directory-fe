/* eslint-disable */
import React from 'react';
import gql from 'graphql-tag';
import { Row, ListGroupItem, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// A simple component that shows the pathname of the current location
class DisplayResults extends React.Component {


  render() {
      const a = this.props.data;
      const listType = this.props.viewDisplay;
      if (listType == "short"){
        return (
          <ListGroupItem key={a.gcID}>
                    <Row>         
                      <Col xs="auto">
                        <span className="profile-name"> {a.name}</span>
                      </Col>
                      <Col xs="auto">
                        <span>
                          <a href={`mailto:${a.email}`}><span>{a.email}</span></a>
                        </span>
                      </Col>
                    </Row>
              </ListGroupItem>
          );
      } else if(listType == "medium"){
        return (
          <ListGroupItem key={a.gcID}>
                <Row>
                  <Col xs="5" md="3" className="image-section">
                    <a href={`/p/${a.gcID}`} >
                      <img className="imgsearch" src={a.avatar} alt="Card image cap" />
                    </a>
                  </Col>
                  
                  <Col xs="7" md="9">
                    <Row>         
                      <Col xs="12">
                        <span className="profile-name"> {a.name}</span>
                      </Col>
                      <Col xs="12">
                        <span className="search-email">
                          <a href={`mailto:${a.email}`}><span>{a.email}</span></a>
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
                  </Col>
                </Row>
              </ListGroupItem>
          );
      } else {
          return (
            <ListGroupItem key={a.gcID}>
                  <Row>
                    <Col xs="5" md="3" className="image-section">
                      <a href={`/p/${a.gcID}`} >
                        <img className="imgsearch" src={a.avatar} alt="Card image cap" />
                      </a>
                    </Col>
                    
                    <Col xs="7" md="9">
                      <Row>         
                        <Col xs="12">
                          <span className="profile-name"> {a.name}</span>
                        </Col>
                        <Col xs="12">
                          <span className="search-email">
                            <a href={`mailto:${a.email}`}><span>{a.email}</span></a>
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
                        <Col xs="12" md="6">
                          {a.mobilePhone !== null ? <div><span className="font-weight-bold">{__('Mobile')}: </span><a href={`tel:${a.mobilePhone}`}>{a.mobilePhone}</a></div>: ""}
                        </Col>
                        <Col xs="12" md="6">
                          {a.officePhone !== null ? <div><span className="font-weight-bold">{__('Office')}: </span><a href={`tel:${a.officePhone}`}>{a.officePhone}</a></div> : ""}
                        </Col>
                      </Row>
                      <Row>
                        <div className="search-address">{a.address !== null ? <div><span className="font-weight-bold">{__('Address')}: </span><a href={`https://maps.google.com/?q=${a.address.streetAddress}${a.address.city}`} target="_blank" rel="noopener noreferrer">{a.address.streetAddress+ ', ' +a.address.city}</a></div> : ""}   </div>          
                      </Row>  
                    </Col>
                  </Row>
                </ListGroupItem>
            );
      }
    
  }
}

export default DisplayResults;
