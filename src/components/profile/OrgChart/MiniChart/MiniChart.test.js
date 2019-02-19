import React from 'react';
import TestRenderer from 'react-test-renderer';

import MiniChart from './MiniChart';
import MiniCard from './MiniCard';

import { calculateTree } from '../algorithm/nrc_orgchart_placement';
import NRCOrgChart from '../fixtures/sample.json';
import { assumeLanguage, getNode } from '../fixtures/utils';

assumeLanguage(NRCOrgChart, 'en_CA');

describe('MiniChart', () => {
  const nodeA = getNode(NRCOrgChart, '3');
  const nodeB = getNode(NRCOrgChart, '1');
  const { boxes, lines } = calculateTree({
    nodeA,
    nodeB,
    root: NRCOrgChart,
    cardHeight: 75,
    cardWidth: 350,
  });
  test('click events are sent to the onClick prop', () => {
    const mock = jest.fn();
    const r1 = TestRenderer.create(
      <MiniChart cards={boxes} lines={lines} onClick={mock} />,
      { createNodeMock: () => ({ focus: () => {} }) },
    );
    r1.root.children[0].props.onClick();
    expect(mock).toBeCalled();
  });
  test('drag events (via mousemove) call the onOverlayDrag prop', () => {
    const mock = jest.fn();
    const r1 = TestRenderer.create(
      <MiniChart cards={boxes} lines={lines} onOverlayDrag={mock} />,
      { },
    );
    r1.root.children[0].props.onMouseMove();
    expect(mock).not.toBeCalled();
    r1.root.children[0].props.onMouseDown();
    r1.root.children[0].props.onMouseMove({ buttons: 1 });
    r1.root.children[0].props.onMouseUp();
    r1.root.children[0].props.onMouseMove({ buttons: 1 });
    expect(mock).toHaveBeenCalledTimes(1);
  });
  test('drag events are cancelled even if mouseup is missed', () => {
    const mock = jest.fn();
    const r1 = TestRenderer.create(
      <MiniChart cards={boxes} lines={lines} onOverlayDrag={mock} />,
      { },
    );
    r1.root.children[0].props.onMouseDown();
    r1.root.children[0].props.onMouseMove({ buttons: 0 });
    expect(mock).not.toBeCalled();
  });
  test('keypress events are sent to the onKeyUp prop', () => {
    const mock = jest.fn();
    const r1 = TestRenderer.create(
      <MiniChart cards={boxes} lines={lines} onOverlayKeyUp={mock} />,
      {},
    );
    const overlay =
      r1.root.children[0].children[r1.root.children[0].children.length - 2];
    expect(overlay.props.onKeyUp).toBe(mock);
    overlay.props.onKeyUp();
    expect(mock).toBeCalled();
  });
  test('clicking on the chart places focus on the overlay', () => {
    const focus = jest.fn();
    const r1 = TestRenderer.create(
      <MiniChart cards={boxes} lines={lines} />,
      {
        createNodeMock: (elem) => {
          if (elem.props.className === 'react-gc-orgchart-minichart-overlay') {
            return { focus };
          }
          return {};
        },
      },
    );
    r1.root.children[0].props.onClick();
    expect(focus).toBeCalled();
  });
  describe('renders', () => {
    test('with the appropriate aria roles', () => {
      const noBoxes = MiniChart({ cards: [], lines: [] });
      expect(noBoxes.props.children[2].props.role).toBe('tree');
      expect(noBoxes.props.role).toBe('tree');
    });
    test('the correct number of cards', () => {
      const noBoxes = MiniChart({ cards: [], lines: [] });
      const tenBoxes = MiniChart({
        cards: boxes,
        lines,
      });
      expect(noBoxes.props.children[1].length).toBe(0);
      expect(tenBoxes.props.children[1].length).toBe(boxes.length);
    });
    test('the correct number of lines', () => {
      const noBoxes = MiniChart({ cards: [], lines: [] });
      const tenBoxes = MiniChart({
        cards: boxes,
        lines,
      });
      const noLines = noBoxes.props.children[0].props.children;
      const tenLines = tenBoxes.props.children[0].props.children;
      expect(noLines.length).toBe(0);
      expect(tenLines.length).toBe(lines.length);
    });
    test('the svg element using the correct size', () => {
      const MC = MiniChart({
        cards: boxes,
        lines,
      });
      const { width, height } = boxes[0].node;
      const svg = MC.props.children[0];
      expect(svg.props.style.height).toEqual(Math
        .max(...boxes.map(b => b.y)) + height);
      expect(svg.props.style.width).toEqual(Math
        .max(...boxes.map(b => b.x)) + width);
    });
    test('the svg element using sizes of 0 when no cards are provided', () => {
      const MC = MiniChart(MiniChart.defaultProps);
      const svg = MC.props.children[0];
      expect(svg.props.style.height).toEqual(0);
      expect(svg.props.style.width).toEqual(0);
    });
    test('the default MiniCard', () => {
      const MC = MiniChart({ cards: boxes, lines });
      const defaultCard = MiniCard(MiniCard.defaultProps);
      const item = MC.props.children[1][0];
      expect(item.type(MiniCard.defaultProps)).toEqual(defaultCard);
    });
    test('the provided card instead of the default MiniCard', () => {
      const ProvidedOne = () => 'test card';
      const MC = MiniChart({
        cards: boxes,
        lines,
        cardComponent: ProvidedOne,
      });
      const defaultCard = MiniCard(MiniCard.defaultProps);
      const item = MC.props.children[1][0];
      expect(item.type(MiniCard.defaultProps)).not.toEqual(defaultCard);
      expect(item.type()).toEqual(ProvidedOne());
    });
    test('the root element using the provided styles', () => {
      const style = { border: '5px solid black' };
      const MC = MiniChart({
        cards: boxes,
        lines,
        style,
      });
      expect(MC.props.style).toEqual(style);
    });
    test('the cards with the appropriate one marked as selected', () => {
      const MC = MiniChart({
        cards: boxes,
        lines,
        selectedNode: boxes[1].node,
      });
      const activeItem = MC.props.children[1].filter(c => c.props.active);
      expect(activeItem[0].props.name).toBe(boxes[1].node.name);
      expect(activeItem[0].props.avatar).toBe(boxes[1].node.avatar);
    });
    test('the overlay correctly', () => {
      const overlay = {
        x1: 45,
        x2: 100,
        y1: 10,
        y2: 50,
        style: { color: '#ccc' },
      };
      const MC = MiniChart({
        cards: boxes,
        lines,
        overlay,
      });
      const overE = MC.props.children[2];
      expect(overE.props.style.color).toBe(overlay.style.color);
      expect(overE.props.style.left).toBe(overlay.x1);
      expect(overE.props.style.width).toBe(`${overlay.x2 - overlay.x1}px`);
      expect(overE.props.style.top).toBe(overlay.y1);
      expect(overE.props.style.height).toBe(`${overlay.y2 - overlay.y1}px`);
    });
    test('the overlay retaining the default styles', () => {
      const overlay1 = {
        x1: 0,
        x2: 10,
        y1: 0,
        y2: 10,
      };
      const overlay2 = {
        x1: 0,
        x2: 10,
        y1: 0,
        y2: 10,
        style: { color: '#ccc', position: 'relative' },
      };
      const MC1 = MiniChart({
        cards: boxes,
        lines,
        overlay: overlay1,
      });
      const MC2 = MiniChart({
        cards: boxes,
        lines,
        overlay: overlay2,
      });
      const overE1 = MC1.props.children[2];
      const overE2 = MC2.props.children[2];
      expect(overE2.props.style).toEqual(Object.assign(
        {},
        overE1.props.style,
        overlay2.style,
      ));
    });
  });
});
