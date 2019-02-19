import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { calculateTree } from '../algorithm/nrc_orgchart_placement';

import OrgChart from './OrgChart';

import root from '../fixtures/sample.json';
import { getNode, copyNode, assumeLanguage } from '../fixtures/utils';

const root2 = copyNode(root);

assumeLanguage(root);
assumeLanguage(root2);

const nodeA = getNode(root, '3');
const nodeA2 = getNode(root2, '3');

storiesOf('OrgChart', module)
  .add(
    'Only required options',
    () => (
      <div>
        <OrgChart
          handleItemClick={action('centre-org-chart-click')}
        />
      </div>
    ),
  )
  .add(
    'with activeUser',
    () => {
      const { boxes, lines } = calculateTree({
        nodeA,
        root,
        cardHeight: 75,
        cardWidth: 350,
      });
      return (
        <div style={{ padding: '10px' }}>
          <OrgChart
            activeCard={nodeA}
            selectedCard={nodeA}
            cards={boxes}
            lines={lines}
            buttonTitle="!name!'s profile"
            handleItemClick={action('profile-button-click')}
            style={{ height: '550px' }}
            cardWidth={350}
            cardHeight={75}
          />
        </div>
      );
    },
  )
  .add(
    'using minichart',
    () => {
      const { boxes: cards, lines } = calculateTree({
        nodeA,
        root,
        cardHeight: 75,
        cardWidth: 350,
      });
      const { boxes: miniCards, lines: miniLines } = calculateTree({
        nodeA: nodeA2,
        root: root2,
        cardHeight: 10,
        cardWidth: 47,
        cardPadding: 10,
      });
      return (
        <div style={{ padding: '10px' }}>
          <OrgChart
            activeCard={nodeA}
            selectedCard={nodeA}
            cards={cards}
            lines={lines}
            buttonTitle="!name!'s profile"
            handleItemClick={action('profile-button-click')}
            style={{ height: '550px' }}
            cardWidth={350}
            cardHeight={75}
            miniCards={miniCards}
            miniLines={miniLines}
            miniSelectedNode={nodeA2}
          />
        </div>
      );
    },
  );