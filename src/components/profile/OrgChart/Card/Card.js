import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'reactstrap';

import styled from 'styled-components';

import './css/card.css';

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
    const { active, blurred, dragging } = this.props;

    const StyledCard = styled.a`
      :hover {
        box-shadow: 0 1px 5px rgba(0,0,0,0.25), 0 1px 10px rgba(0,0,0,0.22);
        color: inherit;
      }
      --line-colour: rgba(93,193,190, 1);
      background: ${((active) ? '#5DC1BE' : '#467B8D')};
      opacity: ${((blurred) ? '0.6' : '1')};
      border-radius: 2px;
      width: 350px;
      height: 75px;
      display: flex;
      justify-content: space-between;
      box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
      transition: all 0.3s cubic-bezier(.25,.8,.25,1);
      text-decoration: none;
      color: inherit;
      ${blurred && 'overflow: hidden;'}
      cursor: ${((dragging) ? 'grab' : 'pointer')};
    `;

    const Avatar = styled.img`
      max-width: 75px !important;
      min-width: 75px !important;
      overflow: hidden;
      object-fit: cover;
      padding: 2px;
    `;

    const CardInfo = styled.div`
      align-self: center;
      padding: 0 10px;
      width: 100%;
    `;

    const CardName = styled.div`
      font-family: "rubik", sans-serif;
      font-size: 1.2em;
    `;

    const CardTitle = styled.div`
      font-family: "nunito", sans-serif;
    `;

    const CardButton = styled.div`
      align-self: center;
      padding-right: 10px;
    `;

    return (
      <StyledCard
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
  avatar: PropTypes.string.isRequired,
  /** Text describing avatar image */
  avatarText: PropTypes.string.isRequired,
  /** User's name */
  name: PropTypes.string.isRequired,
  /** User's title */
  title: PropTypes.string.isRequired,
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
