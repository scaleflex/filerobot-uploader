'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _styles = require('../assets/styles');

var _index = require('./index');

var _styledComponents = require('../styledComponents');

var _dist = require('scaleflex-react-ui-kit/dist');

var _reactFocusLock = require('react-focus-lock');

var _reactFocusLock2 = _interopRequireDefault(_reactFocusLock);

var _actions = require('../actions');

var _config2 = require('../config');

var _config3 = _interopRequireDefault(_config2);

var _reactRedux = require('react-redux');

var _reactToastr = require('react-toastr');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ToastMessageFactory = _react2.default.createFactory(_reactToastr.ToastMessageAnimated);

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
        return _react2.default.createElement(_index.UserUploaderTab, props);
      }
    }, {
      id: 'UPLOADED_IMAGES',
      fullName: 'Uploaded Images',
      shortName: 'Uploaded Images',
      iconClass: 'sfi-airstore-uploaded-images',
      getContent: function getContent(props) {
        return _react2.default.createElement(_index.UploadedImagesTab, props);
      }
    }, {
      id: 'ICONS_GALLERY',
      fullName: 'Icons Gallery',
      shortName: 'Icons Gallery',
      iconClass: 'sfi-airstore-gallery',
      getContent: function getContent(props) {
        return _react2.default.createElement(_index.IconTab, props);
      }
    }, {
      id: 'IMAGES_GALLERY',
      fullName: 'Images Gallery',
      shortName: 'Images Gallery',
      iconClass: 'sfi-airstore-image-gallery',
      getContent: function getContent(props) {
        return _react2.default.createElement(_index.BackgroundTab, props);
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


      this.props.onSetUploaderConfig(initialOptions || _config3.default || {});
      this.props.onSetActiveModules(initialOptions.MODULES || _config3.default.MODULES || []);
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

      return _react2.default.createElement(
        _dist.Modal,
        { noBorder: true, fullScreen: 'md', onClose: this.closeModal, style: { borderRadius: 5 } },
        _react2.default.createElement(
          _radium.StyleRoot,
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

      return _react2.default.createElement(
        _reactFocusLock2.default,
        null,
        _react2.default.createElement(
          _styledComponents.Dialog,
          { role: 'dialog', className: 'ae-dialog' },
          _react2.default.createElement(
            'div',
            { style: [_styles.CSS.tabs.header], className: 'ae-tabs-header' },
            _react2.default.createElement(
              'nav',
              {
                ref: function ref(node) {
                  return _this2._nav = node;
                }, className: 'airstore-uploader-navigation',
                style: [_styles.CSS.tabs.header.container]
              },
              filteredTabs.map(function (tab, index) {
                return _react2.default.createElement(
                  'a',
                  {
                    href: 'javascript:void(0)',
                    role: 'menuitem',
                    id: 'tab-' + tab.id,
                    key: 'tab-' + tab.id,
                    className: 'tab-header-item selected ' + (activeTab && activeTab.id === tab.id ? 'active' : ''),
                    style: [_styles.CSS.tabs.header.container.item, activeTab && activeTab.id === tab.id && _styles.CSS.tabs.header.container.item.selected],
                    onClick: function onClick(event) {
                      event.preventDefault();
                      _this2.props.onActivateTab(tab);
                    }
                  },
                  _react2.default.createElement('i', { className: tab.iconClass, style: [_styles.CSS.tabs.header.container.item.i] }),
                  _react2.default.createElement(
                    'span',
                    { title: tab.fullName, style: _styles.CSS.tabs.header.container.item.text },
                    tab.shortName
                  )
                );
              })
            )
          ),
          _react2.default.createElement(
            'div',
            { style: [_styles.CSS.tabs.content, activeTab && activeTab.id === 'ICONS' && { overflow: 'hidden' }] },
            activeTab && _react2.default.createElement(
              'div',
              { style: [{ width: '100%', minWidth: 540, overflow: 'auto' }] },
              activeTab.getContent.call(this, contentProps)
            ),
            _react2.default.createElement(_reactToastr.ToastContainer, {
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
}(_react.Component);

exports.default = (0, _reactRedux.connect)(function (_ref2) {
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
      return dispatch((0, _actions.modalOpen)(tabName));
    },
    onModalClose: function onModalClose() {
      return dispatch((0, _actions.modalClose)());
    },
    onActivateTab: function onActivateTab(active) {
      return dispatch((0, _actions.activateTab)(active));
    },
    onSetUploaderConfig: function onSetUploaderConfig(_config) {
      return dispatch((0, _actions.setUploaderConfig)(_config));
    },
    onSetActiveModules: function onSetActiveModules(modules) {
      return dispatch((0, _actions.setActiveModules)(modules));
    },
    onSetUploadHandler: function onSetUploadHandler(handler) {
      return dispatch((0, _actions.setUploadHandler)(handler));
    },
    onSetTabs: function onSetTabs(tabs) {
      return dispatch((0, _actions.setTabs)(tabs));
    }
  };
})((0, _radium2.default)(AirstoreUploader));