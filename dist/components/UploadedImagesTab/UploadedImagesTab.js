'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _index = require('../../styledComponents/index');

var _api = require('../../services/api.service');

var _reactRedux = require('react-redux');

var _actions = require('../../actions');

var _Spinner = require('../Spinner');

var _UploadedImagesContent = require('./UploadedImagesContent');

var _UploadedImagesContent2 = _interopRequireDefault(_UploadedImagesContent);

var _utils = require('../../utils');

var _reactI18nify = require('react-i18nify');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var STEP = { DEFAULT: 'DEFAULT', UPLOADING: 'UPLOADING', ERROR: 'ERROR', UPLOADED: 'UPLOADED' };

var UploadedImagesTab = function (_Component) {
  _inherits(UploadedImagesTab, _Component);

  function UploadedImagesTab() {
    _classCallCheck(this, UploadedImagesTab);

    var _this = _possibleConstructorReturn(this, (UploadedImagesTab.__proto__ || Object.getPrototypeOf(UploadedImagesTab)).call(this));

    _this.onGetListFiles = function (dir) {
      _this.setState({ isLoading: true });
      var uploaderConfig = _this.props.uploaderConfig;
      var container = uploaderConfig.container;


      (0, _api.getListFiles)({ dir: dir, container: container }).then(function (files) {
        _this.setState({ files: files, isLoading: false, imagesIndex: _this.state.imagesIndex + 1 });
      });
    };

    _this.activateFolder = function (activeFolder) {
      _this.setState({ activeFolder: activeFolder, files: [] });
      _this.onGetListFiles(activeFolder.dir);
    };

    _this.fileChangeHandler = function (_ref) {
      var target = _ref.target;
      _this.changeFile(target.files);
    };

    _this.isFilesValid = function (filesToUpload) {
      return true;
    };

    _this.changeFile = function () {
      var filesToUpload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      _this.setState({ filesToUpload: filesToUpload });

      setTimeout(function () {
        if (filesToUpload && _this.isFilesValid(filesToUpload)) _this.upload();
      });
    };

    _this.upload = function () {
      var isUploadFromUrl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      // if (this.state.isLoading) return;
      var activeFolder = _this.state.activeFolder;

      var self = _this.props;

      _this.uploadStart();
      (isUploadFromUrl ? _this.props.onFileUploadFromUrl(url, _this.props.uploaderConfig) : _this.props.onFilesUpload(_this.state.filesToUpload, _this.props.uploaderConfig, 'files[]', activeFolder.dir)).then(function (files) {
        _this.uploadSuccess(files);

        if (_this.props.uploaderConfig.tagging.active) {
          _this.props.saveUploadedFiles(files);
          _this.props.setPostUpload(true, 'TAGGING', 'UPLOADED_IMAGES');
          return;
        }

        self.uploaderConfig.uploadHandler(files);
        self.modalClose();
      }).catch(function (error) {
        _this.uploadError(error.msg);
      });
    };

    _this.changeStep = function (step) {
      return _this.setState({ step: step });
    };

    _this.uploadStart = function () {
      return _this.setState({ step: STEP.UPLOADING, files: [] });
    };

    _this.uploadSuccess = function (uploadedFiles) {
      _this.setState({ step: STEP.UPLOADED, uploadedFiles: uploadedFiles, isDragOver: false });
      _this.onGetListFiles(_this.state.activeFolder.dir);
    };

    _this.uploadError = function (msg) {
      var timer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      _this.setState({ step: STEP.ERROR, errorMsg: msg || _reactI18nify.I18n.t('upload.error') });
      if (timer) setTimeout(function () {
        return _this.changeStep(STEP.DEFAULT);
      }, timer);
    };

    _this.fileDropHandler = function (event) {
      event.preventDefault();
      _this.changeFile((event.dataTransfer || event.originalEvent.dataTransfer).files);
    };

    _this.onDragEvent = function (event, field, value) {
      event.preventDefault();
      _this.setState(_defineProperty({}, field, value));
    };

    _this.search = function () {
      _this.setState({ isLoading: true });
      var _this$state = _this.state,
          _this$state$searchPhr = _this$state.searchPhrase,
          searchPhrase = _this$state$searchPhr === undefined ? '' : _this$state$searchPhr,
          imagesIndex = _this$state.imagesIndex;
      var uploaderConfig = _this.props.uploaderConfig;
      var container = uploaderConfig.container;


      (0, _api.searchFiles)({ query: searchPhrase, container: container }).then(function (files) {
        _this.setState({ files: files, isLoading: false, imagesIndex: imagesIndex + 1 });
      });
    };

    _this.renderNavigation = function () {
      var uploaderConfig = _this.props.uploaderConfig;
      var _this$state$activeFol = _this.state.activeFolder,
          activeFolder = _this$state$activeFol === undefined ? {} : _this$state$activeFol;
      var folders = uploaderConfig.folders;


      if (!folders.length) return;

      return _react2.default.createElement(
        _index.Nav,
        null,
        folders.map(function (folder) {
          return _react2.default.createElement(
            _index.NavItem,
            {
              role: 'menuitem',
              tabIndex: 0,
              onKeyDown: function onKeyDown(event) {
                event.keyCode === 13 && _this.activateFolder(folder);
              },
              onClick: _this.activateFolder.bind(_this, folder),
              active: folder.dir === (activeFolder && activeFolder.dir),
              key: folder.dir
            },
            folder.label
          );
        })
      );
    };

    _this.state = {
      searchPhrase: '',
      activeFolder: null,
      isLoading: false,
      imagesIndex: 0,
      files: []
    };
    return _this;
  }

  _createClass(UploadedImagesTab, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var uploaderConfig = this.props.uploaderConfig;
      var folders = uploaderConfig.folders;


      if (!folders.length) return;

      var activeFolder = folders[0];

      this.setState({ activeFolder: activeFolder });
      this.onGetListFiles(activeFolder.dir);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          isLoading = _state.isLoading,
          step = _state.step,
          files = _state.files,
          isDragOver = _state.isDragOver,
          imagesIndex = _state.imagesIndex;


      return _react2.default.createElement(
        _index.UploadedImages,
        null,
        _react2.default.createElement(_index.UploadInputBox, {
          type: 'file',
          name: 'files[]',
          innerRef: function innerRef(node) {
            return _this2.fileInput = node;
          },
          'data-multiple-caption': '{count} files selected',
          defaultValue: '',
          tabIndex: -1,
          multiple: true,
          onChange: this.fileChangeHandler
        }),
        _react2.default.createElement(
          _index.HeaderWrap,
          null,
          this.renderNavigation(),
          _react2.default.createElement(
            _index.SearchWrapper,
            null,
            _react2.default.createElement(
              _index.SearchGroup,
              { padding: '0px' },
              _react2.default.createElement(_index.InputSearch, {
                type: 'search',
                innerRef: function innerRef(node) {
                  return _this2._searchInput = node;
                },
                autoFocus: true,
                defaultValue: '',
                placeholder: _reactI18nify.I18n.t('file_manager.search_by_file_name_tag_desc'),
                onKeyDown: function onKeyDown(ev) {
                  return (0, _utils.isEnterClick)(ev) && _this2.search();
                }
              }),
              _react2.default.createElement(
                _index.ButtonSearch,
                {
                  key: 'ok',
                  className: 'ae-btn',
                  onClick: this.search
                },
                _reactI18nify.I18n.t('upload.search')
              )
            )
          ),
          _react2.default.createElement(
            _index.ButtonSearch,
            {
              className: 'ae-btn',
              fullBr: '4px',
              onClick: function onClick() {
                _this2.fileInput.click();
              }
            },
            _reactI18nify.I18n.t('file_manager.upload_images')
          )
        ),
        _react2.default.createElement(_UploadedImagesContent2.default, {
          imagesIndex: imagesIndex,
          onDragEvent: this.onDragEvent,
          fileDropHandler: this.fileDropHandler,
          isDragOver: isDragOver,
          saveUploadedFiles: this.props.saveUploadedFiles,
          setPostUpload: this.props.setPostUpload,
          files: files,
          onClose: this.props.onClose
        }),
        _react2.default.createElement(_Spinner.Spinner, { overlay: true, show: isLoading || step === STEP.UPLOADING })
      );
    }
  }]);

  return UploadedImagesTab;
}(_react.Component);

exports.default = (0, _reactRedux.connect)(function (_ref2) {
  var uploaderConfig = _ref2.uploader.uploaderConfig;
  return { uploaderConfig: uploaderConfig };
}, {
  onFilesUpload: _actions.uploadFilesToDir,
  onFileUploadFromUrl: _actions.uploadFilesFromUrls,
  modalClose: _actions.modalClose
})(UploadedImagesTab);