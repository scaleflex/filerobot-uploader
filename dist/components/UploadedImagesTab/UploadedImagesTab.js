var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import { UploadedImages, HeaderWrap, Nav, NavItem, ButtonSearch, UploadInputBox } from '../../styledComponents/index';
import { getListFiles } from '../../services/api.service';
import { connect } from 'react-redux';
import { uploadFilesToDir, uploadFilesFromUrls } from '../../actions';
import { Spinner } from 'scaleflex-react-ui-kit/dist';
import UploadedImagesContent from './UploadedImagesContent';

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


      getListFiles({ dir: dir, container: container }).then(function (files) {
        _this.setState({ files: files, isLoading: false });
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


      _this.uploadStart();
      (isUploadFromUrl ? _this.props.onFileUploadFromUrl(url, _this.props.uploaderConfig) : _this.props.onFilesUpload(_this.state.filesToUpload, _this.props.uploaderConfig, 'files[]', activeFolder.dir)).then(function (filesToUpload) {
        return _this.uploadSuccess(filesToUpload);
      }, function (error) {
        return _this.uploadError(error.msg);
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

      _this.setState({ step: STEP.ERROR, errorMsg: msg || 'Error' });
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

    _this.renderNavigation = function () {
      var uploaderConfig = _this.props.uploaderConfig;
      var _this$state$activeFol = _this.state.activeFolder,
          activeFolder = _this$state$activeFol === undefined ? {} : _this$state$activeFol;
      var folders = uploaderConfig.folders;


      if (!folders.length) return;

      return React.createElement(
        Nav,
        null,
        folders.map(function (folder) {
          return React.createElement(
            NavItem,
            {
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
      activeFolder: null,
      isLoading: false,
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
          isDragOver = _state.isDragOver;


      return React.createElement(
        UploadedImages,
        null,
        React.createElement(UploadInputBox, {
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
        React.createElement(
          HeaderWrap,
          null,
          this.renderNavigation(),
          React.createElement(
            ButtonSearch,
            {
              fullBr: '4px',
              onClick: function onClick() {
                _this2.fileInput.click();
              }
            },
            'Upload images'
          )
        ),
        React.createElement(UploadedImagesContent, {
          onDragEvent: this.onDragEvent,
          fileDropHandler: this.fileDropHandler,
          isDragOver: isDragOver,
          files: files
        }),
        React.createElement(Spinner, { overlay: true, show: isLoading || step === STEP.UPLOADING })
      );
    }
  }]);

  return UploadedImagesTab;
}(Component);

export default connect(function (_ref2) {
  var uploaderConfig = _ref2.uploader.uploaderConfig;
  return { uploaderConfig: uploaderConfig };
}, function (dispatch) {
  return {
    onFilesUpload: function onFilesUpload(files, uploaderConfig, dataType, dir) {
      return dispatch(uploadFilesToDir(files, uploaderConfig, dataType, dir));
    },
    onFileUploadFromUrl: function onFileUploadFromUrl(file, uploaderConfig) {
      return dispatch(uploadFilesFromUrls([file], uploaderConfig));
    }
  };
})(UploadedImagesTab);