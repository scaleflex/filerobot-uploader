var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Radium from 'radium';
import { CSS, ModalCss as styles } from '../assets/styles';

var Modal = function (_Component) {
  _inherits(Modal, _Component);

  function Modal() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Modal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Modal.__proto__ || Object.getPrototypeOf(Modal)).call.apply(_ref, [this].concat(args))), _this), _this.initModal = function () {
      var _this$props = _this.props,
          _this$props$width = _this$props.width,
          width = _this$props$width === undefined ? null : _this$props$width,
          _this$props$height = _this$props.height,
          height = _this$props$height === undefined ? null : _this$props$height;

      var modal = ReactDOM.findDOMNode(_this.refs.modal);
      var customStyles = { width: width, height: height };

      if (!modal) return;

      for (var prop in customStyles) {
        if (prop !== null) modal.style.setProperty(prop, customStyles[prop], 'important');
      }document.body.classList.add('modal-open');
    }, _this.close = function (_ref2) {
      var target = _ref2.target;

      var container = ReactDOM.findDOMNode(_this.refs.container);
      var removeBtn = ReactDOM.findDOMNode(_this.refs.removeBtn);
      var onClose = _this.props.onClose;


      if (target !== container && target !== removeBtn) return;

      if (onClose) onClose();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Modal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.initModal();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.body.classList.remove('modal-open');
    }
  }, {
    key: 'render',
    value: function render() {
      var StyleRoot = Radium.StyleRoot;
      var _props = this.props,
          content = _props.content,
          _props$style = _props.style,
          style = _props$style === undefined ? {} : _props$style;


      return React.createElement(
        StyleRoot,
        {
          ref: 'container',
          style: [styles.container, { display: 'block', opacity: 1 }, style],
          onClick: this.close
        },
        React.createElement(
          StyleRoot,
          { ref: 'modal', style: [styles.container.modal] },
          React.createElement(
            'div',
            { style: [styles.container.modal.content] },
            React.createElement(
              'div',
              { ref: 'removeBtn', style: [styles.container.modal.removeBtn], onClick: this.close },
              '\xD7'
            ),
            content
          )
        )
      );
    }
  }]);

  return Modal;
}(Component);

export default Radium(Modal);