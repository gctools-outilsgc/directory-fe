import React from 'react';
import PropTypes from 'prop-types';

import MiniCard from './MiniCard';
import './css/MiniChart.css';

const MiniChartWrapper = (() => {
  let dragging = false;

  const overlayRef = React.createRef();

  const chartClick = (e, cb) => {
    overlayRef.current.focus();
    if (cb) cb(e);
  };

  const overlayMouseDown = () => {
    dragging = true;
  };
  const overlayMouseUp = () => {
    dragging = false;
  };
  const overlayDrag = (e, cb) => {
    if (dragging && cb) {
      if (e.buttons !== 1) {
        dragging = false;
      } else {
        cb(e);
      }
    }
  };
  const cssPrefix = 'react-gc-orgchart-minichart';

  const MiniChart = function MiniChart(props) {
    const {
      cards,
      lines,
      style,
    } = props;
    const Card = props.cardComponent || MiniCard;
    const svgWidth = Math.max(0, ...cards.map(b => b.x))
    + ((cards.length) ? cards[0].width : 0);
    const svgHeight = Math.max(0, ...cards.map(b => b.y))
    + ((cards.length) ? cards[0].height : 0);

    const ox1 = (props.overlay) ? props.overlay.x1 : 0;
    const ox2 = (props.overlay) ? props.overlay.x2 : 0;
    const oy1 = (props.overlay) ? props.overlay.y1 : 0;
    const oy2 = (props.overlay) ? props.overlay.y2 : 0;
    const overlayStyle = Object.assign(
      {},
      MiniChart.defaultProps.overlay.style,
      (props.overlay) ? props.overlay.style : {},
      {
        left: ox1,
        width: `${ox2 - ox1}px`,
        top: oy1,
        height: `${oy2 - oy1}px`,
      // eslint-disable-next-line comma-dangle
      }
    );

    return (
      <div
        role="tree"
        style={style}
        className={`${cssPrefix}-container`}
        onClick={e => chartClick(e, props.onClick)}
        onKeyPress={undefined}
        onMouseDown={overlayMouseDown}
        onMouseMove={e => overlayDrag(e, props.onOverlayDrag)}
        onMouseUp={overlayMouseUp}
        tabIndex={0}
      >
        <svg
          style={{
            height: svgHeight,
            width: svgWidth,
          }}
        >
          {lines.map(line => (
            <path
              key={line.id}
              d={line.d}
              className={(line.on_path) ? 'onPath' : ''}
            />
          ))}
        </svg>
        {cards.map(card => (
          <Card
            key={card.id}
            avatar={card.node.avatar}
            avatarText={card.node.name}
            name={card.node.name}
            title={card.node.title}
            blurred={!card.on_path}
            active={(props.selectedNode === card.node)}
            width={card.width}
            height={card.height}
            position={{
              x: card.x,
              y: card.y,
            }}
          />
        ))}
        <div
          role="tree"
          aria-label="Quick scroll box"
          aria-describedby="test"
          ref={overlayRef}
          tabIndex={0}
          className={`${cssPrefix}-overlay`}
          style={overlayStyle}
          onKeyUp={props.onOverlayKeyUp}
        />
        <div id="test" style={{ display: 'none' }}>
          Use the keyboard arrow keys to quickly scroll the org chart
        </div>
      </div>
    );
  };
  MiniChart.defaultProps = {
    cards: [],
    lines: [],
    style: {},
    cardComponent: undefined,
    selectedNode: undefined,
    overlay: {
      x1: 0,
      x2: 0,
      y1: 0,
      y2: 0,
      style: {
        position: 'absolute',
        opacity: 0.3,
      },
    },
    onClick: undefined,
    onOverlayKeyUp: undefined,
    onOverlayDrag: undefined,
  };

  const nodeShape = PropTypes.shape({
    avatar: PropTypes.string,
    avatarText: PropTypes.string,
    name: PropTypes.string,
    title: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
    on_path: PropTypes.bool,
    width: PropTypes.number,
    height: PropTypes.number,
  });

  MiniChart.propTypes = {
    /** Component to use to draw cards */
    cardComponent: PropTypes.node,
    /** Currently selected node */
    selectedNode: nodeShape,
    /** Array of cards to draw */
    cards: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      node: nodeShape,
    })),
    /** Overlay properties */
    overlay: PropTypes.shape({
      x1: PropTypes.number,
      x2: PropTypes.number,
      y1: PropTypes.number,
      y2: PropTypes.number,
      style: PropTypes.shape({}),
    }),
    /** Array of lines to draw */
    lines: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      d: PropTypes.string.isRequired,
      on_path: PropTypes.bool,
    })),
    /** Styles to pass along to root div */
    style: PropTypes.shape({}),
    /** Handler fired when minichart is clicked */
    onClick: PropTypes.func,
    /** Handler fired when keyup event is fired on the overlay */
    onOverlayKeyUp: PropTypes.func,
    /** Handler fired when overlay is dragged */
    onOverlayDrag: PropTypes.func,
  };
  return MiniChart;
})();

export default MiniChartWrapper;
