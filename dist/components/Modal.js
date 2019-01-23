'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Modal = exports.ModalFooter = exports.ModalHeader = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  position: fixed;\n  background: ', ';\n  opacity: .4;\n  z-index: 999999992;\n'], ['\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  position: fixed;\n  background: ', ';\n  opacity: .4;\n  z-index: 999999992;\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-box-pack: justify;\n  -webkit-justify-content: space-between;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n  padding: 15px;\n  border-bottom: 1px solid #eceeef;\n'], ['\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-box-pack: justify;\n  -webkit-justify-content: space-between;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n  padding: 15px;\n  border-bottom: 1px solid #eceeef;\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-box-pack: end;\n  -webkit-justify-content: flex-end;\n  -ms-flex-pack: end;\n  justify-content: flex-end;\n  padding: 15px;\n  border-top: 1px solid #eceeef;\n  \n  &>:not(:last-child) {\n    margin-right: .25rem;\n  }\n'], ['\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-box-pack: end;\n  -webkit-justify-content: flex-end;\n  -ms-flex-pack: end;\n  justify-content: flex-end;\n  padding: 15px;\n  border-top: 1px solid #eceeef;\n  \n  &>:not(:last-child) {\n    margin-right: .25rem;\n  }\n']),
    _templateObject4 = _taggedTemplateLiteral(['\n  position: relative;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -webkit-background-clip: padding-box;\n  background-clip: padding-box;\n  border: ', ' solid ', ';\n  border-radius: ', ';\n  overflow: hidden;\n  outline: 0;\n  height: ', ';\n  background: ', ';\n  color: ', ';\n  \n  ', ' {\n    ', '\n  }\n  \n  ', ' {\n    ', '\n  }\n'], ['\n  position: relative;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -webkit-background-clip: padding-box;\n  background-clip: padding-box;\n  border: ', ' solid ', ';\n  border-radius: ', ';\n  overflow: hidden;\n  outline: 0;\n  height: ', ';\n  background: ', ';\n  color: ', ';\n  \n  ', ' {\n    ', '\n  }\n  \n  ', ' {\n    ', '\n  }\n']),
    _templateObject5 = _taggedTemplateLiteral(['\n  azimuth: center;\n  border-collapse: separate;\n  border-spacing: 0;\n  caption-side: top;\n  cursor: auto;\n  direction: ltr;\n  elevation: level;\n  empty-cells: show;\n  font-size: medium;\n  font-style: medium;\n  font-variant: medium;\n  font-weight: medium;\n  letter-spacing: normal;\n  line-height: medium;\n  list-style-image: none;\n  list-style-position: outside;\n  list-style-type: disc;\n  list-style: disc outside none;\n  orphans: 2;\n  pitch-range: 50;\n  pitch: medium;\n  quotes: \'"\' \'"\';\n  richness: 50;\n  speak-header: once;\n  speak-numeral: continuous;\n  speak-punctuation: none;\n  speak: normal;\n  speech-rate: medium;\n  stress: 50;\n  text-align: left;\n  text-indent: 0;\n  text-transform: none;\n  visibility: visible;\n  voice-family: none;\n  volume: medium;\n  white-space: normal;\n  widows: 2;\n  word-spacing: 0;\n  position: fixed;\n  padding: ', ';\n  top: 5%;\n  left: 15%;\n  right: 15%;\n  bottom: 5%;\n  color: ', ';\n  overflow: hidden;\n  z-index: ', ';\n  display: block;\n  animation: scaleflexFadeInAnimation 350ms ease-in-out both;\n  font-family: \'Roboto\', \'Arial\', sans-serif;\n  \n  @keyframes scaleflexFadeInAnimation {\n    from {opacity: 0;}\n    to {opacity: 1;}\n  }\n  \n  @media (max-width: 500px) {\n    top: 20px;\n    left: 20px;\n    bottom: 20px;\n    right: 20px;\n  }\n'], ['\n  azimuth: center;\n  border-collapse: separate;\n  border-spacing: 0;\n  caption-side: top;\n  cursor: auto;\n  direction: ltr;\n  elevation: level;\n  empty-cells: show;\n  font-size: medium;\n  font-style: medium;\n  font-variant: medium;\n  font-weight: medium;\n  letter-spacing: normal;\n  line-height: medium;\n  list-style-image: none;\n  list-style-position: outside;\n  list-style-type: disc;\n  list-style: disc outside none;\n  orphans: 2;\n  pitch-range: 50;\n  pitch: medium;\n  quotes: \'"\' \'"\';\n  richness: 50;\n  speak-header: once;\n  speak-numeral: continuous;\n  speak-punctuation: none;\n  speak: normal;\n  speech-rate: medium;\n  stress: 50;\n  text-align: left;\n  text-indent: 0;\n  text-transform: none;\n  visibility: visible;\n  voice-family: none;\n  volume: medium;\n  white-space: normal;\n  widows: 2;\n  word-spacing: 0;\n  position: fixed;\n  padding: ', ';\n  top: 5%;\n  left: 15%;\n  right: 15%;\n  bottom: 5%;\n  color: ', ';\n  overflow: hidden;\n  z-index: ', ';\n  display: block;\n  animation: scaleflexFadeInAnimation 350ms ease-in-out both;\n  font-family: \'Roboto\', \'Arial\', sans-serif;\n  \n  @keyframes scaleflexFadeInAnimation {\n    from {opacity: 0;}\n    to {opacity: 1;}\n  }\n  \n  @media (max-width: 500px) {\n    top: 20px;\n    left: 20px;\n    bottom: 20px;\n    right: 20px;\n  }\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _CloseBtn = require('./CloseBtn');

var _styleUtils = require('../styledComponents/styleUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var ModalOverlay = _styledComponents2.default.div(_templateObject, function (props) {
  return _styleUtils.variables.colors.background.base || '#000';
});

var ModalHeader = exports.ModalHeader = _styledComponents2.default.div(_templateObject2);

var ModalFooter = exports.ModalFooter = _styledComponents2.default.div(_templateObject3);

var ModalContent = _styledComponents2.default.div(_templateObject4, function (props) {
  return props.noBorder ? 0 : '1px';
}, function (props) {
  return props.noBorder ? 'transparent' : _styleUtils.variables.colors.border.base || '#B0B0B0';
}, function (props) {
  return props.noBorder ? 0 : _styleUtils.variables.radii[3];
}, function (props) {
  return props.h || props.height || 'auto';
}, function (props) {
  return _styleUtils.variables.colors.background.base || '#fff';
}, function (props) {
  return _styleUtils.variables.colors.text.base || '#3d3d3d';
}, ModalHeader, function (props) {
  return (props.tac || props.textAlignCenter) && '\n       justify-content: center;\n    ';
}, ModalFooter, function (props) {
  return (props.tac || props.textAlignCenter) && '\n       justify-content: center;\n    ';
});

var ModalFullScreen = _styledComponents2.default.div(_templateObject5, function (props) {
  return props.p || props.padding || '0';
}, function (props) {
  return _styleUtils.variables.colors.text.base || '#3d3d3d';
}, function (props) {
  return props.zIndex || '999999995';
});

function getFullScreenSize(size) {
  switch (size) {
    case 'xs':
      return '35%';
    case 'sm':
      return '30%';
    case 'md':
      return '15%';
    case 'lg':
      return '10%';
    case 'xl':
    default:
      return '20px';
  }
}

var Modal = exports.Modal = function (_Component) {
  _inherits(Modal, _Component);

  function Modal() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Modal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Modal.__proto__ || Object.getPrototypeOf(Modal)).call.apply(_ref, [this].concat(args))), _this), _this.handleOutsideMouseClick = function (event) {
      var _this$props$onClose = _this.props.onClose,
          onClose = _this$props$onClose === undefined ? function () {} : _this$props$onClose;


      if (event.keyCode === 27) {
        event.stopPropagation();
        onClose();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Modal, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props$closeOnOutside = this.props.closeOnOutsideClick,
          closeOnOutsideClick = _props$closeOnOutside === undefined ? true : _props$closeOnOutside;

      this.root = document.createElement('div');
      document.body.appendChild(this.root);

      if (closeOnOutsideClick) {
        document.addEventListener('keydown', this.handleOutsideMouseClick);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var _props$closeOnOutside2 = this.props.closeOnOutsideClick,
          closeOnOutsideClick = _props$closeOnOutside2 === undefined ? true : _props$closeOnOutside2;

      document.body.removeChild(this.root);

      if (closeOnOutsideClick) {
        document.removeEventListener('keydown', this.handleOutsideMouseClick);
      }
    }
    //todo add keycode to config

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          _props$onClose = _props.onClose,
          onClose = _props$onClose === undefined ? function () {} : _props$onClose,
          otherProps = _objectWithoutProperties(_props, ['onClose']);

      var isCloseBtn = !!this.props.onClose;

      return (0, _reactDom.createPortal)(_react2.default.createElement(
        _react.Fragment,
        null,
        _react2.default.createElement(ModalOverlay, { onClick: onClose }),
        _react2.default.createElement(
          ModalFullScreen,
          _extends({}, this.props, { innerRef: function innerRef(node) {
              return _this2._modal = node;
            } }),
          isCloseBtn && _react2.default.createElement(_CloseBtn.CloseBtn, { onClick: onClose }),
          _react2.default.createElement(
            ModalContent,
            _extends({ h: '100%' }, otherProps),
            this.props.children
          )
        )
      ), this.root);
    }
  }]);

  return Modal;
}(_react.Component);