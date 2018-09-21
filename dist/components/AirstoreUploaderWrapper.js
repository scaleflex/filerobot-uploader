var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../module.hot';
import AirstoreUploader from './AirstoreUploader';
import { getReducers } from '../reducers';

export default (function (_ref) {
  var initialOptions = _ref.initialOptions,
      _ref$opened = _ref.opened,
      opened = _ref$opened === undefined ? false : _ref$opened,
      _ref$onClose = _ref.onClose,
      onClose = _ref$onClose === undefined ? null : _ref$onClose,
      _ref$initialTab = _ref.initialTab,
      initialTab = _ref$initialTab === undefined ? null : _ref$initialTab,
      AirstoreUploaderStore = _ref.AirstoreUploaderStore,
      otherProps = _objectWithoutProperties(_ref, ['initialOptions', 'opened', 'onClose', 'initialTab', 'AirstoreUploaderStore']);

  AirstoreUploaderStore = AirstoreUploaderStore || configureStore();

  return React.createElement(AirstoreUploader, _extends({
    opened: opened,
    onClose: onClose,
    initialTab: initialTab,
    initialOptions: initialOptions
  }, otherProps));
});

var createAirstoreUploaderStore = function createAirstoreUploaderStore() {
  return configureStore();
};

export { createAirstoreUploaderStore, getReducers };