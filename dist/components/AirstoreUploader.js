'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TaggingTab = exports.BackgroundTab = exports.IconTab = exports.UploadedImagesTab = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _styles = require('../assets/styles');

var _UserUploaderTab = require('./UploadImagesTab/UserUploaderTab');

var _UserUploaderTab2 = _interopRequireDefault(_UserUploaderTab);

var _styledComponents = require('../styledComponents');

var _Modal = require('./Modal');

var _reactFocusLock = require('react-focus-lock');

var _reactFocusLock2 = _interopRequireDefault(_reactFocusLock);

var _actions = require('../actions');

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _reactRedux = require('react-redux');

var _reactToastr = require('react-toastr');

var _Nav = require('./nav/Nav');

var _Nav2 = _interopRequireDefault(_Nav);

var _reactLoadable = require('react-loadable');

var _reactLoadable2 = _interopRequireDefault(_reactLoadable);

var _reactI18nify = require('react-i18nify');

var _Spinner = require('../components/Spinner');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var UploadedImagesTab = exports.UploadedImagesTab = (0, _reactLoadable2.default)({
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('./UploadedImagesTab/UploadedImagesTab'));
    });
  },
  modules: ['./UploadedImagesTab/UploadedImagesTab'],
  webpack: function webpack() {
    return [require.resolveWeak('./UploadedImagesTab/UploadedImagesTab')];
  },
  loading: function loading() {
    return _react2.default.createElement(_Spinner.Spinner, { overlay: true, show: true });
  }
});
var IconTab = exports.IconTab = (0, _reactLoadable2.default)({
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('./IconsTab/IconTab'));
    });
  },
  modules: ['./IconsTab/IconTab'],
  webpack: function webpack() {
    return [require.resolveWeak('./IconsTab/IconTab')];
  },
  loading: function loading() {
    return _react2.default.createElement(_Spinner.Spinner, { overlay: true, show: true });
  }
});
var BackgroundTab = exports.BackgroundTab = (0, _reactLoadable2.default)({
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('./ImagesTab/ImagesTab'));
    });
  },
  modules: ['./ImagesTab/ImagesTab'],
  webpack: function webpack() {
    return [require.resolveWeak('./ImagesTab/ImagesTab')];
  },
  loading: function loading() {
    return _react2.default.createElement(_Spinner.Spinner, { overlay: true, show: true });
  }
});
var TaggingTab = exports.TaggingTab = (0, _reactLoadable2.default)({
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('./TaggingTab/TaggingTab'));
    });
  },
  modules: ['./TaggingTab/TaggingTab'],
  webpack: function webpack() {
    return [require.resolveWeak('./TaggingTab/TaggingTab')];
  },
  loading: function loading() {
    return _react2.default.createElement(_Spinner.Spinner, { overlay: true, show: true });
  }
});
var ToastMessageFactory = _react2.default.createFactory(_reactToastr.ToastMessageAnimated);
var tabs = [{
  id: 'UPLOAD',
  fullName: 'Upload',
  shortName: 'upload.tab_title',
  iconClass: 'sfi-airstore-upload',
  getContent: function getContent(props) {
    return _react2.default.createElement(_UserUploaderTab2.default, props);
  }
}, {
  id: 'UPLOADED_IMAGES',
  fullName: 'Uploaded Images',
  shortName: 'file_manager.tab_title',
  iconClass: 'sfi-airstore-uploaded-images',
  getContent: function getContent(props) {
    return _react2.default.createElement(UploadedImagesTab, props);
  }
}, {
  id: 'ICONS_GALLERY',
  fullName: 'Icons Gallery',
  shortName: 'icons.tab_title',
  iconClass: 'sfi-airstore-gallery',
  getContent: function getContent(props) {
    return _react2.default.createElement(IconTab, props);
  }
}, {
  id: 'IMAGES_GALLERY',
  fullName: 'Images Gallery',
  shortName: 'images.tab_title',
  iconClass: 'sfi-airstore-image-gallery',
  getContent: function getContent(props) {
    return _react2.default.createElement(BackgroundTab, props);
  }
}];
var postUploadTabs = [{
  id: 'TAGGING',
  fullName: 'TAGGING',
  shortName: 'tagging.tab_title',
  iconClass: 'sfi-airstore-tagging',
  getContent: function getContent(props) {
    return _react2.default.createElement(TaggingTab, props);
  }
}];

var AirstoreUploader = function (_Component) {
  _inherits(AirstoreUploader, _Component);

  function AirstoreUploader(props) {
    _classCallCheck(this, AirstoreUploader);

    var _this = _possibleConstructorReturn(this, (AirstoreUploader.__proto__ || Object.getPrototypeOf(AirstoreUploader)).call(this));

    _initialiseProps.call(_this);

    var initialOptions = props.initialOptions;


    _this.state = {
      activeModules: initialOptions.modules || initialOptions.MODULES || _config2.default.modules || ["UPLOAD"],
      postUpload: false,
      prevTab: 'UPLOAD',
      files: []
    };

    window.AirstoreUploader = window.AirstoreUploader || {};
    window.AirstoreUploader.open = _this.openModal;
    window.AirstoreUploader.close = _this.closeModal;
    return _this;
  }

  _createClass(AirstoreUploader, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          initialOptions = _props.initialOptions,
          initialTab = _props.initialTab;

      var language = initialOptions.language || initialOptions.LANGUAGE || _config2.default.language;
      initialTab = initialTab || initialOptions.initialTab || initialOptions.INITIAL_TAB || _config2.default.initialTab;

      _reactI18nify.I18n.setLocale(language);
      initialOptions.modules = this.state.activeModules;
      this.props.setUploaderConfig(initialOptions);
      this.props.onSetUploadHandler(initialOptions.onUpload || null);

      if (this.props.opened) this.openModal(initialTab);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (this.props.opened !== prevProps.opened) {
        if (this.props.opened) this.openModal();else this.closeModal();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      if (!this.props.isVisible) return null;

      var _state = this.state,
          activeModules = _state.activeModules,
          postUpload = _state.postUpload,
          files = _state.files,
          prevTab = _state.prevTab;
      var _props2 = this.props,
          activeTabId = _props2.activeTabId,
          initialOptions = _props2.initialOptions;

      var contentProps = {
        files: files,
        prevTab: prevTab,

        showAlert: this.showAlert,
        themeColors: initialOptions.themeColors,
        setPostUpload: this.setPostUpload,
        saveUploadedFiles: this.saveUploadedFiles,
        onClose: this.props.onClose
      };
      var filteredTabs = tabs.filter(function (tab) {
        return tab.id && activeModules.includes(tab.id);
      });
      var activeTab = (postUpload ? postUploadTabs : filteredTabs).find(function (tab) {
        return tab.id === activeTabId;
      });

      return _react2.default.createElement(
        _Modal.Modal,
        { noBorder: true, fullScreen: 'md', onClose: this.closeModal, style: { borderRadius: 5 } },
        _react2.default.createElement(
          _radium.StyleRoot,
          { className: 'airstore-root-box', style: { width: '100%', height: '100%' } },
          _react2.default.createElement(
            _reactFocusLock2.default,
            null,
            _react2.default.createElement(
              _styledComponents.Dialog,
              { role: 'dialog', className: 'ae-dialog' },
              _react2.default.createElement(
                'div',
                { style: [_styles.CSS.tabs.header], className: 'ae-tabs-header' },
                _react2.default.createElement(_Nav2.default, {
                  tabs: postUpload ? postUploadTabs : filteredTabs,
                  activeTabId: activeTabId,
                  activateTab: this.activateTab
                })
              ),
              _react2.default.createElement(
                'div',
                { style: [_styles.CSS.tabs.content, activeTabId === 'ICONS' && { overflow: 'hidden' }] },
                activeTab && _react2.default.createElement(
                  'div',
                  { style: [{ width: '100%', minWidth: 540, overflow: 'auto' }] },
                  activeTab.getContent.call(this, contentProps)
                ),
                _react2.default.createElement(_reactToastr.ToastContainer, {
                  ref: function ref(node) {
                    return _this2.container = node;
                  },
                  toastMessageFactory: ToastMessageFactory,
                  className: 'toast-top-right'
                })
              )
            )
          )
        )
      );
    }
  }]);

  return AirstoreUploader;
}(_react.Component);

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.setPostUpload = function (value) {
    var tabId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var prevTab = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    _this3.setState({ postUpload: value, prevTab: prevTab });
    _this3.props.activateTab(tabId || _this3.state.prevTab);
  };

  this.saveUploadedFiles = function () {
    var files = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    _this3.setState({ files: files });
  };

  this.openModal = function (initialTab) {
    var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        file = _ref2.file;

    var initialOptions = _this3.props.initialOptions;


    initialTab = initialTab || _this3.props.initialTab || initialOptions.initialTab || initialOptions.INITIAL_TAB || _config2.default.initialTab;

    if (file) {
      _this3.setState({ files: [file], postUpload: true, prevTab: '' }, function () {
        _this3.props.modalOpen(initialTab || _this3.props.initialTab);
      });
    } else {
      _this3.setState({ postUpload: false }, function () {
        _this3.props.modalOpen(initialTab || _this3.props.initialTab);
      });
    }
  };

  this.closeModal = function () {
    var onClose = _this3.props.onClose;

    if (onClose) onClose();
    _this3.props.modalClose();
  };

  this.showAlert = function (title, msg) {
    var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'success';
    var timeOut = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 4000;

    _this3.container[type](msg, title, {
      timeOut: timeOut,
      extendedTimeOut: 2000,
      showAnimation: 'animated fadeIn',
      hideAnimation: 'animated fadeOut'
    });
  };

  this.activateTab = function (event, tabId) {
    event.preventDefault();

    _this3.props.activateTab(tabId);
  };
};

exports.default = (0, _reactRedux.connect)(function (_ref) {
  var _ref$uploader = _ref.uploader,
      backgrounds = _ref$uploader.backgrounds,
      isVisible = _ref$uploader.isVisible,
      activeTabId = _ref$uploader.activeTabId,
      uploaderConfig = _ref$uploader.uploaderConfig,
      activeModules = _ref$uploader.activeModules;
  return { backgrounds: backgrounds, isVisible: isVisible, activeTabId: activeTabId, uploaderConfig: uploaderConfig, activeModules: activeModules };
}, {
  onSetUploadHandler: _actions.setUploadHandler,
  modalClose: _actions.modalClose,
  setUploaderConfig: _actions.setUploaderConfig,
  modalOpen: _actions.modalOpen,
  activateTab: _actions.activateTab
})((0, _radium2.default)(AirstoreUploader));