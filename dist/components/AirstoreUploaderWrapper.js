import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from '../reducers/index';
import AirstoreUploader from './AirstoreUploader';

var store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default (function (_ref) {
  var initialOptions = _ref.initialOptions,
      _ref$opened = _ref.opened,
      opened = _ref$opened === undefined ? false : _ref$opened,
      _ref$onClose = _ref.onClose,
      onClose = _ref$onClose === undefined ? null : _ref$onClose,
      _ref$initialTab = _ref.initialTab,
      initialTab = _ref$initialTab === undefined ? null : _ref$initialTab;
  return React.createElement(
    Provider,
    { store: store },
    React.createElement(AirstoreUploader, {
      opened: opened,
      onClose: onClose,
      initialTab: initialTab,
      initialOptions: initialOptions
    })
  );
});

window.AirstoreUploader = window.AirstoreUploader || {};
window.AirstoreUploader.open = function (tabName) {
  return store.dispatch({ type: 'MODAL_OPEN', payload: tabName });
};