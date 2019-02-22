import React from 'react';
import ReactDOM from 'react-dom';

import initStoryshots, { multiSnapshotWithOptions }
  from '@storybook/addon-storyshots';

ReactDOM.createPortal = node => React.createElement("portal-dummy", null, node);

initStoryshots({
    suite: 'FileProperties',
    test: multiSnapshotWithOptions({}),
});
