'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThemeColors = exports.CountTag = exports.Icon = exports.IconWrapper = exports.IconBoxWrapperInner = exports.IconBoxWrapper = exports.Input = exports.IconMain = exports.IconTabWrapper = exports.IconsWrapper = exports.MonoActionBlock = exports.SettingsIconWrapper = exports.SettingsIcon = exports.ColorIcon = exports.ColorsWrapper = exports.Opacity = exports.IconAddTagInner = exports.MonoIconSettings = exports.ControlIcon = exports.NotRelevantBtn = exports.ActionsIconWrapper = exports.AddTagBtn = exports.HoverWrapper = exports.CloseIcon = exports.ColorWrapper = exports.Tag = exports.TagsWrapper = exports.SearchTitle = exports.SearchWrapper = exports.ButtonSearch = exports.InputSearch = exports.Label = exports.AmountIcons = exports.SearchGroup = undefined;

var _templateObject = _taggedTemplateLiteral(['\n  display: flex;\n  padding: ', ';\n  justify-content: left;\n'], ['\n  display: flex;\n  padding: ', ';\n  justify-content: left;\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  display: ', ';\n  align-items: center;\n  padding: 10px;\n  font-size: 13px;\n  color: #3f3f3f;\n'], ['\n  display: ', ';\n  align-items: center;\n  padding: 10px;\n  font-size: 13px;\n  color: #3f3f3f;\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n text-align: ', ';\n  padding: ', ';\n  font-size: ', ';\n  color: ', ';\n  border-top: ', ';\n  margin-right: ', ';\n'], ['\n text-align: ', ';\n  padding: ', ';\n  font-size: ', ';\n  color: ', ';\n  border-top: ', ';\n  margin-right: ', ';\n']),
    _templateObject4 = _taggedTemplateLiteral(['\n  height: 34px;\n  width: 300px;\n  padding: 6px 12px;\n  font-size: 14px;\n  line-height: 1.42857;\n  color: rgb(85, 85, 85);\n  background: rgb(255, 255, 255);\n  border-radius: 4px 0 0 4px;\n  box-shadow: rgba(0,0,0,0.15) 0px 2px 7px;\n  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n  border: 1px solid transparent;\n  border-right: 0px solid transparent;\n  outline: 0;\n\n  :focus {\n    border: 1px solid #5D636B;\n    border-right: 0px solid transparent;\n    outline-color: rgb(77, 144, 254);\n    outline-offset: -2px;\n    outline-style: auto;\n    outline-width: 5px;\n  }\n'], ['\n  height: 34px;\n  width: 300px;\n  padding: 6px 12px;\n  font-size: 14px;\n  line-height: 1.42857;\n  color: rgb(85, 85, 85);\n  background: rgb(255, 255, 255);\n  border-radius: 4px 0 0 4px;\n  box-shadow: rgba(0,0,0,0.15) 0px 2px 7px;\n  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n  border: 1px solid transparent;\n  border-right: 0px solid transparent;\n  outline: 0;\n\n  :focus {\n    border: 1px solid #5D636B;\n    border-right: 0px solid transparent;\n    outline-color: rgb(77, 144, 254);\n    outline-offset: -2px;\n    outline-style: auto;\n    outline-width: 5px;\n  }\n']),
    _templateObject5 = _taggedTemplateLiteral(['\n  font-family: Roboto, sans-serif;\n  height: 34px;\n  padding: 6px 12px;\n  line-height: 23px;\n  text-transform: uppercase;\n  color: #fff;\n  background-color: #00707C;\n  background-repeat: repeat-x;\n  border: none;\n  border-radius: ', ';\n  cursor: pointer;\n  font-weight: 300;\n  outline: 0;\n  font-size: 12px;\n  box-shadow: rgba(0,0,0,0.15) 0px 2px 7px;\n  font-weight: 400;\n  text-transform: none;\n\n  :hover {\n    background-color: #096868;\n  }\n\n  :focus {\n    outline-color: rgb(77, 144, 254);\n    outline-offset: -2px;\n    outline-style: auto;\n    outline-width: 5px;\n  }\n'], ['\n  font-family: Roboto, sans-serif;\n  height: 34px;\n  padding: 6px 12px;\n  line-height: 23px;\n  text-transform: uppercase;\n  color: #fff;\n  background-color: #00707C;\n  background-repeat: repeat-x;\n  border: none;\n  border-radius: ', ';\n  cursor: pointer;\n  font-weight: 300;\n  outline: 0;\n  font-size: 12px;\n  box-shadow: rgba(0,0,0,0.15) 0px 2px 7px;\n  font-weight: 400;\n  text-transform: none;\n\n  :hover {\n    background-color: #096868;\n  }\n\n  :focus {\n    outline-color: rgb(77, 144, 254);\n    outline-offset: -2px;\n    outline-style: auto;\n    outline-width: 5px;\n  }\n']),
    _templateObject6 = _taggedTemplateLiteral(['\n  display: flex;\n  justify-content: space-between;\n  \n  ', '\n'], ['\n  display: flex;\n  justify-content: space-between;\n  \n  ', '\n']),
    _templateObject7 = _taggedTemplateLiteral(['\n  font-size: 25px;\n  margin-top: -10%;\n  font-weight: 200;\n  display: none;\n  color: rgb(93, 99, 107);\n  \n  ', '\n'], ['\n  font-size: 25px;\n  margin-top: -10%;\n  font-weight: 200;\n  display: none;\n  color: rgb(93, 99, 107);\n  \n  ', '\n']),
    _templateObject8 = _taggedTemplateLiteral(['\n  white-space: nowrap;\n  overflow: hidden;\n  overflow-x: auto;\n  margin: 10px;\n  \n  ::-webkit-scrollbar {\n    height: 6px !important;\n  }\n   \n  ::-webkit-scrollbar-thumb {\n    background: rgb(221,221,221);\n    border-radius: 5px;\n  }\n'], ['\n  white-space: nowrap;\n  overflow: hidden;\n  overflow-x: auto;\n  margin: 10px;\n  \n  ::-webkit-scrollbar {\n    height: 6px !important;\n  }\n   \n  ::-webkit-scrollbar-thumb {\n    background: rgb(221,221,221);\n    border-radius: 5px;\n  }\n']),
    _templateObject9 = _taggedTemplateLiteral(['\n  display: inline-block;\n  padding: 6px 12px;\n  border: 1px solid #ccc;\n  margin: 5px 2px;\n  border-radius: 4px;\n  color: #70777f;\n  cursor: pointer;\n  position: relative;\n  font-size: 13px;\n  \n  :first-child {\n    margin-left: 0;\n  }\n  \n  :last-child {\n    margin-right: 0;\n  }\n  \n  ', '\n  \n  ', '\n'], ['\n  display: inline-block;\n  padding: 6px 12px;\n  border: 1px solid #ccc;\n  margin: 5px 2px;\n  border-radius: 4px;\n  color: #70777f;\n  cursor: pointer;\n  position: relative;\n  font-size: 13px;\n  \n  :first-child {\n    margin-left: 0;\n  }\n  \n  :last-child {\n    margin-right: 0;\n  }\n  \n  ', '\n  \n  ', '\n']),
    _templateObject10 = _taggedTemplateLiteral(['\n  padding-bottom: 10px;\n'], ['\n  padding-bottom: 10px;\n']),
    _templateObject11 = _taggedTemplateLiteral(['\n  display: none;\n  color: #fff;\n  top: 50%;\n  margin-top: -8px;\n  right: 4px;\n  font-size: 16px;\n  \n  ', '\n'], ['\n  display: none;\n  color: #fff;\n  top: 50%;\n  margin-top: -8px;\n  right: 4px;\n  font-size: 16px;\n  \n  ', '\n']),
    _templateObject12 = _taggedTemplateLiteral(['\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  display: ', ';\n  align-items: flex-end;\n  justify-content: top;\n  padding: 6px;\n  cursor: pointer;\n'], ['\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  display: ', ';\n  align-items: flex-end;\n  justify-content: top;\n  padding: 6px;\n  cursor: pointer;\n']),
    _templateObject13 = _taggedTemplateLiteral(['\n  padding: 0 5px;\n  font-size: 10px;\n  margin-right: 2px;\n'], ['\n  padding: 0 5px;\n  font-size: 10px;\n  margin-right: 2px;\n']),
    _templateObject14 = _taggedTemplateLiteral(['\n  position: absolute;\n  top: 2px;\n  right: 2px;\n  z-index: 2;\n  text-align: right;\n'], ['\n  position: absolute;\n  top: 2px;\n  right: 2px;\n  z-index: 2;\n  text-align: right;\n']),
    _templateObject15 = _taggedTemplateLiteral(['\n  padding: 0 5px;\n  font-size: 10px;\n'], ['\n  padding: 0 5px;\n  font-size: 10px;\n']),
    _templateObject16 = _taggedTemplateLiteral(['\n  color: ', ';\n  font-size: ', 'px;\n  cursor: pointer;\n  padding-bottom: ', 'px;\n'], ['\n  color: ', ';\n  font-size: ', 'px;\n  cursor: pointer;\n  padding-bottom: ', 'px;\n']),
    _templateObject17 = _taggedTemplateLiteral(['\n  display: ', ';\n  flex-direction: column;\n  position: absolute;\n  top: 50%;\n  left: ', ';\n  margin-top: -160px;\n  margin-left: -140px;\n  background-color: rgb(245, 245, 245);\n  z-index: 3;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  border-radius: 4px;\n'], ['\n  display: ', ';\n  flex-direction: column;\n  position: absolute;\n  top: 50%;\n  left: ', ';\n  margin-top: -160px;\n  margin-left: -140px;\n  background-color: rgb(245, 245, 245);\n  z-index: 3;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  border-radius: 4px;\n']),
    _templateObject18 = _taggedTemplateLiteral(['\n  padding: 20px;\n  box-sizing: border-box;\n  text-align: center;\n  width: 280px;\n'], ['\n  padding: 20px;\n  box-sizing: border-box;\n  text-align: center;\n  width: 280px;\n']),
    _templateObject19 = _taggedTemplateLiteral(['\n  display: ', ';\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: #000;\n  opacity: .5;\n  z-index: 1;\n'], ['\n  display: ', ';\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: #000;\n  opacity: .5;\n  z-index: 1;\n']),
    _templateObject20 = _taggedTemplateLiteral(['\n  display: flex;\n  justify-content: space-between;\n  width: 100%;\n  padding-top: 10px;\n  margin-bottom: 10px;\n  position: relative;\n'], ['\n  display: flex;\n  justify-content: space-between;\n  width: 100%;\n  padding-top: 10px;\n  margin-bottom: 10px;\n  position: relative;\n']),
    _templateObject21 = _taggedTemplateLiteral(['\n  width: 20px;\n  height: 20px;\n  background-color: ', ';\n  background-image: ', ';\n  background-size: cover;\n  border-radius: 50%;\n  margin-right: 5px;\n  cursor: pointer;\n'], ['\n  width: 20px;\n  height: 20px;\n  background-color: ', ';\n  background-image: ', ';\n  background-size: cover;\n  border-radius: 50%;\n  margin-right: 5px;\n  cursor: pointer;\n']),
    _templateObject22 = _taggedTemplateLiteral(['\n  width: auto;\n  height: 100%;\n'], ['\n  width: auto;\n  height: 100%;\n']),
    _templateObject23 = _taggedTemplateLiteral(['\n  width: 100%;\n  height: 140px;\n  position: relative;\n  text-align: center;\n  padding: 20px;\n  box-sizing: border-box;\n'], ['\n  width: 100%;\n  height: 140px;\n  position: relative;\n  text-align: center;\n  padding: 20px;\n  box-sizing: border-box;\n']),
    _templateObject24 = _taggedTemplateLiteral(['\n  padding: 20px;\n  background: rgb(242, 242, 242);\n  width: 100%;\n  box-sizing: border-box;\n  text-align: center;\n  border-radius: 0 0 4px 4px;\n'], ['\n  padding: 20px;\n  background: rgb(242, 242, 242);\n  width: 100%;\n  box-sizing: border-box;\n  text-align: center;\n  border-radius: 0 0 4px 4px;\n']),
    _templateObject25 = _taggedTemplateLiteral(['\n  position: relative;\n  //display: flex;\n  //flex-wrap: wrap;\n  //align-items: stretch;\n  //justify-content: left;\n  padding: 0 10px;\n  height: calc(100% - 119px);\n  \n  > div {\n    height: 100%;\n    \n    > div {\n      height: 100% !important;\n    }\n  }\n'], ['\n  position: relative;\n  //display: flex;\n  //flex-wrap: wrap;\n  //align-items: stretch;\n  //justify-content: left;\n  padding: 0 10px;\n  height: calc(100% - 119px);\n  \n  > div {\n    height: 100%;\n    \n    > div {\n      height: 100% !important;\n    }\n  }\n']),
    _templateObject26 = _taggedTemplateLiteral(['\n  display: flex;\n  height: 100%;\n  position: relative;\n  font-family: Roboto, sans-serif;\n'], ['\n  display: flex;\n  height: 100%;\n  position: relative;\n  font-family: Roboto, sans-serif;\n']),
    _templateObject27 = _taggedTemplateLiteral(['\n  flex: 1;\n  overflow: hidden;\n  color: #5D636B;\n  height: 100%;\n  min-height: 100%;\n'], ['\n  flex: 1;\n  overflow: hidden;\n  color: #5D636B;\n  height: 100%;\n  min-height: 100%;\n']),
    _templateObject28 = _taggedTemplateLiteral(['\n  height: 26px;\n  margin-bottom: 20px;\n  margin-top: 10px;\n  width: 200px;\n'], ['\n  height: 26px;\n  margin-bottom: 20px;\n  margin-top: 10px;\n  width: 200px;\n']),
    _templateObject29 = _taggedTemplateLiteral(['\n  position: relative;\n  background: #fff;\n  boxSizing: border-box;\n  width: ', 'px;\n  height: ', 'px;\n'], ['\n  position: relative;\n  background: #fff;\n  boxSizing: border-box;\n  width: ', 'px;\n  height: ', 'px;\n']),
    _templateObject30 = _taggedTemplateLiteral(['\n  position: relative;\n\n  :focus {\n    outline-color: rgb(77, 144, 254);\n    outline-offset: -2px;\n    outline-style: auto;\n    outline-width: 5px;\n  }\n'], ['\n  position: relative;\n\n  :focus {\n    outline-color: rgb(77, 144, 254);\n    outline-offset: -2px;\n    outline-style: auto;\n    outline-width: 5px;\n  }\n']),
    _templateObject31 = _taggedTemplateLiteral(['\n  width: ', 'px;\n  height: ', 'px;\n  cursor: pointer;\n  padding: 20px;\n  box-sizing: border-box;\n'], ['\n  width: ', 'px;\n  height: ', 'px;\n  cursor: pointer;\n  padding: 20px;\n  box-sizing: border-box;\n']),
    _templateObject32 = _taggedTemplateLiteral(['\n  width: 100%;\n  height: 100%;\n  vertical-align: middle;\n  transition: all 0.3s;\n  background: rgba(255, 255, 255, 1);\n  -moz-transform: scale(1);\n  transition: all 200ms ease-in;\n  \n  ', '\n'], ['\n  width: 100%;\n  height: 100%;\n  vertical-align: middle;\n  transition: all 0.3s;\n  background: rgba(255, 255, 255, 1);\n  -moz-transform: scale(1);\n  transition: all 200ms ease-in;\n  \n  ', '\n']),
    _templateObject33 = _taggedTemplateLiteral(['\n  margin-left: 6px;\n  color: rgb(112, 118, 126);\n'], ['\n  margin-left: 6px;\n  color: rgb(112, 118, 126);\n']),
    _templateObject34 = _taggedTemplateLiteral(['\n  justify-content: center;\n  align-items: center;\n  display: flex;\n  margin-bottom: 20px;\n'], ['\n  justify-content: center;\n  align-items: center;\n  display: flex;\n  margin-bottom: 20px;\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _CloseBtn = require('../components/CloseBtn');

var _Button = require('../components/Button');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var SearchGroup = exports.SearchGroup = _styledComponents2.default.div(_templateObject, function (props) {
  return props.padding ? props.padding : '10px';
});
var AmountIcons = exports.AmountIcons = _styledComponents2.default.div(_templateObject2, function (props) {
  return props.empty ? 'none' : 'flex';
});
var Label = exports.Label = _styledComponents2.default.div(_templateObject3, function (props) {
  return props.center ? 'center' : 'left';
}, function (props) {
  return props.p ? props.p : '10px 8px';
}, function (props) {
  return props.fs ? props.fs : 'inherit';
}, function (props) {
  return props.color === 'black' ? '#1e262c' : '';
}, function (props) {
  return props.bt ? '1px solid rgb(221, 221, 221)' : 'none';
}, function (props) {
  return props.mr ? props.mr : 0;
});
var InputSearch = exports.InputSearch = _styledComponents2.default.input.attrs({
  autoFocus: true
})(_templateObject4);
var ButtonSearch = exports.ButtonSearch = _styledComponents2.default.button(_templateObject5, function (props) {
  return props.fullBr ? props.fullBr : '0 4px 4px 0';
});

var SearchWrapper = exports.SearchWrapper = _styledComponents2.default.div(_templateObject6, function (props) {
  return props.empty && '\n    height: 100%;\n    justify-content: center;\n    display: flex;\n    align-items: center;\n    flex-direction: column;\n  ';
});

var SearchTitle = exports.SearchTitle = _styledComponents2.default.h3(_templateObject7, function (props) {
  return props.show && '\n    display: block;\n  ';
});

var TagsWrapper = exports.TagsWrapper = _styledComponents2.default.div(_templateObject8);

var Tag = exports.Tag = _styledComponents2.default.div.attrs({ className: function className(props) {
    return props.active ? 'ae-tag-active' : '';
  } })(_templateObject9, function (props) {
  return props.active && '\n    background: #00707c;\n    color: #fff;\n    padding: 6px 21px 6px 9px;\n  ';
}, function (props) {
  return props.hide && 'display: none;';
});

var ColorWrapper = exports.ColorWrapper = _styledComponents2.default.div(_templateObject10);

var CloseIcon = exports.CloseIcon = (0, _styledComponents2.default)(_CloseBtn.CloseBtn)(_templateObject11, function (props) {
  return props.active && '\n    display: block;\n  ';
});

var HoverWrapper = exports.HoverWrapper = _styledComponents2.default.div(_templateObject12, function (props) {
  return props.isShow ? 'flex' : 'none';
});

var AddTagBtn = exports.AddTagBtn = (0, _styledComponents2.default)(_Button.Button)(_templateObject13);

var ActionsIconWrapper = exports.ActionsIconWrapper = _styledComponents2.default.div(_templateObject14);

var NotRelevantBtn = exports.NotRelevantBtn = (0, _styledComponents2.default)(_Button.Button)(_templateObject15);

var ControlIcon = exports.ControlIcon = _styledComponents2.default.span(_templateObject16, function (props) {
  return props.color ? props.color : '#f2f2f2';
}, function (props) {
  return props.fs ? props.fs : 25;
}, function (props) {
  return props.pb ? props.pb : '';
});

var MonoIconSettings = exports.MonoIconSettings = _styledComponents2.default.div(_templateObject17, function (props) {
  return props.isShow ? 'flex' : 'none';
}, function (props) {
  return props.displayColorPicker ? 'calc(50% - 110px)' : '50%';
});

var IconAddTagInner = exports.IconAddTagInner = _styledComponents2.default.div(_templateObject18);

var Opacity = exports.Opacity = _styledComponents2.default.div(_templateObject19, function (props) {
  return props.isShow ? 'block' : 'none';
});

var ColorsWrapper = exports.ColorsWrapper = _styledComponents2.default.div(_templateObject20);

var ColorIcon = exports.ColorIcon = _styledComponents2.default.div(_templateObject21, function (props) {
  return props.bgColor ? props.bgColor : '';
}, function (props) {
  return props.bgImage ? 'url(' + props.bgImage + ')' : '';
});

var SettingsIcon = exports.SettingsIcon = _styledComponents2.default.img(_templateObject22);

var SettingsIconWrapper = exports.SettingsIconWrapper = _styledComponents2.default.div(_templateObject23);

var MonoActionBlock = exports.MonoActionBlock = _styledComponents2.default.div(_templateObject24);

var IconsWrapper = exports.IconsWrapper = _styledComponents2.default.div(_templateObject25);

var IconTabWrapper = exports.IconTabWrapper = _styledComponents2.default.div(_templateObject26);

var IconMain = exports.IconMain = _styledComponents2.default.div(_templateObject27);

var Input = exports.Input = (0, _styledComponents2.default)(InputSearch)(_templateObject28);
var IconBoxWrapper = exports.IconBoxWrapper = _styledComponents2.default.div(_templateObject29, function (props) {
  return props.width;
}, function (props) {
  return props.height;
});

var IconBoxWrapperInner = exports.IconBoxWrapperInner = _styledComponents2.default.div(_templateObject30);
var IconWrapper = exports.IconWrapper = _styledComponents2.default.div(_templateObject31, function (props) {
  return props.width;
}, function (props) {
  return props.height;
});

var Icon = exports.Icon = _styledComponents2.default.img(_templateObject32, function (props) {
  return props.isHover && '\n    transform: scale(1.2);\n  ';
});

var CountTag = exports.CountTag = _styledComponents2.default.span(_templateObject33);

var ThemeColors = exports.ThemeColors = _styledComponents2.default.div(_templateObject34);