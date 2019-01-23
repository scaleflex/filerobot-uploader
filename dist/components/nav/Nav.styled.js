'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tab = undefined;

var _templateObject = _taggedTemplateLiteral(['\n  font-family: Roboto, sans-serif;\n  color: ', ';\n  background-color: ', ';\n  text-decoration: none;\n  font-size: 12px;\n  line-height: 21px;\n  padding: 9px 12px;\n  cursor: pointer;\n  border-radius: 3px 3px 0 0;\n  border-left: 2px solid transparent;\n  border-right: 2px solid transparent;\n  border-top: 2px solid transparent;\n  border-bottom: 2px solid transparent;\n  text-transform: uppercase;\n  font-weight: 400;\n  display: inline-block;\n  vertical-align: top;\n\n  :first-child {\n    margin-left: 5px;\n  }\n\n  :hover {\n    color: #fff;\n  }\n\n  i {\n    font-size: 21px;\n    line-height: 21px;\n    margin-right: 5px;\n    display: inline-block;\n    vertical-align: middle;\n  }\n\n  span {\n    display: inline-block;\n    vertical-align: middle;\n    \n    @media screen and (max-width: 850px) {\n      display: none;\n    }\n  }\n'], ['\n  font-family: Roboto, sans-serif;\n  color: ', ';\n  background-color: ', ';\n  text-decoration: none;\n  font-size: 12px;\n  line-height: 21px;\n  padding: 9px 12px;\n  cursor: pointer;\n  border-radius: 3px 3px 0 0;\n  border-left: 2px solid transparent;\n  border-right: 2px solid transparent;\n  border-top: 2px solid transparent;\n  border-bottom: 2px solid transparent;\n  text-transform: uppercase;\n  font-weight: 400;\n  display: inline-block;\n  vertical-align: top;\n\n  :first-child {\n    margin-left: 5px;\n  }\n\n  :hover {\n    color: #fff;\n  }\n\n  i {\n    font-size: 21px;\n    line-height: 21px;\n    margin-right: 5px;\n    display: inline-block;\n    vertical-align: middle;\n  }\n\n  span {\n    display: inline-block;\n    vertical-align: middle;\n    \n    @media screen and (max-width: 850px) {\n      display: none;\n    }\n  }\n']);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Tab = exports.Tab = _styledComponents2.default.a(_templateObject, function (props) {
  return props.selected ? '#fff' : '#c0c1c1';
}, function (props) {
  return props.selected ? 'rgb(64, 84, 91)' : 'transparent';
});