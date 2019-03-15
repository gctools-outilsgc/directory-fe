/* eslint-disable no-confusing-arrow */
import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'reactstrap';

import styled from 'styled-components';

import GenericAvatar from './img/user.gif';
import './css/card.css';

const StyledCard = styled.a`
  :hover {
    box-shadow: 0 1px 5px rgba(0,0,0,0.25), 0 1px 10px rgba(0,0,0,0.22);
    color: inherit;
    opacity: 1;
    text-decoration: none;
  }
  --line-colour: rgba(93,193,190, 1);
  background: ${props => props.active ? '#FFFFFF' : '#FFFFFF'};
  opacity: ${props => props.blurred ? '0.6' : '1'};
  border: 1px solid ${props => props.active ? '#29ABE2' : 'transparent'};
  border-radius: 5px;
  width: 300px;
  height: 90px;
  display: flex;
  justify-content: space-between;
  box-shadow: ${props => props.active ?
    '0px 0px 18px rgba(41, 171, 226, 0.3);' :
    '0px 0px 18px rgba(0, 0, 0, 0.15);'}
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  text-decoration: none;
  color: inherit;
  ${props => (props.blurred && 'overflow: hidden;')}
  cursor: ${props => props.dragging ? 'grab' : 'pointer'};
`;

const Avatar = styled.img`
  max-width: 75px !important;
  min-width: 50px !important;
  height: 50px !important;
  border-radius: 50% !important;
  overflow: hidden;
  object-fit: cover;
  margin: 0 7px;
  align-self: center;
`;

const CardInfo = styled.div`
  align-self: center;
  padding: 0 10px;
  width: 100%;
`;

const CardName = styled.div`
  font-family: "rubik", sans-serif;
  font-size: 1.2em;
  font-weight: bold;
`;

const CardTitle = styled.div`
  font-family: "nunito", sans-serif;
  font-size: 80%;
  color: #6c757d!important;
  font-weight: 400;
`;
// Temporary display none to style
const CardButton = styled.div`
  align-self: center;
  padding-right: 10px;
  display: none;
`;


class Card extends React.PureComponent {
  constructor() {
    super();
    this.element = React.createRef();
    this.mousedown = false;
    this.allowclick = false;
    this.buttonClick = this.buttonClick.bind(this);
    this.cardClick = this.cardClick.bind(this);
  }

  componentDidMount() {
    if (this.element && this.element.current) {
      this.element.current.addEventListener('mousedown', (e) => {
        this.mousedown = true;
        this.allowclick = false;
        e.preventDefault();
      });
      this.element.current.addEventListener('mousemove', () => {
        this.mousedown = false;
      });
      this.element.current.addEventListener('mouseup', () => {
        if (this.mousedown) {
          this.allowclick = true;
        }
        this.mousedown = false;
      });
    }
  }

  cardClick(e) {
    if (this.allowclick) {
      if (this.props.cardClickUrl === '#') {
        e.preventDefault();
      }
      this.props.onCardClick(e);
    } else {
      e.preventDefault();
    }
  }

  buttonClick(e) {
    e.stopPropagation();
    e.preventDefault();
    this.props.onButtonClick(e);
  }

  render() {
    return (
      <StyledCard
        active={this.props.active}
        blurred={this.props.blurred}
        dragging={this.props.dragging}
        href={this.props.cardClickUrl}
        onClick={this.cardClick}
        aria-label={this.props.label}
        tabIndex="0"
        ref={this.element}
        style={{
          position: 'absolute',
          left: this.props.position.x,
          top: this.props.position.y,
        }}
      >
        <Avatar
          name="user"
          src={this.props.avatar}
          alt={this.props.avatarText}
        />
        <CardInfo>
          <CardName
            role="heading"
            aria-level={1}
          >
            {this.props.name}
          </CardName>
          <CardTitle
            role="heading"
            aria-level={2}
          >
            {this.props.title}
          </CardTitle>
        </CardInfo>
        <CardButton>
          <Button
            tabIndex="0"
            onClick={this.buttonClick}
            icon="user"
            role="button"
          >
            {this.props.buttonTitle}
          </Button>
        </CardButton>
      </StyledCard>
    );
  }
}

Card.defaultProps = {
  cardClickUrl: '#',
  onButtonClick: () => {},
  onCardClick: () => {},
  blurred: false,
  active: false,
  dragging: false,
  label: undefined,
  position: { },
  avatar: GenericAvatar,
  title: '',
};

Card.propTypes = {
  /** URL to navigate when card is clicked */
  cardClickUrl: PropTypes.string,
  /** Function to fire when card is clicked */
  onCardClick: PropTypes.func,
  /** ARIA label to describe the onClick action */
  label: PropTypes.string,
  /** Text describing button action */
  buttonTitle: PropTypes.string.isRequired,
  /** Function to fire when button is clicked */
  onButtonClick: PropTypes.func,
  /** URL of image to display as avatar */
  avatar: PropTypes.string,
  /** Text describing avatar image */
  avatarText: PropTypes.string.isRequired,
  /** User's name */
  name: PropTypes.string.isRequired,
  /** User's title */
  title: PropTypes.string,
  /** true if the card should be blurred */
  blurred: PropTypes.bool,
  /** true if the card should be displayed as "active" */
  active: PropTypes.bool,
  /** true if being dragged */
  dragging: PropTypes.bool,
  /** absolute position of the card */
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
};

export default Card;
