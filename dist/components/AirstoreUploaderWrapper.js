import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../../module.hot';
import AirstoreUploader from './AirstoreUploader';

export default (function (_ref) {
  var initialOptions = _ref.initialOptions,
      _ref$opened = _ref.opened,
      opened = _ref$opened === undefined ? false : _ref$opened,
      _ref$onClose = _ref.onClose,
      onClose = _ref$onClose === undefined ? null : _ref$onClose,
      _ref$initialTab = _ref.initialTab,
      initialTab = _ref$initialTab === undefined ? null : _ref$initialTab,
      AirstoreUploaderStore = _ref.AirstoreUploaderStore;

  AirstoreUploaderStore = AirstoreUploaderStore || configureStore();

  return React.createElement(
    Provider,
    { store: AirstoreUploaderStore },
    React.createElement(AirstoreUploader, {
      opened: opened,
      onClose: onClose,
      initialTab: initialTab,
      initialOptions: initialOptions
    })
  );
});

var createAirstoreUploaderStore = function createAirstoreUploaderStore() {
  return configureStore();
};

export { createAirstoreUploaderStore };