import React from 'react';

import PropTypes from 'prop-types';

import Card from '../Card/Card';

import './css/card_container.css';

class CardContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      dragging: false,
    };
    this.container = React.createRef();
    this.newSX = undefined;
    this.newSY = undefined;
    this.lastSX = undefined;
    this.lastXY = undefined;

    this.oldHeight = 0;
    this.oldWidth = 0;

    // Local variable to for time sensitive capture
    this.dragging = false;

    this.cardClick = this.cardClick.bind(this);
    this.cardButtonClick = this.cardButtonClick.bind(this);
  }

  componentDidMount() {
    this.scrollToCard(this.props.selectedCard);
    this.enableDrag();
    if (this.props.onScroll && this.container.current) {
      this.container.current.addEventListener('scroll', this.props.onScroll);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedCard !== this.props.selectedCard) {
      if (this.props.selectedCard) {
        const obj = this.container.current;
        const oldCard = this.props.cards
          .filter(card => card.node === nextProps.selectedCard);
        if (oldCard.length > 0) {
          const scrollXDiff = oldCard[0].x - obj.scrollLeft;
          const scrollYDiff = oldCard[0].y - obj.scrollTop;
          setTimeout(() => {
            this.container.current.scrollTo({
              left: nextProps.selectedCard.x - scrollXDiff,
              top: nextProps.selectedCard.y - scrollYDiff,
              behavior: 'auto',
            });
          }, 0);
        } else {
          this.scrollToCard(nextProps.selectedCard);
        }
      } else {
        this.scrollToCard(nextProps.selectedCard);
      }
    }
  }

  scrollToCard(card) {
    if (card) {
      this.newSX = undefined;
      this.newSY = undefined;
      this.lastSX = undefined;
      this.lastXY = undefined;
      window.requestAnimationFrame(() => {
        const { width, height } =
          this.container.current.getBoundingClientRect();
        const { cardWidth, cardHeight } = this.props;
        const x = card.x - ((width / 2) - (cardWidth / 2));
        const y = card.y - ((height / 2) - (cardHeight / 2));
        this.container.current.scrollTo({
          top: y,
          left: x,
          behavior: 'smooth',
        });
      });
    }
  }

  enableDrag() {
    if (this.container && this.container.current) {
      this.container.current.addEventListener('mousedown', (e) => {
        this.lastSX = e.clientX;
        this.lastSY = e.clientY;
        // this.setState({ dragging: true });
        this.dragging = true;
        e.preventDefault();
      });
      this.container.current.addEventListener('mousemove', (e) => {
        if (this.dragging) {
          const scroller = this.container.current;
          scroller.scrollLeft -= (-this.lastSX + (this.lastSX = e.clientX));
          this.newSX = scroller.scrollLeft;
          scroller.scrollTop -= (-this.lastSY + (this.lastSY = e.clientY));
          this.newSY = scroller.scrollTop;
        }
      });
      this.container.current.addEventListener('mouseup', () => {
        // this.setState({ dragging: false });
        this.dragging = false;
      });
      this.container.current.addEventListener('mouseenter', (e) => {
        if (this.dragging) {
          if (e.buttons === 0) {
            // this.setState({ dragging: false });
            this.dragging = false;
          }
        } else if (e.buttons === 1) {
          // this.setState({ dragging: true });
          this.dragging = true;
          this.lastSX = e.clientX;
          this.lastSY = e.clientY;
        }
      });
    }
  }

  cardClick(card, e) {
    this.props.onCardClick(card, e);
  }

  cardButtonClick(card, e) {
    this.props.onButtonClick(card, e);
  }

  render() {
    const evaluateString = (str, { node }) => {
      if (!str) return str;
      return Object.keys(node).reduce(
        (r, i) => r.replace(`!${i}!`, node[i]),
        str,
      );
    };

    const svgWidth = Math
      .max(
        Math.max(...this.props.cards.map(b => b.x)) + this.props.cardWidth,
        this.oldWidth,
      );
    const svgHeight =
      Math.max(...this.props.cards.map(b => b.y), this.oldHeight);

    const lines = (
      <svg
        style={{
          height: svgHeight,
          width: svgWidth,
        }}
      >
        {this.props.lines.map(line => (
          <path
            key={line.id}
            d={line.d}
            className={(line.on_path) ? 'onPath' : ''}
          />
        ))}
      </svg>
    );
    const cards = this.props.cards.map((card) => {
      let activeCard = false;
      if (this.props.selectedCard === card.node) {
        activeCard = true;
      }
      return (
        <Card
          key={card.id}
          cardClickUrl={evaluateString(this.props.cardClickUrl, card)}
          onCardClick={e => this.cardClick(card, e)}
          label={evaluateString(this.props.cardLabel, card)}
          buttonTitle={evaluateString(this.props.buttonTitle, card)}
          onButtonClick={e => this.cardButtonClick(card, e)}
          avatar={card.node.avatar}
          avatarText={evaluateString(this.props.avatarText, card)}
          name={card.node.name}
          title={card.node.title}
          blurred={!card.on_path}
          active={activeCard}
          dragging={this.state.dragging}
          position={{
            x: card.x,
            y: card.y,
          }}
        />
      );
    });
    const { style } = this.props;
    return (
      <div
        style={style}
        className="card-container"
        ref={this.container}
      >
        {lines}
        {cards}
      </div>
    );
  }
}

CardContainer.defaultProps = {
  cards: [],
  lines: [],
  style: {},
  onCardClick: (card, event) => {}, // eslint-disable-line no-unused-vars
  onButtonClick: (card, event) => {}, // eslint-disable-line no-unused-vars
  onScroll: undefined,
  buttonTitle: '!name!',
  avatarText: '!name!',
  cardLabel: undefined,
  cardHeight: 75,
  cardWidth: 300,
  cardClickUrl: undefined,
  selectedCard: undefined,
};

CardContainer.propTypes = {
  /** Expandable string (using !property! syntax) to pass along to card */
  cardClickUrl: PropTypes.string,
  /** Fired when cards are clicked */
  onCardClick: PropTypes.func,
  /** Expandable string (using !property! syntax) to pass along to card */
  cardLabel: PropTypes.string,
  /** Expandable string (using !property! syntax) to pass along to card */
  buttonTitle: PropTypes.string,
  /** Fired when buttons on cards are clicked  */
  onButtonClick: PropTypes.func,
  /* Expandable string (using !property! syntax) to pass along to card */
  avatarText: PropTypes.string,
  /* Event fired when container is scrolled */
  onScroll: PropTypes.func,
  /** Array of cards to draw */
  cards: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    node: PropTypes.shape({
      avatar: PropTypes.string,
      name: PropTypes.string,
      title: PropTypes.string,
      x: PropTypes.number,
      y: PropTypes.number,
      on_path: PropTypes.bool,
    }),
  })),
  /** Array of lines to draw */
  lines: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    d: PropTypes.string.isRequired,
    on_path: PropTypes.bool,
  })),
  /** Styles to pass along to root div */
  style: PropTypes.shape({}),
  /** Width of cards (will be REMOVED) */
  cardWidth: PropTypes.number,
  /** Height of cards  (will be REMOVED) */
  cardHeight: PropTypes.number,
  /** Currently selected card */
  selectedCard: PropTypes.shape({
    id: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
    node: PropTypes.shape({
      avatar: PropTypes.string,
      name: PropTypes.string,
      title: PropTypes.string,
      x: PropTypes.number,
      y: PropTypes.number,
      on_path: PropTypes.bool,
    }),
  }),
};

export default CardContainer;
