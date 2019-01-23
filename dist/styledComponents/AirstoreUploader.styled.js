'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dialog = undefined;

var _templateObject = _taggedTemplateLiteral(['\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  fontFamily: Roboto, sans-serif;\n  background: #181830;\n            \n  ::-webkit-scrollbar {\n    height: 6px !important;\n    width: 6px !important;\n  }\n  \n  ::-webkit-scrollbar-thumb {\n    background: rgb(221,221,221);\n    border-radius: 5px;\n  }\n  \n  * {\n      box-sizing: border-box;\n  }\n'], ['\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  fontFamily: Roboto, sans-serif;\n  background: #181830;\n            \n  ::-webkit-scrollbar {\n    height: 6px !important;\n    width: 6px !important;\n  }\n  \n  ::-webkit-scrollbar-thumb {\n    background: rgb(221,221,221);\n    border-radius: 5px;\n  }\n  \n  * {\n      box-sizing: border-box;\n  }\n']);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Dialog = exports.Dialog = _styledComponents2.default.div(_templateObject);