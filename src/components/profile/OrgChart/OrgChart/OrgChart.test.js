import React from 'react';
import TestRenderer from 'react-test-renderer';
import PropTypes from 'prop-types';

import OrgChart from './OrgChart';

import { calculateTree } from '../algorithm/nrc_orgchart_placement';
import NRCOrgChart from '../fixtures/sample.json';
import { assumeLanguage, getNode } from '../fixtures/utils';

assumeLanguage(NRCOrgChart, 'en_CA');

describe('OrgChart component', () => {
  const nodeA = getNode(NRCOrgChart, '4');
  const nodeB = getNode(NRCOrgChart, '1');

  const { boxes, lines } = calculateTree({
    nodeA,
    nodeB,
    root: NRCOrgChart,
    cardHeight: 75,
    cardWidth: 350,
  });

  const { boxes: miniCards, lines: miniLines } = calculateTree({
    nodeA,
    nodeB,
    root: NRCOrgChart,
    cardHeight: 10,
    cardWidth: 10,
  });

  let scrollMock;
  let rendererOptions;

  beforeEach(() => {
    scrollMock = jest.fn();
    rendererOptions = {
      createNodeMock: () => ({
        scrollLeft: 0,
        scrollTop: 0,
        clientWidth: 20,
        clientHeight: 50,
        addEventListener: () => {},
        scrollTo: scrollMock,
        getBoundingClientRect: () => ({ left: 16, top: 75 }),
      }),
    };
  });

  test('will scroll the org chart when the minichart is clicked', () => {
    const instance = TestRenderer.create(
      <OrgChart
        cards={boxes}
        lines={lines}
        miniCards={miniCards}
        miniLines={miniLines}
      />,
      rendererOptions,
    ).getInstance();

    instance.state.scrollWidth = 4040;
    instance.state.scrollHeight = 2100;
    instance.state.clientWidth = 2156;
    instance.state.clientHeight = 489;
    instance.miniScrollHeight = 310;
    instance.miniScrollWidth = 190;

    instance.miniChartClick({ clientX: 106, clientY: 250 });
    expect(scrollMock).toBeCalledWith({
      behavior: 'auto',
      left: 835.6842105263157,
      top: 940.9838709677418,
    });
  });

  test('will scroll the org chart using arrow keys', () => {
    let left = 0;
    let top = 0;
    const scrollCapture = (params) => {
      ({ left, top } = params);
      scrollMock(params);
    };
    const options = Object.assign(
      {},
      rendererOptions,
      {
        createNodeMock: () => Object.assign(
          {},
          rendererOptions.createNodeMock(),
          { scrollTo: scrollCapture },
        ),
      },
    );
    const instance = TestRenderer.create(
      <OrgChart
        cards={boxes}
        lines={lines}
        miniCards={miniCards}
        miniLines={miniLines}
      />,
      options,
    ).getInstance();

    instance.state.scrollWidth = 4040;
    instance.state.scrollHeight = 2100;
    instance.state.clientWidth = 2156;
    instance.state.clientHeight = 489;
    instance.miniScrollHeight = 310;
    instance.miniScrollWidth = 190;
    instance.state.scrollX = instance.state.scrollWidth / 2;
    instance.state.scrollY = instance.state.scrollHeight / 2;

    const preventDefault = jest.fn();
    const stopPropagation = jest.fn();

    // Left
    instance
      .miniChartOverlayKeyUp({ keyCode: 37, preventDefault, stopPropagation });
    expect(top).toBe(instance.state.scrollY);
    expect(left).toBeLessThan(instance.state.scrollX);

    // Up
    instance
      .miniChartOverlayKeyUp({ keyCode: 38, preventDefault, stopPropagation });
    expect(top).toBeLessThan(instance.state.scrollY);
    expect(left).toBe(instance.state.scrollX);

    // Right
    instance
      .miniChartOverlayKeyUp({ keyCode: 39, preventDefault, stopPropagation });
    expect(left).toBeGreaterThan(instance.state.scrollX);
    expect(top).toBe(instance.state.scrollY);

    // Down
    instance
      .miniChartOverlayKeyUp({ keyCode: 40, preventDefault, stopPropagation });
    expect(top).toBeGreaterThan(instance.state.scrollY);
    expect(left).toBe(instance.state.scrollX);

    // Make sure the events are stopped and not propagated
    expect(scrollMock).toHaveBeenCalledTimes(4);
    expect(preventDefault).toHaveBeenCalledTimes(4);
    expect(stopPropagation).toHaveBeenCalledTimes(4);
  });

  test('has a working minichart boolean prop', () => {
    const r1 = TestRenderer.create(
      <OrgChart cards={boxes} lines={lines} minichart={false} />,
      rendererOptions,
    );
    const r2 = TestRenderer.create(
      <OrgChart cards={boxes} lines={lines} minichart />,
      rendererOptions,
    );
    const wrap1 = r1.root.children[0];
    const wrap2 = r2.root.children[0];
    expect(wrap2.children.length).toBe(wrap1.children.length + 1);
  });
  test('can calculate overlay coordinates', () => {
    const instance = TestRenderer.create(
      <OrgChart cards={boxes} lines={lines} />,
      rendererOptions,
    ).getInstance();
    expect(instance.getMiniChartOffsetCoordinates()).toEqual({
      x1: 0,
      x2: 0,
      y1: 0,
      y2: 0,
    });

    instance.state.scrollWidth = 100;
    instance.state.scrollHeight = 100;
    instance.state.clientWidth = 50;
    instance.state.clientHeight = 50;
    instance.miniScrollHeight = 40;
    instance.miniScrollWidth = 40;

    for (let x = 0; x <= 8; x += 1) {
      instance.state.scrollX = (x / 8) * instance.state.scrollWidth;
      instance.state.scrollY = (x / 8) * instance.state.scrollHeight;
      const modX = (instance.state.clientWidth / instance.state.scrollWidth)
        * instance.miniScrollWidth;
      const modY = (instance.state.clientWidth / instance.state.scrollWidth)
        * instance.miniScrollWidth;
      expect(instance.getMiniChartOffsetCoordinates()).toEqual({
        x1: (x / 8) * instance.miniScrollWidth,
        x2: ((x / 8) * instance.miniScrollWidth) + modX,
        y1: (x / 8) * instance.miniScrollHeight,
        y2: ((x / 8) * instance.miniScrollHeight) + modY,
      });
    }
  });
  test('is able to track and syncronize scrolling', () => {
    const instance = TestRenderer.create(
      <OrgChart cards={boxes} lines={lines} />,
      rendererOptions,
    ).getInstance();

    instance.state.scrollWidth = 100;
    instance.state.scrollHeight = 100;
    instance.state.clientWidth = 50;
    instance.state.clientHeight = 50;
    instance.miniScrollHeight = 40;
    instance.miniScrollWidth = 40;


    instance.trackScrolling({
      target: {
        scrollTop: 60,
        scrollLeft: 10,
        scrollHeight: 200,
        scrollWidth: 100,
        clientWidth: 50,
        clientHeight: 100,
      },
    });
    expect(instance.state.scrollWidth).toBe(100);
    expect(instance.state.scrollHeight).toBe(200);
    expect(instance.state.clientWidth).toBe(50);
    expect(instance.state.clientHeight).toBe(100);
    expect(scrollMock).toBeCalled();
    expect(scrollMock).toBeCalledWith({ top: 0, left: 4, behavior: 'auto' });
  });
  test('when moveToActiveText is set, text is correctly passed down', () => {
    const activeText = 'testing 123';
    const renderer = TestRenderer.create(
      <OrgChart
        moveToActiveText={activeText}
      />,
      rendererOptions,
    );
    const menu = renderer.root.children[0].children[1];
    const button = menu.children[0].children[0].children[0];
    expect(button.props.children).toBe(activeText);
  });
  test('when not set, moveToActiveText has a default value', () => {
    const renderer = TestRenderer.create(
      <OrgChart
        {...OrgChart.defaultProps}
      />,
      rendererOptions,
    );
    const menu = renderer.root.children[0].children[1];
    const button = menu.children[0].children[0].children[0];
    expect(button.props.children).toBe(OrgChart.defaultProps.moveToActiveText);
    expect(OrgChart.defaultProps.moveToActiveText.length).toBeGreaterThan(0);
  });
  test('when menuComponent is set, use the provided component', () => {
    const menuComponent = props => (
      <div>
        <h1>My Test Menu</h1>
        <div>{props.children}</div>
      </div>
    );
    menuComponent.propTypes = { children: PropTypes.node.isRequired };
    const renderer = TestRenderer.create(
      <OrgChart
        menuComponent={menuComponent}
      />,
      rendererOptions,
    );
    const menu = renderer.root.children[0].children[1];
    expect(menu.type).toEqual(menuComponent);
    const button = menu.children[0].children[1].children[0].children[0];
    expect(button.type).toBe('button');
  });
  test('when moveToActiveComponent is set, use the provided component', () => {
    const activeComponent = props => (
      <fakebutton {...props}>
        <h1>A test button</h1>
      </fakebutton>
    );
    const renderer = TestRenderer.create(
      <OrgChart
        moveToActiveComponent={activeComponent}
      />,
      rendererOptions,
    );
    const menu = renderer.root.children[0].children[1];
    const button = menu.children[0].children[0].children[0];
    expect(button.type).toBe('fakebutton');
  });
  test('when searchComponent is set, use the provided component', () => {
    const searchComponent = (
      <fakesearch>
        <h1>A fake search</h1>
      </fakesearch>
    );
    const renderer = TestRenderer.create(
      <OrgChart
        searchComponent={searchComponent}
      />,
      rendererOptions,
    );
    const menu = renderer.root.children[0].children[1];
    const search = menu.children[0].children[1];
    expect(search.type).toBe('fakesearch');
  });
  describe('when prop minichart=true', () => {
    test('includes the minichart in its output', () => {
      const renderer = TestRenderer.create(
        <OrgChart cards={boxes} lines={lines} minichart />,
        rendererOptions,
      );
      const container = renderer.root.children[0].children[0];
      expect(container.props.className)
        .toBe('react-gc-orgchart-wrapper-minichart-wrapper');
      expect(container.children.length).toBe(1);
    });
  });
});
