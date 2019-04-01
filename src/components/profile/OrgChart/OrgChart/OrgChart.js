import React from 'react';
import PropTypes from 'prop-types';

import './css/org_chart.css';

import CardContainer from '../CardContainer/CardContainer';
import MiniChart from '../MiniChart';

const cssPrefix = 'react-gc-orgchart-wrapper';

const Menu = props => (
  <div className={`${cssPrefix}-menu`}>{props.children}</div>
);

Menu.propTypes = {
  children: PropTypes.node.isRequired,
};

class OrgChart extends React.Component {
  constructor() {
    super();
    this.state = {
      scrollX: 0,
      scrollY: 0,
      scrollWidth: 0,
      scrollHeight: 0,
      clientWidth: 0,
      clientHeight: 0,
    };

    this.cardContainer = React.createRef();

    this.miniChartComponent = React.createRef();
    this.miniClientHeight = 0;
    this.miniClientWidth = 0;
    this.miniScrollHeight = 0;
    this.miniScrollWidth = 0;
    this.onWindowResize = () => {
      const { clientWidth, clientHeight }
        = this.cardContainer.current.container.current;
      if (
        clientWidth !== this.state.clientWidth ||
        clientHeight !== this.state.clientHeight
      ) {
        this.trackScrolling({
          target: this.cardContainer.current.container.current,
        });
      }
    };

    this.handleCentreClick = this.handleCentreClick.bind(this);
    this.renderMiniChart = this.renderMiniChart.bind(this);
    this.trackScrolling = this.trackScrolling.bind(this);
    this.miniChartClick = this.miniChartClick.bind(this);
    this.miniChartDrag = this.miniChartDrag.bind(this);
    this.miniChartOverlayKeyUp = this.miniChartOverlayKeyUp.bind(this);
  }

  componentDidMount() {
    this.updateMiniChartSize();
    window.addEventListener('resize', this.onWindowResize);
  }

  componentWillReceiveProps(next) {
    if (next.miniCards !== this.props.miniCards) {
      setTimeout(() => this.updateMiniChartSize(), 20);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
  }

  getMiniChartOffsetCoordinates() {
    const x1 = (this.state.scrollX / this.state.scrollWidth)
    * this.miniScrollWidth || 0;
    const y1 = (this.state.scrollY / this.state.scrollHeight)
      * this.miniScrollHeight || 0;
    const x2 = (
      (
        (this.state.clientWidth + this.state.scrollX)
        / this.state.scrollWidth
      ) * this.miniScrollWidth) || 0;
    const y2 = (
      (
        (this.state.clientHeight + this.state.scrollY)
        / this.state.scrollHeight
      ) * this.miniScrollHeight) || 0;
    return {
      x1,
      x2,
      y1,
      y2,
    };
  }

  updateMiniChartSize() {
    const { current } = this.miniChartComponent;
    const cards = this.props.miniCards;
    this.miniChartSvgHeight = Math.max(0, ...cards.map(b => b.y))
    + ((cards.length) ? cards[0].height : 0);

    if (current) {
      this.miniClientHeight
        = Math.min(current.clientHeight, this.miniChartSvgHeight);
      this.miniScrollHeight
        = Math.min(current.scrollHeight, this.miniChartSvgHeight);
      this.miniClientWidth = current.clientWidth;
      this.miniScrollWidth = current.scrollWidth;
    }
  }

  trackScrolling({ target }) {
    this.setState({
      scrollY: target.scrollTop,
      scrollX: target.scrollLeft,
      scrollHeight: target.scrollHeight,
      scrollWidth: target.scrollWidth,
      clientWidth: target.clientWidth,
      clientHeight: target.clientHeight,
    });
    if (this.miniChartComponent.current) {
      const {
        x1,
        x2,
        y1,
        y2,
      } = this.getMiniChartOffsetCoordinates();
      const { current } = this.miniChartComponent;
      const diffX2 = x2 - (current.scrollLeft + current.clientWidth);
      const diffX1 = x1 - current.scrollLeft;
      const diffY2 = y2 - (current.scrollTop + current.clientHeight);
      const diffY1 = y1 - current.scrollTop;
      let newLeft = current.scrollLeft;
      let newTop = current.scrollTop;
      if (diffX2 > 0) {
        newLeft = current.scrollLeft + diffX2;
      } else if (diffX1 < 0) {
        newLeft = current.scrollLeft + diffX1;
      }
      if (diffY2 > 0) {
        newTop = current.scrollTop + diffY2;
      } else if (diffY1 < 0) {
        newTop = current.scrollTop + diffY1;
      }

      if (newLeft !== current.scrollLeft || newTop !== current.scrollTop) {
        this.miniChartComponent.current.scrollTo({
          top: newTop,
          left: newLeft,
          behavior: 'auto',
        });
      }
    }
  }

  handleCentreClick() {
    const { onMoveToActiveClick, selectedCard } = this.props;
    if (onMoveToActiveClick) {
      onMoveToActiveClick(selectedCard, this.cardContainer.current);
    } else {
      this.cardContainer.current.scrollToCard(selectedCard);
    }
  }

  miniChartClick(e) {
    const rect = this.miniChartComponent.current.getBoundingClientRect();
    this.scrollContainerToOverlayCoord(
      e.clientX - rect.left,
      // eslint-disable-next-line comma-dangle
      e.clientY - rect.top
    );
  }

  center() {
    setTimeout(() => {
      this.updateMiniChartSize();
      if (this.props.selectedCard) {
        this.cardContainer.current.scrollToCard(this.props.selectedCard);
      }
    }, 20);
  }

  miniChartDrag(e) {
    const rect = this.miniChartComponent.current.getBoundingClientRect();
    this.scrollContainerToOverlayCoord(
      e.clientX - rect.left,
      // eslint-disable-next-line comma-dangle
      e.clientY - rect.top
    );
  }

  miniChartOverlayKeyUp(e) {
    if (e.keyCode >= 37 && e.keyCode <= 40) {
      const coord = this.getMiniChartOffsetCoordinates();
      const overlayWidth = Math.abs(coord.x2 - coord.x1);
      const overlayHeight = Math.abs(coord.y2 - coord.y1);

      const stepX = overlayWidth / 2;
      const stepY = overlayHeight / 2;

      switch (e.keyCode) {
        case 37: { // left
          this.scrollContainerToOverlayCoord(
            (coord.x1 + (overlayWidth / 2)) - stepX,
            // eslint-disable-next-line comma-dangle
            coord.y1 + (overlayHeight / 2)
          );
          break;
        }
        case 38: { // up
          this.scrollContainerToOverlayCoord(
            coord.x1 + (overlayWidth / 2),
            // eslint-disable-next-line comma-dangle
            (coord.y1 + (overlayHeight / 2)) - stepY
          );
          break;
        }
        case 39: { // right
          this.scrollContainerToOverlayCoord(
            (coord.x1 + (overlayWidth / 2)) + stepX,
            // eslint-disable-next-line comma-dangle
            coord.y1 + (overlayHeight / 2)
          );
          break;
        }
        case 40: { // down
          this.scrollContainerToOverlayCoord(
            coord.x1 + (overlayWidth / 2),
            // eslint-disable-next-line comma-dangle
            (coord.y1 + (overlayHeight / 2)) + stepY
          );
          break;
        }
        default:
      }
      e.preventDefault();
      e.stopPropagation();
    }
  }

  scrollContainerToOverlayCoord(x, y) {
    const coord = this.getMiniChartOffsetCoordinates();
    const overlayWidth = Math.abs(coord.x2 - coord.x1);
    const overlayHeight = Math.abs(coord.y2 - coord.y1);
    const newX1 = Math.max(x - (overlayWidth / 2), 0);
    const newY1 = Math.max(y - (overlayHeight / 2), 0);

    const newLeft = (newX1 / this.miniScrollWidth) * this.state.scrollWidth;
    const newTop = (newY1 / this.miniScrollHeight) * this.state.scrollHeight;

    this.cardContainer.current.container.current.scrollTo({
      top: newTop,
      left: newLeft,
      // eslint-disable-next-line comma-dangle
      behavior: 'auto'
    });
  }

  renderMiniChart() {
    if (this.props.minichart) {
      const overlay = Object.assign(
        {},
        { style: this.props.miniOverlayStyle },
        // eslint-disable-next-line comma-dangle
        this.getMiniChartOffsetCoordinates()
      );
      return (
        <div
          className={`${cssPrefix}-minichart-wrapper`}
        >
          <div
            ref={this.miniChartComponent}
            className={`${cssPrefix}-minichart`}
          >
            <MiniChart
              cardComponent={this.props.miniCardComponent}
              selectedNode={this.props.miniSelectedNode}
              cards={this.props.miniCards}
              overlay={overlay}
              lines={this.props.miniLines}
              style={this.props.miniStyle}
              onClick={this.miniChartClick}
              onOverlayDrag={this.miniChartDrag}
              onOverlayKeyUp={this.miniChartOverlayKeyUp}
            />
          </div>
        </div>
      );
    }
    return undefined;
  }

  render() {
    const UseMenu = this.props.menuComponent || Menu;
    const MoveToActive = this.props.moveToActiveComponent || (props => (
      <button {...props}>{
        this.props.moveToActiveText || __('Go to me')}
      </button>
    ));
    const searchComponent =
      (this.props.searchComponent) ? this.props.searchComponent : undefined;

    return (
      <div>
        {this.renderMiniChart()}
        <UseMenu>
          <MoveToActive onClick={this.handleCentreClick} />
          {searchComponent}
        </UseMenu>
        <div className={`${cssPrefix}-chart`}>
          <CardContainer
            selectedCard={this.props.selectedCard}
            cards={this.props.cards}
            lines={this.props.lines}
            buttonTitle={this.props.buttonTitle}
            avatarText={this.props.avatarText}
            style={this.props.style}
            onButtonClick={this.props.onButtonClick}
            onCardClick={this.props.onCardClick}
            cardClickUrl={this.props.cardClickUrl}
            cardLabel={this.props.cardLabel}
            cardWidth={this.props.cardWidth}
            cardHeight={this.props.cardHeight}
            onScroll={this.trackScrolling}
            ref={this.cardContainer}
          />
        </div>
      </div>
    );
  }
}

OrgChart.defaultProps = {
  cards: [],
  lines: [],
  style: {},
  onCardClick: (card, event) => {}, // eslint-disable-line no-unused-vars
  onButtonClick: (card, event) => {}, // eslint-disable-line no-unused-vars
  cardLabel: undefined,
  buttonTitle: '!name!',
  avatarText: '!name!',
  cardHeight: 75,
  cardWidth: 300,
  cardClickUrl: undefined,
  selectedCard: undefined,
  searchComponent: undefined,
  minichart: true,
  miniCards: [],
  miniLines: [],
  miniStyle: {},
  miniCardComponent: undefined,
  miniSelectedNode: undefined,
  miniOverlayStyle: undefined,
  menuComponent: undefined,
  moveToActiveComponent: undefined,
  onMoveToActiveClick: undefined,
  moveToActiveText: '',
};

const nodeShape = PropTypes.shape({
  avatar: PropTypes.string,
  name: PropTypes.string,
  title: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  on_path: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
});

OrgChart.propTypes = {
  /** Expandable string (using !property! syntax) to pass along to card */
  cardClickUrl: PropTypes.string,
  /** Fired when cards are clicked */
  onCardClick: PropTypes.func,
  /** Expandable string (using !property! syntax) to pass along to card */
  cardLabel: PropTypes.string,
  /** Expandable string (using !property! syntax) to pass along to card */
  buttonTitle: PropTypes.string,
  /** Expandable string (using !property! syntax) to pass along to card */
  avatarText: PropTypes.string,
  /** Fired when buttons on cards are clicked  */
  onButtonClick: PropTypes.func,
  /** Array of cards to draw */
  cards: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    node: nodeShape,
  })),
  /** Array of lines to draw */
  lines: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    x1: PropTypes.number,
    y1: PropTypes.number,
    x2: PropTypes.number,
    y2: PropTypes.number,
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
    node: nodeShape,
  }),
  /** Include to minimap or not */
  minichart: PropTypes.bool,
  /** Component to use to draw mini cards */
  miniCardComponent: PropTypes.node,
  /** Currently selected node for minichart */
  miniSelectedNode: nodeShape,
  /** Array of cards to draw on minichart */
  miniCards: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    node: nodeShape,
  })),
  /** Styles to pass along to the overlay div */
  miniOverlayStyle: PropTypes.shape({}),
  /** Array of lines to draw on the minichart */
  miniLines: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    d: PropTypes.string.isRequired,
    on_path: PropTypes.bool,
  })),
  /** Styles to pass along to root div of the minichart */
  miniStyle: PropTypes.shape({}),
  /** search component */
  searchComponent: PropTypes.node,
  /** Custom component to alter the built-in menu */
  menuComponent: PropTypes.func,
  /** Text for built-in "move to active" button  */
  moveToActiveText: PropTypes.string,
  /** Custom component to alter the built-in "move to active" button */
  moveToActiveComponent: PropTypes.func,
  /** Override built-in behavior when the MoveToActive component is clicked */
  onMoveToActiveClick: PropTypes.func,
};

export default OrgChart;
