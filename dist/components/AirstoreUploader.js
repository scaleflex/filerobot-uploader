var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import Radium, { StyleRoot } from 'radium';
import { CSS } from '../assets/styles';
import { IconTab, BackgroundTab, UserUploaderTab, SearchTab, UploadedImagesTab } from './index';
import { Dialog } from '../styledComponents';
import { Modal } from 'scaleflex-react-ui-kit/dist';
import FocusLock from 'react-focus-lock';
import { modalClose, modalOpen, activateTab, setUploaderConfig, setActiveModules, setUploadHandler, setTabs } from '../actions';
import config from '../config';
import { connect } from 'react-redux';
import { ToastContainer, ToastMessageAnimated } from 'react-toastr';

var ToastMessageFactory = React.createFactory(ToastMessageAnimated);

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
      getContent: function getContent(props) {
        return React.createElement(UserUploaderTab, props);
      }
    }, {
      id: 'UPLOADED_IMAGES',
      fullName: 'Uploaded Images',
      shortName: 'Uploaded Images',
      iconClass: 'sfi-airstore-uploaded-images',
      getContent: function getContent(props) {
        return React.createElement(UploadedImagesTab, props);
      }
    }, {
      id: 'ICONS_GALLERY',
      fullName: 'Icons Gallery',
      shortName: 'Icons Gallery',
      iconClass: 'sfi-airstore-gallery',
      getContent: function getContent(props) {
        return React.createElement(IconTab, props);
      }
    }, {
      id: 'IMAGES_GALLERY',
      fullName: 'Images Gallery',
      shortName: 'Images Gallery',
      iconClass: 'sfi-airstore-image-gallery',
      getContent: function getContent(props) {
        return React.createElement(BackgroundTab, props);
      }
    }], _this.openModal = function (initialTab) {
      _this.props.onModalOpen(initialTab || _this.props.initialTab);
    }, _this.closeModal = function () {
      var onClose = _this.props.onClose;

      if (onClose) onClose();
      _this.props.onModalClose();
    }, _this.showAlert = function (title, msg) {
      var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'success';
      var timeOut = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 4000;

      _this.refs.container[type](msg, title, {
        timeOut: timeOut,
        extendedTimeOut: 2000,
        showAnimation: 'animated fadeIn',
        hideAnimation: 'animated fadeOut'
      });
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

      if (this.props.updateState) this.props.updateState({
        openAirstoreUploader: this.openModal.bind(this, initialTab),
        closeAirstoreUploader: this.closeModal
      });
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.props.isVisible) return null;

      return React.createElement(
        Modal,
        { noBorder: true, fullScreen: 'md', onClose: this.closeModal, style: { borderRadius: 5 } },
        React.createElement(
          StyleRoot,
          { className: 'airstore-root-box', style: { width: '100%', height: '100%' } },
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
          _props2$filteredTabs = _props2.filteredTabs,
          filteredTabs = _props2$filteredTabs === undefined ? [] : _props2$filteredTabs,
          initialOptions = _props2.initialOptions;

      var contentProps = { showAlert: this.showAlert, themeColors: initialOptions.themeColors };

      return React.createElement(
        FocusLock,
        null,
        React.createElement(
          Dialog,
          { role: 'dialog' },
          React.createElement(
            'div',
            { style: [CSS.tabs.header] },
            React.createElement(
              'nav',
              {
                ref: function ref(node) {
                  return _this2._nav = node;
                }, className: 'airstore-uploader-navigation',
                style: [CSS.tabs.header.container]
              },
              filteredTabs.map(function (tab, index) {
                return React.createElement(
                  'a',
                  {
                    href: 'javascript:void(0)',
                    role: 'menuitem',
                    id: 'tab-' + tab.id,
                    key: 'tab-' + tab.id,
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
              { style: [{ width: '100%', minWidth: 540, overflow: 'auto' }] },
              activeTab.getContent.call(this, contentProps)
            ),
            React.createElement(ToastContainer, {
              ref: 'container',
              toastMessageFactory: ToastMessageFactory,
              className: 'toast-top-right'
            })
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