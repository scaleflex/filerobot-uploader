'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AirstoreUploaderWrapper = require('./components/AirstoreUploaderWrapper');

Object.defineProperty(exports, 'AirstoreUploader', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_AirstoreUploaderWrapper).default;
  }
});
Object.defineProperty(exports, 'getReducers', {
  enumerable: true,
  get: function get() {
    return _AirstoreUploaderWrapper.getReducers;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }