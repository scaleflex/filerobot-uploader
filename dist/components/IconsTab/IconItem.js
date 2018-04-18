var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import { Icon, HoverWrapper, AddTagBtn, NotRelevantBtn, ActionsIconWrapper, IconBoxWrapperInner, IconWrapper } from '../../styledComponents';

var IconItem = function (_Component) {
  _inherits(IconItem, _Component);

  function IconItem() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, IconItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = IconItem.__proto__ || Object.getPrototypeOf(IconItem)).call.apply(_ref, [this].concat(args))), _this), _this.state = { isHover: false }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(IconItem, [{
    key: 'hoverToggle',
    value: function hoverToggle(name, isHover) {
      this.setState(_defineProperty({}, name, isHover));
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          icon = _props.icon,
          onIconClick = _props.onIconClick,
          upload = _props.upload,
          addTag = _props.addTag,
          isShowAddTagBtn = _props.isShowAddTagBtn,
          isShowNotRelevantBtn = _props.isShowNotRelevantBtn,
          setAsNotRelevant = _props.setAsNotRelevant,
          onLoadImage = _props.onLoadImage,
          columnWidth = _props.columnWidth;
      var _state$isHover = this.state.isHover,
          isHover = _state$isHover === undefined ? false : _state$isHover;


      return React.createElement(
        IconBoxWrapperInner,
        {
          onClick: function onClick() {
            onIconClick(icon);
          },
          onKeyDown: function onKeyDown(event) {
            event.keyCode === 13 && upload(icon);
          },
          onMouseOver: this.hoverToggle.bind(this, 'isHover', true),
          onMouseLeave: this.hoverToggle.bind(this, 'isHover', false),
          tabIndex: 0
        },
        React.createElement(
          HoverWrapper,
          { isShow: isHover },
          React.createElement(
            ActionsIconWrapper,
            null,
            isShowAddTagBtn && React.createElement(
              AddTagBtn,
              { sm: true, themeColor: true, onClick: function onClick(event) {
                  addTag(event, icon);
                } },
              '+'
            ),
            isShowNotRelevantBtn && React.createElement(
              NotRelevantBtn,
              { sm: true, danger: true, onClick: function onClick(event) {
                  setAsNotRelevant(event, icon);
                } },
              'x'
            )
          )
        ),
        React.createElement(
          IconWrapper,
          { width: columnWidth, height: columnWidth },
          React.createElement(Icon, {
            isHover: isHover,
            src: icon.src,
            alt: icon.desc,
            onLoad: function onLoad(_ref2) {
              var target = _ref2.target;
              return onLoadImage(target, icon);
            }
          })
        )
      );
    }
  }]);

  return IconItem;
}(Component);

export default IconItem;