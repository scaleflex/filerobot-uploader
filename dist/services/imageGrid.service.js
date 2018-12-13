'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getColumnCount = exports.getColumnCount = function getColumnCount(containerWidth, columnWidth, gutterSize) {
  return Math.floor((containerWidth + gutterSize) / (columnWidth + gutterSize));
};

var getColumnWidth = exports.getColumnWidth = function getColumnWidth(containerWidth, columnCount, gutterSize) {
  return (containerWidth - (columnCount - 1) * gutterSize) / columnCount;
};

var getActualColumnWidth = exports.getActualColumnWidth = function getActualColumnWidth() {
  var containerWidth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var minColumnWidth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;
  var gutterSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;

  var columnCount = getColumnCount(containerWidth, minColumnWidth, gutterSize);

  return getColumnWidth(containerWidth, columnCount, gutterSize);
};

var getResizeImageUrl = exports.getResizeImageUrl = function getResizeImageUrl() {
  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;
  return 'https://scaleflex.cloudimg.io/width/' + Math.round(width) + '/s/' + url;
};

var getFitResizeImageUrl = exports.getFitResizeImageUrl = function getFitResizeImageUrl() {
  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;
  var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 200;
  return 'https://scaleflex.cloudimg.io/fit/' + Math.round(width) + 'x' + Math.round(height) + '/ffffff/' + url;
};

var getCropImageUrl = exports.getCropImageUrl = function getCropImageUrl() {
  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;
  var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 200;
  return 'https://scaleflex.cloudimg.io/crop/' + Math.round(width) + 'x' + Math.round(height) + '/s/' + url;
};