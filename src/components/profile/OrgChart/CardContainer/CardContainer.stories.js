import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { calculateTree, getNode } from '../algorithm/nrc_orgchart_placement';

import CardContainer from './CardContainer';

import root from '../fixtures/sample.json';
import { assumeLanguage } from '../fixtures/utils';

assumeLanguage(root, 'en_CA');

const nodeA = getNode(root, '3');

storiesOf('OrgChart/CardContainer', module)
  .addParameters({
    info: { header: true, inline: true, source: false },
  })
  .add(
    'Only required options',
    () => (
      <div>
        <CardContainer
          cardWidth={350}
          cardHeight={75}
        />
      </div>
    )
  )
  .add(
    'with cardClickUrl',
    () => {
      const { boxes, lines } = calculateTree({
        nodeA,
        root,
        cardHeight: 75,
        cardWidth: 350,
      });
      return (
        <div>
          <CardContainer
            cardWidth={350}
            cardHeight={75}
            cards={boxes}
            lines={lines}
            cardClickUrl="/path/to/!uuid!"
            onCardClick={(card, e) => e.preventDefault()}
          />
        </div>
      );
    }
  )
  .add(
    'with click handlers',
    () => {
      const { boxes, lines } = calculateTree({
        nodeA,
        root,
        cardHeight: 75,
        cardWidth: 350,
      });
      return (
        <div>
          <CardContainer
            cardWidth={350}
            cardHeight={75}
            cards={boxes}
            lines={lines}
            onCardClick={(card, e) => action(`card - ${card.node.name}`)(e)}
            onButtonClick={(card, e) => action(`btn - ${card.node.name}`)(e)}
          />
        </div>
      );
    }
  )
  .add(
    'with button title',
    () => {
      const { boxes, lines } = calculateTree({
        nodeA,
        root,
        cardHeight: 75,
        cardWidth: 350,
      });
      return (
        <div>
          <CardContainer
            cardWidth={350}
            cardHeight={75}
            cards={boxes}
            lines={lines}
            buttonTitle="button for !name!, !uuid!"
          />
        </div>
      );
    }
  )
  .add(
    'with custom styles (backgroundColor=#ccc)',
    () => {
      const { boxes, lines } = calculateTree({
        nodeA,
        root,
        cardHeight: 75,
        cardWidth: 350,
      });
      return (
        <div>
          <CardContainer
            cardWidth={350}
            cardHeight={75}
            cards={boxes}
            lines={lines}
            style={{
              backgroundColor: '#ccc',
            }}
          />
        </div>
      );
    }
  )
  .add(
    'with selectedCard',
    () => {
      const { boxes, lines } = calculateTree({
        nodeA,
        root,
        cardHeight: 75,
        cardWidth: 350,
      });
      return (
        <div>
          <CardContainer
            cardWidth={350}
            cardHeight={75}
            cards={boxes}
            lines={lines}
            selectedCard={nodeA}
          />
        </div>
      );
    }
  )
  .add(
    'With no selected card',
    () => {
      const { boxes, lines } = calculateTree({
        nodeA,
        root,
        cardHeight: 75,
        cardWidth: 350,
      });
      return (
        <div>
          <CardContainer
            selectedCard={nodeA.parent}
            cards={boxes}
            lines={lines}
            buttonTitle="!name!'s profile"
            onButtonClick={action('profile-button-click')}
            cardWidth={350}
            cardHeight={75}
            style={{ height: '600px' }}
          />
        </div>
      );
    }
  );
// .add(
//   'Controlled example (navigation)',
//   () => (
//     <div>
//       <NavigationComponent />
//     </div>
//   ),
// );

