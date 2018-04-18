var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import Radium from 'radium';
import { connect } from "react-redux";
import { SidebarWrap, SideBar, ColorWrapper, ColorItem, ColorItemName, Label, CountTag } from '../../styledComponents/index';

var tags = [{ tag: 'sf-social', label: 'Social', count: '23' }, { tag: 'arrows', label: 'Arrows', count: '5414' }, { tag: 'audio', label: 'Audio & Video', count: '2716' }, { tag: 'date', label: 'Date & Time', count: '1523' }, { tag: 'currency', label: 'Currency', count: '3531' }, { tag: 'business', label: 'Business', count: '8882' }];

var IconSidebar = function (_Component) {
  _inherits(IconSidebar, _Component);

  function IconSidebar() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, IconSidebar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = IconSidebar.__proto__ || Object.getPrototypeOf(IconSidebar)).call.apply(_ref, [this].concat(args))), _this), _this.renderTag = function (_ref2) {
      var tag = _ref2.tag,
          label = _ref2.label,
          count = _ref2.count;
      var _this$props = _this.props,
          activePresetTag = _this$props.activePresetTag,
          onActivatePresetTag = _this$props.onActivatePresetTag;


      return React.createElement(
        ColorItem,
        {
          key: 'category-' + tag,
          active: tag === activePresetTag,
          onClick: function onClick() {
            onActivatePresetTag(tag);
          }
        },
        React.createElement(
          ColorItemName,
          null,
          label || tag.replace(/_/g, ' ').trim()
        ),
        React.createElement(
          CountTag,
          null,
          '(',
          count,
          ')'
        )
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(IconSidebar, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          toggleColorType = _props.toggleColorType,
          activeColorType = _props.activeColorType;


      return React.createElement(
        SidebarWrap,
        null,
        React.createElement(
          SideBar,
          { id: 'airstore-uploader-tags-box' },
          React.createElement(
            Label,
            { fs: '16px', color: 'black' },
            'Color filter'
          ),
          React.createElement(
            ColorWrapper,
            null,
            React.createElement(
              ColorItem,
              {
                key: 'all-color-wrapper',
                active: activeColorType === 'all',
                onClick: function onClick() {
                  toggleColorType('all');
                }
              },
              React.createElement(
                ColorItemName,
                null,
                'All'
              )
            ),
            React.createElement(
              ColorItem,
              {
                active: activeColorType === 'multi',
                key: 'multi-color-wrapper',
                onClick: function onClick() {
                  toggleColorType('multi');
                }
              },
              React.createElement(
                ColorItemName,
                null,
                'Multi color'
              )
            ),
            React.createElement(
              ColorItem,
              {
                active: activeColorType === 'mono',
                key: 'mono-color-wrapper',
                onClick: function onClick() {
                  toggleColorType('mono');
                }
              },
              React.createElement(
                ColorItemName,
                null,
                'Mono color'
              )
            )
          ),
          React.createElement(
            Label,
            { fs: '16px', color: 'black' },
            'Categories'
          ),
          tags && tags.sort(function (a, b) {
            return a.tag > b.tag ? 1 : -1;
          }).map(function (tag) {
            return _this2.renderTag(tag);
          })
        )
      );
    }
  }]);

  return IconSidebar;
}(Component);

export default connect(function (_ref3) {
  var _ref3$icons = _ref3.icons,
      tags = _ref3$icons.tags,
      active = _ref3$icons.active;
  return { tags: tags, active: active };
}, null)(Radium(IconSidebar));