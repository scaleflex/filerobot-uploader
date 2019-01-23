'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditIcon = exports.ImageName = exports.ImageDescription = exports.ShowMoreResultsSpinner = exports.ApplyColorBtn = exports.ShowMoreResultsSpinnerWrapper = exports.ColorFilterItem = exports.ColorFilterBox = exports.ColorFilterItemWrapper = exports.SketchPickerOverlay = exports.SketchPickerWrapper = exports.AddColorBtn = exports.ImagesListContainer = exports.ImageContainer = exports.Img = exports.ImageWrapper = exports.EditIconWrapper = exports.TabWrap = exports.ColorItemName = exports.ColorItem = exports.ColorType = exports.SideBar = exports.SidebarWrap = undefined;

var _templateObject = _taggedTemplateLiteral(['\n  width: 160px;\n  border-right: 1px solid rgb(221, 221, 221);\n  position: relative;\n'], ['\n  width: 160px;\n  border-right: 1px solid rgb(221, 221, 221);\n  position: relative;\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  overflow: auto;\n  height: 100%;\n  top: 0;\n  position: absolute;\n  width: 100%;\n  padding-top: 5px;\n  box-sizing: border-box;\n'], ['\n  overflow: auto;\n  height: 100%;\n  top: 0;\n  position: absolute;\n  width: 100%;\n  padding-top: 5px;\n  box-sizing: border-box;\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n  margin-bottom: 15px;\n  margin-top: 15px;\n'], ['\n  margin-bottom: 15px;\n  margin-top: 15px;\n']),
    _templateObject4 = _taggedTemplateLiteral(['\n  position: relative;\n  padding: 10px 5px;\n  border-left: ', ';\n  font-size: 12px;\n  color: #1e262c;\n  text-transform: capitalize;\n  display: flex;\n  cursor: pointer;\n  background: ', ';\n  \n  :hover {\n    background: #fff;\n  }\n'], ['\n  position: relative;\n  padding: 10px 5px;\n  border-left: ', ';\n  font-size: 12px;\n  color: #1e262c;\n  text-transform: capitalize;\n  display: flex;\n  cursor: pointer;\n  background: ', ';\n  \n  :hover {\n    background: #fff;\n  }\n']),
    _templateObject5 = _taggedTemplateLiteral(['\n  margin-left: 5px;\n'], ['\n  margin-left: 5px;\n']),
    _templateObject6 = _taggedTemplateLiteral(['\n  display: flex;\n  height: 100%;\n'], ['\n  display: flex;\n  height: 100%;\n']),
    _templateObject7 = _taggedTemplateLiteral(['\n  display: none;\n  vertical-align: middle;\n  width: 20px;\n  height: 20px;\n  padding: 4px;\n  z-index: 50;\n  \n  :hover {\n    background: #d1d1d8;\n  }\n'], ['\n  display: none;\n  vertical-align: middle;\n  width: 20px;\n  height: 20px;\n  padding: 4px;\n  z-index: 50;\n  \n  :hover {\n    background: #d1d1d8;\n  }\n']),
    _templateObject8 = _taggedTemplateLiteral(['\n  width: 100%;\n  height: ', 'px;\n  vertical-align: middle;\n  overflow: hidden;\n  position: relative;\n  transition: all 200ms ease-in;\n  cursor: pointer;\n  \n  :hover img {\n    transform: scale(1.1);\n  }\n  \n  :hover ', ' {\n    display: inline-block;\n  }\n  \n  :after {\n    visibility: hidden;\n    position: absolute;\n    content: \'\';\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background: rgba(255, 255, 255, 0);\n    z-index: 1;\n    transition: all 200ms ease-in;\n  }\n  \n  :hover:after {\n    visibility: visible;\n    /*background: rgba(255, 255, 255, 0.3);*/\n  }\n'], ['\n  width: 100%;\n  height: ', 'px;\n  vertical-align: middle;\n  overflow: hidden;\n  position: relative;\n  transition: all 200ms ease-in;\n  cursor: pointer;\n  \n  :hover img {\n    transform: scale(1.1);\n  }\n  \n  :hover ', ' {\n    display: inline-block;\n  }\n  \n  :after {\n    visibility: hidden;\n    position: absolute;\n    content: \'\';\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background: rgba(255, 255, 255, 0);\n    z-index: 1;\n    transition: all 200ms ease-in;\n  }\n  \n  :hover:after {\n    visibility: visible;\n    /*background: rgba(255, 255, 255, 0.3);*/\n  }\n']),
    _templateObject9 = _taggedTemplateLiteral(['\n  width: 100%;\n  vertical-align: middle;\n  height: ', 'px;\n  opacity: 1;\n  transition: all 0.3s;\n  background: rgba(155, 155, 155, .15);\n  -moz-transform: scale(1);\n  transition: all 200ms ease-in;\n  cursor: pointer;\n'], ['\n  width: 100%;\n  vertical-align: middle;\n  height: ', 'px;\n  opacity: 1;\n  transition: all 0.3s;\n  background: rgba(155, 155, 155, .15);\n  -moz-transform: scale(1);\n  transition: all 200ms ease-in;\n  cursor: pointer;\n']),
    _templateObject10 = _taggedTemplateLiteral(['\n  display: block;\n  flexWrap: wrap;\n  align-items: stretch;\n  padding-right: 10;\n  font-family: Roboto, sans-serif;\n  flex: 1 1 0%;\n  overflow: hidden;\n  height: 100%;\n  max-height: 100%;\n  min-height: 100%;\n'], ['\n  display: block;\n  flexWrap: wrap;\n  align-items: stretch;\n  padding-right: 10;\n  font-family: Roboto, sans-serif;\n  flex: 1 1 0%;\n  overflow: hidden;\n  height: 100%;\n  max-height: 100%;\n  min-height: 100%;\n']),
    _templateObject11 = _taggedTemplateLiteral(['\n  padding: 0 10px;\n  height: calc(100% - 119px);\n  position: relative;\n  \n  > div {\n    height: 100%;\n    \n    > div {\n      height: 100% !important;\n    }\n  }\n'], ['\n  padding: 0 10px;\n  height: calc(100% - 119px);\n  position: relative;\n  \n  > div {\n    height: 100%;\n    \n    > div {\n      height: 100% !important;\n    }\n  }\n']),
    _templateObject12 = _taggedTemplateLiteral(['\n  display: inline-block;\n  //padding: 6px 12px;\n  //border: 1px solid #ccc;\n  margin: 5px 4px;\n  //border-radius: 4px;\n  //color: #70777f;\n  cursor: pointer;\n  position: relative;\n  font-size: 13px;\n  //width: calc(100% - 32px);\n  //text-align: center;\n  color: #00707b;\n  \n  :hover {\n    //border: 1px solid #7f7f7f;\n    color: #00505b;\n  }\n    \n  ', '\n'], ['\n  display: inline-block;\n  //padding: 6px 12px;\n  //border: 1px solid #ccc;\n  margin: 5px 4px;\n  //border-radius: 4px;\n  //color: #70777f;\n  cursor: pointer;\n  position: relative;\n  font-size: 13px;\n  //width: calc(100% - 32px);\n  //text-align: center;\n  color: #00707b;\n  \n  :hover {\n    //border: 1px solid #7f7f7f;\n    color: #00505b;\n  }\n    \n  ', '\n']),
    _templateObject13 = _taggedTemplateLiteral(['\n  position: absolute;\n  z-index: 5;\n  left: 180px;\n  top: 10px;\n  background: #fff;\n  padding: 5px;\n  border-radius: 4px;\n'], ['\n  position: absolute;\n  z-index: 5;\n  left: 180px;\n  top: 10px;\n  background: #fff;\n  padding: 5px;\n  border-radius: 4px;\n']),
    _templateObject14 = _taggedTemplateLiteral(['\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n'], ['\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n']),
    _templateObject15 = _taggedTemplateLiteral(['\n  display: inline-block;\n  padding: 2px;\n  padding-right: 18px;\n  border-radius: 2px;\n  background-color: #fff;\n  position: relative;\n  margin-top: 4px;\n  margin-left: 4px;\n  border: 1px solid #ccc;\n'], ['\n  display: inline-block;\n  padding: 2px;\n  padding-right: 18px;\n  border-radius: 2px;\n  background-color: #fff;\n  position: relative;\n  margin-top: 4px;\n  margin-left: 4px;\n  border: 1px solid #ccc;\n']),
    _templateObject16 = _taggedTemplateLiteral(['\n  display: inline-block;\n  width: 20px;\n  height: 20px;\n  vertical-align: middle;\n  background-color: ', ';\n  border-radius: 2px;\n'], ['\n  display: inline-block;\n  width: 20px;\n  height: 20px;\n  vertical-align: middle;\n  background-color: ', ';\n  border-radius: 2px;\n']),
    _templateObject17 = _taggedTemplateLiteral(['\n  display: ', ';\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  height: 100px !important;\n  \n  > div:first-child {\n    opacity: 0.6;\n  }\n  \n  > div:last-child {\n    height: 1em !important;\n  }\n'], ['\n  display: ', ';\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  height: 100px !important;\n  \n  > div:first-child {\n    opacity: 0.6;\n  }\n  \n  > div:last-child {\n    height: 1em !important;\n  }\n']),
    _templateObject18 = _taggedTemplateLiteral(['\n  margin-top: 5px;\n  width: 100%;\n  font-weight: 400;\n  text-transform: none;\n'], ['\n  margin-top: 5px;\n  width: 100%;\n  font-weight: 400;\n  text-transform: none;\n']),
    _templateObject19 = _taggedTemplateLiteral(['\n  box-sizing: border-box;\n  background: gainsboro;\n  z-index: 50;\n  position: relative;\n  \n  * {\n    box-sizing: border-box;\n  }\n'], ['\n  box-sizing: border-box;\n  background: gainsboro;\n  z-index: 50;\n  position: relative;\n  \n  * {\n    box-sizing: border-box;\n  }\n']),
    _templateObject20 = _taggedTemplateLiteral(['\n  height: 20px; \n  font-size: 12px;\n  font-weight: 300;\n  display: inline-block;\n  vertical-align: middle;\n  line-height: 20px;\n  width: calc(100% - 20px);\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  padding: 0 5px 0 25px;\n  text-align: center;\n'], ['\n  height: 20px; \n  font-size: 12px;\n  font-weight: 300;\n  display: inline-block;\n  vertical-align: middle;\n  line-height: 20px;\n  width: calc(100% - 20px);\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  padding: 0 5px 0 25px;\n  text-align: center;\n']),
    _templateObject21 = _taggedTemplateLiteral(['\n  display: inline-block;\n  vertical-align: top;\n  background: url(\'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjUyOC44OTlweCIgaGVpZ2h0PSI1MjguODk5cHgiIHZpZXdCb3g9IjAgMCA1MjguODk5IDUyOC44OTkiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUyOC44OTkgNTI4Ljg5OTsiDQoJIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPHBhdGggZD0iTTMyOC44ODMsODkuMTI1bDEwNy41OSwxMDcuNTg5bC0yNzIuMzQsMjcyLjM0TDU2LjYwNCwzNjEuNDY1TDMyOC44ODMsODkuMTI1eiBNNTE4LjExMyw2My4xNzdsLTQ3Ljk4MS00Ny45ODENCgkJYy0xOC41NDMtMTguNTQzLTQ4LjY1My0xOC41NDMtNjcuMjU5LDBsLTQ1Ljk2MSw0NS45NjFsMTA3LjU5LDEwNy41OWw1My42MTEtNTMuNjExDQoJCUM1MzIuNDk1LDEwMC43NTMsNTMyLjQ5NSw3Ny41NTksNTE4LjExMyw2My4xNzd6IE0wLjMsNTEyLjY5Yy0xLjk1OCw4LjgxMiw1Ljk5OCwxNi43MDgsMTQuODExLDE0LjU2NWwxMTkuODkxLTI5LjA2OQ0KCQlMMjcuNDczLDM5MC41OTdMMC4zLDUxMi42OXoiLz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K\') 50% 50% / cover no-repeat;\n  width: 12px;\n  height: 12px;\n'], ['\n  display: inline-block;\n  vertical-align: top;\n  background: url(\'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjUyOC44OTlweCIgaGVpZ2h0PSI1MjguODk5cHgiIHZpZXdCb3g9IjAgMCA1MjguODk5IDUyOC44OTkiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUyOC44OTkgNTI4Ljg5OTsiDQoJIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPHBhdGggZD0iTTMyOC44ODMsODkuMTI1bDEwNy41OSwxMDcuNTg5bC0yNzIuMzQsMjcyLjM0TDU2LjYwNCwzNjEuNDY1TDMyOC44ODMsODkuMTI1eiBNNTE4LjExMyw2My4xNzdsLTQ3Ljk4MS00Ny45ODENCgkJYy0xOC41NDMtMTguNTQzLTQ4LjY1My0xOC41NDMtNjcuMjU5LDBsLTQ1Ljk2MSw0NS45NjFsMTA3LjU5LDEwNy41OWw1My42MTEtNTMuNjExDQoJCUM1MzIuNDk1LDEwMC43NTMsNTMyLjQ5NSw3Ny41NTksNTE4LjExMyw2My4xNzd6IE0wLjMsNTEyLjY5Yy0xLjk1OCw4LjgxMiw1Ljk5OCwxNi43MDgsMTQuODExLDE0LjU2NWwxMTkuODkxLTI5LjA2OQ0KCQlMMjcuNDczLDM5MC41OTdMMC4zLDUxMi42OXoiLz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K\') 50% 50% / cover no-repeat;\n  width: 12px;\n  height: 12px;\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _CloseBtn = require('../components/CloseBtn');

var _Button = require('../components/Button');

var _Spinner = require('../components/Spinner');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var SidebarWrap = exports.SidebarWrap = _styledComponents2.default.div(_templateObject);

var SideBar = exports.SideBar = _styledComponents2.default.div(_templateObject2);

var ColorType = exports.ColorType = _styledComponents2.default.div(_templateObject3);

var ColorItem = exports.ColorItem = _styledComponents2.default.div.attrs({ className: function className(props) {
    return props.active ? 'ae-color-item' : '';
  } })(_templateObject4, function (props) {
  return props.active ? '6px solid #00707c' : '6px solid transparent';
}, function (props) {
  return props.active ? '#fff' : 'transparent';
});

var ColorItemName = exports.ColorItemName = _styledComponents2.default.span(_templateObject5);

var TabWrap = exports.TabWrap = _styledComponents2.default.div(_templateObject6);

var EditIconWrapper = exports.EditIconWrapper = _styledComponents2.default.div(_templateObject7);

var ImageWrapper = exports.ImageWrapper = _styledComponents2.default.div(_templateObject8, function (props) {
  return props.height;
}, EditIconWrapper);

var Img = exports.Img = _styledComponents2.default.img(_templateObject9, function (props) {
  return props.height;
});

var ImageContainer = exports.ImageContainer = _styledComponents2.default.div(_templateObject10);

var ImagesListContainer = exports.ImagesListContainer = _styledComponents2.default.div(_templateObject11);

var AddColorBtn = exports.AddColorBtn = _styledComponents2.default.div(_templateObject12, function (props) {
  return props.hide && 'display: none;';
});

var SketchPickerWrapper = exports.SketchPickerWrapper = _styledComponents2.default.div(_templateObject13);

var SketchPickerOverlay = exports.SketchPickerOverlay = _styledComponents2.default.div(_templateObject14);

var ColorFilterItemWrapper = exports.ColorFilterItemWrapper = _styledComponents2.default.div(_templateObject15);

var ColorFilterBox = exports.ColorFilterBox = _styledComponents2.default.span(_templateObject16, function (props) {
  return props.color;
});

var ColorFilterItem = exports.ColorFilterItem = function ColorFilterItem(props) {
  return _react2.default.createElement(
    ColorFilterItemWrapper,
    null,
    _react2.default.createElement(ColorFilterBox, { color: props.color, onClick: function onClick() {
        props.onChangeColorFilter(props.index);
      } }),
    _react2.default.createElement(_CloseBtn.CloseBtn, {
      onClick: function onClick() {
        props.onRemoveColorFilter(props.index);
      },
      style: { top: 4, right: 1, color: '#747981', zIndex: 4, fontSize: 16 }
    })
  );
};

var ShowMoreResultsSpinnerWrapper = exports.ShowMoreResultsSpinnerWrapper = _styledComponents2.default.div(_templateObject17, function (props) {
  return props.show ? 'block' : 'none';
});

var ApplyColorBtn = exports.ApplyColorBtn = (0, _styledComponents2.default)(_Button.Button)(_templateObject18);

var ShowMoreResultsSpinner = exports.ShowMoreResultsSpinner = function ShowMoreResultsSpinner(_ref) {
  var show = _ref.show;
  return show ? _react2.default.createElement(
    ShowMoreResultsSpinnerWrapper,
    { show: show },
    _react2.default.createElement(_Spinner.Spinner, { overlay: true, show: show, style: { fontSize: 10 } })
  ) : null;
};

var ImageDescription = exports.ImageDescription = _styledComponents2.default.div(_templateObject19);

var ImageName = exports.ImageName = _styledComponents2.default.div(_templateObject20);

var EditIcon = exports.EditIcon = _styledComponents2.default.i(_templateObject21);