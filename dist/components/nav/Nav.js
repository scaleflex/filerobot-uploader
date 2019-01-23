'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('../../assets/styles');

var _Nav = require('./Nav.styled');

var _reactI18nify = require('react-i18nify');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

exports.default = function (_ref) {
  var tabs = _ref.tabs,
      activeTabId = _ref.activeTabId,
      props = _objectWithoutProperties(_ref, ['tabs', 'activeTabId']);

  return _react2.default.createElement(
    'nav',
    {
      className: 'airstore-uploader-navigation',
      style: _styles.CSS.tabs.header.container
    },
    tabs.map(function (tab) {
      return _react2.default.createElement(
        _Nav.Tab,
        {
          selected: activeTabId === tab.id,
          href: 'javascript:void(0)',
          role: 'menuitem',
          id: 'tab-' + tab.id,
          key: 'tab-' + tab.id,
          className: 'tab-header-item selected ' + (activeTabId === tab.id ? 'active' : ''),
          onClick: function onClick(event) {
            props.activateTab(event, tab.id);
          }
        },
        _react2.default.createElement('i', { className: tab.iconClass }),
        _react2.default.createElement(
          'span',
          { title: tab.fullName },
          _reactI18nify.I18n.t(tab.shortName)
        )
      );
    })
  );
};