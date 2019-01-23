'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getReducers = undefined;

var _uploader = require('./uploader.reducer');

Object.keys(_uploader).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _uploader[key];
    }
  });
});

var _icons = require('./icons.reducer');

Object.keys(_icons).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _icons[key];
    }
  });
});

var _images = require('./images.reducer');

Object.keys(_images).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _images[key];
    }
  });
});

var _redux = require('redux');

var _uploader2 = _interopRequireDefault(_uploader);

var _icons2 = _interopRequireDefault(_icons);

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