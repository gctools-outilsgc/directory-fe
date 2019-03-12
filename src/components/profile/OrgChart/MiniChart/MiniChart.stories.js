import React from 'react';
import { storiesOf } from '@storybook/react';

import { calculateTree, getNode } from '../algorithm/nrc_orgchart_placement';

import MiniChart from './MiniChart';

import root from '../fixtures/sample.json';
import { assumeLanguage } from '../fixtures/utils';

assumeLanguage(root, 'en_CA');

const nodeA = getNode(root, '3');

storiesOf('OrgChart/MiniChart', module)
  .addParameters({
    info: { header: true, inline: true, source: false },
  })
  .add(
    'Only required options',
    () => (
      <div>
        <MiniChart />
      </div>
    )
  )
  .add(
    'Using cards',
    () => {
      const { boxes } = calculateTree({
        nodeA,
        root,
        cardHeight: 10,
        cardWidth: 10,
        cardPadding: 10,
      });
      return (
        <div>
          <MiniChart cards={boxes} />
        </div>
      );
    }
  )
  .add(
    'Using cards and lines',
    () => {
      const { boxes, lines } = calculateTree({
        nodeA,
        root,
        cardHeight: 10,
        cardWidth: 10,
        cardPadding: 10,
      });
      return (
        <div>
          <MiniChart cards={boxes} lines={lines} />
        </div>
      );
    }
  )
  .add(
    'Using cards, lines and overlay',
    () => {
      const { boxes, lines } = calculateTree({
        nodeA,
        root,
        cardHeight: 10,
        cardWidth: 10,
        cardPadding: 10,
      });
      return (
        <div>
          <MiniChart
            cards={boxes}
            lines={lines}
            overlay={{
              x1: 35,
              x2: 135,
              y1: 130,
              y2: 240,
            }}
          />
        </div>
      );
    }
  );
