import React from 'react';
import { storiesOf } from '@storybook/react';

import { calculateTree, getNode } from '../algorithm/nrc_orgchart_placement';

import root from '../fixtures/sample.json';
import { assumeLanguage } from '../fixtures/utils';

import '../fixtures/placement.css';

assumeLanguage(root);
const nodeA = getNode(root, '4');

storiesOf('OrgChart/Placement Algorithm', module)
  .add(
    'Using sample data',
    () => {
      const size = {
        width: 150,
        height: 50,
      };
      const { boxes, lines } = calculateTree({
        nodeA,
        root,
        cardHeight: size.height,
        cardWidth: size.width,
      });
      const svgWidth = Math.max(...boxes.map(b => b.x)) + size.width;
      const svgHeight = Math.max(...boxes.map(b => b.y));

      const getClasses = (pos) => {
        const classes = [`priority_${pos.priority}`];
        if (pos.id === nodeA.uuid) {
          classes.push('active');
        }
        if (!pos.on_path) {
          classes.push('faded');
        }
        return classes.join(' ');
      };

      return (
        <div style={{ margin: '20px' }}>
          <div
            className="orgChart"
            id="orgChart"
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
            {boxes.map(pos => (
              <div
                key={pos.id}
                className={getClasses(pos)}
                style={{
                  left: pos.x,
                  top: pos.y,
                  width: size.width,
                  height: size.height,
                }}
              >
                <img
                  src={pos.node.avatar}
                  alt={`${pos.node.name}`}
                />
                <p>{pos.node.row},{pos.node.col} {pos.node.name}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }
  );
