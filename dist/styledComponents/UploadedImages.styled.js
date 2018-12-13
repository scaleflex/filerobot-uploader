'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UploadInputBox = exports.UploadBoxIcon = exports.Content = exports.UploadBox = exports.UploadBoxWrapper = exports.NavItem = exports.Nav = exports.HeaderWrap = exports.UploadedImages = undefined;

var _templateObject = _taggedTemplateLiteral(['\n  display: flex;\n  flex-direction: column;\n  padding: 10px 15px;\n  height: 100%;\n  box-sizing: border-box;\n'], ['\n  display: flex;\n  flex-direction: column;\n  padding: 10px 15px;\n  height: 100%;\n  box-sizing: border-box;\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding-bottom: 10px;\n'], ['\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding-bottom: 10px;\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n  display: flex;\n  justify-content: space-between;\n'], ['\n  display: flex;\n  justify-content: space-between;\n']),
    _templateObject4 = _taggedTemplateLiteral(['\n  color: ', ';\n  font-size: 14px;\n  padding-right: 25px;\n  cursor: pointer;\n  text-decoration: ', ';\n'], ['\n  color: ', ';\n  font-size: 14px;\n  padding-right: 25px;\n  cursor: pointer;\n  text-decoration: ', ';\n']),
    _templateObject5 = _taggedTemplateLiteral(['\n  display: inline-block;\n  width: ', 'px !important;\n  height: ', 'px !important;;\n'], ['\n  display: inline-block;\n  width: ', 'px !important;\n  height: ', 'px !important;;\n']),
    _templateObject6 = _taggedTemplateLiteral(['\n  width: 100%;\n  height: 100%;\n  border: 2px dashed #d8d8d8;\n  background: ', ';\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  color: #5D636B;\n  box-sizing: border-box;\n'], ['\n  width: 100%;\n  height: 100%;\n  border: 2px dashed #d8d8d8;\n  background: ', ';\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  color: #5D636B;\n  box-sizing: border-box;\n']),
    _templateObject7 = _taggedTemplateLiteral(['\n  color: #5D636B;\n  height: 100%;\n  \n  ', ' {\n    background: ', ';\n    border:  ', ';\n  }\n'], ['\n  color: #5D636B;\n  height: 100%;\n  \n  ', ' {\n    background: ', ';\n    border:  ', ';\n  }\n']),
    _templateObject8 = _taggedTemplateLiteral(['\n  font-size: 80px;\n'], ['\n  font-size: 80px;\n']),
    _templateObject9 = _taggedTemplateLiteral(['\n  width: .1px;\n  height: .1px;\n  opacity: 0;\n  overflow: hidden;\n  position: absolute;\n  zIndex: -1;\n'], ['\n  width: .1px;\n  height: .1px;\n  opacity: 0;\n  overflow: hidden;\n  position: absolute;\n  zIndex: -1;\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var UploadedImages = exports.UploadedImages = _styledComponents2.default.div(_templateObject);

var HeaderWrap = exports.HeaderWrap = _styledComponents2.default.div(_templateObject2);

var Nav = exports.Nav = _styledComponents2.default.nav(_templateObject3);

var NavItem = exports.NavItem = _styledComponents2.default.span(_templateObject4, function (props) {
  return props.active ? '#1e262c' : '#70777f';
}, function (props) {
  return props.active ? 'underline' : 'none';
});

var UploadBoxWrapper = exports.UploadBoxWrapper = _styledComponents2.default.div(_templateObject5, function (props) {
  return props.columnWidth || 300;
}, function (props) {
  return props.height || 200;
});

var UploadBox = exports.UploadBox = _styledComponents2.default.div(_templateObject6, function (props) {
  return props.isDragOver ? 'rgba(210, 253, 207, 0.5)' : '#f5f5f5';
});

var Content = exports.Content = _styledComponents2.default.div(_templateObject7, UploadBox, function (props) {
  return props.isDragOver ? 'rgba(210, 253, 207, 0.5) !important' : '#f5f5f5';
}, function (props) {
  return props.isDragOver ? '2px dashed #888888' : '2px dashed #d8d8d8';
});

var UploadBoxIcon = exports.UploadBoxIcon = _styledComponents2.default.span(_templateObject8);

var UploadInputBox = exports.UploadInputBox = _styledComponents2.default.input(_templateObject9);