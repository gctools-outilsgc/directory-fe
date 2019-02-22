import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.createPortal = node => React.createElement("portal-dummy", null, node);

import initStoryshots from '@storybook/addon-storyshots';

initStoryshots();
