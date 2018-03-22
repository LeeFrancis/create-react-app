import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';
import App from './components/App';
import configureStore from './utils/configureStore';

// Uncomment this when you are done developing your app..
// import registerServiceWorker from './registerServiceWorker';

// Get initial state from server-side rendering
// eslint-disable-next-line no-underscore-dangle, no-undef
const initialState = window.__INITIAL_STATE__;
const history = createHistory();
const store = configureStore(history, initialState);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  // eslint-disable-next-line no-undef
  document.getElementById('root'),
);

// Uncomment this when you are done developing your app..
// registerServiceWorker();
