'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getReducers = undefined;

var _redux = require('redux');

var _uploader = require('./uploader.reducer');

var _uploader2 = _interopRequireDefault(_uploader);

var _icons = require('./icons.reducer');

var _icons2 = _interopRequireDefault(_icons);

var _images = require('./images.reducer');

var _images2 = _interopRequireDefault(_images);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.combineReducers)({
  uploader: _uploader2.default,
  icons: _icons2.default,
  images: _images2.default
});
var getReducers = exports.getReducers = function getReducers() {
  return [{
    name: 'uploader',
    reducer: _uploader2.default
  }, {
    name: 'icons',
    reducer: _icons2.default
  }, {
    name: 'images',
    reducer: _images2.default
  }];
};