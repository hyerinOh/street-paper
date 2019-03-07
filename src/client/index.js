import React from 'react';
import ReactDOM from 'react-dom';
import './App.less';
import logger from 'redux-logger';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './containers/App';
import Reducer from './reducers/Reducer';

process.env.REACT_APP_HTTPS = true;

const store = createStore(Reducer, applyMiddleware(logger));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
