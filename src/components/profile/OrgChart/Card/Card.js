import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'reactstrap';

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
    const classes = [
      'card',
      (this.props.active) ? 'card-active' : '',
      (this.props.blurred) ? 'card-blur' : '',
      (this.props.dragging) ? 'being-dragged' : 'clickable',
    ];

    return (
      <a
        href={this.props.cardClickUrl}
        onClick={this.cardClick}
        aria-label={this.props.label}
        tabIndex="0"
        ref={this.element}
        className={classes.join(' ')}
        style={{
          position: 'absolute',
          left: this.props.position.x,
          top: this.props.position.y,
        }}
      >
        <img
          name="user"
          className="card-avatar"
          src={this.props.avatar}
          alt={this.props.avatarText}
        />
        <div className="card-info">
          <div
            className="card-name"
            role="heading"
            aria-level={1}
          >
            {this.props.name}
          </div>
          <div
            className="card-title"
            role="heading"
            aria-level={2}
          >
            {this.props.title}
          </div>
        </div>
        <div className="card-button">
          <Button
            tabIndex="0"
            onClick={this.buttonClick}
            icon="user"
            role="button"
          >
            {this.props.buttonTitle}
          </Button>
        </div>
      </a>
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
