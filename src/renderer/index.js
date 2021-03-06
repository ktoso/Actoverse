import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './js/store';
import Root from './js/components/Root';

import 'css/base';
import 'bootstrap/dist/css/bootstrap';

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root')
);

window._store = store;
