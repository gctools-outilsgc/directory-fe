import React from 'react';
import TestRenderer from 'react-test-renderer';

import CardContainer from './CardContainer';

describe('CardContainer component', () => {
  test('should provide access to scrolling events', () => {
    const onScroll = jest.fn();
    const callbacks = [];
    const trigger = () => {
      callbacks.forEach(cb => cb());
    };
    TestRenderer.create(
      <CardContainer onScroll={onScroll} />,
      {
        createNodeMock: (element) => {
          const { type, props: { className } } = element;
          if (type === 'div' && className === 'card-container') {
            return {
              addEventListener: (t, cb) => {
                if (t === 'scroll') callbacks.push(cb);
              },
            };
          }
          return {};
        },
      }
    );
    trigger();
    expect(onScroll).toBeCalled();
  });
});
