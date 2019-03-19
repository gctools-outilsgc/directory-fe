import React from 'react';
import ReactDOM from 'react-dom';

import initStoryshots, { multiSnapshotWithOptions }
  from '@storybook/addon-storyshots';

ReactDOM.createPortal = node => React.createElement("portal-dummy", null, node);

// Don't switch languages during tests
localizer.domainsReady = () => ({ then: () => {} });

initStoryshots({
    suite: 'FileProperties',
    test: multiSnapshotWithOptions({}),
});
