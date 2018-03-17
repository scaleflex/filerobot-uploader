var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import Radium, { StyleRoot } from 'radium';
import { CSS } from '../assets/styles';
import { IconTab, BackgroundTab, UserUploaderTab, SearchTab } from './index';
import { Modal } from 'scaleflex-react-ui-kit/dist';
import { modalClose, modalOpen, activateTab, setUploaderConfig, setActiveModules, setUploadHandler, setTabs } from '../actions';
import config from '../config';
import { connect } from 'react-redux';

var AirstoreUploader = function (_Component) {
  _inherits(AirstoreUploader, _Component);

  function AirstoreUploader() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, AirstoreUploader);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AirstoreUploader.__proto__ || Object.getPrototypeOf(AirstoreUploader)).call.apply(_ref, [this].concat(args))), _this), _this.tabs = [{
      id: 'UPLOAD',
      fullName: 'Upload',
      shortName: 'Upload',
      iconClass: 'sfi-airstore-upload',
      getContent: function getContent() {
        return React.createElement(UserUploaderTab, null);
      }
    }, {
      id: 'SEARCH',
      fullName: 'Search',
      shortName: 'Search',
      iconClass: 'sfi-airstore-search',
      getContent: function getContent() {
        return React.createElement(SearchTab, null);
      }
    }, {
      id: 'ICONS',
      fullName: 'Icons Library',
      shortName: 'Icons',
      iconClass: 'sfi-airstore-icon',
      getContent: function getContent() {
        return React.createElement(IconTab, null);
      }
    }, {
      id: 'BACKGROUNDS',
      fullName: 'Backgrounds',
      shortName: 'Backgrounds',
      iconClass: 'sfi-airstore-bg',
      getContent: function getContent() {
        return React.createElement(BackgroundTab, null);
      }
    }], _this.openModal = function (initialTab) {
      return _this.props.onModalOpen(initialTab);
    }, _this.closeModal = function () {
      var onClose = _this.props.onClose;

      if (onClose) onClose();
      _this.props.onModalClose();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(AirstoreUploader, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          initialOptions = _props.initialOptions,
          initialTab = _props.initialTab;


      this.props.onSetUploaderConfig(initialOptions || config || {});
      this.props.onSetActiveModules(initialOptions.MODULES || config.MODULES || []);
      this.props.onSetUploadHandler(initialOptions.onUpload || null);
      this.props.onSetTabs(this.tabs);
      if (this.props.opened) this.openModal(initialTab);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.opened !== this.props.opened) {
        if (nextProps.opened) this.openModal(nextProps.initialTab);else this.closeModal();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.props.isVisible) return null;
      return React.createElement(
        Modal,
        { fullScreen: 'lg', onClose: this.closeModal },
        React.createElement(
          StyleRoot,
          { style: { width: '100%', height: '100%' } },
          this.renderModalContent()
        )
      );
    }
  }, {
    key: 'renderModalContent',
    value: function renderModalContent() {
      var _this2 = this;

      var _props2 = this.props,
          activeTab = _props2.activeTab,
          filteredTabs = _props2.filteredTabs;


      return React.createElement(
        'div',
        { style: [{ display: 'flex', flexDirection: 'column', height: '100%', fontFamily: 'Roboto, sans-serif', background: '#181830' }] },
        React.createElement(
          'div',
          { style: [CSS.tabs.header] },
          React.createElement(
            'div',
            { style: [CSS.tabs.header.container] },
            filteredTabs.map(function (tab, index) {
              return React.createElement(
                'a',
                {
                  href: '#',
                  key: 'tab-' + index,
                  className: 'tab-header-item selected',
                  style: [CSS.tabs.header.container.item, activeTab && activeTab.id === tab.id && CSS.tabs.header.container.item.selected],
                  onClick: function onClick(event) {
                    event.preventDefault();
                    _this2.props.onActivateTab(tab);
                  }
                },
                React.createElement('i', { className: tab.iconClass, style: [CSS.tabs.header.container.item.i] }),
                React.createElement(
                  'span',
                  { title: tab.fullName, style: CSS.tabs.header.container.item.text },
                  tab.shortName
                )
              );
            })
          )
        ),
        React.createElement(
          'div',
          { style: [CSS.tabs.content, activeTab && activeTab.id === 'ICONS' && { overflow: 'hidden' }] },
          activeTab && React.createElement(
            'div',
            { style: [{ width: '100%' }] },
            activeTab.getContent.call(this)
          )
        )
      );
    }
  }]);

  return AirstoreUploader;
}(Component);

export default connect(function (_ref2) {
  var _ref2$uploader = _ref2.uploader,
      backgrounds = _ref2$uploader.backgrounds,
      isVisible = _ref2$uploader.isVisible,
      activeTab = _ref2$uploader.activeTab,
      uploaderConfig = _ref2$uploader.uploaderConfig,
      activeModules = _ref2$uploader.activeModules,
      tabs = _ref2$uploader.tabs,
      filteredTabs = _ref2$uploader.filteredTabs;
  return { backgrounds: backgrounds, isVisible: isVisible, activeTab: activeTab, uploaderConfig: uploaderConfig, activeModules: activeModules, tabs: tabs, filteredTabs: filteredTabs };
}, function (dispatch) {
  return {
    onModalOpen: function onModalOpen(tabName) {
      return dispatch(modalOpen(tabName));
    },
    onModalClose: function onModalClose() {
      return dispatch(modalClose());
    },
    onActivateTab: function onActivateTab(active) {
      return dispatch(activateTab(active));
    },
    onSetUploaderConfig: function onSetUploaderConfig(_config) {
      return dispatch(setUploaderConfig(_config));
    },
    onSetActiveModules: function onSetActiveModules(modules) {
      return dispatch(setActiveModules(modules));
    },
    onSetUploadHandler: function onSetUploadHandler(handler) {
      return dispatch(setUploadHandler(handler));
    },
    onSetTabs: function onSetTabs(tabs) {
      return dispatch(setTabs(tabs));
    }
  };
})(Radium(AirstoreUploader));