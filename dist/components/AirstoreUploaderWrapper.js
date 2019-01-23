'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getReducers = exports.createAirstoreUploaderStore = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _module = require('../module.hot');

var _module2 = _interopRequireDefault(_module);

var _AirstoreUploader = require('./AirstoreUploader');

var _AirstoreUploader2 = _interopRequireDefault(_AirstoreUploader);

var _reducers = require('../reducers');

var _reactI18nify = require('react-i18nify');

var _translations = require('../assets/translations');

var translations = _interopRequireWildcard(_translations);

require('../assets/fonts/scaleflex-icon-font.css');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

_reactI18nify.I18n.setTranslations(translations);

exports.default = function (_ref) {
  var initialOptions = _ref.initialOptions,
      _ref$opened = _ref.opened,
      opened = _ref$opened === undefined ? false : _ref$opened,
      _ref$onClose = _ref.onClose,
      onClose = _ref$onClose === undefined ? function () {} : _ref$onClose,
      _ref$initialTab = _ref.initialTab,
      initialTab = _ref$initialTab === undefined ? null : _ref$initialTab,
      otherProps = _objectWithoutProperties(_ref, ['initialOptions', 'opened', 'onClose', 'initialTab']);

  return _react2.default.createElement(_AirstoreUploader2.default, _extends({
    opened: opened,
    onClose: onClose,
    initialTab: initialTab,
    initialOptions: initialOptions
  }, otherProps));
};

var createAirstoreUploaderStore = function createAirstoreUploaderStore() {
  return (0, _module2.default)();
};

exports.createAirstoreUploaderStore = createAirstoreUploaderStore;
exports.getReducers = _reducers.getReducers;