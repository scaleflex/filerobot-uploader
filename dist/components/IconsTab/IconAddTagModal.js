'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _hoc = require('../hoc');

var _iconsApi = require('../../services/iconsApi.service');

var _styledComponents = require('../../styledComponents');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IconAddTagModal = function (_Component) {
  _inherits(IconAddTagModal, _Component);

  function IconAddTagModal() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, IconAddTagModal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = IconAddTagModal.__proto__ || Object.getPrototypeOf(IconAddTagModal)).call.apply(_ref, [this].concat(args))), _this), _this.state = { tagName: '' }, _this.onAddTag = function () {
      var _this$props = _this.props,
          activeIcon = _this$props.activeIcon,
          onClose = _this$props.onClose,
          showAlert = _this$props.showAlert;
      var tagName = _this.state.tagName;


      (0, _iconsApi.addTag)(activeIcon.uid, tagName).then(function () {
        showAlert('New tag successfully added!');
        onClose();
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(IconAddTagModal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      setTimeout(function () {
        if (_this2._input && _this2._input.focus) _this2._input.focus();
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var onClose = this.props.onClose;
      var tagName = this.state.tagName;


      return _react2.default.createElement(
        _hoc.Aux,
        null,
        _react2.default.createElement(_styledComponents.Opacity, { isShow: true, onClick: onClose }),
        _react2.default.createElement(
          _styledComponents.MonoIconSettings,
          { isShow: true },
          _react2.default.createElement(
            _styledComponents.IconAddTagInner,
            null,
            _react2.default.createElement(
              _styledComponents.Label,
              { color: 'black', nb: true },
              'Would you like to add tag?'
            ),
            _react2.default.createElement(_styledComponents.Input, {
              innerRef: function innerRef(node) {
                return _this3._input = node;
              },
              defaultValue: tagName,
              onKeyDown: function onKeyDown(event) {
                event.keyCode === 13 && _this3.onAddTag();
              },
              onChange: function onChange(_ref2) {
                var target = _ref2.target;
                _this3.setState({ tagName: target.value });
              }
            }),
            _react2.default.createElement(
              _styledComponents.ButtonSearch,
              { fullBr: '4px', onClick: this.onAddTag },
              'Add tag'
            )
          )
        )
      );
    }
  }]);

  return IconAddTagModal;
}(_react.Component);

exports.default = IconAddTagModal;