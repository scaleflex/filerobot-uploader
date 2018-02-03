import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from '../reducers/index';
import AirstoreUploader from './AirstoreUploader';

var store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default (function (options) {
  return React.createElement(
    Provider,
    { store: store },
    React.createElement(AirstoreUploader, { initialOptions: options })
  );
});

window.AirstoreUploader = window.AirstoreUploader || {};
window.AirstoreUploader.open = function () {
  return store.dispatch({ type: 'MODAL_OPEN' });
};